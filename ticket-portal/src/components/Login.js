import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "../login.jpg";   // <-- background image import
import "./Login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      localStorage.setItem("loggedIn", "true");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login-card">
        <h2 className="login-title">🔐 Login</h2>

        <input
          className="login-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={login}>Login</button>

        <p className="register-text">
          Not a user? <Link className="reg-link" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
