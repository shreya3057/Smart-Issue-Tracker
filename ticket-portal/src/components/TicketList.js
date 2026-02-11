import React, { useEffect, useState } from "react";
import TicketService from "../services/TicketService";
import { Link } from "react-router-dom";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    TicketService.getAllTickets().then(res => {
      setTickets(res.data);
    });
  };

  const deleteTicket = (id) => {
    TicketService.deleteTicket(id).then(() => {
      loadTickets();
    });
  };

  // Safe color functions
  const badgeColor = (priority) => {
    if (!priority) return "secondary";
    if (priority.toLowerCase() === "high") return "danger";
    if (priority.toLowerCase() === "medium") return "warning";
    return "success";
  };

  const statusColor = (status) => {
    if (!status) return "secondary";
    if (status.toLowerCase() === "open") return "primary";
    if (status.toLowerCase() === "in-progress") return "warning";
    return "secondary";
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4 fw-bold">Smart Issue Tracker</h2>

      <div className="d-flex justify-content-end">
        <Link to="/create" className="btn btn-success mb-3 shadow-sm">
          + Create Ticket
        </Link>
      </div>

      <div className="table-responsive shadow rounded">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  <strong>No tickets found</strong>
                </td>
              </tr>
            ) : (
              tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className="text-center fw-bold">{ticket.id}</td>
                  <td>
                    <Link to={`/ticket/${ticket.id}`} className="text-decoration-none fw-bold">
                      {ticket.title || "N/A"}
                    </Link>
                  </td>


                  {/* SAFE PRIORITY FIELD */}
                  <td>
                    <span className={`badge bg-${badgeColor(ticket.priority)} px-3 py-2`}>
                      {ticket.priority || "N/A"}
                    </span>
                  </td>

                  {/* SAFE STATUS FIELD */}
                  <td>
                    <span className={`badge bg-${statusColor(ticket.status)} px-3 py-2`}>
                      {ticket.status || "N/A"}
                    </span>
                  </td>

                  <td>{ticket.description || "No description"}</td>

                  <td className="text-center">
                    <Link
                      className="btn btn-primary btn-sm me-2 shadow-sm"
                      to={`/update/${ticket.id}`}
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger btn-sm shadow-sm"
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TicketList;
