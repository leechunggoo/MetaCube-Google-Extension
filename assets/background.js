
console.log('aaa')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Handle the message.
    console.log('와쓰')
    console.log(request)
    console.log(sender)
    console.log(sendResponse)
            
    
});