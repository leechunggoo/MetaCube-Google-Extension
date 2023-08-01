# MetaCube-Google-Extension

## 메타노드 차세데제품중 datacrawling을 위한 확장프로그램(chrome,Edge...)

#### 목적
고객이 요구하는 데이터를 직접선택 하여 콘텐츠정보를 수집하는 작업수행.

#### 주요파일
1. manifest : extension 의 모든설정파일
2. popup.html : 사이트화면에 추가될 extension 의 html요소
3. metacube-extension메뉴얼.pptx : 확장프로그램 사용 메뉴얼 정의서 (추가예정)
4. metacube-extension메뉴얼.pptx : 확장프로그램 xpath 추출기 사용 메뉴얼 (추가예정)
5. assets/start_injection.js : 확장프로그램 실행시 화면제어를 위한 js파일
6. assets/scraper_injection.js : 인증성공후 주요 기능을 제어하기 위한 js파일



#### manifest.json 설정
```json
{
  "manifest_version": 3, // 현재 extension 버전
  "name": "metanode-crawling-extention", //확장프로그램명 
  "description": "metanode-extention",  //부제목
  "version": "1.0.0", //확장프로그램 자제버젼
  "background": {
    "service_worker": "assets/background.js"//어느 도메인에 접근하던지 실행될 js파일 chrome browser background에 포함될 js파일
  },
  "action": {
    //브라우저 우측상단에 보여질 타이틀과 아이콘 확장프로그램 실행시 보여지게될 html 설정
    "default_title":"MetaCube-Crawling",
    "default_icon": "meta-logo.png",
    "default_popup":"popup.html"
  },
  //확장 프로그램의 lib,assets 폴더하위의 모든 resource를 모든 웹 페이지에서 사용할 수 있게 해주는설정
  "web_accessible_resources": [
    {
      "resources": ["lib/*"],
      "matches":["*://*/*"]
    },
    {
      "resources": ["assets/*"],
      "matches":["*://*/*"]
    }
  ],
  //브라우저에서 현재 탭의 content-jscript영역에 들어간다.
  "content_scripts": [
    {
      "matches": ["*://*/*"], //모든 url에 적용되는 설정
      "js": ["assets/content_script.js"],//적용될 파일 경로
      "all_frames" : false //제일 상위의 도메
    }
  ],
  //확장 프로그램이 Chrome 브라우저에서 사용할 수 있는 권한 
  //아래의 권한들이 없다면 chrome에서 확장프로그램을 차단한다.
  "permissions": [ 
    "tabs",
    "activeTab",
    "scripting",
    "cookies",
    "declarativeContent",
    "storage"
  ],
  //확장 프로그램이 특정 호스트에 액세스할 수 있는 권한
  "host_permissions": ["*://*/*"]
  
}

```

