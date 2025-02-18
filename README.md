# 갓생

### 📑목차<br>
- [👼🏻 갓생 소개](#user-content--갓생-소개)<br>
- [🛠 사용 기술](#user-content--사용-기술)<br>
- [👍🏻 후기](#user-content--후기)<br>
<br>
<br>
<br>

### 👼🏻 갓생 소개
갓생은 할 일, 목표, 메모를 효과적으로 관리할 수 있는 웹 애플리케이션입니다.<br>
Next.js를 기반으로 개발되었으며, react-big-calendar 라이브러리를 사용해 달력 기능을 구현하고, 상태 관리는 Redux를 활용했습니다.


1. 로그인 화면<br>
![1_로그인](https://private-user-images.githubusercontent.com/41726750/413709273-39035fc7-c62c-448f-814d-52299ab2f3f4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk4NTg0NjcsIm5iZiI6MTczOTg1ODE2NywicGF0aCI6Ii80MTcyNjc1MC80MTM3MDkyNzMtMzkwMzVmYzctYzYyYy00NDhmLTgxNGQtNTIyOTlhYjJmM2Y0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjE4VDA1NTYwN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJjMTQ1NGJjNDU3ZWYwMDQyOTIxZjI3MWQ5ODY5NmE3NmVkMTc4YWNlYTczNWYzOGFjNTQ1YjYzMjFhN2RmYmUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.YEe7BlZu4DCfdhLALCdrBvivUdWSEeenj94lhzcPcZA)<br>

2. 할 일 관리 화면<br>
![2_할 일 관리 pc](https://private-user-images.githubusercontent.com/41726750/413700067-f73ee081-34b1-4944-9e4e-bad1a1efd2b4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk4NTg0NjcsIm5iZiI6MTczOTg1ODE2NywicGF0aCI6Ii80MTcyNjc1MC80MTM3MDAwNjctZjczZWUwODEtMzRiMS00OTQ0LTllNGUtYmFkMWExZWZkMmI0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjE4VDA1NTYwN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTdmY2Y5NDFmMWU0OWVlMWFjODQyYjk4NTNmMzc4NmQyNGI0MTc0NTdjYmEzNmQyNTNiOTY1YmIyZWZiMjAzMmQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.CZaBsf51kEvINYbKfND4r0mVetZYA5I0hvY03QmA1M4)<br>

3. 목표 관리 화면<br>
![3_목표 관리 pc](https://private-user-images.githubusercontent.com/41726750/413709045-295bd4e3-36ed-43c9-9929-9671c0ead953.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk4NTg0NjcsIm5iZiI6MTczOTg1ODE2NywicGF0aCI6Ii80MTcyNjc1MC80MTM3MDkwNDUtMjk1YmQ0ZTMtMzZlZC00M2M5LTk5MjktOTY3MWMwZWFkOTUzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjE4VDA1NTYwN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQxZGU2NDUwNTFjZjdmOWFkNzUyNjk4M2FjZDI0MGJiMmEzMWQxYzQ0ZTkxYjRlYWIxNTQ1NjkxZWI5OTQ3NGEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.84vIIOUVrAJi-EQebV5msGwbYBHKKSsINQM002F2nT8)<br>

4. 메모 관리 화면<br>
![4_메모 관리 pc](https://private-user-images.githubusercontent.com/41726750/413709091-077da16a-1c4a-4682-878c-fa0a7480fc02.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk4NTg0NjcsIm5iZiI6MTczOTg1ODE2NywicGF0aCI6Ii80MTcyNjc1MC80MTM3MDkwOTEtMDc3ZGExNmEtMWM0YS00NjgyLTg3OGMtZmEwYTc0ODBmYzAyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjE4VDA1NTYwN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY5MWE2OTBkOTljYjI4YWYyNDg5ZjViNDQxZDZmMDc2NGVmZjBjNGIzZmM0ODJiOWE1MTQzZTBlOGNkY2ZlZTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.7XIm60WUvQqNohjCrJDp7ZfAP60BScmdYmjj_q_mb-Y)<br>


<br>
<br>
<br>

### 🛠 사용 기술
1. Frontend: React, Next.js<br>
2. 상태 관리: Redux<br>
3. 달력 기능: react-big-calendar<br>
4. 소셜 로그인: Kakao, Google<br>
<br>
<br>
<br>


### 👍🏻 후기
이 프로젝트를 진행하면서 Next.js를 활용한 개발 경험을 쌓을 수 있었습니다.<br>
또한, react-big-calendar를 적용하는 방법을 익히고 Redux를 활용한 상태 관리도 경험하며, 앞으로 어떻게 활용할지 감을 잡게 되었습니다.<br>
개발 과정에서 UI/UX 개선의 필요성을 많이 느꼈지만, 혼자 진행한 토이 프로젝트인 만큼 일단 마무리하는 것을 목표로 했습니다.<br>
추후 다시 프로젝트를 돌아보고, 더욱 발전시켜 나갈 계획입니다.<br>
<br>
<br>
<br>
