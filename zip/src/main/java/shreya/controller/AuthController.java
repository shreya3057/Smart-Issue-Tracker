package shreya.controller;

import shreya.model.User;
import org.springframework.web.bind.annotation.*;

import shreya.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if(userRepo.findByUsername(user.getUsername()) != null){
            return ResponseEntity.badRequest().body("User already exists");
        }
        userRepo.save(user);
        return ResponseEntity.ok("Registered successfully");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User request){
        User user = userRepo.findByUsername(request.getUsername());
        if(user == null) return ResponseEntity.badRequest().body("User not found");
        if(!user.getPassword().equals(request.getPassword())){
            return ResponseEntity.badRequest().body("Wrong password");
        }
        return ResponseEntity.ok("Login success");
    }
}

