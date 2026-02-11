package shreya.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import shreya.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
