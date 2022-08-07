# 2021 여름방학 AL林 AtCoder Event Scoreboard
2021 여름방학 AL林에서 사용된 스코어보드 시스템입니다.

`docker compose`를 이용하여 임의의 서버 환경에서 deploy 가능합니다.

아래와 같이 `compose.yml`을 생성하고 서버를 실행하세요.

```sh
python3 generate-compose.py
sudo docker compose up -d
```

## 상단: 참가 횟수 / Performance 순위
![참가 횟수 / Performance 순위](/images/top.png)

## 하단: 개별 참가 기록
![개별 참가 기록](/images/bottom.png)

## 관리자: 이벤트 정보 관리
![이벤트 정보 관리](/images/admin.png)