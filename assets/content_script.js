IP_CONFIG = 'http://localhost:8080'
console.log('metacube 에서 호출하는 content script')

function crawlingpage(res){

    const crtag = document.querySelector('.temp-right')
    const divEl = crtag.querySelector('div')
    divEl.style.width='95%';
    divEl.style.margin='5px 5px 5px 5px'//!important;
    divEl.style.padding='0 0 0 0'//!important;
    
    // step 01
    let UserName = document.createElement('span')
    UserName.innerHTML =res.body.member.username + ' 님 반갑습니다.'
    UserName.style.fontSize = '20px'
    UserName.style.marginBottom = '7px'
    UserName.style.fontWeight = '600'
    UserName.style.display = 'block'
    UserName.style.textAlign = 'center'
    divEl.append(UserName)

    let row01 = document.createElement('div')
    divEl.append(row01)
    
    let rows01 = document.createElement('div')
    rows01.style.display='flex';
    rows01.style.width='100%'
    row01.append(rows01)

    //타이틀
    let crawlingtitleSpan = document.createElement('span')
    crawlingtitleSpan.innerHTML = '도메인 타이틀'
    crawlingtitleSpan.style.fontSize = '12px'
    crawlingtitleSpan.style.marginBottom = '10px'
    crawlingtitleSpan.style.fontWeight = '200'
    crawlingtitleSpan.style.display = 'block'
    crawlingtitleSpan.style.width ='20%'
    crawlingtitleSpan.style.textAlign ='center'
    rows01.append(crawlingtitleSpan)
    let crawlingTITELinput = document.createElement('input')
    crawlingTITELinput.setAttribute('id','crawlingTITELinput')
    crawlingTITELinput.style.padding = '0 7px'
    crawlingTITELinput.style.height = '32px'
    crawlingTITELinput.style.border = '#c4ccdd 1px solid'
    crawlingTITELinput.style.borderRadius = '0'
    crawlingTITELinput.style.color = '#000'
    crawlingTITELinput.style.marginBottom = '10px'
    crawlingTITELinput.style.backgroundColor = '#c4ccdd'
    crawlingTITELinput.style.fontWeight = '500'
    crawlingTITELinput.style.fontSize = '13px'
    crawlingTITELinput.style.display = 'block'
    crawlingTITELinput.style.outline = 'none'
    crawlingTITELinput.style.width = '80%'
    crawlingTITELinput.style.placeHolder = 'ex.. 74'
    rows01.append(crawlingTITELinput)


    let rows02 = document.createElement('div')
    rows02.style.display='flex';
    rows02.style.width='100%'
    row01.append(rows02)
    //URL
    let crawlingURLspanStep02 = document.createElement('span')
    crawlingURLspanStep02.innerHTML = '도메인';
    crawlingURLspanStep02.style.fontSize = '12px'
    crawlingURLspanStep02.style.marginBottom = '10px'
    crawlingURLspanStep02.style.fontWeight = '200'
    crawlingURLspanStep02.style.display = 'block'
    crawlingURLspanStep02.style.width ='20%'
    crawlingURLspanStep02.style.textAlign ='center'
    rows02.append(crawlingURLspanStep02)
    let crawlingURLinput = document.createElement('input')
    crawlingURLinput.setAttribute('id','crawlingURLinput')
    crawlingURLinput.style.padding = '0 7px'
    crawlingURLinput.style.height = '32px'
    crawlingURLinput.style.border = '#c4ccdd 1px solid'
    crawlingURLinput.style.borderRadius = '0'
    crawlingURLinput.style.color = '#000'
    crawlingURLinput.style.marginBottom = '10px'
    crawlingURLinput.style.backgroundColor = '#c4ccdd'
    crawlingURLinput.style.fontWeight = '500'
    crawlingURLinput.style.fontSize = '13px'
    crawlingURLinput.style.display = 'block'
    crawlingURLinput.style.outline = 'none'
    crawlingURLinput.style.width = '80%'
    crawlingURLinput.style.placeHolder = 'ex.. 74'
    rows02.append(crawlingURLinput)
    

    let rows03 = document.createElement('div')
    rows03.style.display='flex';
    rows03.style.width='100%'
    row01.append(rows03)

    //수집대상
    let crawlingTARGETspan = document.createElement('span')
    crawlingTARGETspan.innerHTML = '수집대상';
    crawlingTARGETspan.style.fontSize = '12px'
    crawlingTARGETspan.style.marginBottom = '10px'
    crawlingTARGETspan.style.fontWeight = '200'
    crawlingTARGETspan.style.display = 'block'
    crawlingTARGETspan.style.width ='20%'
    crawlingTARGETspan.style.textAlign ='center'
    rows03.append(crawlingTARGETspan)
    let crawlingTARGETinput = document.createElement('input')
    crawlingTARGETinput.setAttribute('id','crawlingTARGETinput')
    crawlingTARGETinput.style.padding = '0 7px'
    crawlingTARGETinput.style.height = '32px'
    crawlingTARGETinput.style.border = '#c4ccdd 1px solid'
    crawlingTARGETinput.style.marginBottom = '10px'
    crawlingTARGETinput.style.borderRadius = '0'
    crawlingTARGETinput.style.color = '#000'
    crawlingTARGETinput.style.backgroundColor = '#c4ccdd'
    crawlingTARGETinput.style.fontWeight = '500'
    crawlingTARGETinput.style.fontSize = '11px'
    crawlingTARGETinput.style.display = 'block'
    crawlingTARGETinput.style.outline = 'none'
    crawlingTARGETinput.style.width = '80%'
    crawlingTARGETinput.style.placeHolder = 'ex.. 74'
    rows03.append(crawlingTARGETinput)

    let rows04 = document.createElement('div')
    rows04.style.display='flex';
    rows04.style.width='100%'
    row01.append(rows04)

    //설명
    let crawlingPLANspan = document.createElement('span')
    crawlingPLANspan.innerHTML = '설명';
    crawlingPLANspan.style.fontSize = '12px'
    crawlingPLANspan.style.marginBottom = '10px'
    crawlingPLANspan.style.fontWeight = '200'
    crawlingPLANspan.style.display = 'block'
    crawlingPLANspan.style.width ='20%'
    crawlingPLANspan.style.textAlign ='center'
    rows04.append(crawlingPLANspan)
    let crawlingPLANinput = document.createElement('input')
    crawlingPLANinput.setAttribute('id','crawlingPLANinput')
    crawlingPLANinput.style.padding = '0 7px'
    crawlingPLANinput.style.height = '32px'
    crawlingPLANinput.style.border = '#c4ccdd 1px solid'
    crawlingPLANinput.style.marginBottom = '10px'
    crawlingPLANinput.style.borderRadius = '0'
    crawlingPLANinput.style.color = '#000'
    crawlingPLANinput.style.backgroundColor = '#c4ccdd'
    crawlingPLANinput.style.fontWeight = '500'
    crawlingPLANinput.style.fontSize = '12px'
    crawlingPLANinput.style.display = 'block'
    crawlingPLANinput.style.outline = 'none'
    crawlingPLANinput.style.width = '80%'
    crawlingPLANinput.style.placeHolder = '설명란을 입력하세요.'

    rows04.append(crawlingPLANinput)
    
    let rows05 = document.createElement('div')
    rows05.style.display='flex';
    rows05.style.width='100%'
    row01.append(rows05)

    //카테고리
    let crawlingCATEGORYspan = document.createElement('span')
    crawlingCATEGORYspan.innerHTML = '유형';
    crawlingCATEGORYspan.style.fontSize = '12px'
    crawlingCATEGORYspan.style.marginBottom = '10px'
    crawlingCATEGORYspan.style.fontWeight = '200'
    crawlingCATEGORYspan.style.display = 'block'
    crawlingCATEGORYspan.style.width ='20%'
    crawlingCATEGORYspan.style.textAlign ='center'
    rows05.append(crawlingCATEGORYspan)
    let crawlingCATEGORYselect = document.createElement('select')
    crawlingCATEGORYselect.setAttribute('id','crawlingCATEGORYinput')
    crawlingCATEGORYselect.append(new Option('뉴스','news'))
    crawlingCATEGORYselect.append(new Option('고객','client'))
    crawlingCATEGORYselect.append(new Option('자회사','mycompany'))
    crawlingCATEGORYselect.append(new Option('경재사','rivalcompany'))
    crawlingCATEGORYselect.append(new Option('사업','Business'))
    crawlingCATEGORYselect.append(new Option('쇼핑','Shopping'))
    crawlingCATEGORYselect.style.textAlign='center'
    crawlingCATEGORYselect.style.padding = '0 7px'
    crawlingCATEGORYselect.style.height = '32px'
    crawlingCATEGORYselect.style.border = '#c4ccdd 1px solid'
    crawlingCATEGORYselect.style.marginBottom = '10px'
    crawlingCATEGORYselect.style.borderRadius = '0'
    crawlingCATEGORYselect.style.color = '#000'
    crawlingCATEGORYselect.style.backgroundColor = '#c4ccdd'
    crawlingCATEGORYselect.style.fontWeight = '500'
    crawlingCATEGORYselect.style.fontSize = '15px'
    crawlingCATEGORYselect.style.display = 'block'
    crawlingCATEGORYselect.style.outline = 'none'
    crawlingCATEGORYselect.style.width = '80%'
    rows05.append(crawlingCATEGORYselect)

    let rows06 = document.createElement('div')
    rows06.style.display='flex';
    rows06.style.width='100%'
    row01.append(rows06)

    //XPATH정보
    let crawlingXPATHspan = document.createElement('span')
    crawlingXPATHspan.setAttribute('id','crawlingXPATHspan');
    crawlingXPATHspan.innerHTML = 'XPATH'
    crawlingXPATHspan.style.fontSize = '12px'
    crawlingXPATHspan.style.marginBottom = '10px'
    crawlingXPATHspan.style.fontWeight = '200'
    crawlingXPATHspan.style.display = 'block'
    crawlingXPATHspan.style.width ='20%'
    crawlingXPATHspan.style.textAlign ='center'
    rows06.append(crawlingXPATHspan)
    let crawlingXPATHinput = document.createElement('input')
    crawlingXPATHinput.setAttribute('id','crawlingXPATHinput')
    crawlingXPATHinput.style.padding = '0 7px'
    crawlingXPATHinput.style.height = '32px'
    crawlingXPATHinput.style.border = '#c4ccdd 1px solid'
    crawlingXPATHinput.style.marginBottom = '10px'
    crawlingXPATHinput.style.borderRadius = '0'
    crawlingXPATHinput.style.color = '#000'
    crawlingXPATHinput.style.backgroundColor = '#c4ccdd'
    crawlingXPATHinput.style.fontWeight = '500'
    crawlingXPATHinput.style.fontSize = '11px'
    crawlingXPATHinput.style.display = 'block'
    crawlingXPATHinput.style.outline = 'none'
    crawlingXPATHinput.style.width = '80%'
    crawlingXPATHinput.style.placeHolder = 'ex.. 74'
    rows06.append(crawlingXPATHinput)

    let rows07 = document.createElement('div')
    rows07.style.display='flex';
    rows07.style.width='100%'
    row01.append(rows07)

    // let crawlingNAMEspan = document.createElement('selectbox')
    // crawlingNAMEspan.innerText=''
    // crawlingNAMEspan.style.display='flex';
    // crawlingNAMEspan.style.width='100%'
    // rows07.append(crawlingNAMEspan)
        
    let rows08 = document.createElement('div')
    rows08.style.display='flex';
    rows08.style.width='100%'
    row01.append(rows08)

    //크롤링데이터 논리명(한글)

    //target 대상유형
    let crawlingNAMEspan = document.createElement('span')
    crawlingNAMEspan.innerHTML = '대상 유형';
    crawlingNAMEspan.style.fontSize = '12px'
    crawlingNAMEspan.style.marginBottom = '10px'
    crawlingNAMEspan.style.fontWeight = '200'
    crawlingNAMEspan.style.display = 'block'
    crawlingNAMEspan.style.width ='20%'
    crawlingNAMEspan.style.textAlign ='center'
    rows08.append(crawlingNAMEspan)

    let crawlingNAMEselect = document.createElement('select')
    crawlingNAMEselect.setAttribute('id','crawlingNAMEselect')
    crawlingNAMEselect.append(new Option('선택'))
    crawlingNAMEselect.append(new Option('제목','title'))
    crawlingNAMEselect.append(new Option('내용','content'))
    crawlingNAMEselect.append(new Option('날짜','date'))
    crawlingNAMEselect.style.textAlign='center'
    crawlingNAMEselect.style.padding = '0 7px'
    crawlingNAMEselect.style.height = '32px'
    crawlingNAMEselect.style.border = '#c4ccdd 1px solid'
    crawlingNAMEselect.style.marginBottom = '10px'
    crawlingNAMEselect.style.borderRadius = '0'
    crawlingNAMEselect.style.color = '#000'
    crawlingNAMEselect.style.backgroundColor = '#c4ccdd'
    crawlingNAMEselect.style.fontWeight = '500'
    crawlingNAMEselect.style.fontSize = '15px'
    crawlingNAMEselect.style.display = 'block'
    crawlingNAMEselect.style.outline = 'none'
    crawlingNAMEselect.style.width = '80%'

    rows08.append(crawlingNAMEselect)

    // //크롤링데이터 물리명
    // let crawlingMAPPINGNAMEselect = document.createElement('select')
    // crawlingMAPPINGNAMEselect.setAttribute('id','crawlingMAPPINGNAMEselect')
    // crawlingMAPPINGNAMEselect.append(new Option('선택'))
    // crawlingMAPPINGNAMEselect.append(new Option('title'))
    // crawlingMAPPINGNAMEselect.append(new Option('content'))
    // crawlingMAPPINGNAMEselect.style.textAlign='center'
    // crawlingMAPPINGNAMEselect.style.margin = '5px 5px'
    // crawlingMAPPINGNAMEselect.style.padding = '0 7px'
    // crawlingMAPPINGNAMEselect.style.height = '32px'
    // crawlingMAPPINGNAMEselect.style.border = '#c4ccdd 1px solid'
    // crawlingMAPPINGNAMEselect.style.borderRadius = '0'
    // crawlingMAPPINGNAMEselect.style.color = '#000'
    // crawlingMAPPINGNAMEselect.style.backgroundColor = '#c4ccdd'
    // crawlingMAPPINGNAMEselect.style.fontWeight = '500'
    // crawlingMAPPINGNAMEselect.style.fontSize = '75%'
    // crawlingMAPPINGNAMEselect.style.display = 'block'
    // crawlingMAPPINGNAMEselect.style.fontSize = '70%'
    // crawlingMAPPINGNAMEselect.style.outline = 'none'
    // crawlingMAPPINGNAMEselect.style.width = '90%'
    // crawlingMAPPINGNAMEselect.setAttribute('placeHolder','ex) title or content')
    // rows08.append(crawlingMAPPINGNAMEselect)

    //XPATH 경로 저장요청
    let rows09 = document.createElement('div')
    rows09.style.width='100%'
    row01.append(rows09)

    let crawlingFINDbutton = document.createElement('button')
    crawlingFINDbutton.setAttribute('id','crawlingFINDbutton')
    crawlingFINDbutton.style.fontWeight = '400'
    crawlingFINDbutton.style.fontSize = '13px'
    crawlingFINDbutton.innerHTML = '보내기'
    crawlingFINDbutton.style.border = '#240086 1px solid'
    crawlingFINDbutton.style.color = '#FFF'
    crawlingFINDbutton.style.backgroundColor = 'rgb(31 41 55)'
    crawlingFINDbutton.style.width = '100%'
    crawlingFINDbutton.style.height = '30px'
    crawlingFINDbutton.style.marginTop = '25px'
    crawlingFINDbutton.style.cursor = 'pointer'
    crawlingFINDbutton.style.borderRadius = '0.75rem'
    rows09.append(crawlingFINDbutton)
    //mapping정보


    let title = document.querySelector('meta[property="og:site_name"]')
    //제목입력
    if(title){
        title = document.querySelector('meta[property="og:site_name"]').getAttribute('content');
    }else{
        title = "";
    }
    
    crawlingTITELinput.value = title
    //URL
    let URL = document.location.href
    crawlingURLinput.value=URL

    
    //마우스 우클릭시 방지
    document.oncontextmenu = (e) =>{
        return false;
    }

    //클릭방지
    document.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    

    let leftcrtag = document.querySelector('.temp-left')
    let clickFlag = false;
    let targetOriginBackColor;
    let elementForMouseOver;
    let tempXpath;
    let tableinsertdata; //xpath 값 
    let successelement; //저장성공시 Eltarget
    let successcolor; //저장성공시 backcolor복원

    leftcrtag.addEventListener('mouseover',(e)=>{
        
        tempXpath = '';
        tempXpath = getElementTarget(e.target) // 전체
        
        clickFlag = false;
        // element : <span style="color: rgb(255, 255, 255); ">[수집대상의 innerHTML]</span>
        let element = document.evaluate(tempXpath, document,null,
                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        elementForMouseOver = element;
        targetOriginBackColor = element.style.backgroundColor; //기존의 backgroundcolor;
        
        //mouseover 영역의 backcolor 변경
        getFocusElement(element);

    
    
    })

    leftcrtag.addEventListener('mouseout',(e)=>{
        if(!clickFlag){
            getBackgroundColorOfElement(elementForMouseOver,targetOriginBackColor)
        }
    })

    leftcrtag.addEventListener('mousedown',(e)=>{

        //mouse 우클릭시 이벤트 추가
        if(e.button == 2){

            
            let xpathinfo = generateXPath(e.target); // //*[@id="main"]/article/div/p[5]
            tableinsertdata = xpathinfo.replace(/\s?\[1\]\s?/g, ''); // [1]

            successcolor = targetOriginBackColor
            successelement = e.target
            let clo = e.target.cloneNode(false)
            clo.value = "Desired Value"
            
            e.preventDefault();
            e.stopPropagation();
            clickFlag = true
            getFocusElement(e.target)
            
            document.querySelector('#crawlingXPATHinput').value = tempXpath;
            document.querySelector('#crawlingTARGETinput').value = clo.outerHTML;

            
            
        }
    })

    
    //더블클릭 이벤트 비활설화
    leftcrtag.addEventListener('dblclick', function (event) {
        return false;
    })

    //
    document.querySelector('#crawlingFINDbutton').addEventListener('click',(e)=>{

        let titleinput = document.getElementById("crawlingTITELinput").value;         //도메인 타이틀
        let urlinput = document.getElementById("crawlingURLinput").value;             //도메인
        let targetinput = document.getElementById("crawlingTARGETinput").value;       //수집대상
        let planinput = document.getElementById("crawlingPLANinput").value;           //설명
        let categoryinput = document.getElementById("crawlingCATEGORYinput").value;   //유형
        let everyxpath = document.getElementById("crawlingXPATHinput").value;         //전체xpath(html/body/div/div/h1.....)
        let nameselect = document.getElementById("crawlingNAMEselect").value;         //대상 유형
        let targetxpath = tableinsertdata; // //*[@id="carousel"]/div/div/div
    

        if(!everyxpath && !targetinput) {alert('수집대상,xpath 를 입력하세요'); return;}
        if(targetinput=='선택') {alert('대상유형을 선택하세요'); return;}
        
        fetch(IP_CONFIG+'/api/chrome/extention/insert',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include", // 인증정보를 포함하여 요청보내는설정 (쿠키,http인증 정보)
            body: JSON.stringify({title:titleinput?titleinput:"",
                                url:urlinput,
                                target:targetinput,
                                plan:planinput,
                                category:categoryinput,
                                xpath:everyxpath,
                                type:nameselect,
                                targetxpath:targetxpath})
        }).then(res=>res.json()
        ).then(res=>{        
            if(res.type=="SUCCESS"){
                getBackgroundColorOfElement(successelement,successcolor)
                targetinput ="";
                planinput ="";
                everyxpath ="";
                return res.message.default;
            }else{
                alert('저장실패')
            }
        }).then(res2=>console.log(res2))

    })

}

