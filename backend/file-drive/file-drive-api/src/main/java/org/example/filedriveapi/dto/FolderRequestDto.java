package org.example.filedriveapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(title = "폴더 생성 요청 DTO")
public class FolderRequestDto {

    @Schema(name = "폴더 명")
    private String name;

    @Schema(name = "부모 폴더 Id")
    private Integer folderId;

    @Schema(name = "폴더 색상")
    private String color;

}
