# Must Play Game

## 프로젝트 개요

<p align="center">
  <img src="https://github.com/jspark9708/Best-README-Template/assets/55075290/1d9a323f-b9f4-458a-9f39-ae70c4a17677" width="200" height="200" alt="logo">
</p>

Must Play Game은 각 플랫폼, 콘솔 별로 '메타크리틱'에서 선정한 최고의 게임들을 소개하는 웹사이트입니다. 이 프로젝트는 게임 애호가들에게 다양하고 명작으로 손곱히는 게임을 찾아보고 서로 의견을 공유할 수 있게하기위해 시작했습니다.

[Must Play Game](https://jspark9708.github.io/)



### 사용된 프레임워크, 라이브러리

* ![React](https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react)
* ![Node.js](https://img.shields.io/badge/Node.js-444444?style=for-the-badge&logo=node.js)
* ![React-Redux.js](https://img.shields.io/badge/React--Redux-444444?style=for-the-badge&logo=redux)
* ![mui](https://img.shields.io/badge/Material--UI-444444?style=for-the-badge&logo=mui)
* ![mui](https://img.shields.io/badge/twitch--API-444444?style=for-the-badge&logo=twitch)

## 기능

1. **메인 페이지**: 애니메이션을 이용해 부드럽게 게임에 대한 정보를 제공하며,
                    실시간 데이터베이스 기반 상위 5개 유저 리뷰 게임 정보를 제공합니다.
   
2. **게임 콘솔 페이지**: 해당 콘솔에 해당하는 게임들을 Firebase Realtime DB에서 읽어와 사용자에게 보여줍니다.
                         사용자는 제목과 점수를 확인할 수 있습니다.
3. **게임 상세 정보 페이지**: DB에서 읽어온 json을 바탕으로 게임에 대한 상세 정보를 표시합니다. 사용자는 평점과 후기를 남길 수 있으며 별점은 실시간으로 반영되어 평균 점수를 볼 수 있습니다. 추가로 인증된 사용자(로그인)만 글을 작성, 삭제할 수 있습니다.



## 사용 방법

### 설치 방법

1. 리포지토리를 클론합니다.
   ```bash
   git clone https://github.com/jspark9708/must-play-game.git

2. 클라이언트 폴더로 이동해 종속성을 설치합니다.
   ```bash
   cd must-play-game
   npm install

3. 프로젝트를 실행하고 http://localhost:3000 로 접속하여 프로젝트를 확인합니다.
   ```bash
   npm start

### 웹 사이트 접속

https://jspark9708.github.io/ 에 접속합니다.


## 사용 예시

### 반응형 구현

기본적으로 PC, 모바일 화면 동시에 맞게 제작되었습니다.
동시에 가로화면 모드(landscape) 또한 지원합니다.

### 1. 메인 페이지

 - 웹 페이지에서 제공하는 대략적인 컨텐츠, 실시간 유저 리뷰를 바탕으로 상위 5개의 게임 정보를 제공합니다.

![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/b1aa46e7-fbad-4cfe-97e4-26b437827089)
![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/f1917f0b-e15e-4fb9-926f-a4c16ee5430b)


### 2. 게임 목록 페이지

 - 콘솔(PC, Playstation, Switch)에서 제공하는 게임들의 목록을 보여줍니다.

![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/1ccadff3-a799-48e7-901b-1c148b60a8f8) | ![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/056534b7-16de-45d8-a10a-e04196b7097f)
--- | ---


### 3. 상세정보 페이지

 - 게임의 상세정보 (발매 콘솔, 발매일, 게임 설명, 점수, 외부링크)와 유저들의 리뷰, 그리고 생방송중인 관련 Twitch 방송을 제공합니다.
![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/2ef6f1d4-33ce-4816-a6ba-50a6c5856761)

 - 점수를 한눈에 파악할 수 있도록 평균점수와 바 그래프 형식으로 유저 리뷰를 제공합니다.
유저 리뷰는 점수 순 정렬, 필터 기능으로 선택해 볼 수 있습니다.
![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/e456ab44-d7f6-4aff-976b-fa6a9555a014)

 - '리뷰 남기기'를 눌러 나오는 모달 리뷰창에 리뷰를 입력해 제출하면 실시간으로 리뷰 목록이 업데이트 됩니다.
 - 단, 로그인이 되어있는 상태에서만 리뷰를 남기고 삭제할 수 있습니다.

![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/ff4abfd7-7768-463e-9270-efbbfdb5d4ae) | ![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/2b987107-6e51-4290-b78a-3edea26a64b1)
--- | ---

 - 해당 게임으로 생방송 중인 Twitch 스트리머의 방송을 시청자순 상위 10개 나타냅니다.
![image](https://github.com/jspark9708/Best-README-Template/assets/55075290/e8495903-ad54-4901-bec8-998839654fcf)



## Contact

이메일 - flash246@naver.com

프로젝트 리포지토리 - [https://github.com/jspark9708/must-play-game](https://github.com/jspark9708/must-play-game)
