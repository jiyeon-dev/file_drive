package org.example.filedriveapi.service;

import org.example.filedrivecore.entity.Folder;

import java.util.List;

public interface FolderService {

    List<Folder> getFolders(Integer folderId);

}
