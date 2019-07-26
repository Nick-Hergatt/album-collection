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
public class AlbumController {
	@Autowired
	private AlbumRepository albumRepo;
	private Artist artist;
	
	@GetMapping("/albums")
	@CrossOrigin
	public Iterable<Album> sendAlbums(){
		return albumRepo.findAll();
	}
	
	@GetMapping ("/albums/{id}")
	@CrossOrigin
	public Album sendAlbum(@PathVariable Long id) {
		return albumRepo.findById(id).get();
	}

	@PostMapping ("/add-album")
	public Album addAlbum(String title, String albumImageUrl, String recordLabel) {
		Album albumToAdd = new Album(title, albumImageUrl, recordLabel, artist);
		if (albumRepo.findByAlbumTitle(albumToAdd.getAlbumTitle())==null) {
			albumRepo.save(albumToAdd);
		}
		return albumRepo.findByAlbumTitle(albumToAdd.getAlbumTitle());
		
	}
	
	
	
//	@PutMapping ("/albums/{id}/{song}")
//	public Album addSongToAlbum(@PathVariable Long id, @PathVariable String songTitle) {
//		Album albumToModify = albumRepo.findById(id).get();
//		Song songToAdd = songRepo.findbyName
//		albumToModify.addSong();
//		return albumRepo.save(albumToModify);
//	}
//	

}

;