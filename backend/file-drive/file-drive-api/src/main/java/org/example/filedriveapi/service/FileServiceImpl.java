package org.example.filedriveapi.service;

import lombok.RequiredArgsConstructor;
import org.example.filedriveapi.dto.FileRequestDto;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedriveapi.dto.ResultStatus;
import org.example.filedriveapi.security.util.JwtUtil;
import org.example.filedriveapi.util.FireStorage;
import org.example.filedrivecore.entity.Favorite;
import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.entity.Folder;
import org.example.filedrivecore.entity.Member;
import org.example.filedrivecore.enums.FileType;
import org.example.filedrivecore.repository.FavoriteRepository;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.example.filedriveapi.dto.FileResponseDto;
import org.example.filedrivecore.repository.FileRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;
    private final FavoriteRepository favoriteRepository;
    private final FireStorage fireStorage;

    private static final Integer PAGE_SIZE = 10;

    @Override
    @Transactional
    public ResponseDTO<File> save(FileRequestDto fileRequestDto) {
        MultipartFile file = fileRequestDto.getFile();
        if (file.isEmpty()) return new ResponseDTO<>(null, new ResultStatus(Boolean.FALSE, "0", "파일을 찾을 수 없습니다."));
        try {
            String filePath = fireStorage.upload(file);
            File newFile = fileRepository.save(dtoToEntity(fileRequestDto, filePath));
            return new ResponseDTO<>(newFile, new ResultStatus(Boolean.TRUE, "1", "성공"));
        } catch (Exception e) {
            // Transaction silently rolled back because it has been marked as rollback-only 핸들링
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new ResponseDTO<>(null, new ResultStatus(Boolean.FALSE, "0", "파일을 올리는 도중에 오류가 발생했습니다. \n" + e.getMessage()));
        }
    }

    @Transactional(readOnly = true)
    @Override
    public Page<FileResponseDto> getFiles(int pageNo, int folderId) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by("uploadedAt").descending());
        return fileRepository.findAllByFolderIdAndIsDeleteFalse(folderId, pageable).map(FileResponseDto::from);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<FileResponseDto> getFiles(int pageNo, int folderId, String searchTerm) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by("uploadedAt").descending());
        return fileRepository.findByFolderIdAndNameContainingIgnoreCaseAndIsDeleteFalse(folderId, searchTerm, pageable).map(FileResponseDto::from);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<FileResponseDto> getFilesByType(int pageNo, String type) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by("uploadedAt").descending());
        return fileRepository.findAllByTypeAndIsDeleteFalse(FileType.findById(type), pageable).map(FileResponseDto::from);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<FileResponseDto> getFilesByType(int pageNo, String type, String searchTerm) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by("uploadedAt").descending());
        return fileRepository.findAllByTypeAndNameContainingIgnoreCaseAndIsDeleteFalse(FileType.findById(type), searchTerm, pageable).map(FileResponseDto::from);
    }

    @Override
    @Transactional
    public ResponseDTO<Boolean> delete(Integer fileId, Boolean isDelete) {
        try {
            Optional<File> fileOptional = fileRepository.findById(Long.valueOf(fileId));
            if (fileOptional.isEmpty()) {
                return new ResponseDTO<>(false, new ResultStatus(Boolean.FALSE, "0", "파일을 찾을 수 없습니다."));
            } else {
                File file = fileOptional.get();
                fileRepository.deleteFileById(file.getId(), isDelete);
            }
            return new ResponseDTO<>(true, new ResultStatus(Boolean.TRUE, "1", "파일이 삭제되었습니다."));
        } catch (Exception e) {
            // Transaction silently rolled back because it has been marked as rollback-only 핸들링
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new ResponseDTO<>(null, new ResultStatus(Boolean.FALSE, "0", "파일을 삭제하는 도중에 오류가 발생했습니다. \n" + e.getMessage()));
        }
    }

    @Override
    @Transactional
    public ResponseDTO<Boolean> favorite(Integer fileId, Boolean isFavorite) {
        try {
            Long memberId = Long.valueOf(JwtUtil.getMemberId());
            Member member = Member.builder().id(memberId).build();
            File file = File.builder().id(Long.valueOf(fileId)).build();
            if (isFavorite) {
                Favorite favorite = Favorite.builder().member(member).file(file).build();
                favoriteRepository.save(favorite);
                return new ResponseDTO<>(true, new ResultStatus(Boolean.TRUE, "1", "파일이 (좋아요) 변경되었습니다."));
            } else {
                Favorite favorite = favoriteRepository.findFavoriteByMemberAndFile(member, file);
                favoriteRepository.delete(favorite);
                return new ResponseDTO<>(true, new ResultStatus(Boolean.TRUE, "1", "파일이 (싫어요) 변경되었습니다."));
            }
        } catch (Exception e) {
            // Transaction silently rolled back because it has been marked as rollback-only 핸들링
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new ResponseDTO<>(null, new ResultStatus(Boolean.FALSE, "0", "파일을 (좋아요) 변경하는 도중에 오류가 발생했습니다. \n" + e.getMessage()));
        }
    }

    private File dtoToEntity(FileRequestDto dto, String mediaLink) {
        MultipartFile file = dto.getFile();
        if (file.getOriginalFilename() == null) {
            throw new IllegalArgumentException("파일 이름을 찾을 수 없습니다.");
        }

        String fileName = file.getOriginalFilename();
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

        Long memberId = Long.valueOf(JwtUtil.getMemberId());
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
