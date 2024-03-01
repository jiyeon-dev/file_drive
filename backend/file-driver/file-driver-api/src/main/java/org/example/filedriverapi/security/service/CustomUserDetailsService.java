package org.example.filedriverapi.security.service;

import lombok.RequiredArgsConstructor;
import org.example.filedriverapi.security.dto.CustomUserDetails;
import org.example.filedriverapi.security.dto.CustomUserInfoDto;
import org.example.filedrivercore.entity.Member;
import org.example.filedrivercore.repository.MemberRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Member member = memberRepository.findById(Long.parseLong(id))
                .orElseThrow(() -> new UsernameNotFoundException("일치하는 유저가 없습니다."));

        CustomUserInfoDto dto = mapper.map(member, CustomUserInfoDto.class);
        return new CustomUserDetails(dto);
    }
}
