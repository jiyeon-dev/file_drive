package org.example.filedriverapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Schema(title = "처리상태 정보")
@Getter @Setter @ToString
public class ResultStatus {

    @Schema(name = "에러여부(true:성공, false:오류)")
    private Boolean isSuccess;

    @Schema(name = "Custom 상태코드")
    private String resultCode;

    @Schema(name = "상태 메세지")
    private String resultMessage;

    public ResultStatus(){
        this.isSuccess = true;
        this.resultCode = "1"; //기본코드 1:성공, 0:실패, 기타 custom code 는 enum 으로 관리함.
        this.resultMessage = "성공";
    }

    public ResultStatus(boolean isSuccess, String resultCode, String resultMessage){
        this.isSuccess = isSuccess;
        this.resultCode = resultCode;
        this.resultMessage = resultMessage;
    }
}
