let casdasd;
let i = 1;


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Handle the message.
    console.log('와쓰')
    i++
        console.log(i)
        
    

    // sendResponse({
    //   success: true,
    //   message: "Hello, world!"
    // });

});