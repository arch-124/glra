import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://glra-newback.onrender.com/api/users/register", form);
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Registration successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Register;
