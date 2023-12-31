IP_CONFIG = 'http://localhost:8080'

let salesLogo;
let stepform;
let step01Div;

let metaonbtn = document.createElement('button')

metaonbtn.setAttribute('id','metaonbtn01')
metaonbtn.innerText = "metaon+"
metaonbtn.style.width ='80px';
metaonbtn.style.height = "80px";
metaonbtn.style.backgroundColor = "#24adec";
metaonbtn.style.textAlign='center';
metaonbtn.style.borderRadius='100%';
metaonbtn.style.position='fixed';
metaonbtn.style.bottom='10px';
metaonbtn.style.right='10px';
metaonbtn.style.color='#FFF !important;';
metaonbtn.style.padding='0';
metaonbtn.style.lineHeight='1.2';
metaonbtn.style.fontSize='medium';
metaonbtn.style.cursor='pointer';
metaonbtn.style.zIndex='9999';



$('body').append(metaonbtn);

const loginForm = (e) => {
    e.preventDefault(); //기본동작방지

    let htmlTag = $('html')
    htmlTag.css('height', "100%")

    let showTotalCount = 0
    let htmlBody = $('body').children()
    let crtagLeft = document.createElement('crtag');
    crtagLeft.setAttribute('class', 'temp-left');

    $('body').prepend(crtagLeft)

    for (let i = 0; i < htmlBody.length; i++) {
        crtagLeft.append(htmlBody[i])
    }

    let crtagRight = document.createElement('crtag')
    crtagRight.setAttribute('class', 'temp-right')
    $('body').append(crtagRight)

    $('body').css('display', 'flex')

    $('.temp-left').css('width', '80%')
    $('.temp-left').css('height', '100%')
    $('.temp-left').css('z-index', '1')

    $('.temp-right').css('border-color','#6b7280')
    $('.temp-right').css('background-color', '#E7E9EB')
    $('.temp-right').css('border', '1px')
    $('.temp-right').css('width', '370px')
    $('.temp-right').css('z-index', '101')
    $('.temp-right').css('height', '100vh')
    $('.temp-right').css('position', 'fixed')
    $('.temp-right').css('right', '0')


    salesLogo = document.createElement("img")
    // salesLogo.src = "icon.png";
    // salesLogo.src = chrome.runtime.getURL("lib/meta-logo.png");
    salesLogo.style.display = 'block'
    salesLogo.style.marginLeft = '20px'
    salesLogo.style.padding = '0px 25px 25px'
    salesLogo.style.width = '83%'
    crtagRight.append(salesLogo)

    step01Div = document.createElement('div')
    step01Div.style.marginLeft = '20px'
    step01Div.style.padding = '0 25px 25px'
    crtagRight.append(step01Div)

    stepform = document.createElement('form')
    stepform.setAttribute('id', "loginrequest")
    step01Div.append(stepform)

    let crawlingUserIdSpanStep01 = document.createElement('span')
    crawlingUserIdSpanStep01.innerHTML = 'email'
    //crawlingUserIdSpanStep01.style.color = '#fff'
    crawlingUserIdSpanStep01.style.fontSize = '13px'
    crawlingUserIdSpanStep01.style.marginBottom = '5px'
    crawlingUserIdSpanStep01.style.fontWeight = '600'
    crawlingUserIdSpanStep01.style.display = 'block'
    stepform.append(crawlingUserIdSpanStep01)

    let crawlingUserIdInputStep01 = document.createElement('input')
    crawlingUserIdInputStep01.setAttribute('id', 'crawlinguserEmail')
    crawlingUserIdInputStep01.setAttribute('name', 'loginId')
    crawlingUserIdInputStep01.setAttribute('type', 'email')
    crawlingUserIdInputStep01.placeholder = 'E-mail을 입력하세요'
    crawlingUserIdInputStep01.style.padding = '0 7px'
    crawlingUserIdInputStep01.style.height = '32px'
    crawlingUserIdInputStep01.style.border = '#c4ccdd 1px solid'
    crawlingUserIdInputStep01.style.borderRadius = '0'
    crawlingUserIdInputStep01.style.color = '#000'
    crawlingUserIdInputStep01.style.backgroundColor = '#c4ccdd'
    crawlingUserIdInputStep01.style.fontWeight = '500'
    crawlingUserIdInputStep01.style.fontSize = '13px'
    crawlingUserIdInputStep01.style.display = 'block'
    crawlingUserIdInputStep01.style.fontSize = '100%'
    crawlingUserIdInputStep01.style.outline = 'none'
    crawlingUserIdInputStep01.style.width = '90%'
    crawlingUserIdInputStep01.style.placeHolder = 'ex.. 74'
    stepform.append(crawlingUserIdInputStep01)

    let crawlinguserPasswordSpanStep01 = document.createElement('span')
    crawlinguserPasswordSpanStep01.innerHTML = 'Password'
    //crawlinguserPasswordSpanStep01.style.color = '#fff'
    crawlinguserPasswordSpanStep01.style.fontSize = '13px'
    crawlinguserPasswordSpanStep01.style.marginBottom = '5px'
    crawlinguserPasswordSpanStep01.style.fontWeight = '600'
    crawlinguserPasswordSpanStep01.style.display = 'block'
    stepform.append(crawlinguserPasswordSpanStep01)

    let crawlingUserPasswordInputStep01 = document.createElement('input')
    crawlingUserPasswordInputStep01.setAttribute('id', 'crawlinguserPass')
    crawlingUserPasswordInputStep01.setAttribute('name', 'password')
    crawlingUserPasswordInputStep01.setAttribute('type', 'password')
    crawlingUserPasswordInputStep01.placeholder = '비밀번호를 입력하세요'
    crawlingUserPasswordInputStep01.style.padding = '0 7px'
    crawlingUserPasswordInputStep01.style.height = '32px'
    crawlingUserPasswordInputStep01.style.border = '#c4ccdd 1px solid'
    crawlingUserPasswordInputStep01.style.borderRadius = '0'
    crawlingUserPasswordInputStep01.style.color = '#000'
    crawlingUserPasswordInputStep01.style.backgroundColor = '#c4ccdd'
    crawlingUserPasswordInputStep01.style.fontWeight = '500'
    crawlingUserPasswordInputStep01.style.fontSize = '13px'
    crawlingUserPasswordInputStep01.style.display = 'block'
    crawlingUserPasswordInputStep01.style.fontSize = '100%'
    crawlingUserPasswordInputStep01.style.outline = 'none'
    crawlingUserPasswordInputStep01.style.width = '90%'
    crawlingUserPasswordInputStep01.style.placeHolder = 'ex.. 74'

    stepform.append(crawlingUserPasswordInputStep01)


    let submitBtnStep01 = document.createElement('button')
    submitBtnStep01.setAttribute('id', 'submitBtnStep01')
    submitBtnStep01.style.padding = '6px 10px 5px'
    submitBtnStep01.style.lineHeight = '1.4'
    submitBtnStep01.style.fontWeight = '400'
    submitBtnStep01.style.fontSize = '14px'
    submitBtnStep01.innerHTML = '로그인'
    submitBtnStep01.style.border = '#240086 1px solid'
    submitBtnStep01.style.color = '#FFF'
    submitBtnStep01.style.backgroundColor = 'rgb(31 41 55)'
    submitBtnStep01.style.boxShadow = 'none'
    submitBtnStep01.style.width = '90%'
    submitBtnStep01.style.marginTop = '25px'
    submitBtnStep01.style.cursor = 'pointer'
    submitBtnStep01.style.borderRadius = '0.75rem'
    stepform.append(submitBtnStep01)

    
    document.querySelector('#submitBtnStep01').removeEventListener("click", handler)
    document.querySelector('#submitBtnStep01').addEventListener("click", handler)


}

const handler = (e) => {
    e.preventDefault();
    const formdata = new FormData(stepform);
    
    fetch(IP_CONFIG + "/api/auth/sign-in", {
        method: 'post',
        body: formdata,
        credentials: "include"
    })
    .then(res => res.json())
    .then(SUC => SUC.type=="SUCCESS"? Step02DivCalling(SUC) : alert('인증실패하였습니다.'))
    
}

//인증성공시 scraper_injection.js 호출부
const Step02DivCalling = (res) => {
    stepform.remove();
    crawlingpage(res);
}


document.querySelector('#metaonbtn01').removeEventListener("click",loginForm)
document.querySelector('#metaonbtn01').addEventListener("click",loginForm)
  
  
  // contentscript.js
  chrome.runtime.sendMessage({
    message: 1
  });