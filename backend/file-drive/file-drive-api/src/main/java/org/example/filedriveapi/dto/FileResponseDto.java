package org.example.filedriveapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.example.filedrivecore.entity.File;
import org.example.filedrivecore.entity.Member;

import java.util.Date;
import java.util.Objects;

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

    private boolean isFavorite;

    public static FileResponseDto from(File file) {
        return FileResponseDto.builder()
                .id(file.getId())
                .name(file.getName())
                .type(String.valueOf(file.getType()))
                .link(file.getLink())
                .owner(file.getMember())
                .uploadedAt(file.getUploadedAt())
                .isFavorite(true)
                .build();
    }

    public static FileResponseDto from(File file, Long memberId) {
        boolean favorite = !file.getFavorites().isEmpty() && file.getFavorites().stream().anyMatch((fav -> Objects.equals(fav.getMember().getId(), memberId)));

        return FileResponseDto.builder()
                .id(file.getId())
                .name(file.getName())
                .type(String.valueOf(file.getType()))
                .link(file.getLink())
                .owner(file.getMember())
                .uploadedAt(file.getUploadedAt())
                .isFavorite(favorite)
                .build();
    }

}
