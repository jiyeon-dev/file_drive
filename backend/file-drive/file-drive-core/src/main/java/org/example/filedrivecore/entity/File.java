package org.example.filedrivecore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.filedrivecore.enums.FileType;

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

    @ManyToOne
    @JoinColumn(name = "memberId", insertable = false, updatable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "folderId", insertable = false, updatable = false)
    private Folder folder;

    @Column(name = "uploadedAt", nullable = false)
    private Date uploadedAt;

    @PrePersist
    protected void onCreate() {
        uploadedAt = new Date();
    }

}
