# UDIGO - 이미지 분류 AI를 활용한 장소 검색 서비스

## 개요

### [배포 페이지 보기](https://udigo.netlify.app)

> 주의! 서버가 다운될 수 있으니 이미지 검색 기능은 2~3회 정도만 사용해주시기 바랍니다.

UDIGO는 이미지 분류 AI를 활용한 장소 검색 서비스입니다. 사진을 업로드하면 AI가 사진 속 장소를 추론하여 관련 장소를 지도에서 찾아줍니다.

이 프로젝트는 AI 부트캠프를 통해 처음으로 개발을 배우게 된 2021년, 제가 기획한 아이디어로 5명의 팀원과 함께 안드로이드 앱으로 출시했던 프로젝트입니다. 당시 기획과 AI 모델링을 담당하면서 제 아이디어를 서비스로 직접 구현해보고 싶은 갈망이 생겨 프론트엔드 개발자의 길을 걷게 되었습니다. 그 때 다짐했던 대로 앱의 기능을 간소화하여 간단한 웹 서비스로 구현해보았습니다.

<br />

## 로컬 실행 방법

```
$ git clone https://github.com/udi-go/UDIGO_FRONTEND.git
$ cd UDIGO_FRONTEND
$ yarn
$ yarn start
```

<br />

## 기술 스택

- Framework & Language: React, TypeScript
- Data Fetching: React Query
- State Management: Recoil
- Styling: SCSS Modules
- Storage: AWS S3
- Server: AWS EC2, Route 53, ACM

<br />

## 주요 기능 및 구현 방법

### 이미지로 장소 검색

- file input에 이미지를 업로드하면 `FileReader`를 통해 base64 string으로 변환하고 img 태그의 src 속성에 넣어 이미지 preview 기능을 구현했습니다.

- 장소 검색 버튼을 누르면 이미지에서 File 객체를 추출하여 `FormData` 형태로 서버에 POST 요청을 보내고, 서버에 올라가 있는 AI 모델이 이미지를 여러 장소 카테고리 중 하나로 분류하여 그 결과를 보내줍니다. 해당 AI 모델은 기존 프로젝트 당시 제가 훈련시킨 모델이며, [서버](https://github.com/udi-go/UDIGO_AI_SERVER)는 당시 팀원이었던 [정민채](https://github.com/Jungminchae)님이 AWS EC2에 배포하신 것을 활용했습니다.

<div align="center">
<img width="300" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/173361306-2f15b52a-1187-4750-a359-b85c80f9fdfd.gif">
</div>

### 지도 검색

- 카카오 지도 API를 활용하여 지도를 표시했습니다. React + TS 환경에서 카카오 지도를 쉽게 활용할 수 있도록 해주는 react-kakao-maps-sdk 라이브러리를 사용했습니다.

- AI가 추론한 장소를 지도에서 검색하거나 장소명을 직접 입력하여 검색할 수 있고, 카카오 로컬 API의 '키워드로 장소 검색하기'를 사용하여 검색 결과를 받아왔습니다. 요청을 보낼 때 Geolocation API로 얻은 위/경도를 함께 보내 사용자의 현 위치를 기준으로 검색 결과가 나오도록 했습니다.

- 검색 결과로 얻은 장소들을 지도 위에 마커로 표시하고, 마커를 클릭하거나 하단 장소 정보 카드의 좌우 화살표 버튼을 클릭하여 포커스를 이동할 수 있도록 구현했습니다. 이동할 때 현재 선택된 장소가 항상 지도에 보일 수 있도록 지도의 중심이 해당 장소 위치로 움직이게 설정했습니다.

<div align="center">
<img width="300" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/173361354-ffeba104-f982-4bc2-a428-ffbb0f82defd.gif">
</div>

### 반응형 디자인

- 모든 페이지에 반응형 디자인을 적용했습니다. 특히 홈 화면에는 이미지가 많기 때문에 `display: grid`를 적용하고 브라우저 폭에 따라 `grid-template-columns`를 조정하여 이미지가 균형감 있게 보일 수 있도록 했습니다.

| PC | Mobile |
| :-: | :-: |
| <img width="800" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/172040257-12e18444-adae-4399-b4f4-9490743a8e3d.jpg"> | <img width="300" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/172040258-6eb0ff8a-7f42-4508-a266-d5d7c794bd85.jpg"> |

<br />

## 어려웠던 점

### 체험용 샘플 이미지

- 사용자가 파일을 업로드하지 않고도 서비스를 쉽게 체험해볼 수 있도록 샘플 이미지를 넣어두고 해당 이미지를 클릭하면 서버에 바로 요청을 보내 장소 추론 결과를 받아오도록 구현하고 싶었습니다.

- 이 과정에서 AWS S3에 저장된 이미지를 File 객체로 변환해야 하는데, 이미지 URL로 fetch하면 CORS 에러가 나고, no-cors 모드로 fetch하면 이미지를 받아올 순 있으나 정보가 손실되어 File 객체를 만들 수가 없었습니다. 결국 이미지를 클릭하여 바로 검색하는 기능은 제외하고 샘플 이미지만 넣어두는 형태로 간소화했습니다.

- 이 부분은 이미지 파일을 클라우드 대신 프로젝트 디렉토리에 저장하고 import해서 사용하는 방식으로 업데이트하여 기능을 구현할 예정입니다.

<img width="1000" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/172040805-5c6d3c6b-7b52-4dca-a376-9f027b3fa058.jpg">

### Free Tier 서버의 한계

- AWS EC2의 Free Tier 버전은 딥러닝 모델을 돌리기엔 너무 작은 서버라서 자주 다운이 되었습니다. 그래서 개발 과정에서는 더미 데이터를 사용하여 API 요청 횟수를 최소화했습니다.

### 배포 사이트의 Mixed Content Error

- Netlify로 배포를 하면 자동으로 https 인증이 되어 http 서버로 요청을 보낼 때 mixed content error가 발생했습니다.

- 이를 해결하기 위해 도메인을 구매하고 ACM으로 인증서를 받았습니다. EC2 서버에 로드밸런서를 생성하여 443 포트를 추가해주고, Route 53으로 라우팅 설정을 해주어 https로 연결될 수 있도록 했습니다.
