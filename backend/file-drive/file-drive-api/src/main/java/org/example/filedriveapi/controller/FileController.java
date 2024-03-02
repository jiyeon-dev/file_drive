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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "파일 관리 API", description = "파일 리스트 조회/업로드/삭제/저장")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileController {

    private final FileService fileService;

    // /api/file?pageNo=0&folderId=1
    @Operation(summary = "전체 파일 조회")
    @GetMapping
    public ResponseEntity<ResponseDTO<List<FileResponseDto>>> getFiles(
            @RequestParam(required = false, defaultValue = "0") int pageNo,
            @RequestParam(required = false, defaultValue = "1") int folderId
    ) {
        List<FileResponseDto> files = fileService.getFiles(pageNo, folderId);
        return new ResponseEntity<>(new ResponseDTO<>(files, new ResultStatus()), HttpStatus.OK);
    }

    // /api/file/{type}?pageNo=0
    @Operation(summary = "특정 유형 파일 조회")
    @GetMapping("/{type}")
    public ResponseEntity<ResponseDTO<List<FileResponseDto>>> getFilesByType(
            @PathVariable String type,
            @RequestParam(required = false, defaultValue = "0") int pageNo
    ) {
        List<FileResponseDto> files = fileService.getFilesByType(pageNo, type);
        return new ResponseEntity<>(new ResponseDTO<>(files, new ResultStatus()), HttpStatus.OK);
    }

    @Operation(summary = "파일 업로드")
    @PostMapping
    public ResponseEntity<ResponseDTO<File>> save(FileRequestDto dto) {
        return new ResponseEntity<>(fileService.save(dto), HttpStatus.CREATED);
    }

}

