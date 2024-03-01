package org.example.filedriverapi.service;

import org.example.filedriverapi.dto.JwtTokenDTO;
import org.example.filedriverapi.dto.ResponseDTO;
import org.example.filedriverapi.security.dto.LoginRequestDto;
import org.example.filedriverapi.security.dto.RegisterRequestDto;

public interface LoginService {

    public JwtTokenDTO login(LoginRequestDto dto);

    public ResponseDTO<Void> register(RegisterRequestDto dto);

    public JwtTokenDTO newAccessToken(JwtTokenDTO dto);

}
