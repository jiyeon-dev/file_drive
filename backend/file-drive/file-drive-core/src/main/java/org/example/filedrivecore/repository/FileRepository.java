package org.example.filedrivecore.repository;

import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.enums.FileType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    Page<File> findAllByFolderId(Integer folder_id, Pageable pageable);

    Page<File> findAllByType(FileType type, Pageable pageable);

}
