package org.example.filedrivecore.loader;

import lombok.RequiredArgsConstructor;
import org.example.filedrivecore.entity.Folder;
import org.example.filedrivecore.repository.FolderRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class DataLoader implements ApplicationRunner {

    private final FolderRepository folderRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        saveRootFolder();
    }


    /**
     * 루트 테이블 비어 있는 경우에만 초기 루트 폴더 생성
     */
    private void saveRootFolder() {
        // 폴더 테이블이 비었을 때만 새로 생성
        if (folderRepository.count() == 0) {
            Folder folder = new Folder();
            folder.setName("");
            folder.setParent(null);
            folderRepository.save(folder);
        }
    }

}
