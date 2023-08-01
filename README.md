# MetaCube-Google-Extension

## manifest : google extension 의 모든 설정들을 입력하는 파일
## popup.html : 확장프로그램 실행시 보여질 popup.html
## assets/background.js: 어느 도메인에 접근하던지 실행될 js파일 특정도메인에 있는게아닌 chrome browser에 포함되어있다고 생각하면 된다.
## assets/content_script.js : 브라우저에서 현재 탭의 document에 주입될 script.js파일
## assets/start_injection : 확장프로그램 실행시 화면제어를 위한 js파일
## assets/scraper_injection : 주요 기능제어를 위한 js파일
