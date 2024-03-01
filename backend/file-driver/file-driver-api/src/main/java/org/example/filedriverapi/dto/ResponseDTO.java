package org.example.filedriverapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Schema(title = "Response 데이터 전송 DTO")
@Data
public class ResponseDTO<T> {
    private T resultData;

    @Schema(name = "전송상태 코드")
    private ResultStatus resultStatus;

    public ResponseDTO(T t, ResultStatus resultStatus) {
        this.resultData = t;
        this.resultStatus = resultStatus;
    }

    public ResponseDTO(HttpStatus httpStatus){
        this.resultData = null;
        this.resultStatus = new ResultStatus();
    }

}
