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

@WebMvcTest(AlbumController.class)
@RunWith(SpringRunner.class)
public class AlbumWebLayerTest {
	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	AlbumRepository albumRepo;

	private Album testAlbum;
	private ObjectMapper  mapper = new ObjectMapper();

	@Before
	public void setup() {
		testAlbum = new Album("title", "url", "record");
	}
	
	@Test
	public void fetchCollectionOfAlbums() throws Exception{
		when(albumRepo.findAll()).thenReturn(Collections.singletonList(testAlbum));
		mockMvc.perform(get("/api/albums"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json;charset=UTF-8"))
			.andExpect(content().json(mapper.writeValueAsString(Collections.singletonList(testAlbum)), true));
	}
	@Test
	public void fetchSingleAlbum() throws Exception {
		when(albumRepo.findById(1L)).thenReturn(Optional.of(testAlbum));
		mockMvc.perform(get("/api/albums/1"))
		.andDo(print())
		.andExpect(status().isOk())
		.andExpect(content().contentType("application/json;charset=UTF-8"))
		.andExpect(content().json(mapper.writeValueAsString(testAlbum), true));
	}
	@Test
	public void addAlbum() throws Exception{
		Album albumToAdd = new Album("","","");
		mockMvc.perform(post("/api/add-album").contentType(MediaType.APPLICATION_JSON)
				.content(toJson(albumToAdd))).andExpect(status().is3xxRedirection());
}

	private String toJson(Album albumToAdd) {
		return testAlbum.getAlbumTitle();
	}
}