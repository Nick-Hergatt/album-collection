package wcci.albumcollection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

}
