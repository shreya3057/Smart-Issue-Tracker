import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";

const API_BASE = "http://localhost:8080";

class ChatService {
  constructor() {
    this.client = null;
  }

  connect(onMessageReceived) {
    const socket = new SockJS(`${API_BASE}/ws-chat`);

    this.client = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        this.client.subscribe("/topic/ticket", (message) => {
          const body = JSON.parse(message.body);
          onMessageReceived(body);
        });
      },
    });

    this.client.activate();
  }

  sendMessage(chatMessage) {
    this.client.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(chatMessage),
    });
  }

  getChatHistory(ticketId) {
  return axios.get(`${API_BASE}/api/chat/${ticketId}`);
}
}

export default new ChatService();
