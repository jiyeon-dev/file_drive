package org.example.filedriveapi.security.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(title = "회원가입 요청 DTO")
public class RegisterRequestDto {

    @NotNull(message = "이메일 입력은 필수입니다.")
    @Email
    private String email;

    @NotNull(message = "이름 입력은 필수입니다.")
    private String name;

    @NotNull(message = "패스워드 입력은 필수입니다.")
    @Min(value = 6, message = "6자 이상 입력해주세요.")
    private String password;

    @Builder
    public RegisterRequestDto(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

}
