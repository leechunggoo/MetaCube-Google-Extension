chrome.runtime.onMessage.addListener(function (res, sender, callback) {
    console.log('background.js')
    console.log(res)
    console.log(sender)
    console.log(callback)

    if(res==='tokenchk'){
        tokenCHK()
    }

    // chrome.runtime.sendMessage({token: res}, response => {
    //     console.log("Received response from background page:", response);
    // });

});

function functiontest(){
    return '1';
}
