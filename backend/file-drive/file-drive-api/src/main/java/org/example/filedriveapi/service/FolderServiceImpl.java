package org.example.filedriveapi.service;

import lombok.RequiredArgsConstructor;
import org.example.filedrivecore.entity.Folder;
import org.example.filedrivecore.repository.FolderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FolderServiceImpl implements FolderService{

    private final FolderRepository folderRepository;

    @Override
    public Optional<Folder> getFolder(Integer folderId) {
        return folderRepository.findById(folderId);
    }

    @Override
    public List<Folder> getFolders(Integer folderId) {
        return folderRepository.findAllByParentId(folderId);
    }
}
