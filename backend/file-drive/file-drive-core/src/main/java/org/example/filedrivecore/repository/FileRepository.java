package org.example.filedrivecore.repository;

import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.enums.FileType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    Page<File> findAllByFolderIdAndIsDeleteFalse(Integer folder_id, Pageable pageable);

    Page<File> findByFolderIdAndNameContainingIgnoreCaseAndIsDeleteFalse(Integer folder_id, String name, Pageable pageable);

    Page<File> findAllByTypeAndIsDeleteFalse(FileType type, Pageable pageable);

    Page<File> findAllByTypeAndNameContainingIgnoreCaseAndIsDeleteFalse(FileType type, String name, Pageable pageable);
}
