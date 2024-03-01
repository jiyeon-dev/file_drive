package org.example.filedriveapi.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@ToString
@Builder
@Data
public class JwtTokenDTO {
    public String accessToken;
    public String refreshToken;
}
