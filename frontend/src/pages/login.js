import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://glra-newback.onrender.com/api/users/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login successful!");
      window.location.href = "/";
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Login;
