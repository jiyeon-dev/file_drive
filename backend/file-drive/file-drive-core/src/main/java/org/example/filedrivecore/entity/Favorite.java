package org.example.filedrivecore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Favorite")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Favorite {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne(targetEntity = File.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "fileId")
    private File file;

}
