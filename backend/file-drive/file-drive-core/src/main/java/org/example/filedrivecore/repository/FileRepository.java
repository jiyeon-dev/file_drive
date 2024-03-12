package org.example.filedrivecore.repository;

import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.enums.FileType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

// 레파짓토리
@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    Page<File> findAllByFolderIdAndIsDeleteFalse(Integer folder_id, Pageable pageable);

    Page<File> findByFolderIdAndNameContainingIgnoreCaseAndIsDeleteFalse(Integer folder_id, String name, Pageable pageable);

    Page<File> findAllByTypeAndIsDeleteFalse(FileType type, Pageable pageable);

    Page<File> findAllByTypeAndNameContainingIgnoreCaseAndIsDeleteFalse(FileType type, String name, Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE File f SET f.isDelete = :isDelete WHERE f.id = :fileId")
    int deleteFileById(@Param("fileId") Long fileId, @Param("isDelete") Boolean isDelete);

    @Transactional
    @Modifying
    @Query("UPDATE File f SET f.folder.id = :newFolderId WHERE f.folder.id = :folderId")
    int updateParentFolder(@Param("folderId") Integer folderId, @Param("newFolderId") Integer newFolderId);

    Page<File> findAllByIsDeleteTrue(Pageable pageable);

}
