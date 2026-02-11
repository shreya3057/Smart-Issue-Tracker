package shreya.service;

import shreya.dto.ChatMessage;
import shreya.dto.TicketCommentRequest;
import shreya.model.TicketComment;
import shreya.repository.TicketCommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketCommentService {

    private final TicketCommentRepository repository;

    public TicketCommentService(TicketCommentRepository repository) {
        this.repository = repository;
    }

    // ✔ For REST comment submit
    public TicketComment saveComment(TicketCommentRequest req) {
        TicketComment comment = new TicketComment();
        comment.setTicketId(req.getTicketId());
        comment.setSender(req.getSender());
        comment.setMessage(req.getMessage());
        return repository.save(comment);
    }

    // ✔ For WebSocket chat messages
    public TicketComment addComment(ChatMessage chatMsg) {
        TicketComment comment = new TicketComment();
        comment.setTicketId(chatMsg.getTicketId());
        comment.setSender(chatMsg.getSender());
        comment.setMessage(chatMsg.getMessage());
        return repository.save(comment);
    }

    // ✔ Load history
    public List<TicketComment> getComments(Long ticketId) {
        return repository.findByTicketIdOrderByIdAsc(ticketId);
    }
}
