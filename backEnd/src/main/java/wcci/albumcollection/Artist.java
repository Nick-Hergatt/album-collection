package wcci.albumcollection;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Artist {
	@Id
	@GeneratedValue
	private Long id;

	@OneToMany(mappedBy = "artist")
	private Collection<Album> albums;

	@ManyToMany
	private Collection<WildTag> wildTags;

	private String name;
	private String artistImageUrl;
	private String artistAge;
	private String recordLabel;
	private String hometown;

	public Artist(String name, String artistImageUrl, String artistAge, String recordLabel, String hometown) {
		super();
		this.name = name;
		this.artistImageUrl = artistImageUrl;
		this.artistAge = artistAge;
		this.recordLabel = recordLabel;
		this.hometown = hometown;
		this.albums = new ArrayList<>();
		this.wildTags = new ArrayList<>();
	}

	private Artist() {

	}

	public Long getId() {
		return id;
	}

	public Collection<Album> getAlbums() {
		return albums;
	}

	public String getName() {
		return name;
	}

	public String getArtistImageUrl() {
		return artistImageUrl;
	}

	public String getArtistAge() {
		return artistAge;
	}

	public String getRecordLabel() {
		return recordLabel;
	}

	public String getHometown() {
		return hometown;
	}

	public void addAlbum(Album album) {
		this.albums.add(album);
	}

	public void addWildTag(WildTag wildTag) {
		this.wildTags.add(wildTag);
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
		Artist other = (Artist) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
