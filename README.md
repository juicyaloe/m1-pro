# m1-pro

### 업비트 api를 이용한 가상화폐 거래 앱입니다.

#### 사용한 라이브러리
- @emotion/styled
- @tanstack/react-query
- jsonwebtoken
- uuid

#### 기능
- 내가 가진 가상 화폐를 보여주는 기능
- 소켓을 활용해 현재가, 호가 등을 실시간으로 받아오는 기능

#### .env.local
NEXT_PUBLIC_ACCESS_TOKEN=[업비트 access 토큰]  
NEXT_PUBLIC_SECERT_TOKEN=[업비트 secret 토큰]

을 넣어주셔야 정상적으로 작동합니다.
