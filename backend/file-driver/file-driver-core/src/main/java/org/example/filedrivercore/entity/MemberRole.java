package org.example.filedrivercore.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.filedrivercore.enums.RoleType;

@Entity
@NoArgsConstructor
@Getter
public class MemberRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Builder
    public MemberRole(Long id, Member member, RoleType roleType) {
        this.id = id;
        this.member = member;
        this.roleType = roleType;
    }
}