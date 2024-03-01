package org.example.filedrivecore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.filedrivecore.enums.RoleType;

@Entity
@Table(name = "Member")
@Getter
@ToString
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private RoleType role;

    @Builder
    public Member(Long id, String email, String name, String password, RoleType role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
    }

}
