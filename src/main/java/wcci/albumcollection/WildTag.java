package wcci.albumcollection;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class WildTag {
	
	@Id
	@GeneratedValue
	private Long id;
	private String tagName;

	@ManyToMany (mappedBy = "wildTags")
	private Collection <Artist>  artists;
	
	@ManyToMany (mappedBy = "wildTags")
	private Collection <Song>  songs;
	
	@ManyToMany (mappedBy = "wildTags")
	private Collection <Album>  albums;
	
	
	public WildTag(String tagName) {
		this.tagName = tagName;
	}


	public String getTagName() {
		return tagName;
	}
	
	
}