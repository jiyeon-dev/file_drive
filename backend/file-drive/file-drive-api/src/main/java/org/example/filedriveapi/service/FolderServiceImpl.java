package org.example.filedriveapi.service;

import lombok.RequiredArgsConstructor;
import org.example.filedrivecore.entity.Folder;
import org.example.filedrivecore.repository.FolderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FolderServiceImpl implements FolderService{

    private final FolderRepository folderRepository;

    @Override
    public List<Folder> getFolders(Integer folderId) {
        return folderRepository.findAllByParentId(folderId);
    }
}
