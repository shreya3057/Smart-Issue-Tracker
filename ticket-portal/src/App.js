import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Home";
import LoginPage from "./components/Login";
import RegisterPage from "./components/RegisterPage";
import TicketList from "./components/TicketList";
import CreateTicket from "./components/CreateTicket";
import UpdateTicket from "./components/UpdateTicket";

import TicketDetails from "./components/TicketDetails";
import ChatBox from "./components/ChatBox";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />

        {/* Ticket Pages */}
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/create" element={<CreateTicket />} />
        <Route path="/update/:id" element={<UpdateTicket />} />

        {/* ⭐ Add this route for ticket details */}
        <Route path="/ticket/:id" element={<TicketDetails />} />
        
        {/* ⭐ NEW ROUTE — Chat window for a ticket */}
        <Route path="/ticket/:id/chat" element={<ChatBox />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
