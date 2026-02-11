package shreya.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import shreya.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}