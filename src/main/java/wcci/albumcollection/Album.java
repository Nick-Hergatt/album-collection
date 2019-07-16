package wcci.albumcollection;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Album {
	@Id
	@GeneratedValue
	private Long Id;

	@ManyToOne
	private Artist artist;

	@OneToMany(mappedBy = "album")
	private Collection<Song> songs;

	@ManyToMany
	private Collection<WildTag> wildTags;

	private String albumTitle;
	private String albumImageUrl;
	private String recordLabel;

	public Album(String albumTitle, String albumImageUrl, String recordLabel) {
		this.albumTitle = albumTitle;
		this.albumImageUrl = albumImageUrl;
		this.recordLabel = recordLabel;
		this.songs = new ArrayList<>();
		this.wildTags = new ArrayList<>();
	}

	private Album() {
	}

	public Long getId() {
		return Id;
	}

	public Collection<Song> getSongs() {
		return songs;
	}

	public String getAlbumTitle() {
		return albumTitle;
	}

	public String getAlbumImageUrl() {
		return albumImageUrl;
	}

	public String getRecordLabel() {
		return recordLabel;
	}

	public Artist getArtist() {
		return artist;
	}

	public void addArtist(Artist artist) {
		this.artist = artist;
	}

	public void addSong(Song song) {
		this.songs.add(song);
	}

	public void addWildTag(WildTag wildTag) {
		this.wildTags.add(wildTag);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((Id == null) ? 0 : Id.hashCode());
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
		Album other = (Album) obj;
		if (Id == null) {
			if (other.Id != null)
				return false;
		} else if (!Id.equals(other.Id))
			return false;
		return true;
	}

}
