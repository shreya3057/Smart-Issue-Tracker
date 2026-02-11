package shreya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shreya.model.Comment;
import shreya.model.Ticket;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByTicket(Ticket ticket);
}
