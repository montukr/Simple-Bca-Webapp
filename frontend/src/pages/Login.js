import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔒 Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage(`Welcome ${res.data.user.name}! Redirecting...`);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed. Try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Username"
          value={form.name}
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
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