//수집대상 xpath경로 추출
function getElementTarget(element){
    var paths = [];

    var paths = [];  // Use nodeName (instead of localName)
    for (; element && element.nodeType == Node.ELEMENT_NODE;
           element = element.parentNode) {

        var index = 0;
        var hasFollowingSiblings = false;

        for (var sibling = element.previousSibling; sibling;
             sibling = sibling.previousSibling) {
            // Ignore document type declaration.
            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                continue;
            if (sibling.nodeName == element.nodeName)
                ++index;
        }
        for (var sibling = element.nextSibling;
             sibling && !hasFollowingSiblings;
             sibling = sibling.nextSibling) {
            if (sibling.nodeName == element.nodeName)
                hasFollowingSiblings = true;
        }
        var tagName = (element.prefix ? element.prefix + ":" : "")
            + element.localName;
        var pathIndex = (index || hasFollowingSiblings ? "["
            + (index + 1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }
    return paths.length ? "/" + paths.join("/") : null;
    //html/body/div/div

}

//우클릭 해당 태그 backcolor 변경
function getFocusElement(element){
    try {
        element.style.backgroundColor = '#a1e058';

    } catch (e) {
        console.log("배경색이 없습니다.");
    }
}

//mouseout시 backgoundColor 되돌리기
function getBackgroundColorOfElement(element, color) {

    element.style.backgroundColor = color;
}

function getElementByXpath(path) {
    document.evaluate(path, document,null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function generateXPath(element) {

    if (element.id !== "") {
        return '//*[@id="' + element.id + '"]';
    }
    if (element === document.body) {
        return '/html/' + element.tagName.toLowerCase();
    }

    var index = 1;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element) {
            return generateXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + index + ']';
        }
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            index++;
        }
    }
}
