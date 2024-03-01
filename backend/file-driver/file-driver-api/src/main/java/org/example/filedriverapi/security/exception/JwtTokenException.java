package org.example.filedriverapi.security.exception;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.util.Date;
import java.util.Map;

public class JwtTokenException extends RuntimeException {

    TOKEN_ERROR token_error;

    @Getter
    public enum TOKEN_ERROR {
        UNACCEPTED(401,"Token is null or too short"),
        BAD_TYPE(401, "Token type Bearer"),
        MALFORMED(403, "Malformed Token"),
        BAD_SIGN(403, "Bad Signatured Token"),
        UNSUPPORTED(403, "Unsupported JWT Token"),
        EXPIRED(403, "Expired Token");

        private final int status;
        private final String msg;

        TOKEN_ERROR(int status, String msg){
            this.status = status;
            this.msg = msg;
        }
    }

    public JwtTokenException(TOKEN_ERROR error){
        super(error.name());
        this.token_error = error;
    }

    @Override
    public String getMessage() {
        return "[" + token_error.getStatus() + "] " + token_error.getMsg();
    }
}
