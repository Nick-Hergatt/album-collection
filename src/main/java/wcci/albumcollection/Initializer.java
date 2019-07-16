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
	
	@Autowired
	private WildTagRepository wildTagRepo;
	
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
	
	WildTag rap = new WildTag("Rap");
	wildTagRepo.save(rap);
	WildTag whiteBoy = new WildTag("White Boy");
	wildTagRepo.save(whiteBoy);
	WildTag tagTest = new WildTag("Tag Test");
	wildTagRepo.save(tagTest);
	WildTag movie = new WildTag("Movie");
	wildTagRepo.save(movie);
	WildTag eighties = new WildTag("80s");
	wildTagRepo.save(eighties);
	WildTag molester = new WildTag("Molester");
	wildTagRepo.save(molester);
	
	eminem.addAlbum(eightMile);
	eminem.addAlbum(eminemShow);
	eightMile.addSong(loseYourself);
	eminem.addWildTag(whiteBoy);
	eminem.addWildTag(tagTest);
	eightMile.addWildTag(movie);
	eightMile.addWildTag(rap);
	eightMile.addWildTag(tagTest);
	eminemShow.addWildTag(movie);
	eminemShow.addWildTag(rap);
	eminemShow.addWildTag(tagTest);
	loseYourself.addWildTag(rap);
	loseYourself.addWildTag(movie);
	loseYourself.addWildTag(tagTest);
	songRepo.save(loseYourself);
	albumRepo.save(eightMile);
	albumRepo.save(eminemShow);
	artistRepo.save(eminem);

	mj.addAlbum(thriller);
	thriller.addSong(beatIt);
	thriller.addSong(billieJean);
	mj.addWildTag(eighties);
	mj.addWildTag(tagTest);
	mj.addWildTag(molester);
	thriller.addWildTag(eighties);
	thriller.addWildTag(tagTest);
	beatIt.addWildTag(tagTest);
	beatIt.addWildTag(eighties);
	billieJean.addWildTag(eighties);
	billieJean.addWildTag(tagTest);
	songRepo.save(beatIt);
	songRepo.save(billieJean);
	albumRepo.save(thriller);
	artistRepo.save(mj);
	
	prince.addAlbum(purpleRain);
	purpleRain.addSong(purpleRainSong);
	prince.addWildTag(tagTest);
	prince.addWildTag(eighties);
	purpleRain.addWildTag(eighties);
	purpleRain.addWildTag(tagTest);
	purpleRainSong.addWildTag(eighties);
	purpleRainSong.addWildTag(tagTest);
	songRepo.save(purpleRainSong);
	albumRepo.save(purpleRain);
	artistRepo.save(prince);
	}
}