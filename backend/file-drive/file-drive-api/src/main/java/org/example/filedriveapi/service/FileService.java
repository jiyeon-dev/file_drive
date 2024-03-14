package org.example.filedriveapi.service;

import org.example.filedriveapi.dto.FileRequestDto;
import org.example.filedriveapi.dto.FileResponseDto;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedrivecore.entity.File;
import org.springframework.data.domain.Page;

public interface FileService {

    ResponseDTO<File> save(FileRequestDto fileRequestDto);

    Page<FileResponseDto> getFiles(int pageNo, int folderId);

    Page<FileResponseDto> getFiles(int pageNo, int folderId, String searchTerm);

    Page<FileResponseDto> getFilesByType(int pageNo, String type);

    Page<FileResponseDto> getFilesByType(int pageNo, String type, String searchTerm);

    ResponseDTO<Boolean> delete(Integer fileId, Boolean isDelete);

    ResponseDTO<Boolean> favorite(Integer fileId, Boolean isFavorite);

    Page<FileResponseDto> getTrashFiles(String searchTerm, int pageNo);

    Page<FileResponseDto> getFavoriteFiles(String searchTerm, int pageNo);

}
