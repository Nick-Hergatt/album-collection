package wcci.albumcollection;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Song {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne
	@JsonIgnore
	private Album album;
	
	@ManyToMany
	private Collection <WildTag> wildTags;
	
	
	private String songTitle;
	private String duration;
	private String linkUrl;
	
	
	public Song(String songTitle, String duration, String linkUrl, Album album) {
		this.songTitle = songTitle;
		this.duration = duration;
		this.linkUrl = linkUrl;
    this.album = album;
		this.wildTags = new ArrayList<>();
	}
	
	private Song() {
		
	}
	
	public Long getId() {
		return id;
	}
	public String getSongTitle() {
		return songTitle;
	}
	public String getDuration() {
		return duration;
	}
	public String getLinkUrl() {
		return linkUrl;
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
		Song other = (Song) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
