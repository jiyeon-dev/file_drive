package org.example.filedriverapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("org.example")
public class FileDriverApiApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(FileDriverApiApplication.class, args);
    }

}
