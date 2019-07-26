package wcci.albumcollection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class WildTagController {
@Autowired	
private WildTagRepository wildTagRepo;	
	
@GetMapping("/tags")
public Iterable<WildTag> sendTags(){
	return wildTagRepo.findAll();
	
}
@GetMapping("tags/{id}")
public WildTag sendTag(@PathVariable Long id ) {
	return wildTagRepo.findById(id).get();
}

@PostMapping ("/add-tag")
public WildTag addTag(String tagName) {
	WildTag tagToAdd = new WildTag(tagName);
	if (wildTagRepo.findByTagName(tagToAdd.getTagName())==null) {
		wildTagRepo.save(tagToAdd);
	}
	return wildTagRepo.findByTagName(tagToAdd.getTagName());
}
}
