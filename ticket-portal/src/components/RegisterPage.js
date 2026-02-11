import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert("Registered! Please login.");
      navigate("/login");
    } else {
      alert("User already exists");
    }
  };

  return (
    <div className="reg-container">

      <div className="reg-card">
        <h2 className="reg-title">📝 Register</h2>

        <input
          className="reg-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="reg-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="reg-btn" onClick={register}>Register</button>

        <p className="login-text">
          Already a user? <Link className="login-link" to="/login">Login</Link>
        </p>
      </div>

    </div>
  );
}

export default RegisterPage;
