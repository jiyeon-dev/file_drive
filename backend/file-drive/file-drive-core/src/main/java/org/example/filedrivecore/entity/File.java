package org.example.filedrivecore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.filedrivecore.enums.FileType;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

    @Setter
    @ColumnDefault("false")
    @Column(name = "isDelete", nullable = false)
    private Boolean isDelete;

    @Column(name = "uploadedAt", nullable = false)
    private Date uploadedAt;

    @OneToMany(mappedBy = "file", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Favorite> favorites = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        uploadedAt = new Date();
    }

}
