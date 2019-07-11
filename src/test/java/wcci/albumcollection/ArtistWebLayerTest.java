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

@WebMvcTest(ArtistController.class)
@RunWith(SpringRunner.class)
public class ArtistWebLayerTest {
	
	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	ArtistRepository artistRepo;
	
	private Artist testArtist;
	private ObjectMapper mapper = new ObjectMapper();
	
	@Before
	public void setup() {
		testArtist = new Artist("name", "artistImageUrl", "artistAge", "recordLabel", "hometown");
	}
	
	@Test
	public void fetchCollectionOfArtists() throws Exception {
	when(artistRepo.findAll()).thenReturn(Collections.singletonList(testArtist));
	mockMvc.perform(get("/api/artists"))
		.andDo(print())
		.andExpect(status().isOk())
		.andExpect(content().contentType("application/json;charset=UTF-8"))
		.andExpect(content().json(mapper.writeValueAsString(Collections.singletonList(testArtist)),true));
	}
	@Test
	public void fetchSingleArtist() throws Exception {
		when(artistRepo.findById(1L)).thenReturn(Optional.of(testArtist));
		mockMvc.perform(get("/api/artists/1"))
		.andDo(print())
		.andExpect(status().isOk())
		.andExpect(content().contentType("application/json;charset=UTF-8"))
		.andExpect(content().json(mapper.writeValueAsString(testArtist),true));
	}
	@Test
	public void addArtist() throws Exception{
		Artist artistToAdd = new Artist("","","", "", "");
		mockMvc.perform(post("/api/add-artist").contentType(MediaType.APPLICATION_JSON)
				.content(toJson(artistToAdd))).andExpect(status().isOk());
}

	private String toJson(Artist artistToAdd) {
		return testArtist.getName();
	}
	
}
