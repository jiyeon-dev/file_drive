package org.example.filedriveapi.security.dto;

import lombok.*;
import org.example.filedrivecore.enums.RoleType;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserInfoDto {
    private Long memberId;

    private String email;

    private String name;

    private String password;

    private RoleType role;
}
