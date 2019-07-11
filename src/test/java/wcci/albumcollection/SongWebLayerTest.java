package wcci.albumcollection;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;
import java.util.Optional;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(SongController.class)
@RunWith(SpringRunner.class)
public class SongWebLayerTest {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	private SongRepository songRepo;

	private Song testSong;
	private ObjectMapper mapper = new ObjectMapper();

	@Before
	public void setup() { 
		testSong = new Song("songTitle", "duration", "linkUrl");
	}

	@Test
	public void fetchCollectionOfSongs() throws Exception {
		when(songRepo.findAll()).thenReturn(Collections.singletonList(testSong));
		mockMvc.perform(get("/api/songs"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json;charset=UTF-8"))
			.andExpect(content().json(mapper.writeValueAsString(Collections.singletonList(testSong)), true));
	}
	
	@Test
	public void fetchSingleSong() throws Exception {
		when(songRepo.findById(1L)).thenReturn(Optional.of(testSong));
		mockMvc.perform(get("/api/songs/1"))
		.andDo(print())
		.andExpect(status().isOk())
		.andExpect(content().contentType("application/json;charset=UTF-8"))
		.andExpect(content().json(mapper.writeValueAsString(testSong),true));
	}
	@Test
	public void addSong() throws Exception{
		Song songToAdd = new Song("","","");
		mockMvc.perform(post("/api/add-album").contentType(MediaType.APPLICATION_JSON)
				.content(toJson(albumToAdd))).andExpect(status().isOk());
}
		private String toJson(Song songToAdd) {
			return testSong.getSongTitle();
		}
}