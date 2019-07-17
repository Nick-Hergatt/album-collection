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

	@ManyToMany(mappedBy = "wildTags")
	private Collection<Artist> artists;

	@ManyToMany(mappedBy = "wildTags")
	private Collection<Song> songs;

	@ManyToMany(mappedBy = "wildTags")
	private Collection<Album> albums;

	private WildTag() {
	}

	public WildTag(String tagName) {
		this.tagName = tagName;
	}

	public String getTagName() {
		return tagName;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WildTag other = (WildTag) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}