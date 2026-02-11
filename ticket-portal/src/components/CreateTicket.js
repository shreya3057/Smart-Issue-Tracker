import React, { useState } from "react";
import TicketService from "../services/TicketService";
import { useNavigate } from "react-router-dom";
import "./CreateTicket.css"; // custom CSS

const CreateTicket = () => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "Low"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const saveTicket = () => {
    TicketService.createTicket(ticket).then(() => {
      navigate("/");
    });
  };

  return (

    
    <div className="create-wrapper d-flex justify-content-center align-items-center">
      <div className="card create-card shadow-lg p-4">
        <h2 className="text-center mb-4 fw-bold text-primary">Create New Ticket</h2>

        <input
          type="text"
          name="title"
          className="form-control mb-3 input-field"
          placeholder="Enter Ticket Title"
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="form-control mb-3 input-field"
          placeholder="Describe the issue..."
          rows="4"
          onChange={handleChange}
        />

        <select
          name="priority"
          className="form-select mb-3 input-field"
          onChange={handleChange}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <button className="btn btn-primary w-100 btn-lg" onClick={saveTicket}>
          Submit Ticket
        </button>
      </div>
    </div>
  );
};

export default CreateTicket;
