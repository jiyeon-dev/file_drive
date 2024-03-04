package org.example.filedriveapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(title = "파일 생성 요청 DTO")
public class FileRequestDto {

    @Schema(name = "업로드 파일")
    private MultipartFile file;

    @Schema(name = "폴더 Id")
    private Integer folderId;

//    토큰에 저장되어 있으므로 굳이 필요 X
//    @Schema(name = "올린 사람 Id")
//    private Integer memberId;

}
