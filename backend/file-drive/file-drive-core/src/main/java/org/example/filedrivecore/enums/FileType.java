package org.example.filedrivecore.enums;

import lombok.Getter;

import java.util.*;
import java.util.stream.Collectors;

public enum FileType {
    DOCS("docs", "문서", Arrays.asList("doc", "docx")),
    PDF("pdf", "PDF", Collections.singletonList("pdf")),
    EXCEL("excel", "스프레드시트", Arrays.asList("xls", "xlsx")),
    IMAGE("image", "사진 및 이미지", Arrays.asList("jpg", "png", "gif")),
    AUDIO("audio", "오디오", Arrays.asList("mp3", "wav")),
    VIDEO("video", "비디오", Arrays.asList("mp4", "avi")),
    ZIP("zip", "보관파일", Arrays.asList("zip", "rar")),
//    UNKNOWN("unknown", "알 수 없음", Collections.emptyList())
    ;

    @Getter
    private final String id;
    private final String name;
    @Getter
    private final List<String> extensions;


    FileType(String id, String name, List<String> extensions) {
        this.id = id;
        this.name = name;
        this.extensions = extensions;
    }

    public static List<Map<String, String>> getFileTypes() {
        return Arrays.stream(FileType.values())
                .map(fileType -> {
                    Map<String, String> m = new HashMap<>();
                    m.put("id", fileType.id);
                    m.put("value", fileType.name);
                    return m;
                }).collect(Collectors.toList());
    }

    public static FileType findByExtension(String extension) {
        for (FileType fileType : values()) {
            if (fileType.getExtensions().contains(extension.toLowerCase())) {
                return fileType;
            }
        }
        return null;
    }

    public static FileType findById(String id) {
        for (FileType fileType : values()) {
            if (fileType.getId().contains(id)) {
                return fileType;
            }
        }
        return null;
    }

}
