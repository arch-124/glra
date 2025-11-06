import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

console.log("🧩 GEMINI_API_KEY loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

router.post("/ask", async (req, res) => {
  const { message } = req.body;

  if (!message)
    return res.status(400).json({ error: "Message is required" });

  try {
    const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an assistant for a solar energy company website. 
            Be clear, short, and conversational. Avoid long paragraphs. 
            If context is given, continue naturally.\n\nUser: ${req.body.message || ""}`,
          },
        ],
      },
    ],
  }
);

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response 🤖";

    res.json({ reply });
  } catch (error) {
    console.error(
      "AI API error:",
      error.response?.status,
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to connect to AI service",
      details: error.response?.data || null,
    });
  }
});

export default router;
