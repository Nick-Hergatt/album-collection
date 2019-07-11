package wcci.albumcollection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Initializer implements CommandLineRunner {
	
	@Autowired
	private ArtistRepository artistRepo;

	@Autowired
	private AlbumRepository albumRepo;
	
	@Autowired
	private SongRepository songRepo;
	
	@Override
	public void run(String... args) throws Exception {
		
	Artist eminem= new Artist("Eminem", "imageUrl", "27", "Capitol", "Detroit");
	artistRepo.save(eminem);
	Artist mj = new Artist("Micheal Jackson", "imageUrl", "dead", "Daddy Jackson", "Gary");
	artistRepo.save(mj);
	Artist prince = new Artist("Prince", "imageUrl", "dead", "Purple", "Paisley Park");
	artistRepo.save(prince);
	
	Album eightMile = new Album("8 Mile", "imageUrl", "Capitol");
	albumRepo.save(eightMile);
	Album eminemShow = new Album("Eminem Show", "imageUrl", "Capitol");
	albumRepo.save(eminemShow);
	Album thriller = new Album("Thriller", "imageUrl", "Daddy Jackson");
	albumRepo.save(thriller);
	Album purpleRain = new Album("Purple Rain", "imageUrl", "Capitol");
	albumRepo.save(purpleRain);
	
	Song loseYourself = new Song("Lose Yourself", "4:35", "linkUrl");
	songRepo.save(loseYourself);
	Song beatIt = new Song("beatIt", "3:37", "linkUrl");
	songRepo.save(beatIt);
	Song billieJean = new Song("Billie Jean", "4:23", "linkUrl");
	songRepo.save(billieJean);
	Song purpleRainSong = new Song("Purple Rain", "3:59", "linkUrl");
	songRepo.save(purpleRainSong);
	
	eminem.addAlbum(eightMile);
	eminem.addAlbum(eminemShow);
	eightMile.addSong(loseYourself);
	artistRepo.save(eminem);

	mj.addAlbum(thriller);
	thriller.addSong(beatIt);
	thriller.addSong(billieJean);
	artistRepo.save(mj);
	
	prince.addAlbum(purpleRain);
	purpleRain.addSong(purpleRainSong);
	artistRepo.save(prince);
	}
}