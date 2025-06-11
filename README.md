# Software-Design-Project

# SafeSurfing 프로젝트 테스트 안내

이 프로젝트는 **웹사이트 URL의 안전성을 검사**하는 모바일 보안 앱입니다.
압축 파일로 배포되며, 테스트 목적상 API Key 등 필요한 정보가 포함되어 있습니다.

---

## 1. 압축 파일에 포함된 주요 파일

- **safe-surfing-backend/**
    - Django 백엔드 소스코드
    - requirements.txt (**필수 패키지 목록**)
    - .env (**API Key 포함**)
- **safe-surfing-frontend/**
    - React Native(또는 Expo) 프론트엔드 소스코드
    - package.json
- **README.md** (해당 안내문)

---

## 2. 테스트 환경 준비

- **운영체제:** Windows 10+, macOS 11+, Linux(Ubuntu 20.04+)
- **Python:** 3.9 이상 (백엔드용)
- **Node.js:** 16 이상 (프론트엔드용)
- **npm/yarn:** 최신 버전
- **Google Safe Browsing API Key** (이미 .env에 포함)
- **(선택) VirusTotal API Key** (이미 .env에 포함)
- **Android Studio/에뮬레이터**
- **아래 링크 참고하여 설치 및 환경 구성**
- **Android Emulator, Development build 선택**
https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build

- **안정적인 인터넷 연결** (외부 API 연동 필수)

---

## 3. 가상환경(venv) 관련 안내

- **윈도우 환경에서는 기존 가상환경 삭제 및 새로 가상환경을 만들고 requirements.txt로 패키지를 설치해야 합니다.**

---

## 4. 백엔드 실행 방법

```bash
cd safe-surfing-backend

# 1. 새 가상환경 생성
python -m venv venv

# 2. 가상환경 활성화
#   (Windows)
venv\Scripts\activate
#   (macOS/Linux)
source venv/bin/activate

# 3. 패키지 설치
pip install -r requirements.txt

# 4. 마이그레이션 및 서버 실행
python manage.py migrate
python manage.py runserver
```


---

## 5. 프론트엔드 실행 방법

```bash
cd safe-surfing
npm install
npx expo start --android
```


---

## 6. 실행 전 반드시 확인할 것

- **.env 파일**이 백엔드 루트(safe-surfing-backend/.env)에 존재해야 하며,
Google Safe Browsing API Key, (선택) VirusTotal API Key가 포함되어 있어야 합니다.
- **API_BASE 주소**: 프론트엔드에서 백엔드 서버의 IP/포트가 맞게 설정되어야 합니다
(에뮬레이터: `10.0.2.2:8000`, 실기기: PC의 실제 IP)
- **CORS 설정**: 백엔드 settings.py에서 CORS가 허용되어야 합니다.
- **requirements.txt**가 반드시 포함되어 있어야 하며, 새 가상환경에서 pip로 설치해야 합니다.

---

## 7. 테스트 시 주의사항

- **API Key가 노출되어 있으므로, 테스트 외 목적(공개 저장소 업로드 등)으로 사용하지 마세요.**
- **외부 API 쿼터 제한**: 무료 API Key는 일일 사용량이 제한될 수 있습니다.
- **네트워크 환경**: 백엔드와 프론트엔드가 같은 네트워크에 있어야 통신이 원활합니다.
- **에뮬레이터/실기기 환경**: API_BASE 주소를 반드시 환경에 맞게 수정하세요.
- **데이터 초기화, 삭제 등 위험 기능은 테스트용으로만 사용하세요.**

---

## 8. 주요 테스트 시나리오

- URL 입력 후 검사/등록 버튼 동작 확인
- 위험/안전 URL 판별 결과 확인
- URL 관리 페이지에서 목록, 재검사, 삭제 기능 확인
- 설정 페이지에서 알림, 자동저장, 데이터 초기화 기능 확인

---

## 9. 테스트를 위한 URL
### 위험 URL
- https://testsafebrowsing.appspot.com/s/malware.html
- https://testsafebrowsing.appspot.com/s/phishing.html