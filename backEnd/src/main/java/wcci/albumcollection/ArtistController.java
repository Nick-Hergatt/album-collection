package wcci.albumcollection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ArtistController {

	@Autowired
	ArtistRepository artistRepo;
	
	@GetMapping("/artists")
	@CrossOrigin
	public Iterable<Artist> sendArtists() {
		return artistRepo.findAll();
	}
	@GetMapping("/artists/{id}")
	@CrossOrigin
	public Artist sendArtist(@PathVariable Long id) {
		return artistRepo.findById(id).get();
	}
	@PostMapping ("/add-artist")
	public Artist addArtist(String name, String artistImageUrl, String artistAge, String recordLabel, String homeTown) {
		Artist artistToAdd = new Artist(name, artistImageUrl, artistAge, recordLabel, homeTown);
		if (artistRepo.findByName(artistToAdd.getName())==null) {
			artistRepo.save(artistToAdd);
		}
		return artistRepo.findByName(artistToAdd.getName());
		
	}
}
