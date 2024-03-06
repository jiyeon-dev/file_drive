package org.example.filedrivecore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.filedrivecore.enums.FileType;
import org.hibernate.annotations.ColumnDefault;

import java.util.Date;

@EqualsAndHashCode  // Save 시 리턴
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Getter
@ToString
@Table(name = "File")
public class File {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private FileType type;

    @Column(name = "link", nullable = false)
    private String link;

    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne(targetEntity = Folder.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "folderId")
    private Folder folder;

    @ColumnDefault("false")
    @Column(name = "isDelete", nullable = false)
    private Boolean isDelete;

    @Column(name = "uploadedAt", nullable = false)
    private Date uploadedAt;

    @PrePersist
    protected void onCreate() {
        uploadedAt = new Date();
    }

}
