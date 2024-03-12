package org.example.filedriveapi.service;

import org.example.filedriveapi.dto.FolderRequestDto;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedrivecore.entity.Folder;

import java.util.List;
import java.util.Optional;

public interface FolderService {

    Optional<Folder> getFolder(Integer folderId);

    List<Folder> getFolders(Integer folderId);

    ResponseDTO<Folder> save(FolderRequestDto dto);

    ResponseDTO<Boolean> delete(Integer folderId);

}
