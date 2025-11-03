import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔒 Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed. Try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Username"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
