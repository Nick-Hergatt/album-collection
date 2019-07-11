package wcci.albumcollection;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") //If something breaks, this may be the problem
public class AlbumController {
	@Autowired
	AlbumRepository albumRepo;
	
	@GetMapping("/albums")
	public Iterable<Album> sendAlbums(){
		return albumRepo.findAll();
	}
	
	@GetMapping ("/albums/{id}")
	public Album sendAlbum(@PathVariable Long id) {
		return albumRepo.findById(id).get();
	}

	@PostMapping ("/add-album")
	public Optional<Album> addAlbum(String title, String albumImageUrl, String recordLabel) {
		Album albumToAdd = new Album(title, albumImageUrl, recordLabel);
		if (albumRepo.findByAlbumTitle(albumToAdd.getAlbumTitle())==null) {
			albumRepo.save(albumToAdd);
		}
		return albumRepo.findById(albumToAdd.getId());
		
	}
	

}

