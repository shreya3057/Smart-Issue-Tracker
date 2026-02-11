import React, { useEffect, useState } from "react";
import TicketService from "../services/TicketService";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateTicket.css"; // ⬅ Add CSS file

const UpdateTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "",
    status: ""
  });

  useEffect(() => {
    TicketService.getAllTickets().then(res => {
      const data = res.data.find(t => t.id === Number(id));
      if (data) setTicket(data);
    });
  }, [id]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const saveTicket = () => {
    TicketService.updateTicket(id, ticket).then(() => {
      navigate("/tickets");
    });
  };

  return (
    <div className="update-container">
      <div className="update-card">
        <h2 className="update-title">✏️ Update Ticket</h2>

        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="update-input"
          value={ticket.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Enter Description"
          className="update-textarea"
          value={ticket.description}
          onChange={handleChange}
        />

        <select
          name="priority"
          className="update-select"
          value={ticket.priority}
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          name="status"
          className="update-select"
          value={ticket.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option>Open</option>
          <option>In-Progress</option>
          <option>Closed</option>
        </select>

        <button className="update-btn" onClick={saveTicket}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateTicket;
