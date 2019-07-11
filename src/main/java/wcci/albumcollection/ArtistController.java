package wcci.albumcollection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ArtistController {

	@Autowired
	ArtistRepository artistRepo;
	
	@GetMapping("/artists")
	public Iterable<Artist> sendArtists() {
		return artistRepo.findAll();
	}
	@GetMapping("/artists/{id}")
	public Artist sendArtist(@PathVariable Long id) {
		return artistRepo.findById(id).get();
	}
	
	@PostMapping
	
	@PutMapping
	
}
