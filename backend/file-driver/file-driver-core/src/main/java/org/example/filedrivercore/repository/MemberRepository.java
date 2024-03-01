package org.example.filedrivercore.repository;

import org.example.filedrivercore.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // 이메일로 유저 검색
    Member findMemberByEmail(String email);

}
