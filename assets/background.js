chrome.runtime.onMessage.addListener(function (res, sender, callback) {
  //console.log(res)
  //console.log(chrome.tab)
  //console.log(sender)
  
  
  var idvalue;
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      idvalue = tabs[0].id;
  });
  console.log(chrome.tabs)
  
  


      // start_injection.js 최하단에서 호출
      // jquery 로드

});
  