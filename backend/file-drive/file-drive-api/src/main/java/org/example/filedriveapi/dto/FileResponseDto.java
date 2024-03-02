package org.example.filedriveapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.entity.Member;

import java.util.Date;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(title = "파일 조회 응답 DTO")
public class FileResponseDto {

    private Long id;

    private String name;

    private String type;

    private String link;

    private Member owner;

    private Date uploadedAt;

    public static FileResponseDto from(File file) {
        return FileResponseDto.builder()
                .id(file.getId())
                .name(file.getName())
                .type(String.valueOf(file.getType()))
                .link(file.getLink())
                .owner(file.getMember())
                .uploadedAt(file.getUploadedAt())
                .build();
    }

}
