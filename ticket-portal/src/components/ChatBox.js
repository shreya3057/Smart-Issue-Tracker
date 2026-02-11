import React, { useEffect, useState } from "react";
import ChatService from "../services/ChatService";

function ChatBox({ ticketId, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    ChatService.getChatHistory(ticketId).then((res) => {
      setMessages(res.data);
    });

    ChatService.connect((msg) => {
      if (msg.ticketId === ticketId) {
        setMessages((prev) => [...prev, msg]);
      }
    });
  }, [ticketId]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const chatMessage = {
      ticketId: ticketId,
      sender: username,
      message: input,
    };

    ChatService.sendMessage(chatMessage);
    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2>Ticket Chat #{ticketId}</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === username ? "flex-end" : "flex-start",
              backgroundColor:
                msg.sender === username ? "#d1e7dd" : "#e2e3e5",
            }}
          >
            <b>{msg.sender}</b>: {msg.message}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          type="text"
          value={input}
          placeholder="Type message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "20px auto",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    borderRadius: "5px",
  },
  message: {
    padding: "8px",
    margin: "4px 0",
    borderRadius: "6px",
    maxWidth: "75%",
  },
  inputArea: {
    display: "flex",
    gap: "5px",
  },
  input: {
    flexGrow: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #aaa",
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default ChatBox;
