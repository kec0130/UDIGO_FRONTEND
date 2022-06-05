# 원티드 프리온보딩 개인 과제 - UDIGO

## 실행 방법
### <a href="https://udigo.netlify.app">배포 페이지 보기</a>
### 로컬에서 실행

```
$ git clone https://github.com/udi-go/UDIGO_FRONTEND.git
$ yarn
$ yarn start
```

## 과제 설명
UDIGO는 이미지 분류 AI를 활용한 장소 검색 서비스입니다. 사진을 업로드하면 AI가 사진 속 장소를 추론해주고, 해당 장소를 지도에서 찾아줍니다. 

이 프로젝트는 AI 부트캠프를 통해 처음으로 개발을 배우게 된 2021년, 제가 기획한 아이디어로 5명의 팀원과 함께 안드로이드 앱으로 출시했습니다. 당시에는 기획과 AI 모델링을 담당했지만, 이후 제 아이디어를 직접 구현해보고 싶은 갈망이 있어 프론트엔드 개발자의 길을 걷게 되었습니다. 이번 프리온보딩 코스의 마지막 과제를 통해 초심으로 돌아가고자, 제가 프론트엔드 개발자가 되기로 결심하게 해준 프로젝트를 직접 개발해보았습니다.

<img width="1000" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/172040259-3ad2c69e-87a3-4664-a1cb-6362069cbe52.jpg">


## 기술 스택
- Frontend: React, TypeScript
- State Management: Recoil
- Style: Sass
- Storage: AWS S3
- API: Kakao Map API


## 주요 기능
### 이미지로 장소 검색
- file input에 이미지를 업로드하면 서버에 보낼 File 객체를 상태관리로 저장해두었습니다. 그리고 이미지 preview 기능을 구현하기 위해 `FileReader`로 base64 string을 만들어 img 태그의 src 속성에 넣었습니다.

- 장소 검색 버튼을 이미지에서 얻은 File 객체를 `FormData` 형태로 서버에 보내고, 서버에 올라가 있는 AI 모델이 이미지 분류 결과를 보내줍니다. 해당 AI 모델은 기존 프로젝트 당시 제가 훈련시킨 모델이며, [서버](https://github.com/udi-go/UDIGO_AI_SERVER)는 당시 팀원이었던 [JungMinChae](https://github.com/Jungminchae)님이 AWS EC2에 배포하신 것을 활용했습니다.


### 지도 검색
- 카카오 지도 API를 활용하여 지도를 표시했습니다.

- 카카오 로컬의 키워드로 장소 검색하기 API를 통해 AI가 추론한 장소를 키워드로 지도에서 검색했습니다. 요청을 보낼 때 Geolocation으로 얻은 위/경도를 함께 보내 사용자의 현 위치를 기준으로 검색 결과가 나오도록 했습니다.

- 검색 결과로 얻은 장소들을 지도 위에 마커로 표시하고, 마커를 클릭하거나 하단 장소 정보 카드의 좌우 이동 버튼을 클릭했을 때 현재 선택된 장소가 항상 지도에 보일 수 있도록 지도의 중심을 해당 장소 위치로 이동시켰습니다.


### 반응형 디자인
- 모든 페이지에 반응형 디자인을 적용했습니다. 특히 홈 화면에는 이미지가 많은데, `display: grid`를 적용하고 브라우저 폭에 따라 `grid-template-columns`를 조정하여 이미지가 균형감 있게 보여질 수 있도록 했습니다.

| PC | Mobile |
|:--:|:--:|
| <img width="800" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/172040257-12e18444-adae-4399-b4f4-9490743a8e3d.jpg"> | <img width="300" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/172040258-6eb0ff8a-7f42-4508-a266-d5d7c794bd85.jpg">|


## 어려웠던 점
### 체험용 샘플 이미지 넣기
- 사용자가 파일을 업로드하지 않고도 서비스를 쉽게 체험해볼 수 있도록 하고 싶었습니다. 그래서 아래와 같이 샘플 이미지를 넣어두고 해당 이미지를 클릭하면 AI 서버에 바로 요청을 보내 장소 추론 결과를 받아오도록 구현하려 했습니다.
- 이 과정에서 AWS S3에 저장된 이미지를 File 객체로 변환해야 하는데, 이미지 URL로 fetch를 하면 CORS 에러가 나고, no-cors 모드로 fetch를 하면 이미지를 받아올 순 있으나 정보가 손실되어 File 객체로 변환을 할 수가 없었습니다. 결국 이미지를 클릭하여 바로 검색하는 기능은 제외하고 샘플 이미지만 넣어두는 형태로 간소화했지만, 추후에 해당 기능을 추가할 예정입니다.

<img width="1000" alt="스크린샷" src="https://user-images.githubusercontent.com/77032760/172040805-5c6d3c6b-7b52-4dca-a376-9f027b3fa058.jpg">
