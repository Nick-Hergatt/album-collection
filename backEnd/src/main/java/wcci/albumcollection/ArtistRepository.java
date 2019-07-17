package wcci.albumcollection;

import org.springframework.data.repository.CrudRepository;

public interface ArtistRepository extends CrudRepository<Artist, Long> {
	Artist findByName(String name);
}
