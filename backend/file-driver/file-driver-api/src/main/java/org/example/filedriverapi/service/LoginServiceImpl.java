package org.example.filedriverapi.service;

import lombok.RequiredArgsConstructor;
import org.example.filedriverapi.dto.ResponseDTO;
import org.example.filedriverapi.dto.ResultStatus;
import org.example.filedriverapi.security.dto.CustomUserInfoDto;
import org.example.filedriverapi.security.dto.LoginRequestDto;
import org.example.filedriverapi.security.dto.RegisterRequestDto;
import org.example.filedriverapi.security.util.JwtUtil;
import org.example.filedrivercore.entity.Member;
import org.example.filedrivercore.enums.RoleType;
import org.example.filedrivercore.repository.MemberRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LoginServiceImpl implements LoginService {

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final PasswordEncoder encoder;

    @Override
    public String login(LoginRequestDto dto) {
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

        return jwtUtil.generateToken(userInfoDto);
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

}
