import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../bi.jpg"; // your image in src/assets
import "./Home.css";

function HomePage() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  // Inline style for background
  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",       // stretch to fill
    backgroundPosition: "center",  // center image
    backgroundRepeat: "no-repeat", // prevent repetition
    backgroundAttachment: "fixed", // optional: keeps image fixed on scroll
  };

  return (
    <div style={containerStyle}>
      {/* Logout button top-right */}
      <button className="logout-btn-top" onClick={logout}>
        Logout
      </button>

      {/* Center card */}
      <div className="home-card">
        <h1 className="home-title">Smart Issue Tracker</h1>
        <img
          className="home-image"
          src="/Home.jpg" // in public folder
          alt="ticket"
        />

        <div className="btn-area">
          <Link to="/tickets">
            <button className="home-btn">📋 View Tickets</button>
          </Link>
          <Link to="/create">
            <button className="home-btn create-btn">➕ Create Ticket</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
