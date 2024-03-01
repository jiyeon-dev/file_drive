package org.example.filedriveapi.security.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.filedriveapi.security.dto.CustomUserInfoDto;
import org.example.filedriveapi.security.exception.JwtTokenException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;
@Slf4j
@Component
@PropertySource("classpath:application-api.yml")
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${expiration-minutes}")
    private Long expirationMinutes;
    @Value("${refresh-expiration-hours}")
    private Long refreshExpirationHours;

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    /**
     * JWT Access 토큰 생성
     */
    public String generateAccessToken(CustomUserInfoDto member) {
        // payload 부분 설정 - 토큰에 저장될 값
        Claims claims = Jwts.claims();
        claims.put("memberId", member.getMemberId());
        claims.put("email", member.getEmail());
        claims.put("role", member.getRole());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject("access_token")
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusHours(expirationMinutes).toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * JWT Refresh 토큰 생성
     */
    public String generateRefreshToken(CustomUserInfoDto member) {
        // payload 부분 설정 - 토큰에 저장될 값
        Claims claims = Jwts.claims();
        claims.put("memberId", member.getMemberId());
        claims.put("email", member.getEmail());
        claims.put("role", member.getRole());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject("refresh_token")
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusHours(refreshExpirationHours).toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Token 에서 member Id 추출
     */
    public Long getUserId(String token) {
        return parseClaims(token).get("memberId", Long.class);
    }

    /**
     * JWT 토큰 검증
     * @throws JwtException
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);  // 파싱 및 검증, 실패 시 에러
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new JwtTokenException(JwtTokenException.TOKEN_ERROR.MALFORMED);
        } catch (ExpiredJwtException e) {
            throw new JwtTokenException(JwtTokenException.TOKEN_ERROR.EXPIRED);
        } catch (UnsupportedJwtException e) {
            throw new JwtTokenException(JwtTokenException.TOKEN_ERROR.UNSUPPORTED);
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty ", e);
            throw new JwtTokenException(JwtTokenException.TOKEN_ERROR.UNACCEPTED);
        }
    }

    /**
     * 토큰에 들어있는 Claims 정보 파싱
     */
    public Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

}
