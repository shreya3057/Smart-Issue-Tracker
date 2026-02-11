package shreya.controller;

import shreya.model.Ticket;
import shreya.repository.TicketRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController 
{

    @Autowired
    private TicketRepository ticketRepo;

    // ---------------------------
    // TEST ENDPOINT
    // ---------------------------
    @GetMapping("/test")
    public String testApi() {
        return "Backend is running!";
    }

    // ---------------------------
    // CRUD ENDPOINTS
    // ---------------------------
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }
    
   @GetMapping("/{id}")
public ResponseEntity<Ticket> getTicket(@PathVariable Long id) {
    return ticketRepo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}


    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket ticket) {
        ticket.setId(id);
        return ticketRepo.save(ticket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketRepo.deleteById(id);
    }
    
    // ---------------------------
    // FILE UPLOAD ENDPOINT
    // ---------------------------
   @PostMapping("/{id}/upload")   // <-- This must be POST
    public ResponseEntity<String> uploadFile(
            @PathVariable Long id, 
            @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        // TODO: save file logic here
        return ResponseEntity.ok("File uploaded successfully for ticket " + id);
    }

}
