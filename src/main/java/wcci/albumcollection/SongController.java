package wcci.albumcollection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") //If something breaks, this may be the problem
public class SongController {
	@Autowired
	SongRepository songRepo;
	private Album album;
	
	@GetMapping("/songs")
	public Iterable<Song> sendSongs(){
		return songRepo.findAll();
	}
	
	@GetMapping ("/songs/{id}")
	public Song sendSong(@PathVariable Long id) {
		return songRepo.findById(id).get();
	}

	@PostMapping ("/add-song")
	public Song addSong (String songTitle, String duration, String linkUrl) {
		Song songToAdd = new Song(songTitle, duration, linkUrl, album);
		if(songRepo.findBySongTitle(songToAdd.getSongTitle())==null){
			songRepo.save(songToAdd);
		}
		return songRepo.findBySongTitle(songToAdd.getSongTitle());
	}
	
	
}