package wcci.albumcollection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") //If something breaks, this may be the problem
public class SongController {
	@Autowired
	SongRepository songRepo;
	
	@GetMapping("/songs")
	public Iterable<Song> sendSongs(){
		return songRepo.findAll();
	}
	
	@GetMapping ("/songs/{id}")
	public Song sendSong(@PathVariable Long id) {
		return songRepo.findById(id).get();
	}

	@PostMapping
	
	@PutMapping
}