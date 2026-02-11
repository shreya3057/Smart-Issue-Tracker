import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080";

class TicketService {
  getAllTickets() {
    return axios.get("/api/tickets");
  }

  getTicket(id) {
    return axios.get(`/api/tickets/${id}`);
  }

  createTicket(ticket) {
    return axios.post("/api/tickets", ticket);
  }

  updateTicket(id, ticket) {
    return axios.put(`/api/tickets/${id}`, ticket);
  }

  deleteTicket(id) {
    return axios.delete(`/api/tickets/${id}`);
  }
  uploadFile(id, formData) {
  return axios.post(`/api/tickets/${id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

}

  // --------------------------
  // COMMENTS API
  // --------------------------
  getComments(id) {
    return axios.get(`/api/tickets/${id}/comments`);
  }

  addComment(id, comment) {
    return axios.post(`/api/tickets/${id}/comments`, comment);
  }
}

export default new TicketService();
