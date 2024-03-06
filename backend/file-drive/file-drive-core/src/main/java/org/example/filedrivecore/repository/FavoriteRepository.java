package org.example.filedrivecore.repository;

import org.example.filedrivecore.entity.Favorite;
import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.entity.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends CrudRepository<Favorite, Long> {

    Favorite findFavoriteByMemberAndFile(Member member, File file);

}
