package wcci.albumcollection;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

@WebMvcTest(WildTagController.class)
@RunWith(SpringRunner.class)
public class WildTagWebLayerTest {
	@Autowired
	MockMvc mockMvc;
	@MockBean
	private WildTagRepository  wildTagRepo;
	private WildTag testWildTag;
	private ObjectMapper mapper = new ObjectMapper();
	
	@Before
	public void setup() { 
		testWildTag = new WildTag("tag1");
	}
	@Test
	public void fetchCollectionOfTags() throws Exception {
		when(wildTagRepo.findAll()).thenReturn(Collections.singletonList(testWildTag));
		mockMvc.perform(get("/api/tags"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json;charset=UTF-8"))
			.andExpect(content().json(mapper.writeValueAsString(Collections.singletonList(testWildTag)), true));
	}
	@Test
	public void fetchSingleWildTag() throws Exception {
		when(wildTagRepo.findById(1L)).thenReturn(Optional.of(testWildTag));
		mockMvc.perform(get("/api/tags/1"))
		.andDo(print())
		.andExpect(status().isOk())
		.andExpect(content().contentType("application/json;charset=UTF-8"))
		.andExpect(content().json(mapper.writeValueAsString(testWildTag),true));
	}
	@Test
	public void addWildTag() throws Exception{
		WildTag tagToAdd = new WildTag("");
		mockMvc.perform(post("/api/add-tag").contentType(MediaType.APPLICATION_JSON)
				.content(toJson(tagToAdd))).andExpect(status().isOk());
}
		private String toJson(WildTag tagToAdd) {
			return testWildTag.getTagName();
		}
	
}
