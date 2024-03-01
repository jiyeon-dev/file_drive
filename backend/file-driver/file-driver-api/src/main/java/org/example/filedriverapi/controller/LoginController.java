package org.example.filedriverapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.filedriverapi.dto.ResponseDTO;
import org.example.filedriverapi.dto.ResultStatus;
import org.example.filedriverapi.security.dto.LoginRequestDto;
import org.example.filedriverapi.security.dto.RegisterRequestDto;
import org.example.filedriverapi.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "유저 인증 API", description = "로그인/회원가입/로그아웃")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class LoginController {

    private final LoginService loginService;

    @Operation(summary = "로그인")
    @PostMapping("login")
    public ResponseEntity<ResponseDTO<String>> login(@Valid @RequestBody LoginRequestDto dto) {
        try {
            String token = loginService.login(dto);
            return new ResponseEntity<>(new ResponseDTO<>(token, new ResultStatus()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseDTO<>("", new ResultStatus(Boolean.FALSE, "0", e.getMessage())), HttpStatus.OK);
        }
    }

    @Operation(summary = "회원가입")
    @PostMapping("register")
    public ResponseEntity<ResponseDTO<Void>> register(@Valid @RequestBody RegisterRequestDto dto) {
        return new ResponseEntity<>(loginService.register(dto), HttpStatus.OK);
    }

}
