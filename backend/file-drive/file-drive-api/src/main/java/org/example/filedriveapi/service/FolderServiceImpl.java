package org.example.filedriveapi.service;

import lombok.RequiredArgsConstructor;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedriveapi.dto.ResultStatus;
import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.entity.Folder;
import org.example.filedrivecore.repository.FileRepository;
import org.example.filedrivecore.repository.FolderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;

    @Override
    public Optional<Folder> getFolder(Integer folderId) {
        return folderRepository.findById(folderId);
    }

    @Override
    public List<Folder> getFolders(Integer folderId) {
        return folderRepository.findAllByParentId(folderId);
    }

    @Override
    @Transactional
    public ResponseDTO<Boolean> delete(Integer folderId) {
        try {
            Optional<Folder> folderOptional = folderRepository.findById(folderId);
            if (folderOptional.isEmpty()) {
                return new ResponseDTO<>(false, new ResultStatus(Boolean.FALSE, "0", "폴더를 찾을 수 없습니다."));
            }

            Folder folder = folderOptional.get();
            for (Folder childFolder : folder.getChild()) {
                childFolder.setParent(folder.getParent());  // 삭제하려는 부모 폴더로 이동
            }
            fileRepository.updateParentFolder(folderId, folder.getParent().getId());  // 현재 폴더에 속한 파일들을 부모 폴더로 이동
            folderRepository.deleteById(folderId);  // 폴더 삭제

            return new ResponseDTO<>(true, new ResultStatus(Boolean.TRUE, "1", "폴더가 삭제되었습니다."));
        } catch (Exception e) {
            // Transaction silently rolled back because it has been marked as rollback-only 핸들링
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new ResponseDTO<>(null, new ResultStatus(Boolean.FALSE, "0", "폴더를 삭제하는 도중에 오류가 발생했습니다. \n" + e.getMessage()));
        }
    }
}
