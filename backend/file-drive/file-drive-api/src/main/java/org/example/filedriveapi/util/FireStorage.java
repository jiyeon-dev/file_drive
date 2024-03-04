package org.example.filedriveapi.util;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Component
public class FireStorage {

    @Value("${firebase.bucket}")
    private String firebaseBucket;

    /**
     * 파일 업로드
     * @param file 파일
     * @return {String} mediaLink : 파일 URL
     * @throws IOException
     */
    public String upload(MultipartFile file) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);

        // 올리는 날짜 시간을 추가해 유니크한 파일 이름 생성
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd+HH_mm_ss") ;
        String fileName = dateFormat.format(new Date()) + " " + file.getOriginalFilename();

        InputStream content = new ByteArrayInputStream(file.getBytes());
        Blob blob = bucket.create(fileName, content, file.getContentType());
        return blob.getName();
    }

    /**
     * 파일 삭제
     * @param mediaLink 파일 URL
     * @return 성공 여부
     * @throws IOException
     */
    public Boolean delete(String mediaLink) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        return bucket.get(mediaLink).delete();
    }

}
