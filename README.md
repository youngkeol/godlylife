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
![1_로그인](https://private-user-images.githubusercontent.com/41726750/414840191-5d1d7ddb-5066-4343-90fe-651cb7e4695a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk5ODc2NTAsIm5iZiI6MTczOTk4NzM1MCwicGF0aCI6Ii80MTcyNjc1MC80MTQ4NDAxOTEtNWQxZDdkZGItNTA2Ni00MzQzLTkwZmUtNjUxY2I3ZTQ2OTVhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjE5VDE3NDkxMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVmM2I4NGUxYTVjYTA4MjkzMDU2OGMyYzk5Y2FkYTM3MjlkNjExMmRhMDBkNjBlN2ViMTM3Mzk2NWNmYmQ5ODcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.4AqwSyWNtEpVjZwWhiJYnZj2SW002GLW7_QslN35glQ)<br>

2. 할 일 관리 화면<br>
![2_할 일 관리 pc](https://private-user-images.githubusercontent.com/41726750/414840219-af482112-6406-4e26-ac80-543553d5a84b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk5ODc2NTAsIm5iZiI6MTczOTk4NzM1MCwicGF0aCI6Ii80MTcyNjc1MC80MTQ4NDAyMTktYWY0ODIxMTItNjQwNi00ZTI2LWFjODAtNTQzNTUzZDVhODRiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjE5VDE3NDkxMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTM0OGE1NGFiMzY1MTUzMmEzMWFmYmQ5NzMxMWEwYjlhZjUwNTA3MDc5YzJmMGY5NDI1YTg3NjNmY2UzMjhhOTMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.mvxql17rpgdv_8JCX3ZkUjnBSmn1YgRziG250wr9kFo)<br>

3. 목표 관리 화면<br>
![3_목표 관리 pc](https://private-user-images.githubusercontent.com/41726750/414840231-82f5eda9-72c9-4b1c-8527-59841273842f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk5ODc2NTAsIm5iZiI6MTczOTk4NzM1MCwicGF0aCI6Ii80MTcyNjc1MC80MTQ4NDAyMzEtODJmNWVkYTktNzJjOS00YjFjLTg1MjctNTk4NDEyNzM4NDJmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjE5VDE3NDkxMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTczYjk5NDA5ODZmNzAxMGRhNmJjZTlkYmFmNmQ0MTM4ZjYzMmJiODFiYWI1M2I0ZGY3YzEwN2MyYjJhZDM5YjAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.snXz4m92Gek7x2gAUON6HoQWLMGymx4s70j8OVhtvLw)<br>

4. 메모 관리 화면<br>
![4_메모 관리 pc](https://private-user-images.githubusercontent.com/41726750/414840234-c6622f7b-e4ad-4974-99c0-87b63a08b51a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk5ODc2NTAsIm5iZiI6MTczOTk4NzM1MCwicGF0aCI6Ii80MTcyNjc1MC80MTQ4NDAyMzQtYzY2MjJmN2ItZTRhZC00OTc0LTk5YzAtODdiNjNhMDhiNTFhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjE5VDE3NDkxMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBlMGJiMTVhNjk5M2NjMWY4YmMwNTU0MDZlMzVjZTY1YjZjMTVjYzkzYmNhNjI1N2NkODdkMGJiZWI2MWQ0MzEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.kmMgQtiJbJLT14GcM0hMF0vFvN_gE6XnukEQaUO-0A0)<br>


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
