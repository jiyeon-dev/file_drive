package org.example.filedriverapi.security.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final CustomUserInfoDto member;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> roles = new ArrayList<>();
        roles.add(member.getRole().toString());
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return member.getMemberId().toString(); // 계정 아이디
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() { // true 면 만료되지 않은 계정
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { // true 면 잠기지 않은 계정
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { // true 면 비밀번호가 만료되지 않은 계정
        return true;
    }

    @Override
    public boolean isEnabled() { // true 면 활성화되어있는 계정
        return true;
    }
}
