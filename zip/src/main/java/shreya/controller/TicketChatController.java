package shreya.controller;

import shreya.dto.ChatMessage;
import shreya.model.TicketComment;
import shreya.service.TicketCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TicketChatController {

    @Autowired
    private TicketCommentService ticketCommentService;  // ✅ FIXED

    // WebSocket endpoint for sending messages
    @MessageMapping("/chat/send")
    @SendTo("/topic/ticket")
    public TicketComment sendMessage(ChatMessage message) {
        return ticketCommentService.addComment(message);
    }

    // REST API to load chat history
    @GetMapping("/api/chat/{ticketId}")
    public List<TicketComment> getChatHistory(@PathVariable Long ticketId) {
        return ticketCommentService.getComments(ticketId);
    }
}
