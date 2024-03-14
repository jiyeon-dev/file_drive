# File drive - Backend

## 주요 라이브러리
- Java 17
- Spring Boot 3.2.3
- jpa + mysql
- Spring security
- jwt
- firebase
- Swagger(openapi)

## 모듈 구성

| 모듈 명 | 설명                                     |
| - |----------------------------------------|
| file-drive-core | jpa 관련 entity, repository              |
| file-drive-api | core 패키지를 포함하고 있음. 실질적인 REST API |

## Intellij 에서 설정

### file-drive-core
> 실행 시 Entity에 선언된 테이블이 자동으로 생성되며, Folder 테이블이 비어 있는 경우 Root Folder를 자동으로 생성되도록 선언해 둠.

1. Run/Debug Configurations 설정

| 옵션명 | 값 |
| - | - |
| Active profiles | core | 
| Environment variables | MYSQL_USERNAME=계정;MYSQL_PASSWORD=비밀번호;MYSQL_PORT=포트 |

### file-drive-api

1. Run/Debug Configurations 설정

| 옵션명 | 값 |
| - | - |
| Environment variables | MYSQL_USERNAME=계정;MYSQL_PASSWORD=비밀번호;MYSQL_PORT=포트 |

2. firebase config 설정

`/src/main/resources/config` 폴더 안에 `firebase.json` 파일 생성 후 firebase store 정보 복붙.  
관련된 firebase 버킷 정보와 config 파일 경로 관련 정보는 `application.yml`에서 변경 가능.
```yaml
firebase:
  configuration-file: config/firebase.json
  bucket: file-drive-9f1a7.appspot.com
```
