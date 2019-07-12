package wcci.albumcollection;

import org.springframework.data.repository.CrudRepository;

public interface WildTagRepository extends CrudRepository<WildTag,Long>{
WildTag findByTagName(String tagName);
}