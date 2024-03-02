package org.example.filedriveapi.service;

import lombok.RequiredArgsConstructor;
import org.example.filedriveapi.dto.FileRequestDto;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedriveapi.dto.ResultStatus;
import org.example.filedriveapi.util.FireStorage;
import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.entity.Folder;
import org.example.filedrivecore.entity.Member;
import org.example.filedrivecore.enums.FileType;
import org.springframework.transaction.annotation.Transactional;
import org.example.filedriveapi.dto.FileResponseDto;
import org.example.filedrivecore.repository.FileRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;
    private final FireStorage fireStorage;

    private static final Integer PAGE_SIZE = 10;

    @Override
    @Transactional
    public ResponseDTO<File> save(FileRequestDto fileRequestDto) {
        MultipartFile file = fileRequestDto.getFile();
        if (file.isEmpty()) return new ResponseDTO<>(null, new ResultStatus(Boolean.FALSE, "0", "파일을 찾을 수 없습니다."));
        try {
            String mediaLink = fireStorage.upload(file);
            File newFile = fileRepository.save(dtoToEntity(fileRequestDto, mediaLink));
            return new ResponseDTO<>(newFile, new ResultStatus(Boolean.TRUE, "1", "성공"));
        } catch (IOException e) {
            return new ResponseDTO<>(null, new ResultStatus(Boolean.FALSE, "0", "파일을 올리는 도중에 오류가 발생했습니다. \n" + e.getMessage()));
        }
    }

    @Transactional(readOnly = true)
    @Override
    public List<FileResponseDto> getFiles(int pageNo, int folderId) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by("updatedAt").descending());
        return fileRepository.findAllByFolderId(0, pageable).map(FileResponseDto::from).getContent();
    }

    @Transactional(readOnly = true)
    @Override
    public List<FileResponseDto> getFilesByType(int pageNo, String type) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by("updatedAt").descending());
        return fileRepository.findAllByType(FileType.valueOf(type), pageable).map(FileResponseDto::from).getContent();
    }

    private File dtoToEntity(FileRequestDto dto, String mediaLink) {
        MultipartFile file = dto.getFile();
        if (file.getOriginalFilename() == null) {
            throw new IllegalArgumentException("파일 이름을 찾을 수 없습니다.");
        }

        String fileName = file.getOriginalFilename();
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        Long memberId = Long.valueOf(dto.getMemberId());
        Integer folderId = dto.getFolderId();

        return File.builder()
                .name(fileName)
                .member(Member.builder().id(memberId).build())
                .link(mediaLink)
                .folder(Folder.builder().id(folderId).build())
                .type(FileType.findByExtension(ext))
                .build();
    }

}