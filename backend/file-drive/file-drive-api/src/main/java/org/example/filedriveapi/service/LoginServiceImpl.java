package org.example.filedriveapi.service;

import lombok.RequiredArgsConstructor;
import org.example.filedriveapi.dto.JwtTokenDTO;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedriveapi.dto.ResultStatus;
import org.example.filedriveapi.security.dto.CustomUserInfoDto;
import org.example.filedriveapi.security.dto.LoginRequestDto;
import org.example.filedriveapi.security.dto.RegisterRequestDto;
import org.example.filedriveapi.security.exception.JwtTokenException;
import org.example.filedriveapi.security.util.JwtUtil;
import org.example.filedrivecore.entity.Member;
import org.example.filedrivecore.enums.RoleType;
import org.example.filedrivecore.repository.MemberRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class LoginServiceImpl implements LoginService {

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final PasswordEncoder encoder;

    @Override
    public JwtTokenDTO login(LoginRequestDto dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        Member member = memberRepository.findMemberByEmail(email);

        if (member == null) {
            throw new UsernameNotFoundException("이메일이 존재하지 않습니다.");
        }

        if (!encoder.matches(password, member.getPassword())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }

        CustomUserInfoDto userInfoDto = new CustomUserInfoDto(
                member.getId(),
                member.getPassword(),
                member.getPassword(),
                member.getName(),
                member.getRole()
        );

        return JwtTokenDTO.builder()
                .accessToken(jwtUtil.generateAccessToken(userInfoDto))
                .refreshToken(jwtUtil.generateRefreshToken(userInfoDto))
                .build();
    }

    @Override
    public ResponseDTO<Void> register(RegisterRequestDto dto) {
        String encodePassword = encoder.encode(dto.getPassword());

        try {
            // 신규 유저 생성
            memberRepository.save(Member.builder()
                    .email(dto.getEmail())
                    .name(dto.getName())
                    .password(encodePassword)
                    .role(RoleType.ROLE_USER)
                    .build());
        } catch (DataIntegrityViolationException e) {
            return new ResponseDTO<>(null, new ResultStatus(Boolean.FALSE, "0", "이미 사용중인 이메일입니다."));
        }
        return new ResponseDTO<>(null, new ResultStatus(Boolean.TRUE, "1", "성공"));
    }

    @Override
    public JwtTokenDTO newAccessToken(JwtTokenDTO dto) {
        if (dto.getRefreshToken() == null || dto.getAccessToken() == null) {
            throw new JwtTokenException(JwtTokenException.TOKEN_ERROR.UNACCEPTED);
        }

        // 리프레시 토큰이 만료되었는지 체크
        String refreshToken = dto.getRefreshToken();
        if (jwtUtil.validateToken(refreshToken)) {
            // 정보 파싱
            Map<String, Object> claims = jwtUtil.parseClaims(refreshToken);
            CustomUserInfoDto customUserInfoDto = new CustomUserInfoDto();
            customUserInfoDto.setMemberId(((Integer) claims.get("memberId")).longValue());
            customUserInfoDto.setEmail((String) claims.get("email"));
            customUserInfoDto.setRole(RoleType.valueOf((String) claims.get("role")));

            // 신규 토큰 생성
            String newAccessToken = jwtUtil.generateAccessToken(customUserInfoDto);
            String newRefreshToken = jwtUtil.generateRefreshToken(customUserInfoDto);

            return JwtTokenDTO.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(newRefreshToken)
                    .build();
        }
        return null;
    }

}
