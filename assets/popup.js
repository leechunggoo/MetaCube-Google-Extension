chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["lib/jquery-3.6.0.min.js"]
    })
  });

/**
* chrome.tabs.query
*
* @key active : 현재 활성화된 탭만 반환
* @key currentWindow : 현재 브라우져창에 있는 탭 반환
* @function chrome.scripting.executeScript() 접속중인 도메인의 콘텐츠스크립트 주입함수
* @key target : 탭의 ID 지정
* @key files : 활설화할 파일의경로지정
* 
*/
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    files: ["assets/start_injection.js"]
  })
});
