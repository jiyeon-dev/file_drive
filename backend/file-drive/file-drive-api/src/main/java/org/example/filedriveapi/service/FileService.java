package org.example.filedriveapi.service;

import org.example.filedriveapi.dto.FileRequestDto;
import org.example.filedriveapi.dto.FileResponseDto;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedrivecore.entity.File;

import java.util.List;

public interface FileService {

    ResponseDTO<File> save(FileRequestDto fileRequestDto);

    List<FileResponseDto> getFiles(int pageNo, int folderId);

    List<FileResponseDto> getFilesByType(int pageNo, String type);

}
