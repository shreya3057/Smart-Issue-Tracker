package shreya.service;

import shreya.model.Ticket;
import shreya.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    public Ticket createTicket(Ticket ticket) {
        ticket.setStatus("Open");
        return repository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return repository.findAll();
    }

    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        Ticket ticket = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setTitle(updatedTicket.getTitle());
        ticket.setDescription(updatedTicket.getDescription());
        ticket.setPriority(updatedTicket.getPriority());
        ticket.setStatus(updatedTicket.getStatus());

        return repository.save(ticket);
    }

    public void deleteTicket(Long id) {
        repository.deleteById(id);
    }
}
