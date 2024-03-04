package org.example.filedriveapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.filedriveapi.dto.ResponseDTO;
import org.example.filedriveapi.dto.ResultStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "테스트 API")
@RestController
@RequestMapping("/api")
public class BaseController {

    @Operation(summary = "테스트")
    @GetMapping("test")
    public ResponseEntity<ResponseDTO<String>> myTest() {
        System.out.println("test");
        return new ResponseEntity<>(new ResponseDTO<>("Success", new ResultStatus()), HttpStatus.OK);
    }

}
