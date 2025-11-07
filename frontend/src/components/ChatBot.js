import React, { useState } from "react";
import axios from "axios";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import "../App.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ✅ Use your local backend endpoint instead of Google API
const API_URL = "https://glra-newback.onrender.com/api/ai/ask";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! 👋 I’m your assistant. Share your name to get started!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [leadStage, setLeadStage] = useState("name");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const validateInput = (value) => {
    if (leadStage === "email") {
      return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
    } else if (leadStage === "phone") {
      return /^[0-9]{10}$/.test(value);
    }
    return true;
  };

  const getAIResponse = async (userMessage) => {
  try {
    // Include the full conversation so Gemini understands context
    const conversation = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Add the new user message
    conversation.push({ role: "user", parts: [{ text: userMessage }] });

 const response = await axios.post("https://glra-newback.onrender.com/api/ai/ask", {
  message: userMessage,
});


    return response.data.reply || "Hmm... I didn’t catch that 🤔";
  } catch (error) {
    console.error("AI API error:", error);
    return "Sorry, I couldn’t connect to the AI server 😔";
  }
};


  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let reply = "";

    if (leadStage !== "done") {
      if (!validateInput(input)) {
        reply =
          leadStage === "email"
            ? "Please enter a valid email ending with @gmail.com 📧"
            : "Please enter a valid 10-digit mobile number 📱";
      } else {
        if (leadStage === "name") {
          setUserData({ ...userData, name: input });
          setLeadStage("email");
          reply = "Nice to meet you! What’s your email? (must end with @gmail.com) 📧";
        } else if (leadStage === "email") {
          setUserData({ ...userData, email: input });
          setLeadStage("phone");
          reply = "Thanks! Lastly, could you share your 10-digit mobile number? 📱";
        } else if (leadStage === "phone") {
          const updatedData = { ...userData, phone: input };
          setUserData(updatedData);
          setLeadStage("done");
          console.log("✅ Lead collected:", updatedData);

// Send to backend
try {
  await axios.post("https://glra-newback.onrender.com/api/leads/add", updatedData);
  console.log("✅ Lead saved to database!");
} catch (err) {
  console.error("❌ Failed to save lead:", err);
}

reply = "Awesome! 🎉 We’ve collected your details. Our team will reach out soon. You can ask me your queries now!";

        }
      }
    } else {
      reply = await getAIResponse(input);
    }

    setMessages([...newMessages, { text: reply, sender: "bot" }]);
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chat-toggle" onClick={toggleChat}>
          <AiOutlineMessage size={28} />
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>AI Assistant 🤖</span>
            <button className="close-btn" onClick={toggleChat}>
              <AiOutlineClose />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
  <div
    key={index}
    className={`chat-message ${
      msg.sender === "user" ? "user-msg" : "bot-msg"
    }`}
  >
    {msg.sender === "bot" ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
    ) : (
      msg.text
    )}
  </div>
))}
            {loading && (
              <div className="bot-msg">
                <em>Thinking...</em>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
