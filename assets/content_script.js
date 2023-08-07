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
    UserName.style.color = '#fff'
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
    crawlingtitleSpan.style.color = '#fff'
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
    crawlingTITELinput.style.fontSize = '70%'
    crawlingTITELinput.style.display = 'block'
    crawlingTITELinput.style.fontSize = '100%'
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
    crawlingURLspanStep02.style.color = '#fff'
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
    crawlingURLinput.style.fontSize = '75%'
    crawlingURLinput.style.display = 'block'
    crawlingURLinput.style.fontSize = '100%'
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
    crawlingTARGETspan.style.color = '#fff'
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
    crawlingTARGETinput.style.fontSize = '75%'
    crawlingTARGETinput.style.display = 'block'
    crawlingTARGETinput.style.fontSize = '100%'
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
    crawlingPLANspan.style.color = '#fff'
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
    crawlingPLANinput.style.fontSize = '85%'
    crawlingPLANinput.style.display = 'block'
    crawlingPLANinput.style.fontSize = '100%'
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
    crawlingCATEGORYspan.style.color = '#fff'
    crawlingCATEGORYspan.style.fontSize = '12px'
    crawlingCATEGORYspan.style.marginBottom = '10px'
    crawlingCATEGORYspan.style.fontWeight = '200'
    crawlingCATEGORYspan.style.display = 'block'
    crawlingCATEGORYspan.style.width ='20%'
    crawlingCATEGORYspan.style.textAlign ='center'
    rows05.append(crawlingCATEGORYspan)
    let crawlingCATEGORYinput = document.createElement('input')
    crawlingCATEGORYinput.setAttribute('id','crawlingCATEGORYinput')
    crawlingCATEGORYinput.style.padding = '0 7px'
    crawlingCATEGORYinput.style.height = '32px'
    crawlingCATEGORYinput.style.border = '#c4ccdd 1px solid'
    crawlingCATEGORYinput.style.borderRadius = '0'
    crawlingCATEGORYinput.style.marginBottom = '10px'
    crawlingCATEGORYinput.style.color = '#000'
    crawlingCATEGORYinput.style.backgroundColor = '#c4ccdd'
    crawlingCATEGORYinput.style.fontWeight = '500'
    crawlingCATEGORYinput.style.fontSize = '90%'
    crawlingCATEGORYinput.style.display = 'block'
    crawlingCATEGORYinput.style.fontSize = '100%'
    crawlingCATEGORYinput.style.outline = 'none'
    crawlingCATEGORYinput.style.width = '80%'
    crawlingCATEGORYinput.style.placeHolder = '유형을 입력하세요.'
    rows05.append(crawlingCATEGORYinput)

    let rows06 = document.createElement('div')
    rows06.style.display='flex';
    rows06.style.width='100%'
    row01.append(rows06)

    //XPATH정보
    let crawlingXPATHbutton = document.createElement('button')
    crawlingXPATHbutton.setAttribute('type','button');
    crawlingXPATHbutton.setAttribute('id','crawlingXPATHbutton');
    crawlingXPATHbutton.innerHTML = 'XPATH'
    crawlingXPATHbutton.style.color = '#fff'
    crawlingXPATHbutton.style.fontSize = '12px'
    crawlingXPATHbutton.style.marginBottom = '10px'
    crawlingXPATHbutton.style.fontWeight = '200'
    crawlingXPATHbutton.style.display = 'block'
    crawlingXPATHbutton.style.width ='20%'
    crawlingXPATHbutton.style.textAlign ='center'
    rows06.append(crawlingXPATHbutton)
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
    crawlingXPATHinput.style.fontSize = '75%'
    crawlingXPATHinput.style.display = 'block'
    crawlingXPATHinput.style.fontSize = '100%'
    crawlingXPATHinput.style.outline = 'none'
    crawlingXPATHinput.style.width = '80%'
    crawlingXPATHinput.style.placeHolder = 'ex.. 74'
    rows06.append(crawlingXPATHinput)

    let rows07 = document.createElement('div')
    rows07.style.display='flex';
    rows07.style.width='100%'
    row01.append(rows07)

    let crawlingNAMEspan = document.createElement('selectbox')
    crawlingNAMEspan.innerText=''
    crawlingNAMEspan.style.display='flex';
    crawlingNAMEspan.style.width='100%'
    rows07.append(crawlingNAMEspan)
    
    
    
    let rows08 = document.createElement('div')
    rows08.style.display='flex';
    rows08.style.width='100%'
    row01.append(rows08)
    
    //명칭
    let crawlingNAMEinput = document.createElement('input')
    crawlingNAMEinput.setAttribute('id','crawlingNAMEinput')
    crawlingNAMEinput.style.margin = '5px 5px'
    crawlingNAMEinput.style.padding = '0 7px'
    crawlingNAMEinput.style.height = '32px'
    crawlingNAMEinput.style.border = '#c4ccdd 1px solid'
    crawlingNAMEinput.style.borderRadius = '0'
    crawlingNAMEinput.style.color = '#000'
    crawlingNAMEinput.style.backgroundColor = '#c4ccdd'
    crawlingNAMEinput.style.fontWeight = '500'
    crawlingNAMEinput.style.fontSize = '75%'
    crawlingNAMEinput.style.display = 'block'
    crawlingNAMEinput.style.fontSize = '70%'
    crawlingNAMEinput.style.outline = 'none'
    crawlingNAMEinput.style.width = '90%'
    crawlingNAMEinput.setAttribute('placeHolder','ex) 제목 or 내용')
    rows08.append(crawlingNAMEinput)

    //명칭
    let crawlingMAPPINGNAMEinput = document.createElement('input')
    crawlingMAPPINGNAMEinput.setAttribute('id','crawlingMAPPINGNAMEinput')
    crawlingMAPPINGNAMEinput.style.margin = '5px 5px'
    crawlingMAPPINGNAMEinput.style.padding = '0 7px'
    crawlingMAPPINGNAMEinput.style.height = '32px'
    crawlingMAPPINGNAMEinput.style.border = '#c4ccdd 1px solid'
    crawlingMAPPINGNAMEinput.style.borderRadius = '0'
    crawlingMAPPINGNAMEinput.style.color = '#000'
    crawlingMAPPINGNAMEinput.style.backgroundColor = '#c4ccdd'
    crawlingMAPPINGNAMEinput.style.fontWeight = '500'
    crawlingMAPPINGNAMEinput.style.fontSize = '75%'
    crawlingMAPPINGNAMEinput.style.display = 'block'
    crawlingMAPPINGNAMEinput.style.fontSize = '70%'
    crawlingMAPPINGNAMEinput.style.outline = 'none'
    crawlingMAPPINGNAMEinput.style.width = '90%'
    crawlingMAPPINGNAMEinput.setAttribute('placeHolder','ex) title or content')
    rows08.append(crawlingMAPPINGNAMEinput)

    //XPATH 경로 저장요청
    let rows09 = document.createElement('div')
    rows09.style.width='100%'
    row01.append(rows09)

    let crawlingFINDbutton = document.createElement('button')
    crawlingFINDbutton.setAttribute('id','crawlingFINDbutton')
    crawlingFINDbutton.style.lineHeight = '1.4'
    crawlingFINDbutton.style.fontWeight = '400'
    crawlingFINDbutton.style.fontSize = '25px'
    crawlingFINDbutton.innerHTML = '보내기'
    crawlingFINDbutton.style.border = '#240086 1px solid'
    crawlingFINDbutton.style.color = '#FFF'
    crawlingFINDbutton.style.backgroundColor = '#240086'
    crawlingFINDbutton.style.width = '100%'
    crawlingFINDbutton.style.height = '30px'
    crawlingFINDbutton.style.marginTop = '25px'
    crawlingFINDbutton.style.cursor = 'pointer'
    rows09.append(crawlingFINDbutton)
    //mapping정보

    
    //제목입력
    let title = document.querySelector('title').textContent;
    crawlingTITELinput.value=title
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
    let targetBackgroundColor;

    leftcrtag.addEventListener('mouseover',(e)=>{
    
        
        let tempXpath = getElementTarget(e.target) //ex)../html/body/crtag[1]/div[2]/div[6]
        //ex) ..<span style="color: rgb(255, 255, 255); "> 수집대상</span>
        
        //확장프로그램 영역 밖에서만 event 넣기
        if(tempXpath.toString().indexOf('crtag[1]') > 0){
            
            let element = document.evaluate(tempXpath, document,null,
                  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            // console.log(element)
            // console.log(tempXpath)

            targetBackgroundColor = element.style.backgroundColor; //기존의 backgroundcolor;
            
            //mouseover 영역의 backcolor 변경
            getFocusElement(element);
            
                //backcolor 초기화
                element.addEventListener('mouseout',(e)=>{
                    console.log(element)
                    element.style.backgroundColor = targetBackgroundColor;
                })
                
                //마우스 우클릭시
                element.addEventListener('mousedown',(e)=>{
                    
                    e.preventDefault()
                    e.stopPropagation()
                    if(e.button == 2){
                        let Originalcolor = e.target.backgroundColor
                        document.querySelector('#crawlingXPATHinput').value = getElementTarget(e.target);
                        getFocusElement(e.target)
                        
                    }
                
                })
            


        }

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

}

//우클릭 해당 태그 backcolor 변경
function getFocusElement(element){
    try {
        element.style.backgroundColor = '#a1e058';

    } catch (e) {
        console.log("배경색이 없습니다.");
    }

}

