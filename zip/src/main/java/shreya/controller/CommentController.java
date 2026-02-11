package shreya.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import shreya.model.Comment;
import shreya.model.Ticket;
import shreya.repository.CommentRepository;
import shreya.repository.TicketRepository;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private TicketRepository ticketRepo;

    @Autowired
    private CommentRepository commentRepo;

    // GET COMMENTS
    @GetMapping("/{id}/comments")
    public List<Comment> getComments(@PathVariable Long id) {
        Ticket ticket = ticketRepo.findById(id).orElse(null);
        return commentRepo.findByTicket(ticket);
    }

    // ADD COMMENT
    @PostMapping("/{id}/comments")
    public Comment addComment(@PathVariable Long id, @RequestBody Comment comment) {
        Ticket ticket = ticketRepo.findById(id).orElse(null);
        comment.setTicket(ticket);
        return commentRepo.save(comment);
    }
}
