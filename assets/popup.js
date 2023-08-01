// chrome.runtime.sendMessage({key: 'start_injection'}, response => {

chrome.tabs.query({ active: true, currentWindow: true },
  function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["lib/jquery-3.6.0.min.js"]
    })
  });

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    files: ["assets/start_injection.js"]
  })
});

//window.close();

//   return true;
// });





// injectJquery();
// console.log('aaaa')
// function injectJquery() {
//   let script = document.createElement("script");
//   script.src = "lib/jquery-3.6.0.min.js";
//   document.head.appendChild(script);
// console.log('11111')
//   let script2 = document.createElement("script");
//   script2.src = "assets/start_injection.js";
//   document.head.appendChild(script2);
// }
