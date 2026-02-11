import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketService from "../services/TicketService";
import "./TicketDetails.css";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [comments, setComments] = useState([]);
  const [file, setFile] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    loadTicket();
    loadComments();
  }, []);

  const loadTicket = () => {
    TicketService.getTicket(id).then(res => {
      setTicket(res.data);
    });
  };

  const loadComments = () => {
    TicketService.getComments(id).then(res => {
      setComments(res.data);
    });
  };

  const uploadFile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    TicketService.uploadFile(id, formData).then(() => {
      alert("File uploaded");
    });
  };

  const submitComment = (e) => {
    e.preventDefault();

    TicketService.addComment(id, { text: commentText }).then(() => {
      setCommentText("");
      loadComments();
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold">Ticket Details</h2>

      <div className="card shadow p-4 mt-4">
        <h4>{ticket.title}</h4>
        <p><b>Description:</b> {ticket.description}</p>
        <p><b>Priority:</b> {ticket.priority}</p>
        <p><b>Status:</b> {ticket.status}</p>
      </div>

      {/* Upload Attachment */}
      <div className="card shadow p-4 mt-4">
        <h5>Upload Attachment</h5>
        <form onSubmit={uploadFile} encType="multipart/form-data">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control my-2"
          />
          <button className="btn btn-success">Upload</button>
        </form>
      </div>


        
      {/* Comments Section */}
      <div className="card shadow p-4 mt-4">
        <h5>Comments</h5>

        <form onSubmit={submitComment} className="mb-3">
          <textarea
            className="form-control"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          ></textarea>
          <button className="btn btn-primary mt-2">Post Comment</button>
        </form>

        <ul className="list-group">
          {comments.map((c, index) => (
            <li className="list-group-item" key={index}>{c.text}</li>
          ))}
        </ul>
      </div>
        <a href={`/ticket/${id}/chat`} className="btn btn-info mt-3">
          Open Discussion
        </a>
    </div>
  );
};

export default TicketDetails;
