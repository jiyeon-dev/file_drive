package org.example.filedriveapi.service;

import org.example.filedriveapi.dto.JwtTokenDTO;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedriveapi.security.dto.LoginRequestDto;
import org.example.filedriveapi.security.dto.RegisterRequestDto;
import org.example.filedrivecore.entity.Member;

public interface LoginService {

    public JwtTokenDTO login(LoginRequestDto dto);

    public ResponseDTO<Void> register(RegisterRequestDto dto);

    public JwtTokenDTO newAccessToken(JwtTokenDTO dto);

    public ResponseDTO<Member> getUser();

}
