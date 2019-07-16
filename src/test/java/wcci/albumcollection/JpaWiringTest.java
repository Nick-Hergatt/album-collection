package wcci.albumcollection;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest

public class JpaWiringTest {
	@Autowired
	TestEntityManager entityManager;

	@Autowired
	private SongRepository songRepo;

	@Autowired
	private ArtistRepository artistRepo;

	@Autowired
	private AlbumRepository albumRepo;

	private Artist artist;
	private Album album;

	@Test
	public void shouldStartDataJpaTestFramework() {

	}

	@Test
	public void albumShouldHaveOneArtistAndCollectionOfSongs() {
		Artist testArtist = new Artist("Lawrence", "URL", "27", "Roc", "Columbus");
		testArtist = artistRepo.save(testArtist);
		Album testAlbum = new Album("Damn", "url", "Roc", artist);
		testAlbum.addArtist(testArtist);
		Song testSong = new Song("Bob", "2min", "url", album);
		testSong = songRepo.save(testSong);
	
		testAlbum.addSong(testSong);
		testAlbum = albumRepo.save(testAlbum);
		
//make sure artist exist 1st
//		reorganize

		entityManager.flush();
		entityManager.clear();

		Album retrievedAlbum = albumRepo.findById(testAlbum.getId()).get();
		assertThat(retrievedAlbum.getArtist(), is(testArtist));
	}

}