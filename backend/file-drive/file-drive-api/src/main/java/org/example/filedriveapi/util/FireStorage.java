package org.example.filedriveapi.util;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

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
        InputStream content = new ByteArrayInputStream(file.getBytes());
        Blob blob = bucket.create(file.getName(), content, file.getContentType());
        return blob.getMediaLink();
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
