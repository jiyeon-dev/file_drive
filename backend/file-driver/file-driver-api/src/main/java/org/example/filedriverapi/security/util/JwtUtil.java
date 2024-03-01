package org.example.filedriverapi.security.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.example.filedriverapi.security.dto.CustomUserInfoDto;
import org.example.filedriverapi.security.exception.AccessTokenException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;
@Slf4j
@Component
public class JwtUtil {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final static long exp = 60 * 24;  // 만료 1일

    /**
     * JWT 토큰 생성
     * @param member
     * @return JWT String
     */
    public String generateToken(CustomUserInfoDto member) {
        // payload 부분 설정 - 토큰에 저장될 값
        Claims claims = Jwts.claims();
        claims.put("memberId", member.getMemberId());
        claims.put("email", member.getEmail());
        claims.put("role", member.getRole());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(exp).toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }



    /**
     * Token 에서 member Id 추출
     * @param token
     * @return
     */
    public Long getUserId(String token) {
        return parseClaims(token).get("memberId", Long.class);
    }

    /**
     * JWT 토큰 검증
     * @param token
     * @return
     * @throws JwtException
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);  // 파싱 및 검증, 실패 시 에러
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.MALFORM);
        } catch (ExpiredJwtException e) {
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.EXPIRED);
        } catch (UnsupportedJwtException e) {
            throw new AccessTokenException(AccessTokenException.TOKEN_ERROR.UNSUPPORTED);
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty ", e);
        }
        return false;
    }

    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

}
