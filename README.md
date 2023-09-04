# amber_road

## ✨ 개발 기간 및 인원

- 개발 기간 : 2023/07/03 ~ 2023/07/27
- 개발 인원 : 프론트엔드 2명 , 백엔드 1명

## ✨ 프로젝트 소개
고객에게 문의를 받을 contact 페이지와 사내에서 이 문의를 관리할 admin 페이지를 작업하였습니다.

## ✨ 프로젝트 영상 링크
https://www.youtube.com/watch?v=I-OuM4-yeag

## ✨ 기술 스택
### Frontend
JavaScript, Vue

## ⚙️ 협업툴

<div>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white"/>
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
</div>


## ✨ 작업 페이지 설명
1. contact page
1) 일부 radio에는 type 을 부여하고 type에 따라 다른 경고 메세지 출력함으로써 유저가 어느 부분에서 잘못된 입력을 했는지 파악하기 쉽도록 도움
2) 필수 input에는 유효성 검사를 통해 제출 불가한 경우와 가능한 경우를 구분해 다른 모달이 발생할 수 있도록 구현

2. admin popup page
1) 진행상황 변경 시 통신 및 재렌더링
2) window 와 mac 에서 다르게 동작하는 scroll UI를 크로스 체크하여 작업 진행함으로써 동일하게 작동 할 수 있도록 구현
3) 라이브러리 활용 : date picker, calendar
4) 업무 추가 시 새로운 업무 테이블 생성 구현 및 각각의 스케줄링이 가능하도록 캘린더 커스터마이징하여 각 업무를 파악하고 정리하기 쉽도록 구현
5) 각각의 업무 테이블은 각각의 comment 작성이 가능하도록 하여 업무와 관련된 메모가 가능하도록 구현
6) 팝업페이지에서 나올 경우 자동으로 admin 페이지 재렌더링

