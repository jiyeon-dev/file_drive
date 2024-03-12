package org.example.filedriveapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.filedriveapi.dto.FileResponseDto;
import org.example.filedriveapi.dto.FolderRequestDto;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedriveapi.dto.ResultStatus;
import org.example.filedriveapi.service.FolderService;
import org.example.filedrivecore.entity.Folder;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(name = "폴더 관리 API", description = "폴더 리스트 조회/생성/삭제")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/folder")
public class FolderController {

    private final FolderService folderService;

    @Operation(summary = "폴더 정보 조회")
    @GetMapping
    public ResponseEntity<ResponseDTO<Optional<Folder>>> getFolder(
            @RequestParam(required = false, defaultValue = "1") int folderId
    ) {
        Optional<Folder> folders = folderService.getFolder(folderId);
        return new ResponseEntity<>(new ResponseDTO<>(folders, new ResultStatus()), HttpStatus.OK);
    }

    @Operation(summary = "현재 폴더에 속한 폴더 조회")
    @GetMapping("/list")
    public ResponseEntity<ResponseDTO<List<Folder>>> getFolders(
            @RequestParam(required = false, defaultValue = "1") int folderId
    ) {
        List<Folder> folders = folderService.getFolders(folderId);
        return new ResponseEntity<>(new ResponseDTO<>(folders, new ResultStatus()), HttpStatus.OK);
    }

    @Operation(summary = "폴더 생성")
    @PostMapping
    public ResponseEntity<ResponseDTO<Folder>> save(FolderRequestDto dto) {
        return new ResponseEntity<>(folderService.save(dto), HttpStatus.CREATED);
    }

    @Operation(summary = "폴더 삭제")
    @DeleteMapping
    public ResponseEntity<ResponseDTO<Boolean>> delete(
            @RequestParam(required = false, defaultValue = "1") int folderId
    ) {
        return new ResponseEntity<>(folderService.delete(folderId), HttpStatus.CREATED);
    }

}
