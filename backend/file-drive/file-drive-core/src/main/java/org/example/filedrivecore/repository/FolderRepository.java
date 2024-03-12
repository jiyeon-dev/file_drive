package org.example.filedrivecore.repository;

import org.example.filedrivecore.entity.Folder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends CrudRepository<Folder, Integer> {

    List<Folder> findAllByParentId(Integer parent_id);

}
