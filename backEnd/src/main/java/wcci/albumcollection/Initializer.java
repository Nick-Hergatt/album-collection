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
		
	Artist eminem= new Artist("Eminem", "https://i.imgur.com/C1pRKYy.jpg", "46", "Capitol Records", "Detroit, MI");
	artistRepo.save(eminem);
	Artist mj = new Artist("Micheal Jackson", "https://i.imgur.com/3m8Pisl.jpg", "dead", "Daddy Jackson Tracks", "Gary, IN");
	artistRepo.save(mj);
	Artist prince = new Artist("Prince", "https://i.imgur.com/7Kr0mrK.jpg", "dead", "Purple Discs", "Paisley Park, MN");
	artistRepo.save(prince);
	
	Album eightMile = new Album("8 Mile", "https://i.imgur.com/bW0Xnc6.jpg", "Capitol Records", eminem);
	albumRepo.save(eightMile);
	Album eminemShow = new Album("Eminem Show", "https://i.imgur.com/RmBDHnm.jpg", "Capitol Records", eminem);
	albumRepo.save(eminemShow);
	Album thriller = new Album("Thriller", "https://i.imgur.com/p3ZzPd7.jpg", "Daddy Jackson Tracks", mj);
	albumRepo.save(thriller);
	Album purpleRain = new Album("Purple Rain", "https://i.imgur.com/lyJ4sfr.jpg", "Purple Discs", prince);
	albumRepo.save(purpleRain);
	
	Song loseYourself = new Song("Lose Yourself", "5:24", "https://www.youtube.com/watch?v=_Yhyp-_hX2s", eightMile);
	songRepo.save(loseYourself);
	Song beatIt = new Song("beatIt", "4:58", "https://www.youtube.com/watch?v=oRdxUFDoQe0", thriller);
	songRepo.save(beatIt);
	Song billieJean = new Song("Billie Jean", "4:55", "https://www.youtube.com/watch?v=Zi_XLOBDo_Y", thriller);
	songRepo.save(billieJean);
	Song purpleRainSong = new Song("Purple Rain", "7:57", "https://www.youtube.com/watch?v=TvnYmWpD_T8", purpleRain);
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