package org.example.filedriveapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.filedriveapi.dto.FileRequestDto;
import org.example.filedriveapi.dto.FileResponseDto;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedriveapi.dto.ResultStatus;
import org.example.filedriveapi.service.FileService;
import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.enums.FileType;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "파일 관리 API", description = "파일 리스트 조회/업로드/삭제/저장")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileController {

    private final FileService fileService;

    // /api/file?pageNo=0&folderId=1&searchTerm=
    @Operation(summary = "전체 파일 조회")
    @GetMapping
    public ResponseEntity<ResponseDTO<Page<FileResponseDto>>> getFiles(
            @RequestParam(required = false, defaultValue = "0") int pageNo,
            @RequestParam(required = false, defaultValue = "1") int folderId,
            @RequestParam(required = false, defaultValue = "") String searchTerm
    ) {
        if (searchTerm.isEmpty()) {
            Page<FileResponseDto> files = fileService.getFiles(pageNo, folderId);
            return new ResponseEntity<>(new ResponseDTO<>(files, new ResultStatus()), HttpStatus.OK);
        } else {
            Page<FileResponseDto> files = fileService.getFiles(pageNo, folderId, searchTerm);
            return new ResponseEntity<>(new ResponseDTO<>(files, new ResultStatus()), HttpStatus.OK);
        }
    }

    // /api/file/{type}?pageNo=0
    @Operation(summary = "특정 유형 파일 조회")
    @GetMapping("/{type}")
    public ResponseEntity<ResponseDTO<Page<FileResponseDto>>> getFilesByType(
            @PathVariable String type,
            @RequestParam(required = false, defaultValue = "0") int pageNo,
            @RequestParam(required = false, defaultValue = "") String searchTerm
    ) {
        if (searchTerm.isEmpty()) {
            Page<FileResponseDto> files = fileService.getFilesByType(pageNo, type);
            return new ResponseEntity<>(new ResponseDTO<>(files, new ResultStatus()), HttpStatus.OK);
        } else {
            Page<FileResponseDto> files = fileService.getFilesByType(pageNo, type, searchTerm);
            return new ResponseEntity<>(new ResponseDTO<>(files, new ResultStatus()), HttpStatus.OK);
        }

    }

    @Operation(summary = "파일 업로드")
    @PostMapping
    public ResponseEntity<ResponseDTO<File>> save(FileRequestDto dto) {
        return new ResponseEntity<>(fileService.save(dto), HttpStatus.CREATED);
    }

    @Operation(summary = "파일 삭제")
    @DeleteMapping
    public ResponseEntity<ResponseDTO<Boolean>> delete(Integer fileId, Boolean isDelete) {
        return new ResponseEntity<>(fileService.delete(fileId, isDelete), HttpStatus.CREATED);
    }

    @Operation(summary = "파일 좋아요")
    @PostMapping("/favorite")
    public ResponseEntity<ResponseDTO<Boolean>> favorite(Integer fileId, Boolean isFavorite) {
        return new ResponseEntity<>(fileService.favorite(fileId, isFavorite), HttpStatus.CREATED);
    }

    @Operation(summary = "파일 타입 리스트")
    @GetMapping("/fileTypes")
    public ResponseEntity<ResponseDTO<List<Map<String, String>>>> getFileTypeList() {
        return new ResponseEntity<>(new ResponseDTO<>(FileType.getFileTypes(), new ResultStatus()), HttpStatus.OK);
    }

    @Operation(summary = "삭제된 파일 조회")
    @GetMapping("/trash")
    public ResponseEntity<ResponseDTO<Page<FileResponseDto>>> getTrashFiles(
            @RequestParam(required = false, defaultValue = "") String searchTerm,
            @RequestParam(required = false, defaultValue = "0") int pageNo
    ) {
        return new ResponseEntity<>(new ResponseDTO<>(fileService.getTrashFiles(searchTerm, pageNo), new ResultStatus()), HttpStatus.OK);
    }

    @Operation(summary = "좋아요한 파일 조회")
    @GetMapping("/favorite")
    public ResponseEntity<ResponseDTO<Page<FileResponseDto>>> getFavoriteFiles(
            @RequestParam(required = false, defaultValue = "") String searchTerm,
            @RequestParam(required = false, defaultValue = "0") int pageNo
    ) {
        return new ResponseEntity<>(new ResponseDTO<>(fileService.getFavoriteFiles(searchTerm, pageNo), new ResultStatus()), HttpStatus.OK);
    }
}

