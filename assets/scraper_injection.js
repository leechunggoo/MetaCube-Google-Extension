$('body').append("<div id='mouse-over-context' class='mouse-over-context' style='position:absolute;display:block;border:1px solid black;width:150px;text-align:center;border:none;font-weight:900;color : white;pointer-events: none'><ul><li>TagType</li><li>ClassType</li></ul></div>");
console.log('aaa')


// IP_CONFIG = 'https://218.159.116.193:8001'
// IP_CONFIG = 'https://61.74.186.67:48002'
// IP_CONFIG = 'http://127.0.0.1:5000'
// IP_CONFIG='https://192.168.0.29:8001'
IP_CONFIG='https://121.141.19.242:5003'
// 스판덱스PU  x-path 수집 ip : https://218.159.114.186:8002
//IP_CONFIG='https://218.159.114.186:8002'
//IP_CONFIG = 'https://218.159.114.186:22'                  


EDIT_FLAG = false


let dbDataJson = {}

// xpath 스크래퍼 작성

settingSendBtn();
settingTabBtn();
loadData();

let html_body;
let tabFlag = 'list/page'
let clickFlag = false;
let elementForMouseOver;
let targetBackgroundColor;


try {
    html_body = document.querySelector('body');
    currentUrl = document.location.href;
    // funcInit();
} catch (e) {
    console.log(e);
    console.log(e.error);
    console.log(e.errorDetail);
}


document.onclick = function (e) {
    //클릭방지
    e.preventDefault();
    e.stopPropagation();
};
document.oncontextmenu = function (e) {
    //우측클릭 방지
    return false;
}


$('.temp-right').on('mouseover', function (event) {
    event.preventDefault();
    event.stopPropagation();
})

$('.temp-right').on('mouseout', function (event) {
    event.preventDefault();
    event.stopPropagation();
})




// 승인 상태인지 아닌지, 아닌경우 마우스 기능 활성화 함수
function settingMouse(permission){

    if (permission =='NOT_APPROVED'){
        html_body.addEventListener('mouseover', function (event) {

                clickFlag = false
                let tempXpath = getElementTreeXPath(event.target)
                let element = getElementByXpath(tempXpath);


                elementForMouseOver = element;

                try {
                    targetBackgroundColor = element.style.backgroundColor;  //element의 원래 컬러
                } catch (e) {
                    console.log(e.error);
                }

            getFocusElement(element);

            /* target tag 표시 div  */
            // let targetDiv = document.getElementById("mouse-over-context");
            // showTagType(event, event.pageX, event.pageY, targetDiv);


        })


        html_body.addEventListener('mouseout', function (event) {
            try {
                if (!clickFlag) {
                    getBackgroundColorOfElement(elementForMouseOver, targetBackgroundColor);
                }
            } catch (e) {
                console.log('배경색이 없습니다.');
            }

        })


        html_body.addEventListener('mousedown', (event) => {

            /* 마우스 오른쪽 메뉴 변수 */

            if (event.button == 2) {
                //우측클릭
                event.preventDefault()
                event.stopPropagation()
                clickFlag = true;
                highLightTag(event.target)
                addDetail(event)

            } else if (event.altKey) {
                // alt 좌클릭 조합
                //메뉴 띄우기
                event.preventDefault()
                event.stopPropagation()


            }


        })


        html_body.addEventListener('dblclick', function (event) {
            return false;
        })
    }

}

// 수정 버튼 클릭시 마우스 기능 활성화 함수
function settingEditMouse(xpathInput,tagOfXpathInput) {


    let tempBody = $('body')

    tempBody.mouseover(function(event){

        clickFlag = false
        let tempXpath = getElementTreeXPath(event.target)
        let element = getElementByXpath(tempXpath);

        elementForMouseOver = element;

        try {
            targetBackgroundColor = element.style.backgroundColor;  //element의 원래 컬러
        } catch (e) {
            console.log(e.error);
        }

        getFocusElement(element);

    })

    tempBody.mouseout(function(event){
        try {
            if (!clickFlag) {
                getBackgroundColorOfElement(elementForMouseOver, targetBackgroundColor);
            }
        } catch (e) {
            console.log('배경색이 없습니다.');
        }

    })

    tempBody.mousedown(function(event){

       if (event.button == 2) {
           //우측클릭
           event.preventDefault()
           event.stopPropagation()
           clickFlag = true;
           highLightTag(event.target)


           console.log(getElementByXpath(xpathInput.value))


           getElementByXpath(xpathInput.value).style.backgroundColor = '#fff'


           let xpathOfElement = getElementTreeXPath(event.target);
           let element = getElementByXpath(xpathOfElement);


           xpathInput.value = xpathOfElement
           tagOfXpathInput.value =  element.outerHTML;

           EDIT_FLAG = false
           let editBtns = document.querySelectorAll('.editBtn')
           for (let i = 0; i < editBtns.length; i++) {
                       editBtns[i].style.display = 'block'
                   }

           settingDefaultMouse()

       } else if (event.altKey) {
           event.preventDefault()
           event.stopPropagation()

       }

    })


    tempBody.dblclick(function(event){
        return false;
    })

}

// 수정 기능 사용 후 마우스 이벤트 제거 함수
function settingDefaultMouse(){

    let body = $('body')
    body.off('mouseover');
    body.off('mouseout');
    body.off('mousedown');
    body.off('dblclick');


}



// 전송버튼 setting
function settingSendBtn() {

    $('#submitBtnStep03').get(0).addEventListener('click', function () {

        let fieldCount = 0

        let sendJsonData = {}
        let xpathFieldJson = {}

        // validation
        if (tabFlag == 'list/page') {
            if (confirm("[ 리스트/페이지 ] '리스트/페이지' 탭에서 선택한 것이 맞습니까??") == true) {    //확인

                sendJsonData['chkType'] = '리스트/페이지'
            } else {   //취소
                return false;
            }


        } else if (tabFlag == 'field') {
            if (confirm("[ 상세 ] '상세탭' 에서 선택한 것이 맞습니까??") == true) {    //확인
                sendJsonData['chkType'] = '상세'
            } else {   //취소
                return false;
            }

        }
        else if (tabFlag == 'fieldInList'){
            if (confirm("[ 상세리스트 ] '상세리스트' 탭에서 선택한 것이 맞습니까??") == true) {    //확인
                sendJsonData['chkType']='상세리스트'
            } else {   //취소
                return false;
            }

        }
        else if (tabFlag == 'filter'){
            if (confirm("[ 필터 ] '필터' 탭에서 선택한 것이 맞습니까??") == true) {    //확인
                sendJsonData['chkType']='필터'
            } else {   //취소
                return false;
            }

        }

        let crawlingKey = document.querySelector('#crawlingKeyStep03').value;

        sendJsonData['crawlingKey'] = crawlingKey // 수집키 세팅

        let xpathBoxList = document.querySelectorAll('.xpathBox')

        let chkTitleFlag = false
        let chkContentFlag = false

        for (let i = 0; i < xpathBoxList.length; i++) {
            let targetNameInput = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='targetNameInput']")

            // 리스트 설정
            if (targetNameInput.value == '리스트') {
                let xpathListJson = {}

                let xpathOfListInput = xpathBoxList[i].querySelector('.xpathInput').value
                let xpathListValue = xpathBoxList[i].querySelector('.tagOfXpathInput').value

                xpathListJson['xpathList'] = xpathOfListInput
                xpathListJson['xpathListValue'] = xpathListValue


                let optionsJson = {}
                optionsJson['option_html'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[class='listClickType']").value
                optionsJson['option_class'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.selectBlock').querySelector('.classSelectBox').value
                optionsJson['option_scroll'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[class='scrollOptionVal']").value


                // row 설정인 경우
                if (optionsJson['option_html'] == 'row'){

                    // validationn
                    if (xpathBoxList[i].querySelector('.rowXpathInput').value.indexOf('[?]') == -1){
                        alert('row 선택시, 반복 할 xpath의 열위치에 [?] 값이 없습니다 ')
                        return
                    }

                    if (parseInt(xpathBoxList[i].querySelector('.rowXpathLoopInput').value) <= 0 || xpathBoxList[i].querySelector('.rowXpathLoopInput').value ==''){
                        alert('[ row수집 게시물 루프 횟수 ] 를 지정해주세요. 1 이상의 값을 넣어주세요.')
                        return
                    }
                    // alert(parseInt(xpathBoxList[i].querySelector('.rowXpathLoopInput').value))

                    optionsJson['option_row_xpath'] = xpathBoxList[i].querySelector('.rowXpathInput').value
                    optionsJson['option_row_loop']=xpathBoxList[i].querySelector('.rowXpathLoopInput').value

                }

                xpathListJson['options'] = optionsJson
                sendJsonData['xpathList'] = xpathListJson

            }
            // 상세리스트 설정인 경우
            else if(targetNameInput.value == '상세리스트'){

                let temp = {}
                temp['targetName'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='targetNameField']").value

                if (!xpathBoxList[i].querySelector('.changeDiv').querySelector('.rowClickBlock').querySelector(".rowXpathInput").value.includes('?')){
                    alert('[ '+temp['targetName'] + ' ] 에 루프할 [?] 가 지정되어있지 않습니다. 확인해주세요')
                    return
                }

                temp['xpathField'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.rowClickBlock').querySelector(".rowXpathInput").value


                if (xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='mappingNameField']").value.includes('field_in_list_')){
                    temp['mappingName'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='mappingNameField']").value
                }
                else{
                    temp['mappingName'] = 'field_in_list_'+xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='mappingNameField']").value
                }


                // 타이틀여부확인
                if (temp['mappingName'] == 'field_in_list_title') {
                    chkTitleFlag = true
                }


                temp['xpathFieldValue'] = xpathBoxList[i].querySelector('.tagOfXpathInput').value

                let options = {}
                options['option_html'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.htmlOrTextOption').querySelector('.htmlOrTextOptionValueInput').value


                if (parseInt(document.querySelector('#crawlingFieldInListCountStep03').value) <= 0 || document.querySelector('#crawlingFieldInListCountStep03').value == ''){
                    alert('[ 상세 게시물 루프 횟수 ] 를 지정해주세요. 1 이상의 값을 넣어주세요. ')
                    return
                }

                options['option_loop'] = document.querySelector('#crawlingFieldInListCountStep03').value
                temp['options'] = options
                xpathFieldJson[String(fieldCount)] = temp
                fieldCount = fieldCount + 1

            }
            // 페이지 설정인 경우
            else if (targetNameInput.value == '페이지') {

                if (xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector('.pageValueHidden').value == 'param') {
                    let xpathPageJson = {}

                    let xpathOfPageInput = xpathBoxList[i].querySelector('.xpathInput').value
                    let xpathPageValue = xpathBoxList[i].querySelector('.tagOfXpathInput').value

                    xpathPageJson['xpathPage'] = xpathOfPageInput
                    xpathPageJson['xpathPageValue'] = xpathPageValue

                    let optionsJson = {}
                    optionsJson['option_page_type'] = 'param'
                    optionsJson['option_page_param'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='mappingNameInput']").value
                    optionsJson['option_page_loop'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='loopCountInput']").value

                    if (xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='offsetCount']").value == '') {
                        optionsJson['option_page_offset'] = "1"
                    } else {
                        optionsJson['option_page_offset'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='offsetCount']").value
                    }

                    xpathPageJson['options'] = optionsJson
                    sendJsonData['xpathPage'] = xpathPageJson


                }
                if (xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector('.pageValueHidden').value == 'more') {
                    let xpathPageJson = {}

                    let xpathOfPageInput = xpathBoxList[i].querySelector('.xpathInput').value
                    let xpathPageValue = xpathBoxList[i].querySelector('.tagOfXpathInput').value

                    xpathPageJson['xpathPage'] = xpathOfPageInput
                    xpathPageJson['xpathPageValue'] = xpathPageValue

                    let optionsJson = {}
                    optionsJson['option_page_type'] = 'more_click'
                    optionsJson['option_page_loop'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='loopCountInput']").value

                    xpathPageJson['options'] = optionsJson
                    sendJsonData['xpathPage'] = xpathPageJson
                }
                if (xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector('.pageValueHidden').value == 'next') {
                    let xpathPageJson = {}

                    let xpathOfPageInput = xpathBoxList[i].querySelector('.xpathInput').value
                    let xpathPageValue = xpathBoxList[i].querySelector('.tagOfXpathInput').value

                    xpathPageJson['xpathPage'] = xpathOfPageInput
                    xpathPageJson['xpathPageValue'] = xpathPageValue  //밑에 중복됨. 나중에 수정필요


                    let optionsJson = {}

                    optionsJson['option_page_type'] = 'next_click'
                    optionsJson['option_page_loop'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='loopCountInput']").value
                    optionsJson['option_page_next_btn_str']=document.querySelector('.nextBtnSearchBar').value


                    xpathPageJson['options'] = optionsJson
                    sendJsonData['xpathPage'] = xpathPageJson
                }
            }
            // 필드( 상세정보 ) 설정인 경우
            else if (targetNameInput.value == '필드') {

                let temp = {}
                temp['xpathField'] = xpathBoxList[i].querySelector('.xpathInput').value
                temp['targetName'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='targetNameField']").value
                temp['mappingName'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='mappingNameField']").value

                // 타이틀 여부 확인
                if (temp['mappingName'] == 'title') {
                    chkTitleFlag = true
                }

                temp['xpathFieldValue'] = xpathBoxList[i].querySelector('.tagOfXpathInput').value

                let options = {}
                options['option_html'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.htmlOrTextOption').querySelector('.htmlOrTextOptionValueInput').value
                temp['options'] = options
                xpathFieldJson[String(fieldCount)] = temp
                fieldCount = fieldCount + 1
            }
            else if (targetNameInput.value == 'select_filter'){
                let temp = {}
                temp['xpathField'] = xpathBoxList[i].querySelector('.xpathInput').value
                temp['targetName'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='targetNameField']").value
                temp['mappingName'] = 'filter_'+xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='mappingNameField']").value


                temp['xpathFieldValue'] = xpathBoxList[i].querySelector('.tagOfXpathInput').value

                let options = {}
                options['option_filter'] = xpathBoxList[i].querySelector('.changeDiv').querySelector("input[name='targetNameInput']").value
                temp['options'] = options
                xpathFieldJson[String(fieldCount)] = temp
                fieldCount = fieldCount + 1
            }
            else if (targetNameInput.value == 'not_select_filter'){
                let temp = {}
                temp['xpathField'] = xpathBoxList[i].querySelector('.xpathInput').value
                temp['targetName'] = xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='targetNameField']").value
                temp['mappingName'] = 'filter_'+xpathBoxList[i].querySelector('.changeDiv').querySelector('.targetBlock').querySelector("input[name='mappingNameField']").value


                temp['xpathFieldValue'] = xpathBoxList[i].querySelector('.tagOfXpathInput').value

                let options = {}
                options['option_filter'] = xpathBoxList[i].querySelector('.changeDiv').querySelector("input[name='targetNameInput']").value
                temp['options'] = options
                xpathFieldJson[String(fieldCount)] = temp
                fieldCount = fieldCount + 1
                }

        }


        sendJsonData['xpathField'] = xpathFieldJson

        if ((!chkTitleFlag) && ((tabFlag == 'field')||(tabFlag == 'fieldInList')) ) {

            if (confirm('[ 경고 ] [ title이 설정되지 않았습니다. 진행하시겠습니까? ]') == true) {    //확인
                document.querySelector('body').style.opacity = '0.3'


            } else {   //취소
                return false;
            }

            if (tabFlag == 'fieldInList'){

                let loopCount = document.querySelector('#crawlingFieldInListCountStep03')
                if (loopCount.value <= 0 || loopCount.value == ''){
                    alert('상단 입력란에 있는 루프횟수를 확인해주세요 . 루프횟수가 0혹은 그 이하로 설정되어있습니다.')
                    return
                }

            }


        }


        // [ xpath 전송 부분 ]

        // fetch('http://127.0.0.1:5000/xpath-extension/xpath-send', {
        //     fetch('https://61.74.186.67:48002/xpath-extension/xpath-send', {
        // fetch('https://192.168.0.33:8001/xpath-extension/xpath-send', {
        // fetch('https://218.159.116.193:8001/xpath-extension/xpath-send', {

        fetch(IP_CONFIG+'/xpath-extension/xpath-send', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendJsonData)
        })
            .then(res => {
                document.querySelector('body').style.opacity = '0.3'
                if (res.ok) {
                    // alert('등록 완료 !')
                    alert('등록 완료 ! ')
                    location.reload()
                }
                else{
                    alert('등록 실패 ! ')
                    location.reload()
                }
            })

    })
}

// 상단 탭 setting
function settingTabBtn() {

    let tabListOrPage = document.querySelector('#tabListOrPage')
    let tabField = document.querySelector('#tabField')
    let tabFieldInList = document.querySelector('#tabFieldInList')
    let tabFilter = document.querySelector('#tabFilter')

    tabListOrPage.addEventListener('click', (event) => {
    tabListOrPage.style.borderBottom = '#FFF 2px solid'
    tabField.style.borderBottom = 'None'
    tabFieldInList.style.borderBottom = 'None'
    tabFilter.style.borderBottom = 'None'

        tabFlag = 'list/page'

        let crawlingListDiv = document.querySelector('#crawlingListDiv')
        while (crawlingListDiv.hasChildNodes()) {
            crawlingListDiv.removeChild(crawlingListDiv.firstChild);
        }
        resetColor(dbDataJson)
        try{
            let crawlingDivStep03Left = document.querySelector('.crawlingDivStep03Left')
            crawlingDivStep03Left.remove()
        }

        catch (e) {
            let a =1
        }

        Object.keys(dbDataJson).forEach(function (jsonKey) {
            if (jsonKey == '리스트') {
                showTotalCount = showTotalCount + 1;
                loadDetail(jsonKey, dbDataJson)

            } else if (jsonKey == '페이지') {
                showTotalCount = showTotalCount + 1;
                loadDetail(jsonKey, dbDataJson)
            } else if ((jsonKey == '게시물영역') || (jsonKey == '게시물클릭영역')) {
                showTotalCount = showTotalCount + 1;
                loadDetail(jsonKey, dbDataJson)
            }
        })


        permissionChkAndRemove(dbDataJson)

    })

    tabField.addEventListener('click', (event) => {
        tabListOrPage.style.borderBottom = 'None'
        tabField.style.borderBottom = '#FFF 2px solid'
        tabFieldInList.style.borderBottom = 'None'
        tabFilter.style.borderBottom = 'None'

        tabFlag = 'field'
        let crawlingListDiv = document.querySelector('#crawlingListDiv')
        while (crawlingListDiv.hasChildNodes()) {
            crawlingListDiv.removeChild(crawlingListDiv.firstChild);
        }

        resetColor(dbDataJson)

        try{
            let crawlingDivStep03Left = document.querySelector('.crawlingDivStep03Left')
            crawlingDivStep03Left.remove()
        }

        catch (e) {
            let a =1
        }

        console.log(dbDataJson)

        Object.keys(dbDataJson).forEach(function (jsonKey) {
            if ((jsonKey != '리스트' && jsonKey != '페이지' && jsonKey !='permission') && (!dbDataJson[jsonKey]['mapping'].includes('field_in_'))   && (!dbDataJson[jsonKey]['mapping'].includes('filter_'))  ) {
                // 필드인경우 , 분기 처리 필요! 우선은 적는다
                showTotalCount = showTotalCount + 1;
                loadDetail(jsonKey, dbDataJson)
            }
        })

        permissionChkAndRemove(dbDataJson)

    })

    tabFieldInList.addEventListener('click',(event)=>{
        tabListOrPage.style.borderBottom = 'None'
        tabField.style.borderBottom = 'None'
        tabFieldInList.style.borderBottom = '#FFF 2px solid'
        tabFilter.style.borderBottom = 'None'
        tabFlag = 'fieldInList'

        let crawlingListDiv = document.querySelector('#crawlingListDiv')
        while (crawlingListDiv.hasChildNodes()) {
            crawlingListDiv.removeChild(crawlingListDiv.firstChild);
        }

        resetColor(dbDataJson)


        Object.keys(dbDataJson).forEach(function (jsonKey) {
            if ((jsonKey != '리스트' && jsonKey != '페이지'&&jsonKey!='상세리스트게시물수' && jsonKey != '게시물영역' && jsonKey != '게시물클릭영역' && jsonKey !='permission')&&(dbDataJson[jsonKey]['mapping'].includes('field_in_list_'))  ){
                // 필드인경우 , 분기 처리 필요! 우선은 적는다
                showTotalCount = showTotalCount + 1;
                loadDetail(jsonKey, dbDataJson)
            }
        })

        permissionChkAndRemove(dbDataJson)

        try {

            let crawlingDivStep03Left = document.querySelector('.crawlingDivStep03Left')
            while (crawlingDivStep03Left.hasChildNodes()) {
                crawlingDivStep03Left.removeChild(crawlingDivStep03Left.firstChild);
            }


        }
        catch (e){
            a = 1
        }


        let crawlingDivStep03 = document.querySelector('.crawlingDivStep03')

        let crawlingDivStep03Left = document.createElement('div')
        crawlingDivStep03Left.setAttribute('class','crawlingDivStep03Left')
        crawlingDivStep03Left.style.display = 'flex'
        crawlingDivStep03Left.style.flexDirection = 'column'
        crawlingDivStep03.append(crawlingDivStep03Left)


        let crawlingCountSpanStep03 = document.createElement('span')
        crawlingCountSpanStep03.setAttribute('id', 'crawlingCountSpanStep03')
        crawlingCountSpanStep03.innerHTML = '게시물 루프 횟수'
        crawlingCountSpanStep03.style.color = '#FFF'
        crawlingCountSpanStep03.style.fontSize = '13px'
        crawlingCountSpanStep03.style.marginBottom = '5px'
        crawlingCountSpanStep03.style.marginTop = '20px'
        crawlingCountSpanStep03.style.display = 'block'
        crawlingCountSpanStep03.style.lineHeight = '2.4'
        crawlingCountSpanStep03.style.fontWeight = '400'
        crawlingDivStep03Left.append(crawlingCountSpanStep03)


        let crawlingFieldInListCountStep03 = document.createElement('input')
        crawlingFieldInListCountStep03.setAttribute('id', 'crawlingFieldInListCountStep03')
        crawlingFieldInListCountStep03.style.padding = '0 7px'
        crawlingFieldInListCountStep03.style.height = '32px'
        crawlingFieldInListCountStep03.style.border = '#c4ccdd 1px solid'
        crawlingFieldInListCountStep03.style.borderRadius = '0'
        crawlingFieldInListCountStep03.style.color = '#000'
        crawlingFieldInListCountStep03.style.backgroundColor = '#c4ccdd'
        crawlingFieldInListCountStep03.style.fontWeight = '500'
        crawlingFieldInListCountStep03.style.fontSize = '13px'
        crawlingFieldInListCountStep03.style.display = 'block'
        crawlingFieldInListCountStep03.style.fontSize = '100%'
        crawlingFieldInListCountStep03.style.outline = 'none'
        crawlingFieldInListCountStep03.style.width = '60%'
        crawlingFieldInListCountStep03.style.marginBottom = '15px'
        crawlingFieldInListCountStep03.value = '0'
        crawlingDivStep03Left.append(crawlingFieldInListCountStep03)

        // console.log(dbDataJson)

        Object.keys(dbDataJson).forEach(function (jsonKey) {

            try{
                if (dbDataJson[jsonKey]['mapping'].includes('field_in_list_')){
                    // loop를 돌고 계속 갱신하긴하지만, loop수를 따로 빼놓은 설계가 아니므로 pass
                    // console.log(JSON.parse(dbDataJson[jsonKey]['options'])['option_loop'])
                    crawlingFieldInListCountStep03.value = JSON.parse(dbDataJson[jsonKey]['options'])['option_loop']
                }
            }
            catch (e){
                a = 1
            }



        })


    })


    tabFilter.addEventListener('click', (event) => {
        tabListOrPage.style.borderBottom = 'None'
        tabField.style.borderBottom = 'None'
        tabFieldInList.style.borderBottom = 'None'
        tabFilter.style.borderBottom = '#FFF 2px solid'

        tabFlag = 'filter'

        let crawlingListDiv = document.querySelector('#crawlingListDiv')
        while (crawlingListDiv.hasChildNodes()) {
            crawlingListDiv.removeChild(crawlingListDiv.firstChild);
        }

        resetColor(dbDataJson)

        try{
            let crawlingDivStep03Left = document.querySelector('.crawlingDivStep03Left')
            crawlingDivStep03Left.remove()
        }

        catch (e) {
            let a =1
        }

        // permission 이 jsonKey인 것은 걸러야한다. loadDetail 내부에서도 걸러주는 조건문 존재

        // console.log(dbDataJson)

        Object.keys(dbDataJson).forEach(function (jsonKey) {
            if ((jsonKey != '리스트' && jsonKey != '페이지'&&jsonKey!='상세리스트게시물수' && jsonKey != '게시물영역' && jsonKey != '게시물클릭영역' && jsonKey !='permission') && (!dbDataJson[jsonKey]['mapping'].includes('field_in_list_')) && (dbDataJson[jsonKey]['mapping'].includes('filter_'))) {
                // 필드인경우 , 분기 처리 필요! 우선은 적는다
                showTotalCount = showTotalCount + 1;
                loadDetail(jsonKey, dbDataJson)
            }
        })

        permissionChkAndRemove(dbDataJson)

    })


}


// 해당영역(리스트안에있는 게시물들의 클래스 한개를 지정하기위함) 클래스 찾는 함수 -> selectbox에 추가
function showClassName(elementArr) {

    let classSelectBox = document.querySelector('.classSelectBox')
    classSelectBox.options.length = 0 // 초기화

    // 기본 blank
    let blankOpt = document.createElement("option");
    blankOpt.text = '클래스없음';
    blankOpt.value = '';
    // console.log(blankOpt)
    classSelectBox.add(blankOpt, null);


    for (let i = 0; i < elementArr.length; i++) {
        try {
            if (elementArr[i].className.length != 0) {

                let firstClassName = elementArr[i].className.split(' ')[0]
                if (classSelectBox.options.length == 0) {
                    classSelectBox.value = firstClassName;
                }

                let opt = document.createElement("option");
                opt.value = firstClassName;
                opt.text = firstClassName;

                classSelectBox.add(opt, null);
            }
        } catch {
            // console.log('do not split')
            // catch로 수행할 일이 없음
            var no_matter_var = 1
        }


    }

}

// 하이타이팅 지우는 함수
function resetColor(res) {
    // 탭 누르면 하이라이팅 지우기
    Object.keys(res).forEach(function (jsonKey) {
        try {
            let target = res[jsonKey]['target']

            getElementByXpath(target).style.backgroundColor = 'transparent';
        } catch (err) {
            console.log('is not target in this tab')
        }

    })
}

// 클릭한 요소 우측 xpath 목록에 추가 하는 함수
function addDetail(myEvent) {

    let crawlingKey = $('#crawlingKeyStep03').val()

    let pageNavBar = myEvent.target
    // console.log(pageNavBar)

    let xpathOfElement = getElementTreeXPath(myEvent.target);
    let element = getElementByXpath(xpathOfElement);

    let elementArr = []


    let xpathBox = document.createElement('div')
    {
        xpathBox.setAttribute('class', 'xpathBox')
        xpathBox.style.width = '100%'
        xpathBox.style.backgroundColor = '#404c66'
        xpathBox.style.paddingTop = '15px'
        xpathBox.style.paddingBottom = '15px'
        xpathBox.style.marginBottom = '25px'
        xpathBox.style.border = '#404c66 1px solid'
    }


    $('#crawlingListDiv').prepend(xpathBox)


    let detailKeyInput = document.createElement('input')
    {
        detailKeyInput.setAttribute('id', 'detailKeyInput')
        detailKeyInput.style.height = '32px'
        detailKeyInput.style.border = '#c4ccdd 1px solid'
        detailKeyInput.style.borderRadius = '0'
        detailKeyInput.style.color = '#000'
        detailKeyInput.style.backgroundColor = '#c4ccdd'
        detailKeyInput.style.fontWeight = '500'
        detailKeyInput.style.fontSize = '13px'
        detailKeyInput.style.display = 'block'
        detailKeyInput.style.outline = 'none'
        detailKeyInput.style.marginLeft = '20px'
        detailKeyInput.style.width = '88%'
        detailKeyInput.style.marginBottom = '15px'
        detailKeyInput.readOnly = 'true'

        //클릭시에는 디테일 키를 모르니 다른 텍스트를 넣는다
        detailKeyInput.value = '새로운 선택 값'

    }

    xpathBox.append(detailKeyInput)

    let xpathInput = document.createElement('input')
    {
        xpathInput.setAttribute('class', 'xpathInput')
        // xpathInput.style.padding = '0 7px'
        xpathInput.style.height = '32px'
        xpathInput.style.border = '#c4ccdd 1px solid'
        xpathInput.style.borderRadius = '0'
        xpathInput.style.color = '#000'
        xpathInput.style.backgroundColor = '#c4ccdd'
        xpathInput.style.fontWeight = '500'
        xpathInput.style.fontSize = '13px'
        xpathInput.style.display = 'block'
        xpathInput.style.outline = 'none'
        xpathInput.style.marginLeft = '20px'
        xpathInput.style.width = '88%'
        xpathInput.style.marginBottom = '15px'
        xpathInput.value = xpathOfElement;
    }


    xpathBox.append(xpathInput)

    let targetElement = getElementByXpath(xpathInput.value);
    elementArr.push(targetElement)

    let tagOfXpathInput = document.createElement('input')
    {
        tagOfXpathInput.setAttribute('class', 'tagOfXpathInput')
        // tagOfXpathInput.style.padding = '0 7px'
        tagOfXpathInput.style.height = '32px'
        tagOfXpathInput.style.border = '#c4ccdd 1px solid'
        tagOfXpathInput.style.borderRadius = '0'
        tagOfXpathInput.style.color = '#000'
        tagOfXpathInput.style.backgroundColor = '#c4ccdd'
        tagOfXpathInput.style.fontWeight = '500'
        tagOfXpathInput.style.fontSize = '13px'
        tagOfXpathInput.style.display = 'block'
        tagOfXpathInput.style.outline = 'none'
        tagOfXpathInput.style.marginLeft = '20px'
        tagOfXpathInput.style.width = '88%'
        tagOfXpathInput.style.marginBottom = '15px'
        tagOfXpathInput.value = element.outerHTML
    }


    xpathBox.append(tagOfXpathInput)

    let btnBlock = null
    let btnList = null
    let btnPage = null
    let btnField = null
    let btnFilter = null

    btnBlock = document.createElement('div')
    {
        btnBlock.setAttribute('class','btnBlock')
        btnBlock.style.marginLeft = '20px'
        btnBlock.style.marginRight = '20px'
        btnBlock.style.marginBottom = '20px'
        btnBlock.style.display = 'flex'
        btnBlock.style.justifyContent = 'space-around'
    }
    xpathBox.append(btnBlock)

    if (tabFlag=='list/page'){

        btnList = document.createElement('button')
        {
            btnList.setAttribute('class', 'btnList')
            btnList.style.display = 'inline-block'
            btnList.style.border = '#157efb 1px solid'
            btnList.style.color = '# #FFF '
            btnList.style.backgroundColor = '#157efb'
            btnList.style.padding = '6px 10px 5px'
            btnList.style.lineHeight = '1.4'
            btnList.style.fontWeight = '400'
            btnList.style.fontSize = '12px'
            btnList.style.opacity = '1'
            btnList.style.cursor = 'pointer'
            btnList.innerHTML = '리스트'
            btnList.style.setProperty('border', '#240086', 'important');
            btnList.style.setProperty('color', '#FFF', 'important');
            btnList.style.setProperty('backgroundColor', '#157efb', 'important');
            btnList.style.setProperty('boxShadow', 'none', 'important');
        }
        btnBlock.append(btnList)


        btnPage = document.createElement('button')
        {
            btnPage.setAttribute('class', 'btnPage')
            btnPage.style.display = 'inline-block'
            btnPage.style.border = '#157efb 1px solid'
            btnPage.style.color = '# #FFF '
            btnPage.style.backgroundColor = '#157efb'
            btnPage.style.padding = '6px 10px 5px'
            btnPage.style.lineHeight = '1.4'
            btnPage.style.fontWeight = '400'
            btnPage.style.fontSize = '12px'
            btnPage.style.opacity = '0.3'
            btnPage.innerHTML = '페이지'
            btnPage.style.cursor = 'pointer'
            btnPage.style.setProperty('border', '#240086', 'important');
            btnPage.style.setProperty('color', '#FFF', 'important');
            btnPage.style.setProperty('backgroundColor', '#157efb', 'important');
            btnPage.style.setProperty('boxShadow', 'none', 'important');
        }

        btnBlock.append(btnPage)






    }
    else if (tabFlag=='field'){
        btnField = document.createElement('button')
        {
            btnField.setAttribute('class', 'btnField')
            btnField.style.display = 'inline-block'
            btnField.style.border = '#157efb 1px solid'
            btnField.style.color = '# #FFF '
            btnField.style.backgroundColor = '#157efb'
            btnField.style.padding = '6px 10px 5px'
            btnField.style.lineHeight = '1.4'
            btnField.style.fontWeight = '400'
            btnField.style.fontSize = '12px'
            btnField.innerHTML = '필드'
            btnField.style.cursor = 'pointer'
            btnField.style.opacity = '0.3'
            btnField.style.setProperty('border', '#240086', 'important');
            btnField.style.setProperty('color', '#FFF', 'important');
            btnField.style.setProperty('backgroundColor', '#157efb', 'important');
            btnField.style.setProperty('boxShadow', 'none', 'important');
        }

        btnBlock.append(btnField)
    }

    else if(tabFlag=='filter'){
        btnFilter = document.createElement('button')
        {
            btnFilter.setAttribute('class', 'btnFilter')
            btnFilter.style.display = 'inline-block'
            btnFilter.style.border = '#157efb 1px solid'
            btnFilter.style.color = '# #FFF '
            btnFilter.style.backgroundColor = '#157efb'
            btnFilter.style.padding = '6px 10px 5px'
            btnFilter.style.lineHeight = '1.4'
            btnFilter.style.fontWeight = '400'
            btnFilter.style.fontSize = '12px'
            btnFilter.style.opacity = '0.3'
            btnFilter.innerHTML = '필터'
            btnFilter.style.cursor = 'pointer'
            btnFilter.style.setProperty('border', '#240086', 'important');
            btnFilter.style.setProperty('color', '#FFF', 'important');
            btnFilter.style.setProperty('backgroundColor', '#157efb', 'important');
            btnFilter.style.setProperty('boxShadow', 'none', 'important');
        }

        btnBlock.append(btnFilter)

    }

    let changeDiv = document.createElement('div')
    changeDiv.setAttribute('class', 'changeDiv')
    changeDiv.style.marginLeft = '20px'
    xpathBox.append(changeDiv)

    let paramOptionBtn = null;
    let moreClickOptionBtn = null;
    let nextClickOptionBtn = null;
    let targetBlockCopy = null;
    
    let notSelectFilterBtn= null;
    let selectFilterBtn= null;

    if (tabFlag=='list/page'){

        btnList.addEventListener('click', (event) => {
            btnList.style.opacity = '1'
            btnPage.style.opacity = '0.3'

            while (changeDiv.hasChildNodes()) {
                changeDiv.removeChild(changeDiv.firstChild);
            }


            let targetBlock = document.createElement('div')
            targetBlock.setAttribute('class', 'targetBlock')
            // //targetBlock.style.marginLeft = '20px'
            targetBlock.style.marginRight = '20px'
            targetBlock.style.display = 'flex'
            targetBlock.style.justifyContent = 'space-around'
            changeDiv.append(targetBlock)


            let targetNameInput = document.createElement('input')
            {
                targetNameInput.setAttribute('name', 'targetNameInput')
                targetNameInput.style.padding = '0 7px'
                targetNameInput.style.height = '32px'
                targetNameInput.style.border = '#c4ccdd 1px solid'
                targetNameInput.style.color = '#000'
                targetNameInput.style.backgroundColor = '#c4ccdd'
                targetNameInput.style.fontWeight = '500'
                targetNameInput.style.fontSize = '13px'
                targetNameInput.style.display = 'inline-block'
                targetNameInput.style.width = '220%'
                targetNameInput.style.outline = 'none'
                targetNameInput.readOnly = 'true'
                targetNameInput.value = '리스트'

            }

            targetBlock.append(targetNameInput)

            let mappingNameInput = document.createElement('input')
            {
                mappingNameInput.setAttribute('name', 'mappingNameInput')
                mappingNameInput.style.padding = '0 7px'
                mappingNameInput.style.height = '32px'
                mappingNameInput.style.border = '#c4ccdd 1px solid'
                mappingNameInput.style.color = '#000'
                mappingNameInput.style.backgroundColor = '#c4ccdd'
                mappingNameInput.style.fontWeight = '500'
                mappingNameInput.style.fontSize = '13px'
                mappingNameInput.style.display = 'inline-block'
                mappingNameInput.style.width = '130%'
                mappingNameInput.style.outline = 'none'
                mappingNameInput.style.marginLeft = '20px'
                mappingNameInput.readOnly = 'true'
                mappingNameInput.value = 'list'
            }

            targetBlock.append(mappingNameInput)


            let scrollOptionBtn = document.createElement('input')
            {
                scrollOptionBtn.setAttribute('type', 'button')
                scrollOptionBtn.setAttribute('class', 'scrollOptionBtn')
                scrollOptionBtn.style.padding = '0 7px'
                scrollOptionBtn.style.height = '32px'
                scrollOptionBtn.style.border = '#c4ccdd 1px solid'
                scrollOptionBtn.style.color = '#000'
                scrollOptionBtn.style.cursor = 'pointer'
                scrollOptionBtn.style.backgroundColor = '#51b1a6'
                scrollOptionBtn.style.fontWeight = '500'
                scrollOptionBtn.style.fontSize = '13px'
                scrollOptionBtn.style.display = 'inline-block'
                scrollOptionBtn.style.width = '100%'
                scrollOptionBtn.style.outline = 'none'
                scrollOptionBtn.readOnly = 'true'
                scrollOptionBtn.value = 'scroll'
                scrollOptionBtn.style.marginLeft = '20px'
                scrollOptionBtn.style.opacity = '0.3'
            }

            targetBlock.append(scrollOptionBtn)

            let scrollOptionVal = document.createElement('input')
            scrollOptionVal.setAttribute('class', 'scrollOptionVal')
            scrollOptionVal.setAttribute('type', 'hidden')
            scrollOptionVal.value = 'not_scroll'
            targetBlock.append(scrollOptionVal)


            let aTagClickBtn = document.createElement('input')
            {
                aTagClickBtn.setAttribute('type', 'button')
                aTagClickBtn.setAttribute('class', 'aTagClickBtn')
                aTagClickBtn.style.padding = '0 7px'
                aTagClickBtn.style.height = '32px'
                aTagClickBtn.style.border = '#c4ccdd 1px solid'
                aTagClickBtn.style.color = '#000'
                aTagClickBtn.style.cursor = 'pointer'
                aTagClickBtn.style.backgroundColor = '#51b1a6'
                aTagClickBtn.style.fontWeight = '500'
                aTagClickBtn.style.fontSize = '13px'
                aTagClickBtn.style.display = 'inline-block'
                aTagClickBtn.style.width = '100%'
                aTagClickBtn.style.outline = 'none'
                aTagClickBtn.readOnly = 'true'
                aTagClickBtn.value = 'aTag'
                aTagClickBtn.style.marginLeft = '20px'
            }

            targetBlock.append(aTagClickBtn)


            let rowClickBtn = document.createElement('input')
            {
                rowClickBtn.setAttribute('type', 'button')
                rowClickBtn.setAttribute('class', 'rowClickBtn')
                rowClickBtn.style.padding = '0 7px'
                rowClickBtn.style.height = '32px'
                rowClickBtn.style.border = '#c4ccdd 1px solid'
                rowClickBtn.style.color = '#000'
                rowClickBtn.style.cursor = 'pointer'
                rowClickBtn.style.backgroundColor = '#51b1a6'
                rowClickBtn.style.fontWeight = '500'
                rowClickBtn.style.fontSize = '13px'
                rowClickBtn.style.display = 'inline-block'
                rowClickBtn.style.width = '100%'
                rowClickBtn.style.outline = 'none'
                rowClickBtn.readOnly = 'true'
                rowClickBtn.value = 'row'
                rowClickBtn.style.opacity = '0.3'
                rowClickBtn.style.marginLeft = '20px'
            }

            targetBlock.append(rowClickBtn)


            let listClickType = document.createElement('input')
            listClickType.setAttribute('type', 'hidden')
            listClickType.setAttribute('class', 'listClickType')
            listClickType.value = 'aTag'
            targetBlock.append(listClickType)


            // 0906 클릭 시 추가
            let rowClickBlock = document.createElement('div')
            rowClickBlock.setAttribute('class','rowClickBlock')
            rowClickBlock.style.marginTop = '20px'

            let rowXpathInputSpan = document.createElement('span')
            {
                rowXpathInputSpan.style.display='block'
                rowXpathInputSpan.style.fontSize='18px'
                rowXpathInputSpan.innerText = '클릭을 반복 하려는 xpath \n[ 루프할 숫자에 \'?\' 를 꼭 넣어주세요 ]'
                rowXpathInputSpan.style.color = 'white'
                rowXpathInputSpan.style.fontWeight = 'bold'
                rowXpathInputSpan.style.lineHeight = '25px'

            }
            rowClickBlock.append(rowXpathInputSpan)
            let rowXpathInput = document.createElement('input')
            {
                rowXpathInput.setAttribute('class','rowXpathInput')
                rowXpathInput.style.height = '32px'
                rowXpathInput.style.border = '#c4ccdd 1px solid'
                rowXpathInput.style.borderRadius = '0'
                rowXpathInput.style.color = '#000'
                rowXpathInput.style.backgroundColor = '#ba96e2'
                rowXpathInput.style.fontWeight = '500'
                rowXpathInput.style.fontSize = '13px'
                rowXpathInput.style.display = 'block'
                rowXpathInput.style.outline = 'none'
                rowXpathInput.style.width = '88%'
                rowXpathInput.style.marginBottom = '15px'
                rowXpathInput.value = xpathOfElement;
                rowXpathInput.style.marginTop='10px'
            }


            rowClickBlock.append(rowXpathInput)



            let rowXpathLoopSpan = document.createElement('span')
            {
                rowXpathLoopSpan.style.display='block'
                rowXpathLoopSpan.style.fontSize='18px'
                rowXpathLoopSpan.innerText = '루프 횟수'
                rowXpathLoopSpan.style.color = 'white'
                rowXpathLoopSpan.style.fontWeight = 'bold'
            }


            rowClickBlock.append(rowXpathLoopSpan)

            let rowXpathLoopInput = document.createElement('input')
            {
                rowXpathLoopInput.setAttribute('class','rowXpathLoopInput')
                rowXpathLoopInput.style.height = '32px'
                rowXpathLoopInput.style.border = '#c4ccdd 1px solid'
                rowXpathLoopInput.style.borderRadius = '0'
                rowXpathLoopInput.style.color = '#000'
                rowXpathLoopInput.style.backgroundColor = '#c4ccdd'
                rowXpathLoopInput.style.fontWeight = '500'
                rowXpathLoopInput.style.fontSize = '13px'
                rowXpathLoopInput.style.display = 'block'
                rowXpathLoopInput.style.outline = 'none'
                rowXpathLoopInput.style.width = '150px'
                rowXpathLoopInput.style.marginBottom = '15px'
                rowXpathLoopInput.style.marginTop='10px'
            }
            rowClickBlock.append(rowXpathLoopInput)

            ///////////


            scrollOptionBtn.addEventListener('click', (event) => {
                if (scrollOptionVal.value == 'scroll') {
                    scrollOptionVal.value = 'not_scroll'
                    scrollOptionBtn.style.opacity = '0.3'

                } else {
                    scrollOptionVal.value = 'scroll'
                    scrollOptionBtn.style.opacity = '1'

                }
            })


            aTagClickBtn.addEventListener('click', (event) => {
                aTagClickBtn.style.opacity = '1'
                rowClickBtn.style.opacity = '0.3'
                listClickType.value = 'aTag'

                try{
                    changeDiv.removeChild(rowClickBlock)
                }
                catch (e){
                    // 에러메시지 X
                    let a = 0
                }

            })

            rowClickBtn.addEventListener('click', (event) => {
                aTagClickBtn.style.opacity = '0.3'
                rowClickBtn.style.opacity = '1'
                listClickType.value = 'row'

                changeDiv.append(rowClickBlock)
            })


            let upDownBlock = document.createElement('div')
            {
                upDownBlock.setAttribute('class', 'fieldBlock')
                upDownBlock.style.marginRight = '20px'
                upDownBlock.style.marginTop = '20px'
                upDownBlock.style.display = 'flex'
                upDownBlock.style.justifyContent = 'space-between'

            }

            changeDiv.append(upDownBlock)


            let upBtn = document.createElement('button')
            {
                upBtn.style.width = '40%'
                upBtn.style.padding = '6px 10px 5px'
                upBtn.style.lineHeight = '1.4'
                upBtn.style.fontWeight = '400'
                upBtn.style.fontSize = '12px'
                upBtn.style.border = '#157efb 1px solid'
                upBtn.style.color = '#FFF'
                upBtn.style.backgroundColor = ' #157efb'
                upBtn.style.boxShadow = 'none'
                upBtn.innerHTML = '↑ 상위 요소'
                upBtn.style.cursor = 'pointer'
                upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                upBtn.style.setProperty('color', '#FFF', 'important');
                upBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(upBtn)

            let downBtn = document.createElement('button')
            {
                downBtn.style.width = '40%'
                downBtn.style.padding = '6px 10px 5px'
                downBtn.style.lineHeight = '1.4'
                downBtn.style.fontWeight = '400'
                downBtn.style.fontSize = '12px'
                downBtn.style.border = '#157efb 1px solid'
                downBtn.style.color = '#FFF'
                downBtn.style.backgroundColor = ' #157efb'
                downBtn.style.boxShadow = 'none'
                downBtn.innerHTML = '↓ 하위 요소'
                downBtn.style.cursor = 'pointer'
                downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                downBtn.style.setProperty('color', '#FFF', 'important');
                downBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(downBtn)


            let delBtn = document.createElement('button')
            {
                delBtn.setAttribute('class', 'delBtn')
                delBtn.style.padding = '6px 10px 5px'
                delBtn.style.lineHeight = '1.4'
                delBtn.style.fontWeight = '400'
                delBtn.style.fontSize = '12px'
                delBtn.style.border = '#157efb 1px solid'
                delBtn.style.color = '#FFF'
                delBtn.style.backgroundColor = ' #e1185f'
                delBtn.style.boxShadow = 'none'
                delBtn.innerHTML = '삭제'
                delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
                delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
                delBtn.style.setProperty('color', '#FFF', 'important');
                delBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(delBtn)


            let selectBlock = document.createElement('div')
            {
                selectBlock.setAttribute('class', 'selectBlock')
                selectBlock.style.marginRight = '20px'
                selectBlock.style.marginTop = '20px'
                selectBlock.style.display = 'flex'
                selectBlock.style.justifyContent = 'space-between'
            }


            changeDiv.append(selectBlock)


            let classSelectBox = document.createElement("select");
            classSelectBox.setAttribute('class', 'classSelectBox')
            classSelectBox.style.marginLeft = '20px'
            classSelectBox.style.width = '200px'
            selectBlock.append(classSelectBox)


            showClassName(elementArr)

            delBtn.addEventListener('click', (event) => {
                xpathBox.remove()
                getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                let count = $('#crawlingCountStep03').val()
                count = count - 1
                $('#crawlingCountStep03').val(count)

            })


            upBtn.addEventListener('click', (event) => {

                let targetElement = getElementByXpath(xpathInput.value);
                elementArr.push(targetElement)


                if (targetElement.parentElement != null) {
                    xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                    highLightTag(getElementByXpath(xpathInput.value));
                    tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;


                    showClassName(elementArr)

                } else if (targetElement.parentElement == null) {
                    alert('상위 요소가 없습니다.');
                }
            })


            downBtn.addEventListener('click', (event) => {

                // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
                // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

                if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                    // 맨앞에 자식요소[0] 추가
                    elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                    if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                        alert('최초 선택 요소 입니다.')
                        // elementArr.pop();
                    } else {
                        getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                        xpathInput.value = getElementTreeXPath(elementArr.pop());
                        highLightTag(getElementByXpath(xpathInput.value))
                        tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;


                        showClassName(elementArr)

                    }

                } else {
                    alert('자식요소가 없습니다.')
                }

            })

        })

        btnPage.addEventListener('click', (event) => {
            btnList.style.opacity = '0.3'
            btnPage.style.opacity = '1'
            // btnFilter.style.opacity='0.3'
            // btnField.style.opacity = '0.3'
            // btnDetailList.style.opacity = '0.3'

            while (changeDiv.hasChildNodes()) {
                changeDiv.removeChild(changeDiv.firstChild);
            }

            //////// 페이지는 한 블럭이 더 있어야함 ( 옵션 설정 블록 )  //////

            let pageBtnBlock = document.createElement('div')
            {
                pageBtnBlock.setAttribute('class','pageBtnBlock')
                pageBtnBlock.style.marginLeft = '20px'
                pageBtnBlock.style.marginRight = '20px'
                pageBtnBlock.style.marginBottom = '20px'
                pageBtnBlock.style.display = 'flex'
            }
            changeDiv.append(pageBtnBlock)


            // param option btn
            paramOptionBtn = document.createElement('button')
            {
                paramOptionBtn.setAttribute('class', 'paramOptionBtn')
                paramOptionBtn.style.display = 'inline-block'
                paramOptionBtn.style.color = '#FFF '
                paramOptionBtn.style.backgroundColor = '#87d245'
                paramOptionBtn.style.padding = '6px 10px 5px'
                paramOptionBtn.style.lineHeight = '1.4'
                paramOptionBtn.style.fontWeight = '400'
                paramOptionBtn.style.fontSize = '12px'
                paramOptionBtn.innerHTML = 'param'
                paramOptionBtn.style.cursor = 'pointer'
                paramOptionBtn.style.marginRight = '8px'
                paramOptionBtn.style.opacity = '1'
                paramOptionBtn.style.setProperty('color', '#FFF', 'important');
                paramOptionBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                paramOptionBtn.style.setProperty('boxShadow', 'none', 'important');
            }
            pageBtnBlock.append(paramOptionBtn)


            // more click option btn
            moreClickOptionBtn = document.createElement('button')
            {
                moreClickOptionBtn.setAttribute('class', 'moreClickOptionBtn')
                moreClickOptionBtn.style.display = 'inline-block'
                moreClickOptionBtn.style.color = '#FFF '
                moreClickOptionBtn.style.backgroundColor = '#87d245'
                moreClickOptionBtn.style.padding = '6px 10px 5px'
                moreClickOptionBtn.style.lineHeight = '1.4'
                moreClickOptionBtn.style.fontWeight = '400'
                moreClickOptionBtn.style.fontSize = '12px'
                moreClickOptionBtn.innerHTML = 'moreClick'
                moreClickOptionBtn.style.cursor = 'pointer'
                moreClickOptionBtn.style.marginRight = '8px'
                moreClickOptionBtn.style.opacity = '0.3'
                moreClickOptionBtn.style.setProperty('color', '#FFF', 'important');
                moreClickOptionBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                moreClickOptionBtn.style.setProperty('boxShadow', 'none', 'important');
            }
            pageBtnBlock.append(moreClickOptionBtn)

            // next click option btn
            nextClickOptionBtn = document.createElement('button')
            {
                nextClickOptionBtn.setAttribute('class', 'nextClickOptionBtn')
                nextClickOptionBtn.style.display = 'inline-block'
                nextClickOptionBtn.style.color = '#FFF '
                nextClickOptionBtn.style.backgroundColor = '#87d245'
                nextClickOptionBtn.style.padding = '6px 10px 5px'
                nextClickOptionBtn.style.lineHeight = '1.4'
                nextClickOptionBtn.style.fontWeight = '400'
                nextClickOptionBtn.style.fontSize = '12px'
                nextClickOptionBtn.innerHTML = 'nextClick'
                nextClickOptionBtn.style.cursor = 'pointer'
                nextClickOptionBtn.style.marginRight = '8px'
                nextClickOptionBtn.style.opacity = '0.3'
                nextClickOptionBtn.style.setProperty('color', '#FFF', 'important');
                nextClickOptionBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                nextClickOptionBtn.style.setProperty('boxShadow', 'none', 'important');
            }


            pageBtnBlock.append(nextClickOptionBtn)

            // pageBtnBlock 의 버튼 클릭시 targetBlock만 내용이 바뀜

            let targetBlock = document.createElement('div')
            targetBlock.setAttribute('class', 'targetBlock')
            //targetBlock.style.marginLeft = '20px'
            targetBlock.style.marginRight = '20px'
            targetBlock.style.display = 'flex'
            targetBlock.style.justifyContent = 'space-around'
            changeDiv.append(targetBlock)

            targetBlockCopy = targetBlock

            let targetNameInput = document.createElement('input')
            {
                targetNameInput.setAttribute('name', 'targetNameInput')
                targetNameInput.style.padding = '0 7px'
                targetNameInput.style.height = '32px'
                targetNameInput.style.border = '#c4ccdd 1px solid'
                targetNameInput.style.color = '#000'
                targetNameInput.style.backgroundColor = '#c4ccdd'
                targetNameInput.style.fontWeight = '500'
                targetNameInput.style.fontSize = '13px'
                targetNameInput.style.display = 'inline-block'
                targetNameInput.style.width = '220%'
                targetNameInput.style.outline = 'none'
                targetNameInput.readOnly = 'true'
                targetNameInput.value = '페이지'
            }

            targetBlock.append(targetNameInput)

            let mappingNameInput = document.createElement('input')
            {
                mappingNameInput.setAttribute('name', 'mappingNameInput')
                mappingNameInput.style.padding = '0 7px'
                mappingNameInput.style.height = '32px'
                mappingNameInput.style.border = '#c4ccdd 1px solid'
                mappingNameInput.style.color = '#000'
                mappingNameInput.style.backgroundColor = '#c4ccdd'
                mappingNameInput.style.fontWeight = '500'
                mappingNameInput.style.fontSize = '13px'
                mappingNameInput.style.display = 'inline-block'
                mappingNameInput.style.width = '100%'
                mappingNameInput.style.outline = 'none'
                mappingNameInput.style.marginLeft = '20px'
                mappingNameInput.placeholder = '파라미터'
            }

            targetBlock.append(mappingNameInput)


            let loopCountInput = document.createElement('input')
            {
                loopCountInput.setAttribute('name', 'loopCountInput')
                loopCountInput.style.padding = '0 7px'
                loopCountInput.style.height = '32px'
                loopCountInput.style.border = '#c4ccdd 1px solid'
                loopCountInput.style.color = '#000'
                loopCountInput.style.backgroundColor = '#c4ccdd'
                loopCountInput.style.fontWeight = '500'
                loopCountInput.style.fontSize = '13px'
                loopCountInput.style.display = 'inline-block'
                loopCountInput.style.width = '100%'
                loopCountInput.style.outline = 'none'
                loopCountInput.style.marginLeft = '20px'
                loopCountInput.placeholder = '루프횟수'
            }

            targetBlock.append(loopCountInput)


            let offsetCount = document.createElement('input')
            {
                offsetCount.setAttribute('name', 'offsetCount')
                offsetCount.style.padding = '0 7px'
                offsetCount.style.height = '32px'
                offsetCount.style.border = '#c4ccdd 1px solid'
                offsetCount.style.color = '#000'
                offsetCount.style.backgroundColor = '#c4ccdd'
                offsetCount.style.fontWeight = '500'
                offsetCount.style.fontSize = '13px'
                offsetCount.style.display = 'inline-block'
                offsetCount.style.width = '100%'
                offsetCount.style.outline = 'none'
                offsetCount.style.marginLeft = '20px'
                offsetCount.placeholder = 'offset 기본 1'
            }

            targetBlock.append(offsetCount)


            let pageValueHidden = document.createElement('input')
            pageValueHidden.setAttribute('class', 'pageValueHidden')
            pageValueHidden.setAttribute('type', 'hidden')
            //초기는 param 이 디폴트
            pageValueHidden.value = 'param'
            targetBlock.append(pageValueHidden)


            let upDownBlock = document.createElement('div')
            upDownBlock.setAttribute('class', 'fieldBlock')
            upDownBlock.style.marginRight = '20px'
            upDownBlock.style.marginTop = '20px'
            upDownBlock.style.display = 'flex'
            upDownBlock.style.justifyContent = 'space-between'
            changeDiv.append(upDownBlock)


            let upBtn = document.createElement('button')
            {
                upBtn.style.width = '40%'
                upBtn.style.padding = '6px 10px 5px'
                upBtn.style.lineHeight = '1.4'
                upBtn.style.fontWeight = '400'
                upBtn.style.fontSize = '12px'
                upBtn.style.border = '#157efb 1px solid'
                upBtn.style.color = '#FFF'
                upBtn.style.backgroundColor = ' #157efb'
                upBtn.style.boxShadow = 'none'
                upBtn.innerHTML = '↑ 상위 요소'
                upBtn.style.cursor = 'pointer'
                upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                upBtn.style.setProperty('color', '#FFF', 'important');
                upBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(upBtn)

            let downBtn = document.createElement('button')
            {
                downBtn.style.width = '40%'
                downBtn.style.padding = '6px 10px 5px'
                downBtn.style.lineHeight = '1.4'
                downBtn.style.fontWeight = '400'
                downBtn.style.fontSize = '12px'
                downBtn.style.cursor = 'pointer'

                downBtn.style.border = '#157efb 1px solid'
                downBtn.style.color = '#FFF'
                downBtn.style.backgroundColor = ' #157efb'
                downBtn.style.boxShadow = 'none'
                downBtn.innerHTML = '↓ 하위 요소'
                downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                downBtn.style.setProperty('color', '#FFF', 'important');
                downBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(downBtn)


            let delBtn = document.createElement('button')
            {
                delBtn.setAttribute('class', 'delBtn')
                delBtn.style.padding = '6px 10px 5px'
                delBtn.style.lineHeight = '1.4'
                delBtn.style.fontWeight = '400'
                delBtn.style.fontSize = '12px'
                delBtn.style.border = '#157efb 1px solid'
                delBtn.style.color = '#FFF'
                delBtn.style.backgroundColor = ' #e1185f'
                delBtn.style.boxShadow = 'none'
                delBtn.innerHTML = '삭제'
                delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
                delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
                delBtn.style.setProperty('color', '#FFF', 'important');
                delBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(delBtn)

            delBtn.addEventListener('click', (event) => {
                xpathBox.remove()
                getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                let count = $('#crawlingCountStep03').val()
                count = count - 1
                $('#crawlingCountStep03').val(count)

            })

            upBtn.addEventListener('click', (event) => {

                let targetElement = getElementByXpath(xpathInput.value);
                elementArr.push(targetElement)

                if (targetElement.parentElement != null) {
                    xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                    highLightTag(getElementByXpath(xpathInput.value));
                    tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                    pageNavBar = getElementByXpath(xpathInput.value)
                    // console.log(pageNavBar)

                } else if (targetElement.parentElement == null) {
                    alert('상위 요소가 없습니다.');
                }
            })


            downBtn.addEventListener('click', (event) => {

                // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
                // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

                if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                    // 맨앞에 자식요소[0] 추가
                    elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                    if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                        alert('최초 선택 요소 입니다.')
                        // elementArr.pop();
                    } else {
                        getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                        xpathInput.value = getElementTreeXPath(elementArr.pop());
                        highLightTag(getElementByXpath(xpathInput.value))
                        tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;


                        pageNavBar = getElementByXpath(xpathInput.value)
                        // console.log(pageNavBar)

                    }

                } else {
                    alert('자식요소가 없습니다.')
                }

            })

            //페이지의 pageBtnBlock
            paramOptionBtn.addEventListener('click', (event) => {
                paramOptionBtn.style.opacity = '1'
                moreClickOptionBtn.style.opacity = '0.3'
                nextClickOptionBtn.style.opacity = '0.3'

                while (targetBlock.hasChildNodes()) {
                    targetBlock.removeChild(targetBlock.firstChild);
                }

                try{
                    document.querySelector('.nextBtnBlock').remove()
                }
                catch(e){
                    a=1
                }

                let targetNameInput = document.createElement('input')
                {
                    targetNameInput.setAttribute('name', 'targetNameInput')
                    targetNameInput.style.padding = '0 7px'
                    targetNameInput.style.height = '32px'
                    targetNameInput.style.border = '#c4ccdd 1px solid'
                    targetNameInput.style.color = '#000'
                    targetNameInput.style.backgroundColor = '#c4ccdd'
                    targetNameInput.style.fontWeight = '500'
                    targetNameInput.style.fontSize = '13px'
                    targetNameInput.style.display = 'inline-block'
                    targetNameInput.style.width = '220%'
                    targetNameInput.style.outline = 'none'
                    targetNameInput.readOnly = 'true'
                    targetNameInput.value = '페이지'
                }


                targetBlock.append(targetNameInput)

                let mappingNameInput = document.createElement('input')
                {
                    mappingNameInput.setAttribute('name', 'mappingNameInput')
                    mappingNameInput.style.padding = '0 7px'
                    mappingNameInput.style.height = '32px'
                    mappingNameInput.style.border = '#c4ccdd 1px solid'
                    mappingNameInput.style.color = '#000'
                    mappingNameInput.style.backgroundColor = '#c4ccdd'
                    mappingNameInput.style.fontWeight = '500'
                    mappingNameInput.style.fontSize = '13px'
                    mappingNameInput.style.display = 'inline-block'
                    mappingNameInput.style.width = '100%'
                    mappingNameInput.style.outline = 'none'
                    mappingNameInput.style.marginLeft = '20px'
                    mappingNameInput.placeholder = '파라미터'
                }

                targetBlock.append(mappingNameInput)


                let loopCountInput = document.createElement('input')
                {
                    loopCountInput.setAttribute('name', 'loopCountInput')
                    loopCountInput.style.padding = '0 7px'
                    loopCountInput.style.height = '32px'
                    loopCountInput.style.border = '#c4ccdd 1px solid'
                    loopCountInput.style.color = '#000'
                    loopCountInput.style.backgroundColor = '#c4ccdd'
                    loopCountInput.style.fontWeight = '500'
                    loopCountInput.style.fontSize = '13px'
                    loopCountInput.style.display = 'inline-block'
                    loopCountInput.style.width = '100%'
                    loopCountInput.style.outline = 'none'
                    loopCountInput.style.marginLeft = '20px'
                    loopCountInput.placeholder = '루프횟수'
                }


                targetBlock.append(loopCountInput)

                let offsetCount = document.createElement('input')
                {
                    offsetCount.setAttribute('name', 'offsetCount')
                    offsetCount.style.padding = '0 7px'
                    offsetCount.style.height = '32px'
                    offsetCount.style.border = '#c4ccdd 1px solid'
                    offsetCount.style.color = '#000'
                    offsetCount.style.backgroundColor = '#c4ccdd'
                    offsetCount.style.fontWeight = '500'
                    offsetCount.style.fontSize = '13px'
                    offsetCount.style.display = 'inline-block'
                    offsetCount.style.width = '100%'
                    offsetCount.style.outline = 'none'
                    offsetCount.style.marginLeft = '20px'
                    offsetCount.placeholder = 'offset 기본 1'
                }

                targetBlock.append(offsetCount)

                let pageValueHidden = document.createElement('input')
                pageValueHidden.setAttribute('class', 'pageValueHidden')
                pageValueHidden.setAttribute('type', 'hidden')
                pageValueHidden.value = 'param'
                targetBlock.append(pageValueHidden)

                targetBlockCopy = targetBlock
            })

            moreClickOptionBtn.addEventListener('click', (event) => {
                paramOptionBtn.style.opacity = '0.3'
                moreClickOptionBtn.style.opacity = '1'
                nextClickOptionBtn.style.opacity = '0.3'


                while (targetBlock.hasChildNodes()) {
                    targetBlock.removeChild(targetBlock.firstChild);
                }
                try{
                    document.querySelector('.nextBtnBlock').remove()
                }
                catch(e){
                    a=1
                }


                let targetNameInput = document.createElement('input')
                targetNameInput.setAttribute('name', 'targetNameInput')
                targetNameInput.style.padding = '0 7px'
                targetNameInput.style.height = '32px'
                targetNameInput.style.border = '#c4ccdd 1px solid'
                targetNameInput.style.color = '#000'
                targetNameInput.style.backgroundColor = '#c4ccdd'
                targetNameInput.style.fontWeight = '500'
                targetNameInput.style.fontSize = '13px'
                targetNameInput.style.display = 'inline-block'
                targetNameInput.style.width = '220%'
                targetNameInput.style.outline = 'none'
                targetNameInput.readOnly = 'true'
                targetNameInput.value = '페이지'
                targetBlock.append(targetNameInput)

                let loopCountInput = document.createElement('input')
                loopCountInput.setAttribute('name', 'loopCountInput')
                loopCountInput.style.padding = '0 7px'
                loopCountInput.style.height = '32px'
                loopCountInput.style.border = '#c4ccdd 1px solid'
                loopCountInput.style.color = '#000'
                loopCountInput.style.backgroundColor = '#c4ccdd'
                loopCountInput.style.fontWeight = '500'
                loopCountInput.style.fontSize = '13px'
                loopCountInput.style.display = 'inline-block'
                loopCountInput.style.width = '100%'
                loopCountInput.style.outline = 'none'
                loopCountInput.style.marginLeft = '20px'
                loopCountInput.placeholder = '루프횟수'

                targetBlock.append(loopCountInput)


                let pageValueHidden = document.createElement('input')
                pageValueHidden.setAttribute('class', 'pageValueHidden')
                pageValueHidden.setAttribute('type', 'hidden')
                pageValueHidden.value = ''
                targetBlock.append(pageValueHidden)

                pageValueHidden.value = 'more'


            })

            nextClickOptionBtn.addEventListener('click', (event) => {


                paramOptionBtn.style.opacity = '0.3'
                moreClickOptionBtn.style.opacity = '0.3'
                nextClickOptionBtn.style.opacity = '1'


                while (targetBlock.hasChildNodes()) {
                    targetBlock.removeChild(targetBlock.firstChild);
                }

                try{
                    document.querySelector('.nextBtnBlock').remove()
                }
                catch(e){
                    a=1
                }


                let targetNameInput = document.createElement('input')
                {

                    targetNameInput.setAttribute('name', 'targetNameInput')
                    targetNameInput.style.padding = '0 7px'
                    targetNameInput.style.height = '32px'
                    targetNameInput.style.border = '#c4ccdd 1px solid'
                    targetNameInput.style.color = '#000'
                    targetNameInput.style.backgroundColor = '#c4ccdd'
                    targetNameInput.style.fontWeight = '500'
                    targetNameInput.style.fontSize = '13px'
                    targetNameInput.style.display = 'inline-block'
                    targetNameInput.style.width = '220%'
                    targetNameInput.style.outline = 'none'
                    targetNameInput.readOnly = 'true'
                    targetNameInput.value = '페이지'
                }
                targetBlock.append(targetNameInput)

                let loopCountInput = document.createElement('input')
                {

                    loopCountInput.setAttribute('name', 'loopCountInput')
                    loopCountInput.style.padding = '0 7px'
                    loopCountInput.style.height = '32px'
                    loopCountInput.style.border = '#c4ccdd 1px solid'
                    loopCountInput.style.color = '#000'
                    loopCountInput.style.backgroundColor = '#c4ccdd'
                    loopCountInput.style.fontWeight = '500'
                    loopCountInput.style.fontSize = '13px'
                    loopCountInput.style.display = 'inline-block'
                    loopCountInput.style.width = '100%'
                    loopCountInput.style.outline = 'none'
                    loopCountInput.style.marginLeft = '20px'
                    loopCountInput.placeholder = '루프횟수'
                }


                targetBlock.append(loopCountInput)


                let pageValueHidden = document.createElement('input')
                pageValueHidden.setAttribute('class', 'pageValueHidden')
                pageValueHidden.setAttribute('type', 'hidden')
                pageValueHidden.value = ''
                targetBlock.append(pageValueHidden)
                pageValueHidden.value = 'next'
                // pageValueHidden은 페이지 버튼의 종류를 저장하는것, next, more, param
                targetBlockCopy = targetBlock


                // next버튼은 클릭한 태그의 정보에 대한 값을 갖는다 -> 가져온값으로 추출

                // let pageLoopTagName = document.createElement('input')
                // pageLoopTagName.setAttribute('class', 'pageLoopTagName')
                // pageLoopTagName.setAttribute('type', 'hidden')
                // pageLoopTagName.value = clicked_tag_name;
                //
                // let pageLoopTagId = document.createElement('input')
                // pageLoopTagId.setAttribute('class', 'pageLoopTagId')
                // pageLoopTagId.setAttribute('type', 'hidden')
                // pageLoopTagId.value = clicked_tag_id;
                //
                // let pageLoopTagClass = document.createElement('input')
                // pageLoopTagClass.setAttribute('class', 'pageLoopTagClass')
                // pageLoopTagClass.setAttribute('type', 'hidden')
                // pageLoopTagClass.value = clicked_tag_class;
                //
                // let pageLoopTagInnerText = document.createElement('input')
                // pageLoopTagInnerText.setAttribute('class', 'pageLoopTagInnerText')
                // pageLoopTagInnerText.setAttribute('type', 'hidden')
                // pageLoopTagInnerText.value = clicked_tag_text;
                //
                // targetBlock.append(pageLoopTagName)
                // targetBlock.append(pageLoopTagId)
                // targetBlock.append(pageLoopTagClass)
                // targetBlock.append(pageLoopTagInnerText)

                let nextBtnBlock = document.createElement('div')
                nextBtnBlock.setAttribute('class','nextBtnBlock')
                nextBtnBlock.style.width = '100%'
                nextBtnBlock.style.display='flex'
                nextBtnBlock.style.flexDirection='column'

                changeDiv.append(nextBtnBlock)


                let nextBtnSearchBar = document.createElement('input')
                nextBtnSearchBar.setAttribute('class', 'nextBtnSearchBar')
                nextBtnSearchBar.style.padding = '0 7px'
                nextBtnSearchBar.style.height = '32px'
                nextBtnSearchBar.style.border = '#c4ccdd 1px solid'
                nextBtnSearchBar.style.color = '#000'
                nextBtnSearchBar.style.backgroundColor = '#6fd791'
                nextBtnSearchBar.style.fontWeight = '500'
                nextBtnSearchBar.style.fontSize = '13px'
                nextBtnSearchBar.style.display = 'block'
                nextBtnSearchBar.style.width = '90%'
                nextBtnSearchBar.style.outline = 'none'
                nextBtnSearchBar.style.marginTop = '30px'

                nextBtnSearchBar.placeholder = 'next btn feature'
                nextBtnBlock.append(nextBtnSearchBar)




            })


        })


        btnList.click()

    }

    else if(tabFlag=='field'){

        btnField.addEventListener('click', (event) => {

            // if (tabFlag=='list/page') {
            //     btnList.style.opacity = '0.3'
            //     btnPage.style.opacity = '0.3'
            // }

            btnField.style.opacity = '1'
            // btnDetailList.style.opacity = '0.3'

            while (changeDiv.hasChildNodes()) {
                changeDiv.removeChild(changeDiv.firstChild);
            }

            let targetBlock = document.createElement('div')
            {
                targetBlock.setAttribute('class', 'targetBlock')
                targetBlock.style.marginRight = '20px'
                targetBlock.style.display = 'flex'
            }

            changeDiv.append(targetBlock)

            let targetNameInput = document.createElement('input')
            {
                targetNameInput.setAttribute('name', 'targetNameInput')
                targetNameInput.style.padding = '0 7px'
                targetNameInput.style.height = '32px'
                targetNameInput.style.border = '#c4ccdd 1px solid'
                targetNameInput.style.color = '#000'
                targetNameInput.style.backgroundColor = '#c4ccdd'
                targetNameInput.style.fontWeight = '500'
                targetNameInput.style.fontSize = '13px'
                targetNameInput.style.display = 'inline-block'
                targetNameInput.style.width = '220%'
                targetNameInput.style.outline = 'none'
                targetNameInput.readOnly = 'true'
                targetNameInput.value = '필드'
            }

            targetBlock.append(targetNameInput)


            let targetNameField = document.createElement('input')
            {
                targetNameField.setAttribute('name', 'targetNameField')
                targetNameField.style.padding = '0 7px'
                targetNameField.style.height = '32px'
                targetNameField.style.border = '#c4ccdd 1px solid'
                targetNameField.style.color = '#000'
                targetNameField.style.backgroundColor = '#c4ccdd'
                targetNameField.style.fontWeight = '500'
                targetNameField.style.fontSize = '13px'
                targetNameField.style.display = 'inline-block'
                targetNameField.style.width = '100%'
                targetNameField.style.marginLeft = '20px'
                targetNameField.style.outline = 'none'
                targetNameField.placeholder = '명칭(Target Name)'
            }

            targetBlock.append(targetNameField)


            let mappingNameField = document.createElement('input')
            {
                mappingNameField.setAttribute('name', 'mappingNameField')
                mappingNameField.style.padding = '0 7px'
                mappingNameField.style.height = '32px'
                mappingNameField.style.border = '#c4ccdd 1px solid'
                mappingNameField.style.color = '#000'
                mappingNameField.style.backgroundColor = '#c4ccdd'
                mappingNameField.style.fontWeight = '500'
                mappingNameField.style.fontSize = '13px'
                mappingNameField.style.display = 'inline-block'
                mappingNameField.style.width = '100%'
                mappingNameField.style.outline = 'none'
                mappingNameField.style.marginLeft = '20px'
                mappingNameField.placeholder = '맵핑(Mapping Name)'
            }


            targetBlock.append(mappingNameField)


            let htmlOrTextOptionBlock = document.createElement('div')
            {
                htmlOrTextOptionBlock.setAttribute('class', 'htmlOrTextOption')
                htmlOrTextOptionBlock.style.marginRight = '20px'
                htmlOrTextOptionBlock.style.marginTop = '20px'
                htmlOrTextOptionBlock.style.display = 'flex'
            }


            changeDiv.append(htmlOrTextOptionBlock)

            let htmlBtn = document.createElement('button')
            {
                htmlBtn.style.marginRight = '20px'
                htmlBtn.style.width = '40%'
                htmlBtn.style.padding = '6px 10px 5px'
                htmlBtn.style.lineHeight = '1.4'
                htmlBtn.style.fontWeight = '400'
                htmlBtn.style.fontSize = '12px'
                htmlBtn.style.border = '#157efb 1px solid'
                htmlBtn.style.color = '#FFF'
                htmlBtn.style.backgroundColor = ' #157efb'
                htmlBtn.style.boxShadow = 'none'
                htmlBtn.innerHTML = 'HTML'
                htmlBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                htmlBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                htmlBtn.style.setProperty('color', '#FFF', 'important');
                htmlBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            htmlOrTextOptionBlock.append(htmlBtn)

            let textBtn = document.createElement('button')
            {
                textBtn.style.marginRight = '20px'
                textBtn.style.opacity = '0.3'
                textBtn.style.width = '40%'
                textBtn.style.padding = '6px 10px 5px'
                textBtn.style.lineHeight = '1.4'
                textBtn.style.fontWeight = '400'
                textBtn.style.fontSize = '12px'
                textBtn.style.border = '#157efb 1px solid'
                textBtn.style.color = '#FFF'
                textBtn.style.backgroundColor = ' #157efb'
                textBtn.style.boxShadow = 'none'
                textBtn.innerHTML = 'TEXT'
                textBtn.style.marginRight = '20px'
                textBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                textBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                textBtn.style.setProperty('color', '#FFF', 'important');
                textBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            htmlOrTextOptionBlock.append(textBtn)


            let fileBtn = document.createElement('button')
            {
                fileBtn.style.marginRight = '20px'
                fileBtn.style.opacity = '0.3'
                fileBtn.style.width = '40%'
                fileBtn.style.padding = '6px 10px 5px'
                fileBtn.style.lineHeight = '1.4'
                fileBtn.style.fontWeight = '400'
                fileBtn.style.fontSize = '12px'
                fileBtn.style.border = '#157efb 1px solid'
                fileBtn.style.color = '#FFF'
                fileBtn.style.backgroundColor = ' #157efb'
                fileBtn.style.boxShfadow = 'none'
                fileBtn.innerHTML = 'FILE'
                fileBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                fileBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                fileBtn.style.setProperty('color', '#FFF', 'important');
                fileBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            htmlOrTextOptionBlock.append(fileBtn)


            let textOnlyBtn = document.createElement('button')
            {
                textOnlyBtn.style.marginRight = '20px'
                textOnlyBtn.style.opacity = '0.3'
                textOnlyBtn.style.width = '40%'
                textOnlyBtn.style.padding = '6px 10px 5px'
                textOnlyBtn.style.lineHeight = '1.4'
                textOnlyBtn.style.fontWeight = '400'
                textOnlyBtn.style.fontSize = '12px'
                textOnlyBtn.style.border = '#157efb 1px solid'
                textOnlyBtn.style.color = '#FFF'
                textOnlyBtn.style.backgroundColor = ' #157efb'
                textOnlyBtn.style.boxShfadow = 'none'
                textOnlyBtn.innerHTML = 'TEXT-ONLY'
                textOnlyBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                textOnlyBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                textOnlyBtn.style.setProperty('color', '#FFF', 'important');
                textOnlyBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            htmlOrTextOptionBlock.append(textOnlyBtn)


            let htmlOrTextOptionValueInput = document.createElement('input')
            {
                htmlOrTextOptionValueInput.setAttribute('class', 'htmlOrTextOptionValueInput')
                htmlOrTextOptionValueInput.setAttribute('type', 'hidden')
                htmlOrTextOptionValueInput.value = 'html'
            }

            htmlOrTextOptionBlock.append(htmlOrTextOptionValueInput)

            htmlBtn.addEventListener('click', (event) => {
                htmlBtn.style.opacity = '1'
                textBtn.style.opacity = '0.3'
                fileBtn.style.opacity = '0.3'
                textOnlyBtn.style.opacity = '0.3'
                htmlOrTextOptionValueInput.value = 'html'


            })

            textBtn.addEventListener('click', (event) => {
                htmlBtn.style.opacity = '0.3'
                textBtn.style.opacity = '1'
                fileBtn.style.opacity = '0.3'
                textOnlyBtn.style.opacity = '0.3'
                htmlOrTextOptionValueInput.value = 'text'

            })

            fileBtn.addEventListener('click', (event) => {
                htmlBtn.style.opacity = '0.3'
                textBtn.style.opacity = '0.3'
                fileBtn.style.opacity = '1'
                textOnlyBtn.style.opacity = '0.3'
                htmlOrTextOptionValueInput.value = 'file'
            })

            textOnlyBtn.addEventListener('click',(event) =>{
                htmlBtn.style.opacity = '0.3'
                textBtn.style.opacity = '0.3'
                fileBtn.style.opacity = '0.3'
                textOnlyBtn.style.opacity = '1'
                htmlOrTextOptionValueInput.value = 'text_only'

            })


            let upDownBlock = document.createElement('div')
            {
                upDownBlock.setAttribute('class', 'fieldBlock')
                upDownBlock.style.marginRight = '20px'
                upDownBlock.style.marginTop = '20px'
                upDownBlock.style.display = 'flex'
                upDownBlock.style.justifyContent = 'space-between'
            }

            changeDiv.append(upDownBlock)

            let upBtn = document.createElement('button')
            {
                upBtn.style.width = '40%'
                upBtn.style.padding = '6px 10px 5px'
                upBtn.style.lineHeight = '1.4'
                upBtn.style.fontWeight = '400'
                upBtn.style.fontSize = '12px'
                upBtn.style.border = '#157efb 1px solid'
                upBtn.style.color = '#FFF'
                upBtn.style.backgroundColor = ' #157efb'
                upBtn.style.boxShadow = 'none'
                upBtn.innerHTML = '↑ 상위 요소'
                upBtn.style.cursor = 'pointer'
                upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                upBtn.style.setProperty('color', '#FFF', 'important');
                upBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(upBtn)

            let downBtn = document.createElement('button')
            {
                downBtn.style.width = '40%'
                downBtn.style.padding = '6px 10px 5px'
                downBtn.style.lineHeight = '1.4'
                downBtn.style.fontWeight = '400'
                downBtn.style.fontSize = '12px'
                downBtn.style.border = '#157efb 1px solid'
                downBtn.style.color = '#FFF'
                downBtn.style.backgroundColor = ' #157efb'
                downBtn.style.boxShadow = 'none'
                downBtn.innerHTML = '↓ 하위 요소'
                downBtn.style.cursor = 'pointer'
                downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                downBtn.style.setProperty('color', '#FFF', 'important');
                downBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(downBtn)


            let delBtn = document.createElement('button')
            {
                delBtn.setAttribute('class', 'delBtn')
                delBtn.style.padding = '6px 10px 5px'
                delBtn.style.lineHeight = '1.4'
                delBtn.style.fontWeight = '400'
                delBtn.style.fontSize = '12px'
                delBtn.style.border = '#157efb 1px solid'
                delBtn.style.color = '#FFF'
                delBtn.style.backgroundColor = ' #e1185f'
                delBtn.style.boxShadow = 'none'
                delBtn.innerHTML = '삭제'
                delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
                delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
                delBtn.style.setProperty('color', '#FFF', 'important');
                delBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(delBtn)

            delBtn.addEventListener('click', (event) => {
                xpathBox.remove()
                getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                let count = $('#crawlingCountStep03').val()
                count = count - 1
                $('#crawlingCountStep03').val(count)

            })

            upBtn.addEventListener('click', (event) => {

                let targetElement = getElementByXpath(xpathInput.value);
                elementArr.push(targetElement)


                if (targetElement.parentElement != null) {
                    xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                    highLightTag(getElementByXpath(xpathInput.value));
                    tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                } else if (targetElement.parentElement == null) {
                    alert('상위 요소가 없습니다.');
                }
            })


            downBtn.addEventListener('click', (event) => {

                // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
                // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

                if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                    // 맨앞에 자식요소[0] 추가
                    elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                    if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                        alert('최초 선택 요소 입니다.')
                        // elementArr.pop();
                    } else {
                        getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                        xpathInput.value = getElementTreeXPath(elementArr.pop());
                        highLightTag(getElementByXpath(xpathInput.value))
                        tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                    }

                } else {
                    alert('자식요소가 없습니다.')
                }

            })


        })

        btnField.click()

    }

    else if(tabFlag =='fieldInList'){

        let targetBlock = document.createElement('div')
        targetBlock.setAttribute('class', 'targetBlock')
        targetBlock.style.marginRight = '20px'
        targetBlock.style.display = 'flex'
        changeDiv.append(targetBlock)

        let targetNameInput = document.createElement('input')
        {
            targetNameInput.setAttribute('name', 'targetNameInput')
            targetNameInput.style.padding = '0 7px'
            targetNameInput.style.height = '32px'
            targetNameInput.style.border = '#c4ccdd 1px solid'
            targetNameInput.style.color = '#000'
            targetNameInput.style.backgroundColor = '#c4ccdd'
            targetNameInput.style.fontWeight = '500'
            targetNameInput.style.fontSize = '13px'
            targetNameInput.style.display = 'inline-block'
            targetNameInput.style.width = '220%'
            targetNameInput.style.outline = 'none'
            targetNameInput.readOnly = 'true'
            targetNameInput.value = '상세리스트'
        }

        targetBlock.append(targetNameInput)

        let targetNameField = document.createElement('input')
        {
            targetNameField.setAttribute('name', 'targetNameField')
            targetNameField.style.padding = '0 7px'
            targetNameField.style.height = '32px'
            targetNameField.style.border = '#c4ccdd 1px solid'
            targetNameField.style.color = '#000'
            targetNameField.style.backgroundColor = '#c4ccdd'
            targetNameField.style.fontWeight = '500'
            targetNameField.style.fontSize = '13px'
            targetNameField.style.display = 'inline-block'
            targetNameField.style.width = '100%'
            targetNameField.style.marginLeft = '20px'
            targetNameField.style.outline = 'none'
            targetNameField.placeholder = '명칭(Target Name)'
        }

        targetBlock.append(targetNameField)


        let mappingNameField = document.createElement('input')
        {
            mappingNameField.setAttribute('name', 'mappingNameField')
            mappingNameField.style.padding = '0 7px'
            mappingNameField.style.height = '32px'
            mappingNameField.style.border = '#c4ccdd 1px solid'
            mappingNameField.style.color = '#000'
            mappingNameField.style.backgroundColor = '#c4ccdd'
            mappingNameField.style.fontWeight = '500'
            mappingNameField.style.fontSize = '13px'
            mappingNameField.style.display = 'inline-block'
            mappingNameField.style.width = '100%'
            mappingNameField.style.outline = 'none'
            mappingNameField.style.marginLeft = '20px'
            mappingNameField.placeholder = '맵핑(Mapping Name)'
        }

        targetBlock.append(mappingNameField)


        let htmlOrTextOptionBlock = document.createElement('div')
        {
            htmlOrTextOptionBlock.setAttribute('class', 'htmlOrTextOption')
            htmlOrTextOptionBlock.style.marginRight = '20px'
            htmlOrTextOptionBlock.style.marginTop = '20px'
            htmlOrTextOptionBlock.style.display = 'flex'
        }

        changeDiv.append(htmlOrTextOptionBlock)

        let htmlBtn = document.createElement('button')
        {
            htmlBtn.style.marginRight = '20px'
            htmlBtn.style.width = '40%'
            htmlBtn.style.padding = '6px 10px 5px'
            htmlBtn.style.lineHeight = '1.4'
            htmlBtn.style.fontWeight = '400'
            htmlBtn.style.fontSize = '12px'
            htmlBtn.style.border = '#157efb 1px solid'
            htmlBtn.style.color = '#FFF'
            htmlBtn.style.backgroundColor = ' #157efb'
            htmlBtn.style.boxShadow = 'none'
            htmlBtn.innerHTML = 'HTML'
            htmlBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            htmlBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            htmlBtn.style.setProperty('color', '#FFF', 'important');
            htmlBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        htmlOrTextOptionBlock.append(htmlBtn)

        let textBtn = document.createElement('button')
        {
            textBtn.style.opacity = '0.3'
            textBtn.style.width = '40%'
            textBtn.style.padding = '6px 10px 5px'
            textBtn.style.lineHeight = '1.4'
            textBtn.style.fontWeight = '400'
            textBtn.style.fontSize = '12px'
            textBtn.style.border = '#157efb 1px solid'
            textBtn.style.color = '#FFF'
            textBtn.style.backgroundColor = ' #157efb'
            textBtn.style.boxShadow = 'none'
            textBtn.innerHTML = 'TEXT'
            textBtn.style.marginRight = '20px'
            textBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            textBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            textBtn.style.setProperty('color', '#FFF', 'important');
            textBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        htmlOrTextOptionBlock.append(textBtn)

        let fileBtn = document.createElement('button')
        {
            fileBtn.style.opacity='0.3'
            fileBtn.style.marginRight = '20px'
            fileBtn.style.width = '40%'
            fileBtn.style.padding = '6px 10px 5px'
            fileBtn.style.lineHeight = '1.4'
            fileBtn.style.fontWeight = '400'
            fileBtn.style.fontSize = '12px'
            fileBtn.style.border = '#157efb 1px solid'
            fileBtn.style.color = '#FFF'
            fileBtn.style.backgroundColor = ' #157efb'
            fileBtn.style.boxShadow = 'none'
            fileBtn.innerHTML = 'FILE'
            fileBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            fileBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            fileBtn.style.setProperty('color', '#FFF', 'important');
            fileBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        htmlOrTextOptionBlock.append(fileBtn)


        let textOnlyBtn = document.createElement('button')
        {
            textOnlyBtn.style.marginRight = '20px'
            textOnlyBtn.style.opacity = '0.3'
            textOnlyBtn.style.width = '40%'
            textOnlyBtn.style.padding = '6px 10px 5px'
            textOnlyBtn.style.lineHeight = '1.4'
            textOnlyBtn.style.fontWeight = '400'
            textOnlyBtn.style.fontSize = '12px'
            textOnlyBtn.style.border = '#157efb 1px solid'
            textOnlyBtn.style.color = '#FFF'
            textOnlyBtn.style.backgroundColor = ' #157efb'
            textOnlyBtn.style.boxShfadow = 'none'
            textOnlyBtn.innerHTML = 'TEXT-ONLY'
            textOnlyBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            textOnlyBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            textOnlyBtn.style.setProperty('color', '#FFF', 'important');
            textOnlyBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        htmlOrTextOptionBlock.append(textOnlyBtn)

        let htmlOrTextOptionValueInput = document.createElement('input')
        {
            htmlOrTextOptionValueInput.setAttribute('class', 'htmlOrTextOptionValueInput')
            htmlOrTextOptionValueInput.setAttribute('type', 'hidden')
            htmlOrTextOptionValueInput.value = 'html'
        }

        htmlOrTextOptionBlock.append(htmlOrTextOptionValueInput)

        htmlBtn.addEventListener('click', (event) => {
            htmlBtn.style.opacity = '1'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '0.3'
            htmlOrTextOptionValueInput.value = 'html'
        })

        textBtn.addEventListener('click', (event) => {
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '1'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '0.3'
            htmlOrTextOptionValueInput.value = 'text'

        })

        fileBtn.addEventListener('click', (event) => {
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '1'
            textOnlyBtn.style.opacity = '0.3'
            htmlOrTextOptionValueInput.value = 'file'

        })

        textOnlyBtn.addEventListener('click',(event) =>{
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '1'
            htmlOrTextOptionValueInput.value = 'text_only'

        })

        let upDownBlock = document.createElement('div')
        {
            upDownBlock.setAttribute('class', 'fieldBlock')
            upDownBlock.style.marginRight = '20px'
            upDownBlock.style.marginTop = '20px'
            upDownBlock.style.display = 'flex'
            upDownBlock.style.justifyContent = 'space-between'
        }
        changeDiv.append(upDownBlock)

        let upBtn = document.createElement('button')
        {
            upBtn.style.width = '40%'
            upBtn.style.padding = '6px 10px 5px'
            upBtn.style.lineHeight = '1.4'
            upBtn.style.fontWeight = '400'
            upBtn.style.fontSize = '12px'
            upBtn.style.border = '#157efb 1px solid'
            upBtn.style.color = '#FFF'
            upBtn.style.backgroundColor = ' #157efb'
            upBtn.style.boxShadow = 'none'
            upBtn.innerHTML = '↑ 상위 요소'
            upBtn.style.cursor = 'pointer'
            upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            upBtn.style.setProperty('color', '#FFF', 'important');
            upBtn.style.setProperty('boxShadow', 'none', 'important');
        }
        upDownBlock.append(upBtn)

        let downBtn = document.createElement('button')
        {
            downBtn.style.width = '40%'
            downBtn.style.padding = '6px 10px 5px'
            downBtn.style.lineHeight = '1.4'
            downBtn.style.fontWeight = '400'
            downBtn.style.fontSize = '12px'
            downBtn.style.border = '#157efb 1px solid'
            downBtn.style.color = '#FFF'
            downBtn.style.backgroundColor = ' #157efb'
            downBtn.style.boxShadow = 'none'
            downBtn.innerHTML = '↓ 하위 요소'
            downBtn.style.cursor = 'pointer'
            downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            downBtn.style.setProperty('color', '#FFF', 'important');
            downBtn.style.setProperty('boxShadow', 'none', 'important');
        }
        upDownBlock.append(downBtn)


        let delBtn = document.createElement('button')
        {
            delBtn.setAttribute('class', 'delBtn')
            delBtn.style.padding = '6px 10px 5px'
            delBtn.style.lineHeight = '1.4'
            delBtn.style.fontWeight = '400'
            delBtn.style.fontSize = '12px'
            delBtn.style.border = '#157efb 1px solid'
            delBtn.style.color = '#FFF'
            delBtn.style.backgroundColor = ' #e1185f'
            delBtn.style.boxShadow = 'none'
            delBtn.innerHTML = '삭제'
            delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
            delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
            delBtn.style.setProperty('color', '#FFF', 'important');
            delBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        upDownBlock.append(delBtn)

        delBtn.addEventListener('click', (event) => {
            xpathBox.remove()
            getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
            let count = $('#crawlingCountStep03').val()
            count = count - 1
            $('#crawlingCountStep03').val(count)

        })

        upBtn.addEventListener('click', (event) => {

            let targetElement = getElementByXpath(xpathInput.value);
            elementArr.push(targetElement)

            if (targetElement.parentElement != null) {
                xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                highLightTag(getElementByXpath(xpathInput.value));
                tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

            } else if (targetElement.parentElement == null) {
                alert('상위 요소가 없습니다.');
            }
        })

        downBtn.addEventListener('click', (event) => {

            // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
            // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

            if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                // 맨앞에 자식요소[0] 추가
                elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                    alert('최초 선택 요소 입니다.')
                    // elementArr.pop();
                } else {
                    getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                    xpathInput.value = getElementTreeXPath(elementArr.pop());
                    highLightTag(getElementByXpath(xpathInput.value))
                    tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                }

            } else {
                alert('자식요소가 없습니다.')
            }

        })

        /////////////////////

        let rowClickBlock = document.createElement('div')
        rowClickBlock.setAttribute('class','rowClickBlock')
        rowClickBlock.style.marginTop = '20px'

        let rowXpathInputSpan = document.createElement('span')
        {
            rowXpathInputSpan.style.display='block'
            rowXpathInputSpan.style.fontSize='18px'
            rowXpathInputSpan.innerText = '클릭을 반복 하려는 xpath \n[ 루프할 숫자에 \'?\' 를 꼭 넣어주세요 ]'
            rowXpathInputSpan.style.color = 'white'
            rowXpathInputSpan.style.fontWeight = 'bold'
            rowXpathInputSpan.style.lineHeight = '25px'

        }
        rowClickBlock.append(rowXpathInputSpan)
        let rowXpathInput = document.createElement('input')
        {
            rowXpathInput.setAttribute('class','rowXpathInput')
            rowXpathInput.style.height = '32px'
            rowXpathInput.style.border = '#c4ccdd 1px solid'
            rowXpathInput.style.borderRadius = '0'
            rowXpathInput.style.color = '#000'
            rowXpathInput.style.backgroundColor = '#ba96e2'
            rowXpathInput.style.fontWeight = '500'
            rowXpathInput.style.fontSize = '13px'
            rowXpathInput.style.display = 'block'
            rowXpathInput.style.outline = 'none'
            rowXpathInput.style.width = '88%'
            rowXpathInput.style.marginBottom = '15px'
            rowXpathInput.value = xpathInput.value;
            rowXpathInput.style.marginTop='10px'
        }


        rowClickBlock.append(rowXpathInput)

        changeDiv.append(rowClickBlock)



    }

    else if(tabFlag == 'filter'){


        // 수정필요
        btnFilter.addEventListener('click', (event) => {

            // if (tabFlag=='list/page') {
            //     btnList.style.opacity = '0.3'
            //     btnPage.style.opacity = '0.3'
            // }

            btnFilter.style.opacity = '1'
            // btnDetailList.style.opacity = '0.3'

            while (changeDiv.hasChildNodes()) {
                changeDiv.removeChild(changeDiv.firstChild);
            }


            let filterBtnBlock = document.createElement('div')
            {
                filterBtnBlock.setAttribute('class','filterBtnBlock')
                filterBtnBlock.style.marginLeft = '20px'
                filterBtnBlock.style.marginRight = '20px'
                filterBtnBlock.style.marginBottom = '20px'
                filterBtnBlock.style.display = 'flex'
            }
            changeDiv.append(filterBtnBlock)


            // normal_filter click option btn
            notSelectFilterBtn = document.createElement('button')
            {
                notSelectFilterBtn.setAttribute('class', 'notSelectFilterBtn')
                notSelectFilterBtn.style.display = 'inline-block'
                notSelectFilterBtn.style.color = '#FFF '
                notSelectFilterBtn.style.backgroundColor = '#87d245'
                notSelectFilterBtn.style.padding = '6px 10px 5px'
                notSelectFilterBtn.style.lineHeight = '1.4'
                notSelectFilterBtn.style.fontWeight = '400'
                notSelectFilterBtn.style.fontSize = '12px'
                notSelectFilterBtn.innerHTML = 'not Select'
                notSelectFilterBtn.style.cursor = 'pointer'
                notSelectFilterBtn.style.marginRight = '8px'
                notSelectFilterBtn.style.opacity = '0.3'
                notSelectFilterBtn.style.setProperty('color', '#FFF', 'important');
                notSelectFilterBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                notSelectFilterBtn.style.setProperty('boxShadow', 'none', 'important');
            }
            filterBtnBlock.append(notSelectFilterBtn)

            // normal_filter click option btn
            selectFilterBtn = document.createElement('button')
            {
                selectFilterBtn.setAttribute('class', 'selectFilterBtn')
                selectFilterBtn.style.display = 'inline-block'
                selectFilterBtn.style.color = '#FFF '
                selectFilterBtn.style.backgroundColor = '#87d245'
                selectFilterBtn.style.padding = '6px 10px 5px'
                selectFilterBtn.style.lineHeight = '1.4'
                selectFilterBtn.style.fontWeight = '400'
                selectFilterBtn.style.fontSize = '12px'
                selectFilterBtn.innerHTML = 'select'
                selectFilterBtn.style.cursor = 'pointer'
                selectFilterBtn.style.marginRight = '8px'
                selectFilterBtn.style.opacity = '0.3'
                selectFilterBtn.style.setProperty('color', '#FFF', 'important');
                selectFilterBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                selectFilterBtn.style.setProperty('boxShadow', 'none', 'important');
            }
            filterBtnBlock.append(selectFilterBtn)






            let targetBlock = document.createElement('div')
            {
                targetBlock.setAttribute('class', 'targetBlock')
                targetBlock.style.marginRight = '20px'
                targetBlock.style.display = 'flex'
            }

            changeDiv.append(targetBlock)

            let targetNameInput = document.createElement('input')
            {
                targetNameInput.setAttribute('name', 'targetNameInput')
                targetNameInput.style.padding = '0 7px'
                targetNameInput.style.height = '32px'
                targetNameInput.style.border = '#c4ccdd 1px solid'
                targetNameInput.style.color = '#000'
                targetNameInput.style.backgroundColor = '#c4ccdd'
                targetNameInput.style.fontWeight = '500'
                targetNameInput.style.fontSize = '13px'
                targetNameInput.style.display = 'inline-block'
                targetNameInput.style.width = '220%'
                targetNameInput.style.outline = 'none'
                targetNameInput.readOnly = 'true'
                targetNameInput.value = '필터'
            }

            targetBlock.append(targetNameInput)

            let targetNameField = document.createElement('input')
            {
                targetNameField.setAttribute('name', 'targetNameField')
                targetNameField.style.padding = '0 7px'
                targetNameField.style.height = '32px'
                targetNameField.style.border = '#c4ccdd 1px solid'
                targetNameField.style.color = '#000'
                targetNameField.style.backgroundColor = '#c4ccdd'
                targetNameField.style.fontWeight = '500'
                targetNameField.style.fontSize = '13px'
                targetNameField.style.display = 'inline-block'
                targetNameField.style.width = '100%'
                targetNameField.style.marginLeft = '20px'
                targetNameField.style.outline = 'none'
                targetNameField.placeholder = '명칭(Target Name)'
            }

            targetBlock.append(targetNameField)


            let mappingNameField = document.createElement('input')
            {
                mappingNameField.setAttribute('name', 'mappingNameField')
                mappingNameField.style.padding = '0 7px'
                mappingNameField.style.height = '32px'
                mappingNameField.style.border = '#c4ccdd 1px solid'
                mappingNameField.style.color = '#000'
                mappingNameField.style.backgroundColor = '#c4ccdd'
                mappingNameField.style.fontWeight = '500'
                mappingNameField.style.fontSize = '13px'
                mappingNameField.style.display = 'inline-block'
                mappingNameField.style.width = '100%'
                mappingNameField.style.outline = 'none'
                mappingNameField.style.marginLeft = '20px'
                mappingNameField.placeholder = '맵핑(Mapping Name)'
            }


            targetBlock.append(mappingNameField)




            let upDownBlock = document.createElement('div')
            {
                upDownBlock.setAttribute('class', 'fieldBlock')
                upDownBlock.style.marginRight = '20px'
                upDownBlock.style.marginTop = '20px'
                upDownBlock.style.display = 'flex'
                upDownBlock.style.justifyContent = 'space-between'
            }

            changeDiv.append(upDownBlock)

            let upBtn = document.createElement('button')
            {
                upBtn.style.width = '40%'
                upBtn.style.padding = '6px 10px 5px'
                upBtn.style.lineHeight = '1.4'
                upBtn.style.fontWeight = '400'
                upBtn.style.fontSize = '12px'
                upBtn.style.border = '#157efb 1px solid'
                upBtn.style.color = '#FFF'
                upBtn.style.backgroundColor = ' #157efb'
                upBtn.style.boxShadow = 'none'
                upBtn.innerHTML = '↑ 상위 요소'
                upBtn.style.cursor = 'pointer'
                upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                upBtn.style.setProperty('color', '#FFF', 'important');
                upBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(upBtn)

            let downBtn = document.createElement('button')
            {
                downBtn.style.width = '40%'
                downBtn.style.padding = '6px 10px 5px'
                downBtn.style.lineHeight = '1.4'
                downBtn.style.fontWeight = '400'
                downBtn.style.fontSize = '12px'
                downBtn.style.border = '#157efb 1px solid'
                downBtn.style.color = '#FFF'
                downBtn.style.backgroundColor = ' #157efb'
                downBtn.style.boxShadow = 'none'
                downBtn.innerHTML = '↓ 하위 요소'
                downBtn.style.cursor = 'pointer'
                downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                downBtn.style.setProperty('color', '#FFF', 'important');
                downBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(downBtn)


            let delBtn = document.createElement('button')
            {
                delBtn.setAttribute('class', 'delBtn')
                delBtn.style.padding = '6px 10px 5px'
                delBtn.style.lineHeight = '1.4'
                delBtn.style.fontWeight = '400'
                delBtn.style.fontSize = '12px'
                delBtn.style.border = '#157efb 1px solid'
                delBtn.style.color = '#FFF'
                delBtn.style.backgroundColor = ' #e1185f'
                delBtn.style.boxShadow = 'none'
                delBtn.innerHTML = '삭제'
                delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
                delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
                delBtn.style.setProperty('color', '#FFF', 'important');
                delBtn.style.setProperty('boxShadow', 'none', 'important');
            }

            upDownBlock.append(delBtn)


            notSelectFilterBtn.addEventListener('click', (event) => {

                notSelectFilterBtn.style.opacity = '1'
                selectFilterBtn.style.opacity = '0.3'


                while (targetBlock.hasChildNodes()) {
                    targetBlock.removeChild(targetBlock.firstChild);
                }
                // try{
                //     document.querySelector('.nextBtnBlock').remove()
                // }
                // catch(e){
                //     a=1
                // }




                let targetNameInput = document.createElement('input')
                {
                    targetNameInput.setAttribute('name', 'targetNameInput')
                    targetNameInput.style.padding = '0 7px'
                    targetNameInput.style.height = '32px'
                    targetNameInput.style.border = '#c4ccdd 1px solid'
                    targetNameInput.style.color = '#000'
                    targetNameInput.style.backgroundColor = '#c4ccdd'
                    targetNameInput.style.fontWeight = '500'
                    targetNameInput.style.fontSize = '13px'
                    targetNameInput.style.display = 'inline-block'
                    targetNameInput.style.width = '220%'
                    targetNameInput.style.outline = 'none'
                    targetNameInput.readOnly = 'true'
                    targetNameInput.value = 'not_select_filter'
                }
                targetBlock.append(targetNameInput)


                let targetNameField = document.createElement('input')
                {
                    targetNameField.setAttribute('name', 'targetNameField')
                    targetNameField.style.padding = '0 7px'
                    targetNameField.style.height = '32px'
                    targetNameField.style.border = '#c4ccdd 1px solid'
                    targetNameField.style.color = '#000'
                    targetNameField.style.backgroundColor = '#c4ccdd'
                    targetNameField.style.fontWeight = '500'
                    targetNameField.style.fontSize = '13px'
                    targetNameField.style.display = 'inline-block'
                    targetNameField.style.width = '100%'
                    targetNameField.style.marginLeft = '20px'
                    targetNameField.style.outline = 'none'
                    targetNameField.placeholder = '명칭(Target Name)'
                }

                targetBlock.append(targetNameField)


                let mappingNameField = document.createElement('input')
                {
                    mappingNameField.setAttribute('name', 'mappingNameField')
                    mappingNameField.style.padding = '0 7px'
                    mappingNameField.style.height = '32px'
                    mappingNameField.style.border = '#c4ccdd 1px solid'
                    mappingNameField.style.color = '#000'
                    mappingNameField.style.backgroundColor = '#c4ccdd'
                    mappingNameField.style.fontWeight = '500'
                    mappingNameField.style.fontSize = '13px'
                    mappingNameField.style.display = 'inline-block'
                    mappingNameField.style.width = '100%'
                    mappingNameField.style.outline = 'none'
                    mappingNameField.style.marginLeft = '20px'
                    mappingNameField.placeholder = 'mappingName'
                }
                targetBlock.append(mappingNameField)


                let filterValueHidden = document.createElement('input')
                {
                    filterValueHidden.setAttribute('class', 'filterValueHidden')
                    filterValueHidden.setAttribute('type', 'hidden')
                    filterValueHidden.value = ''
                }

                targetBlock.append(filterValueHidden)

                filterValueHidden.value = 'not_select'


            })

            selectFilterBtn.addEventListener('click', (event) => {

                notSelectFilterBtn.style.opacity = '0.3'
                selectFilterBtn.style.opacity = '1'


                while (targetBlock.hasChildNodes()) {
                    targetBlock.removeChild(targetBlock.firstChild);
                }
                // try{
                //     document.querySelector('.nextBtnBlock').remove()
                // }
                // catch(e){
                //     a=1
                // }


                let targetNameInput = document.createElement('input')
                {
                    targetNameInput.setAttribute('name', 'targetNameInput')
                    targetNameInput.style.padding = '0 7px'
                    targetNameInput.style.height = '32px'
                    targetNameInput.style.border = '#c4ccdd 1px solid'
                    targetNameInput.style.color = '#000'
                    targetNameInput.style.backgroundColor = '#c4ccdd'
                    targetNameInput.style.fontWeight = '500'
                    targetNameInput.style.fontSize = '13px'
                    targetNameInput.style.display = 'inline-block'
                    targetNameInput.style.width = '220%'
                    targetNameInput.style.outline = 'none'
                    targetNameInput.readOnly = 'true'
                    targetNameInput.value = 'select_filter'
                }
                targetBlock.append(targetNameInput)


                let targetNameField = document.createElement('input')
                {
                    targetNameField.setAttribute('name', 'targetNameField')
                    targetNameField.style.padding = '0 7px'
                    targetNameField.style.height = '32px'
                    targetNameField.style.border = '#c4ccdd 1px solid'
                    targetNameField.style.color = '#000'
                    targetNameField.style.backgroundColor = '#c4ccdd'
                    targetNameField.style.fontWeight = '500'
                    targetNameField.style.fontSize = '13px'
                    targetNameField.style.display = 'inline-block'
                    targetNameField.style.width = '100%'
                    targetNameField.style.marginLeft = '20px'
                    targetNameField.style.outline = 'none'
                    targetNameField.placeholder = '명칭(Target Name)'
                }

                targetBlock.append(targetNameField)


                let mappingNameField = document.createElement('input')
                {
                    mappingNameField.setAttribute('name', 'mappingNameField')
                    mappingNameField.style.padding = '0 7px'
                    mappingNameField.style.height = '32px'
                    mappingNameField.style.border = '#c4ccdd 1px solid'
                    mappingNameField.style.color = '#000'
                    mappingNameField.style.backgroundColor = '#c4ccdd'
                    mappingNameField.style.fontWeight = '500'
                    mappingNameField.style.fontSize = '13px'
                    mappingNameField.style.display = 'inline-block'
                    mappingNameField.style.width = '100%'
                    mappingNameField.style.outline = 'none'
                    mappingNameField.style.marginLeft = '20px'
                    mappingNameField.placeholder = 'mappingName'
                }
                targetBlock.append(mappingNameField)


                let filterValueHidden = document.createElement('input')
                {
                    filterValueHidden.setAttribute('class', 'filterValueHidden')
                    filterValueHidden.setAttribute('type', 'hidden')
                    filterValueHidden.value = ''
                }

                targetBlock.append(filterValueHidden)

                filterValueHidden.value = 'select'


            })

            notSelectFilterBtn.click()

            delBtn.addEventListener('click', (event) => {
                xpathBox.remove()
                getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                let count = $('#crawlingCountStep03').val()
                count = count - 1
                $('#crawlingCountStep03').val(count)

            })

            upBtn.addEventListener('click', (event) => {

                let targetElement = getElementByXpath(xpathInput.value);
                elementArr.push(targetElement)


                if (targetElement.parentElement != null) {
                    xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                    highLightTag(getElementByXpath(xpathInput.value));
                    tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                } else if (targetElement.parentElement == null) {
                    alert('상위 요소가 없습니다.');
                }
            })


            downBtn.addEventListener('click', (event) => {

                // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
                // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

                if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                    // 맨앞에 자식요소[0] 추가
                    elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                    if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                        alert('최초 선택 요소 입니다.')
                        // elementArr.pop();
                    } else {
                        getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                        xpathInput.value = getElementTreeXPath(elementArr.pop());
                        highLightTag(getElementByXpath(xpathInput.value))
                        tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                    }

                } else {
                    alert('자식요소가 없습니다.')
                }

            })


        })

        btnFilter.click()
        notSelectFilterBtn.click()

    }


}


// db에서 불러온 xpath 정보를 표현하는 함수
function loadData() {
    showTotalCount = 0
    let crawlingKey = $('#crawlingKeyStep03').val()
    let data = {crawlingKey: crawlingKey}
    // console.log(data)

    // fetch('http://127.0.0.1:5000/xpath-extension/get-info', {
    // fetch('https://218.159.116.193:8001/xpath-extension/get-info', {
    // fetch('https://192.168.0.33:8001/xpath-extension/get-info', {
    //     fetch('https://61.74.186.67:48002/xpath-extension/get-info', {
    fetch(IP_CONFIG+'/xpath-extension/get-info', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;'},
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            if (!res.ok) {
                alert('조회 실패 !')
            }
        })
        .then(res => {

            dbDataJson = res

            // 0902 마우스 세팅 , permission에 따라 적용
            settingMouse(res['permission']);


            Object.keys(dbDataJson).forEach(function (jsonKey) {

                // console.log(dbDataJson)
                if (tabFlag == 'list/page') {
                    if (jsonKey == '리스트') {

                        // addDetail_listing(jsonKey, res)
                        showTotalCount = showTotalCount + 1;

                        loadDetail(jsonKey, dbDataJson)

                    } else if (jsonKey == '페이지') {

                        showTotalCount = showTotalCount + 1;
                        loadDetail(jsonKey, dbDataJson)
                    } else if ((jsonKey == '게시물영역') || (jsonKey == '게시물클릭영역')) {
                        showTotalCount = showTotalCount + 1;
                        loadDetail(jsonKey, dbDataJson)
                    }
                }


            })

            permissionChkAndRemove(dbDataJson)

            // [ permission 확인 후 input 속성 수정 ]


        })

}


// 승인 상태인 경우, 기존에 보여주던 ui 모두삭제, 수정 정도만 가능하게 세팅하는 함수
function permissionChkAndRemove(res){

    if (res['permission'] == 'APPROVED') {

        // 모든 input readonly
        let allInputList = document.querySelectorAll('#crawlingListDiv input')
        for (let i = 0; i < allInputList.length; i++) {
            allInputList[i].readOnly = true
        }

        // targetName input만 readonly 해제
        let allTargetNameList = document.querySelectorAll("input[name='targetNameField']")
        for (let i = 0; i < allTargetNameList.length; i++) {
            allTargetNameList[i].readOnly = false
        }

        let allDelBtnList = document.querySelectorAll('.delBtn')
        for (let i = 0; i < allDelBtnList.length; i++) {
            allDelBtnList[i].style.display = 'none'
        }

        let allBtnBlockList = document.querySelectorAll('.btnBlock')
        for (let i = 0; i < allBtnBlockList.length; i++) {
            allBtnBlockList[i].style.display = 'none'
        }


        let allHtmlOrTextOptionList = document.querySelectorAll('.htmlOrTextOption')
        for (let i = 0; i < allHtmlOrTextOptionList.length; i++) {
            allHtmlOrTextOptionList[i].style.display = 'none'
        }

        let allPageBtnBlockList = document.querySelectorAll('.pageBtnBlock')
        for (let i = 0; i < allPageBtnBlockList.length; i++) {
            allPageBtnBlockList[i].style.display = 'none'
        }

    }

}


// db에서 해당 수집키에 해당하는 xpath 정보들 불러오는 함수
function loadDetail(jsonKey, detailJsonData) {

    // 기본은 필드로 가져오기 , 이후 클릭으로 분기
    let elementArr = []

    let permission = detailJsonData['permission']
    console.log(permission)


    // db에서 가져온 설정했던 class name
    // load한 데이터에서는 하위 요소를 참조 할 수 없으므로 db에서 설정한 option_class만 기본으로 맞춰놓을수 있음
    let baseClassNameJson = ''
    let scrollOptionJson = ''
    let baseClassName = ''
    let scrollOption = ''
    let aTagOrRowOption = ''
    let rowLoopCount = '0'
    let rowXpath = ''

    try {
        // 리스트로 찝지 않아놓고 리스트로 바꿔서 클릭을 하려고하는경우에는 클래스 값이 json에 없으니까 어차피 불러오지를 못함
        baseClassName = JSON.parse(baseClassNameJson)
        baseClassName = baseClassName['option_class']
    } catch (e) {
        a = 1
    }


    // 클래스 관련정보가 지금 list 안에 키벨류로 있으니까 상세탭에서 클래스정탭를 가져올수가없음
    if (tabFlag != 'field' && tabFlag != 'fieldInList') {
        baseClassNameJson = detailJsonData[jsonKey]['options']
        scrollOptionJson = detailJsonData[jsonKey]['options']
        aTagOrRowOption = detailJsonData[jsonKey]['options']


        scrollOption = JSON.parse(scrollOptionJson)
        scrollOption = scrollOption['option_scroll']

        aTagOrRowOption = JSON.parse(aTagOrRowOption)
        aTagOrRowOption = aTagOrRowOption['option_html']


        if (aTagOrRowOption == 'row') {
            rowLoopCount = detailJsonData[jsonKey]['options']
            rowXpath = detailJsonData[jsonKey]['options']

            rowLoopCount = JSON.parse(rowLoopCount)
            rowLoopCount = rowLoopCount['option_row_loop']

            rowXpath = JSON.parse(rowXpath)
            rowXpath = rowXpath['option_row_xpath']

        }


    }


    let xpathBox = document.createElement('div')
    {
        xpathBox.setAttribute('class', 'xpathBox')
        xpathBox.style.width = '100%'
        xpathBox.style.backgroundColor = '#404c66'
        xpathBox.style.paddingTop = '15px'
        xpathBox.style.paddingBottom = '15px'
        xpathBox.style.marginBottom = '25px'
        xpathBox.style.border = '#404c66 1px solid'
    }
    $('#crawlingListDiv').append(xpathBox)


    // edit 버튼 , 10.18
    if (permission == 'APPROVED') {
        let editBtn = document.createElement('div')
        {
            editBtn.setAttribute('class', 'editBtn')
            editBtn.style.display = 'block'
            editBtn.style.width = '40%'
            editBtn.style.marginBottom = '10px'
            editBtn.style.marginLeft = '20px'
            editBtn.style.padding = '6px 10px 5px'
            editBtn.style.lineHeight = '1.4'
            editBtn.style.fontWeight = '400'
            editBtn.style.fontSize = '12px'
            editBtn.style.border = 'rgba(136,84,208,0.84) 1px solid'
            editBtn.style.color = '#FFF'
            editBtn.style.backgroundColor = 'rgba(136,84,208,0.84)'
            editBtn.style.boxShadow = 'none'
            editBtn.innerHTML = '수정'
            editBtn.style.cursor = 'pointer'
            editBtn.style.setProperty('border', 'rgba(136,84,208,0.84) 1px solid', 'important');
            editBtn.style.setProperty('backgroundColor', 'rgba(136,84,208,0.84)', 'important');
            editBtn.style.setProperty('color', '#FFF', 'important');
            editBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        xpathBox.append(editBtn)
        // 수정버튼
        editBtn.addEventListener('click', (event) => {

            EDIT_FLAG = true
            let editBtns = document.querySelectorAll('.editBtn')
            for (let i = 0; i < editBtns.length; i++) {
                editBtns[i].style.display = 'none'
            }

            settingEditMouse(xpathInput,tagOfXpathInput)

        })
    }


    let detailKeyInput = document.createElement('input')
    {
        detailKeyInput.setAttribute('id', 'detailKeyInput')
        detailKeyInput.style.height = '32px'
        detailKeyInput.style.border = '#c4ccdd 1px solid'
        detailKeyInput.style.borderRadius = '0'
        detailKeyInput.style.color = '#000'
        detailKeyInput.style.backgroundColor = '#c4ccdd'
        detailKeyInput.style.fontWeight = '500'
        detailKeyInput.style.fontSize = '13px'
        detailKeyInput.style.display = 'block'
        detailKeyInput.style.outline = 'none'
        detailKeyInput.style.marginLeft = '20px'
        detailKeyInput.style.width = '88%'
        detailKeyInput.style.marginBottom = '15px'
        detailKeyInput.value = detailJsonData[jsonKey]['crawlingDetailKey']
    }
    xpathBox.append(detailKeyInput)

    let xpathInput = document.createElement('input')
    {
        xpathInput.setAttribute('class', 'xpathInput')
        // xpathInput.style.padding = '0 7px'
        xpathInput.style.height = '32px'
        xpathInput.style.border = '#c4ccdd 1px solid'
        xpathInput.style.borderRadius = '0'
        xpathInput.style.color = '#000'
        xpathInput.style.backgroundColor = '#c4ccdd'
        xpathInput.style.fontWeight = '500'
        xpathInput.style.fontSize = '13px'
        xpathInput.style.display = 'block'
        xpathInput.style.outline = 'none'
        xpathInput.style.marginLeft = '20px'
        xpathInput.style.width = '88%'
        xpathInput.style.marginBottom = '15px'

        // field_in_list 의 경우 ? 가 있어서 하이라이팅이 안되니, ?를 1로 바꾸어준다
        xpathInput.value = detailJsonData[jsonKey]['target'].replace('?', '1')

    }
    xpathBox.append(xpathInput)


    // 타겟에 대한 xpath history를 기록하기 위한 list

    let targetElement = getElementByXpath(xpathInput.value);
    elementArr.push(targetElement)

    // console.log(JSON.parse(detailJsonData[jsonKey]['options'])['option_page_type'])
    let tagOfXpathInput = document.createElement('input')
    {
        tagOfXpathInput.setAttribute('class', 'tagOfXpathInput')
        // tagOfXpathInput.style.padding = '0 7px'
        tagOfXpathInput.style.height = '32px'
        tagOfXpathInput.style.border = '#c4ccdd 1px solid'
        tagOfXpathInput.style.borderRadius = '0'
        tagOfXpathInput.style.color = '#000'
        tagOfXpathInput.style.backgroundColor = '#c4ccdd'
        tagOfXpathInput.style.fontWeight = '500'
        tagOfXpathInput.style.fontSize = '13px'
        tagOfXpathInput.style.display = 'block'
        tagOfXpathInput.style.outline = 'none'
        tagOfXpathInput.style.marginLeft = '20px'
        tagOfXpathInput.style.width = '88%'
        tagOfXpathInput.style.marginBottom = '15px'
        tagOfXpathInput.value = detailJsonData[jsonKey]['crawlingValue']
    }
    xpathBox.append(tagOfXpathInput)

    let btnBlock = null
    let btnList = null
    let btnPage = null
    let btnField = null
    let btnFilter = null

    btnBlock = document.createElement('div')
    {
        btnBlock.setAttribute('class', 'btnBlock')
        btnBlock.style.marginLeft = '20px'
        btnBlock.style.marginRight = '20px'
        btnBlock.style.marginBottom = '20px'
        btnBlock.style.display = 'flex'
        btnBlock.style.justifyContent = 'space-around'
    }
    xpathBox.append(btnBlock)

    if (tabFlag == 'list/page') {

        btnList = document.createElement('button')
        {
            btnList.setAttribute('class', 'btnList')
            btnList.style.display = 'inline-block'
            btnList.style.border = '#157efb 1px solid'
            btnList.style.color = '# #FFF '
            btnList.style.backgroundColor = '#157efb'
            btnList.style.padding = '6px 10px 5px'
            btnList.style.lineHeight = '1.4'
            btnList.style.fontWeight = '400'
            btnList.style.fontSize = '12px'
            btnList.style.opacity = '1'
            btnList.style.cursor = 'pointer'

            btnList.innerHTML = '리스트'
            btnList.style.setProperty('border', '#240086', 'important');
            btnList.style.setProperty('color', '#FFF', 'important');
            btnList.style.setProperty('backgroundColor', '#157efb', 'important');
            btnList.style.setProperty('boxShadow', 'none', 'important');
        }
        btnBlock.append(btnList)

        btnPage = document.createElement('button')
        {
            btnPage.setAttribute('class', 'btnPage')
            btnPage.style.display = 'inline-block'
            btnPage.style.border = '#157efb 1px solid'
            btnPage.style.color = '# #FFF '
            btnPage.style.backgroundColor = '#157efb'
            btnPage.style.padding = '6px 10px 5px'
            btnPage.style.lineHeight = '1.4'
            btnPage.style.fontWeight = '400'
            btnPage.style.fontSize = '12px'
            btnPage.style.opacity = '0.3'
            btnPage.innerHTML = '페이지'
            btnPage.style.cursor = 'pointer'
            btnPage.style.setProperty('border', '#240086', 'important');
            btnPage.style.setProperty('color', '#FFF', 'important');
            btnPage.style.setProperty('backgroundColor', '#157efb', 'important');
            btnPage.style.setProperty('boxShadow', 'none', 'important');
        }
        btnBlock.append(btnPage)

    } else if (tabFlag == 'field') {
        btnField = document.createElement('button')
        {
            btnField.setAttribute('class', 'btnField')
            btnField.style.display = 'inline-block'
            btnField.style.border = '#157efb 1px solid'
            btnField.style.color = '# #FFF '
            btnField.style.backgroundColor = '#157efb'
            btnField.style.padding = '6px 10px 5px'
            btnField.style.lineHeight = '1.4'
            btnField.style.fontWeight = '400'
            btnField.style.fontSize = '12px'
            btnField.innerHTML = '필드'
            btnField.style.cursor = 'pointer'
            btnField.style.opacity = '0.3'
            btnField.style.setProperty('border', '#240086', 'important');
            btnField.style.setProperty('color', '#FFF', 'important');
            btnField.style.setProperty('backgroundColor', '#157efb', 'important');
            btnField.style.setProperty('boxShadow', 'none', 'important');
        }
        btnBlock.append(btnField)
    } else if (tabFlag == 'filter') {

        btnFilter = document.createElement('button')
        {
            btnFilter.setAttribute('class', 'btnFilter')
            btnFilter.style.display = 'inline-block'
            btnFilter.style.border = '#157efb 1px solid'
            btnFilter.style.color = '# #FFF '
            btnFilter.style.backgroundColor = '#157efb'
            btnFilter.style.padding = '6px 10px 5px'
            btnFilter.style.lineHeight = '1.4'
            btnFilter.style.fontWeight = '400'
            btnFilter.style.fontSize = '12px'
            btnFilter.style.opacity = '0.3'
            btnFilter.innerHTML = '필터'
            btnFilter.style.cursor = 'pointer'
            btnFilter.style.setProperty('border', '#240086', 'important');
            btnFilter.style.setProperty('color', '#FFF', 'important');
            btnFilter.style.setProperty('backgroundColor', '#157efb', 'important');
            btnFilter.style.setProperty('boxShadow', 'none', 'important');
        }

        btnBlock.append(btnFilter)

    }

    let changeDiv = document.createElement('div')
    changeDiv.setAttribute('class', 'changeDiv')
    changeDiv.style.marginLeft = '20px'
    xpathBox.append(changeDiv)


    let paramOptionBtn = null;
    let moreClickOptionBtn = null;
    let nextClickOptionBtn = null;
    let targetBlockCopy = null;
    let targetNameInput = null;
    let targetNameField = null;
    let mappingNameField = null;

    let htmlBtn = null
    let textBtn = null
    let fileBtn = null
    let textOnlyBtn = null

    let notSelectFilterBtn = null
    let selectFilterBtn = null


    let htmlOrTextOptionValueInput = null

    if (tabFlag != 'fieldInList') {
        if (tabFlag == 'list/page') {
            btnList.addEventListener('click', (event) => {
                if (tabFlag == 'list/page') {
                    btnList.style.opacity = '1'
                    btnPage.style.opacity = '0.3'
                }
                if (tabFlag == 'field') {
                    btnField.style.opacity = '0.3'

                }
                // btnDetailList.style.opacity = '0.3'

                while (changeDiv.hasChildNodes()) {
                    changeDiv.removeChild(changeDiv.firstChild);
                }


                let targetBlock = document.createElement('div')
                {
                    targetBlock.setAttribute('class', 'targetBlock')
                    //targetBlock.style.marginLeft = '20px'
                    targetBlock.style.marginRight = '20px'
                    targetBlock.style.display = 'flex'
                    targetBlock.style.justifyContent = 'space-around'
                }

                changeDiv.append(targetBlock)


                let targetNameInput = document.createElement('input')
                {
                    targetNameInput.setAttribute('name', 'targetNameInput')
                    targetNameInput.style.padding = '0 7px'
                    targetNameInput.style.height = '32px'
                    targetNameInput.style.border = '#c4ccdd 1px solid'
                    targetNameInput.style.color = '#000'
                    targetNameInput.style.backgroundColor = '#c4ccdd'
                    targetNameInput.style.fontWeight = '500'
                    targetNameInput.style.fontSize = '13px'
                    targetNameInput.style.display = 'inline-block'
                    targetNameInput.style.width = '220%'
                    targetNameInput.style.outline = 'none'
                    targetNameInput.readOnly = 'true'
                    targetNameInput.value = '리스트'
                }

                targetBlock.append(targetNameInput)

                let mappingNameInput = document.createElement('input')
                {
                    mappingNameInput.setAttribute('name', 'mappingNameInput')
                    mappingNameInput.style.padding = '0 7px'
                    mappingNameInput.style.height = '32px'
                    mappingNameInput.style.border = '#c4ccdd 1px solid'
                    mappingNameInput.style.color = '#000'
                    mappingNameInput.style.backgroundColor = '#c4ccdd'
                    mappingNameInput.style.fontWeight = '500'
                    mappingNameInput.style.fontSize = '13px'
                    mappingNameInput.style.display = 'inline-block'
                    mappingNameInput.style.width = '130%'
                    mappingNameInput.style.outline = 'none'
                    mappingNameInput.style.marginLeft = '20px'
                    mappingNameInput.readOnly = 'true'
                    mappingNameInput.value = 'list'
                }
                targetBlock.append(mappingNameInput)

                let scrollOptionBtn = document.createElement('input')
                {
                    scrollOptionBtn.setAttribute('type', 'button')
                    scrollOptionBtn.setAttribute('class', 'scrollOptionBtn')
                    scrollOptionBtn.style.padding = '0 7px'
                    scrollOptionBtn.style.height = '32px'
                    scrollOptionBtn.style.border = '#c4ccdd 1px solid'
                    scrollOptionBtn.style.color = '#000'
                    scrollOptionBtn.style.cursor = 'pointer'
                    scrollOptionBtn.style.backgroundColor = '#51b1a6'
                    scrollOptionBtn.style.fontWeight = '500'
                    scrollOptionBtn.style.fontSize = '13px'
                    scrollOptionBtn.style.display = 'inline-block'
                    scrollOptionBtn.style.width = '100%'
                    scrollOptionBtn.style.outline = 'none'
                    scrollOptionBtn.readOnly = 'true'
                    scrollOptionBtn.value = 'scroll'
                    scrollOptionBtn.style.marginLeft = '20px'
                }


                if (scrollOption == 'scroll') {
                    scrollOptionBtn.style.opacity = '1'
                } else {
                    scrollOptionBtn.style.opacity = '0.3'
                }

                targetBlock.append(scrollOptionBtn)


                let scrollOptionVal = document.createElement('input')
                scrollOptionVal.setAttribute('class', 'scrollOptionVal')
                scrollOptionVal.setAttribute('type', 'hidden')
                scrollOptionVal.value = 'not_scroll'
                targetBlock.append(scrollOptionVal)


                let aTagClickBtn = document.createElement('input')
                {
                    aTagClickBtn.setAttribute('type', 'button')
                    aTagClickBtn.setAttribute('class', 'aTagClickBtn')
                    aTagClickBtn.style.padding = '0 7px'
                    aTagClickBtn.style.height = '32px'
                    aTagClickBtn.style.border = '#c4ccdd 1px solid'
                    aTagClickBtn.style.color = '#000'
                    aTagClickBtn.style.cursor = 'pointer'
                    aTagClickBtn.style.backgroundColor = '#51b1a6'
                    aTagClickBtn.style.fontWeight = '500'
                    aTagClickBtn.style.fontSize = '13px'
                    aTagClickBtn.style.display = 'inline-block'
                    aTagClickBtn.style.width = '100%'
                    aTagClickBtn.style.outline = 'none'
                    aTagClickBtn.readOnly = 'true'
                    aTagClickBtn.value = 'aTag'
                    aTagClickBtn.style.marginLeft = '20px'
                }

                targetBlock.append(aTagClickBtn)


                let rowClickBtn = document.createElement('input')
                {
                    rowClickBtn.setAttribute('type', 'button')
                    rowClickBtn.setAttribute('class', 'rowClickBtn')
                    rowClickBtn.style.padding = '0 7px'
                    rowClickBtn.style.height = '32px'
                    rowClickBtn.style.border = '#c4ccdd 1px solid'
                    rowClickBtn.style.color = '#000'
                    rowClickBtn.style.cursor = 'pointer'
                    rowClickBtn.style.backgroundColor = '#51b1a6'
                    rowClickBtn.style.fontWeight = '500'
                    rowClickBtn.style.fontSize = '13px'
                    rowClickBtn.style.display = 'inline-block'
                    rowClickBtn.style.width = '100%'
                    rowClickBtn.style.outline = 'none'
                    rowClickBtn.readOnly = 'true'
                    rowClickBtn.value = 'row'
                    rowClickBtn.style.opacity = '0.3'
                    rowClickBtn.style.marginLeft = '20px'
                }

                targetBlock.append(rowClickBtn)


                let listClickType = document.createElement('input')
                listClickType.setAttribute('type', 'hidden')
                listClickType.setAttribute('class', 'listClickType')
                listClickType.value = 'aTag'
                targetBlock.append(listClickType)

                // 0906 클릭 시 추가
                let rowClickBlock = document.createElement('div')
                rowClickBlock.setAttribute('class', 'rowClickBlock')
                rowClickBlock.style.marginTop = '20px'


                let rowXpathInputSpan = document.createElement('span')
                {
                    rowXpathInputSpan.style.display = 'block'
                    rowXpathInputSpan.style.fontSize = '18px'
                    rowXpathInputSpan.innerText = '클릭을 반복 하려는 xpath \n[ 루프할 숫자에 \'?\' 를 꼭 넣어주세요 ]'
                    rowXpathInputSpan.style.color = 'white'
                    rowXpathInputSpan.style.fontWeight = 'bold'
                    rowXpathInputSpan.style.lineHeight = '25px'
                }


                rowClickBlock.append(rowXpathInputSpan)


                //option_row_xpath 에 저장함
                let rowXpathInput = document.createElement('input')
                {
                    rowXpathInput.setAttribute('class', 'rowXpathInput')
                    rowXpathInput.setAttribute('type', 'text')
                    rowXpathInput.maxLength = 300
                    rowXpathInput.style.height = '32px'
                    rowXpathInput.style.border = '#c4ccdd 1px solid'
                    rowXpathInput.style.borderRadius = '0'
                    rowXpathInput.style.color = '#000'
                    rowXpathInput.style.backgroundColor = '#ba96e2'
                    rowXpathInput.style.fontWeight = '500'
                    rowXpathInput.style.fontSize = '12px'
                    rowXpathInput.style.display = 'block'
                    rowXpathInput.style.outline = 'none'
                    rowXpathInput.style.width = '92%'
                    rowXpathInput.style.marginBottom = '15px'
                    rowXpathInput.style.marginTop = '10px'


                    if (aTagOrRowOption == 'row') {
                        rowXpathInput.value = rowXpath
                    } else {
                        rowXpathInput.value = xpathInput.value
                    }

                }
                rowClickBlock.append(rowXpathInput)

                let rowXpathLoopSpan = document.createElement('span')
                {
                    rowXpathLoopSpan.style.display = 'block'
                    rowXpathLoopSpan.style.fontSize = '18px'
                    rowXpathLoopSpan.innerText = '루프 횟수'
                    rowXpathLoopSpan.style.color = 'white'
                    rowXpathLoopSpan.style.fontWeight = 'bold'
                }


                rowClickBlock.append(rowXpathLoopSpan)


                let rowXpathLoopInput = document.createElement('input')
                {
                    rowXpathLoopInput.setAttribute('class', 'rowXpathLoopInput')
                    rowXpathLoopInput.style.height = '32px'
                    rowXpathLoopInput.style.border = '#c4ccdd 1px solid'
                    rowXpathLoopInput.style.borderRadius = '0'
                    rowXpathLoopInput.style.color = '#000'
                    rowXpathLoopInput.style.backgroundColor = '#c4ccdd'
                    rowXpathLoopInput.style.fontWeight = '500'
                    rowXpathLoopInput.style.fontSize = '13px'
                    rowXpathLoopInput.style.display = 'block'
                    rowXpathLoopInput.style.outline = 'none'
                    rowXpathLoopInput.style.width = '150px'
                    rowXpathLoopInput.style.marginBottom = '15px'
                    rowXpathLoopInput.style.marginTop = '10px'
                    if (aTagOrRowOption == 'row') {
                        rowXpathLoopInput.value = rowLoopCount
                    } else {
                        rowXpathLoopInput.value = 0
                    }

                }

                rowClickBlock.append(rowXpathLoopInput)

                ///////////

                scrollOptionBtn.addEventListener('click', (event) => {
                    if (scrollOptionVal.value == 'scroll') {
                        scrollOptionVal.value = 'not_scroll'
                        scrollOptionBtn.style.opacity = '0.3'


                    } else {
                        scrollOptionVal.value = 'scroll'
                        scrollOptionBtn.style.opacity = '1'


                    }
                })


                let upDownBlock = document.createElement('div')
                {
                    upDownBlock.setAttribute('class', 'fieldBlock')
                    upDownBlock.style.marginRight = '20px'
                    upDownBlock.style.marginTop = '20px'
                    upDownBlock.style.display = 'flex'
                    upDownBlock.style.justifyContent = 'space-between'
                }
                changeDiv.append(upDownBlock)

                let upBtn = document.createElement('button')
                {
                    upBtn.style.width = '40%'
                    upBtn.style.padding = '6px 10px 5px'
                    upBtn.style.lineHeight = '1.4'
                    upBtn.style.fontWeight = '400'
                    upBtn.style.fontSize = '12px'
                    upBtn.style.border = '#157efb 1px solid'
                    upBtn.style.color = '#FFF'
                    upBtn.style.backgroundColor = ' #157efb'
                    upBtn.style.boxShadow = 'none'
                    upBtn.innerHTML = '↑ 상위 요소'
                    upBtn.style.cursor = 'pointer'
                    upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    upBtn.style.setProperty('color', '#FFF', 'important');
                    upBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                upDownBlock.append(upBtn)

                let downBtn = document.createElement('button')
                {
                    downBtn.style.width = '40%'
                    downBtn.style.padding = '6px 10px 5px'
                    downBtn.style.lineHeight = '1.4'
                    downBtn.style.fontWeight = '400'
                    downBtn.style.fontSize = '12px'
                    downBtn.style.border = '#157efb 1px solid'
                    downBtn.style.color = '#FFF'
                    downBtn.style.backgroundColor = ' #157efb'
                    downBtn.style.boxShadow = 'none'
                    downBtn.innerHTML = '↓ 하위 요소'
                    downBtn.style.cursor = 'pointer'
                    downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    downBtn.style.setProperty('color', '#FFF', 'important');
                    downBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                upDownBlock.append(downBtn)


                let selectBlock = document.createElement('div')
                {
                    selectBlock.setAttribute('class', 'selectBlock')
                    selectBlock.style.marginRight = '20px'
                    selectBlock.style.marginTop = '20px'
                    selectBlock.style.display = 'flex'
                    selectBlock.style.justifyContent = 'space-between'
                }

                changeDiv.append(selectBlock)


                let classSelectBox = document.createElement("select");
                {
                    classSelectBox.setAttribute('class', 'classSelectBox')
                    classSelectBox.style.marginLeft = '20px'
                    classSelectBox.style.width = '200px'
                }

                selectBlock.append(classSelectBox)

                showClassName(elementArr)

                if (aTagOrRowOption == 'row') {
                    selectBlock.style.display = 'none'
                } else {
                    selectBlock.style.display = 'block'
                }


                aTagClickBtn.addEventListener('click', (event) => {
                    aTagClickBtn.style.opacity = '1'
                    rowClickBtn.style.opacity = '0.3'
                    listClickType.value = 'aTag'
                    try {
                        changeDiv.removeChild(rowClickBlock)
                    } catch (e) {
                        // 에러메시지 X
                        let a = 0
                    }
                    document.querySelector('.selectBlock').style.display = 'block'


                })

                rowClickBtn.addEventListener('click', (event) => {
                    aTagClickBtn.style.opacity = '0.3'
                    rowClickBtn.style.opacity = '1'
                    listClickType.value = 'row'

                    changeDiv.append(rowClickBlock)

                    document.querySelector('.selectBlock').style.display = 'none'
                })

                // aTag or Row 확인
                if (aTagOrRowOption == 'aTag') {
                    aTagClickBtn.style.opacity = '1'
                    rowClickBtn.style.opacity = '0.3'
                    aTagClickBtn.click()
                } else {
                    aTagClickBtn.style.opacity = '0.3'
                    rowClickBtn.style.opacity = '1'
                    rowClickBtn.click()
                }


                if ((baseClassName.length != 0) && (tabFlag != 'fieldInList')) {
                    let baseOpt = document.createElement("option");
                    baseOpt.value = baseClassName;
                    baseOpt.text = baseClassName;
                    classSelectBox.add(baseOpt, null);

                }

                let delBtn = document.createElement('button')
                {
                    delBtn.setAttribute('class', 'delBtn')
                    delBtn.style.padding = '6px 10px 5px'
                    delBtn.style.lineHeight = '1.4'
                    delBtn.style.fontWeight = '400'
                    delBtn.style.fontSize = '12px'
                    delBtn.style.border = '#157efb 1px solid'
                    delBtn.style.color = '#FFF'
                    delBtn.style.backgroundColor = ' #e1185f'
                    delBtn.style.boxShadow = 'none'
                    delBtn.innerHTML = '삭제'
                    delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
                    delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
                    delBtn.style.setProperty('color', '#FFF', 'important');
                    delBtn.style.setProperty('boxShadow', 'none', 'important');
                }
                upDownBlock.append(delBtn)

                delBtn.addEventListener('click', (event) => {
                    xpathBox.remove()
                    getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                    let count = $('#crawlingCountStep03').val()
                    count = count - 1
                    $('#crawlingCountStep03').val(count)

                })


                upBtn.addEventListener('click', (event) => {

                    let targetElement = getElementByXpath(xpathInput.value);
                    elementArr.push(targetElement)

                    if (targetElement.parentElement != null) {
                        xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                        highLightTag(getElementByXpath(xpathInput.value));
                        tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;


                        showClassName(elementArr)

                        if (baseClassName.length != 0) {
                            let baseOpt = document.createElement("option");
                            baseOpt.value = baseClassName;
                            baseOpt.text = baseClassName;
                            classSelectBox.add(baseOpt, null);

                        }


                    } else if (targetElement.parentElement == null) {
                        alert('상위 요소가 없습니다.');
                    }
                })


                downBtn.addEventListener('click', (event) => {

                    // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
                    // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

                    if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                        // 맨앞에 자식요소[0] 추가
                        elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                        if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                            alert('최초 선택 요소 입니다.')
                            // elementArr.pop();
                        } else {

                            getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                            xpathInput.value = getElementTreeXPath(elementArr.pop());
                            highLightTag(getElementByXpath(xpathInput.value))
                            tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                            showClassName(elementArr)

                            if (baseClassName.length != 0) {
                                let baseOpt = document.createElement("option");
                                baseOpt.value = baseClassName;
                                baseOpt.text = baseClassName;
                                classSelectBox.add(baseOpt, null);

                            }

                        }

                    } else {
                        alert('자식요소가 없습니다.')
                    }

                })

            })

            btnPage.addEventListener('click', (event) => {
                if (tabFlag == 'list/page') {
                    btnList.style.opacity = '0.3'
                    btnPage.style.opacity = '1'
                }
                if (tabFlag == 'field') {
                    btnField.style.opacity = '0.3'
                }
                // btnDetailList.style.opacity = '0.3'

                while (changeDiv.hasChildNodes()) {
                    changeDiv.removeChild(changeDiv.firstChild);
                }

                //////// 페이지는 한 블럭이 더 있어야함 ( 옵션 설정 블록 )  //////

                let pageBtnBlock = document.createElement('div')
                {
                    pageBtnBlock.setAttribute('class', 'pageBtnBlock')
                    pageBtnBlock.style.marginLeft = '20px'
                    pageBtnBlock.style.marginRight = '20px'
                    pageBtnBlock.style.marginBottom = '20px'
                    pageBtnBlock.style.display = 'flex'
                }

                changeDiv.append(pageBtnBlock)

                // param option btn
                paramOptionBtn = document.createElement('button')
                {
                    paramOptionBtn.setAttribute('class', 'paramOptionBtn')
                    paramOptionBtn.style.display = 'inline-block'
                    paramOptionBtn.style.color = '#FFF '
                    paramOptionBtn.style.backgroundColor = '#87d245'
                    paramOptionBtn.style.padding = '6px 10px 5px'
                    paramOptionBtn.style.lineHeight = '1.4'
                    paramOptionBtn.style.fontWeight = '400'
                    paramOptionBtn.style.fontSize = '12px'
                    paramOptionBtn.innerHTML = 'param'
                    paramOptionBtn.style.cursor = 'pointer'
                    paramOptionBtn.style.marginRight = '8px'
                    paramOptionBtn.style.opacity = '1'
                    paramOptionBtn.style.setProperty('color', '#FFF', 'important');
                    paramOptionBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                    paramOptionBtn.style.setProperty('boxShadow', 'none', 'important');
                }
                pageBtnBlock.append(paramOptionBtn)


                // more click option btn
                moreClickOptionBtn = document.createElement('button')
                {
                    moreClickOptionBtn.setAttribute('class', 'moreClickOptionBtn')
                    moreClickOptionBtn.style.display = 'inline-block'
                    moreClickOptionBtn.style.color = '#FFF '
                    moreClickOptionBtn.style.backgroundColor = '#87d245'
                    moreClickOptionBtn.style.padding = '6px 10px 5px'
                    moreClickOptionBtn.style.lineHeight = '1.4'
                    moreClickOptionBtn.style.fontWeight = '400'
                    moreClickOptionBtn.style.fontSize = '12px'
                    moreClickOptionBtn.innerHTML = 'moreClick'
                    moreClickOptionBtn.style.cursor = 'pointer'
                    moreClickOptionBtn.style.marginRight = '8px'
                    moreClickOptionBtn.style.opacity = '0.3'
                    moreClickOptionBtn.style.setProperty('color', '#FFF', 'important');
                    moreClickOptionBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                    moreClickOptionBtn.style.setProperty('boxShadow', 'none', 'important');
                }


                pageBtnBlock.append(moreClickOptionBtn)

                // next click option btn
                nextClickOptionBtn = document.createElement('button')
                {
                    nextClickOptionBtn.setAttribute('class', 'nextClickOptionBtn')
                    nextClickOptionBtn.style.display = 'inline-block'
                    nextClickOptionBtn.style.color = '#FFF '
                    nextClickOptionBtn.style.backgroundColor = '#87d245'
                    nextClickOptionBtn.style.padding = '6px 10px 5px'
                    nextClickOptionBtn.style.lineHeight = '1.4'
                    nextClickOptionBtn.style.fontWeight = '400'
                    nextClickOptionBtn.style.fontSize = '12px'
                    nextClickOptionBtn.innerHTML = 'nextClick'
                    nextClickOptionBtn.style.cursor = 'pointer'
                    nextClickOptionBtn.style.marginRight = '8px'
                    nextClickOptionBtn.style.opacity = '0.3'
                    nextClickOptionBtn.style.setProperty('color', '#FFF', 'important');
                    nextClickOptionBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                    nextClickOptionBtn.style.setProperty('boxShadow', 'none', 'important');
                }


                pageBtnBlock.append(nextClickOptionBtn)

                // pageBtnBlock 의 버튼 클릭시 targetBlock만 내용이 바뀜

                let targetBlock = document.createElement('div')
                {
                    targetBlock.setAttribute('class', 'targetBlock')
                    //targetBlock.style.marginLeft = '20px'
                    targetBlock.style.marginRight = '20px'
                    targetBlock.style.display = 'flex'
                    targetBlock.style.justifyContent = 'space-around'
                }

                changeDiv.append(targetBlock)

                targetBlockCopy = targetBlock

                let targetNameInput = document.createElement('input')
                {
                    targetNameInput.setAttribute('name', 'targetNameInput')
                    targetNameInput.style.padding = '0 7px'
                    targetNameInput.style.height = '32px'
                    targetNameInput.style.border = '#c4ccdd 1px solid'
                    targetNameInput.style.color = '#000'
                    targetNameInput.style.backgroundColor = '#c4ccdd'
                    targetNameInput.style.fontWeight = '500'
                    targetNameInput.style.fontSize = '13px'
                    targetNameInput.style.display = 'inline-block'
                    targetNameInput.style.width = '220%'
                    targetNameInput.style.outline = 'none'
                    targetNameInput.readOnly = 'true'
                    targetNameInput.value = '페이지'
                }

                targetBlock.append(targetNameInput)

                let mappingNameInput = document.createElement('input')
                {
                    mappingNameInput.setAttribute('name', 'mappingNameInput')
                    mappingNameInput.style.padding = '0 7px'
                    mappingNameInput.style.height = '32px'
                    mappingNameInput.style.border = '#c4ccdd 1px solid'
                    mappingNameInput.style.color = '#000'
                    mappingNameInput.style.backgroundColor = '#c4ccdd'
                    mappingNameInput.style.fontWeight = '500'
                    mappingNameInput.style.fontSize = '13px'
                    mappingNameInput.style.display = 'inline-block'
                    mappingNameInput.style.width = '100%'
                    mappingNameInput.style.outline = 'none'
                    mappingNameInput.style.marginLeft = '20px'
                    mappingNameInput.placeholder = '파라미터'
                }
                targetBlock.append(mappingNameInput)


                let loopCountInput = document.createElement('input')
                {
                    loopCountInput.setAttribute('name', 'loopCountInput')
                    loopCountInput.style.padding = '0 7px'
                    loopCountInput.style.height = '32px'
                    loopCountInput.style.border = '#c4ccdd 1px solid'
                    loopCountInput.style.color = '#000'
                    loopCountInput.style.backgroundColor = '#c4ccdd'
                    loopCountInput.style.fontWeight = '500'
                    loopCountInput.style.fontSize = '13px'
                    loopCountInput.style.display = 'inline-block'
                    loopCountInput.style.width = '100%'
                    loopCountInput.style.outline = 'none'
                    loopCountInput.style.marginLeft = '20px'
                    loopCountInput.placeholder = '루프횟수'
                }
                targetBlock.append(loopCountInput)

                let offsetCount = document.createElement('input')
                {
                    offsetCount.setAttribute('name', 'offsetCount')
                    offsetCount.style.padding = '0 7px'
                    offsetCount.style.height = '32px'
                    offsetCount.style.border = '#c4ccdd 1px solid'
                    offsetCount.style.color = '#000'
                    offsetCount.style.backgroundColor = '#c4ccdd'
                    offsetCount.style.fontWeight = '500'
                    offsetCount.style.fontSize = '13px'
                    offsetCount.style.display = 'inline-block'
                    offsetCount.style.width = '100%'
                    offsetCount.style.outline = 'none'
                    offsetCount.style.marginLeft = '20px'
                    offsetCount.placeholder = 'offset 기본 1'
                }

                targetBlock.append(offsetCount)

                let pageValueHidden = document.createElement('input')
                pageValueHidden.setAttribute('class', 'pageValueHidden')
                pageValueHidden.setAttribute('type', 'hidden')
                //초기는 param 이 디폴트
                pageValueHidden.value = 'param'
                targetBlock.append(pageValueHidden)

                let upDownBlock = document.createElement('div')
                {
                    upDownBlock.setAttribute('class', 'fieldBlock')
                    upDownBlock.style.marginRight = '20px'
                    upDownBlock.style.marginTop = '20px'
                    upDownBlock.style.display = 'flex'
                    upDownBlock.style.justifyContent = 'space-between'
                }

                changeDiv.append(upDownBlock)

                let upBtn = document.createElement('button')
                {
                    upBtn.style.width = '40%'
                    upBtn.style.padding = '6px 10px 5px'
                    upBtn.style.lineHeight = '1.4'
                    upBtn.style.fontWeight = '400'
                    upBtn.style.fontSize = '12px'
                    upBtn.style.border = '#157efb 1px solid'
                    upBtn.style.color = '#FFF'
                    upBtn.style.backgroundColor = ' #157efb'
                    upBtn.style.boxShadow = 'none'
                    upBtn.innerHTML = '↑ 상위 요소'
                    upBtn.style.cursor = 'pointer'
                    upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    upBtn.style.setProperty('color', '#FFF', 'important');
                    upBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                upDownBlock.append(upBtn)

                let downBtn = document.createElement('button')
                {
                    downBtn.style.width = '40%'
                    downBtn.style.padding = '6px 10px 5px'
                    downBtn.style.lineHeight = '1.4'
                    downBtn.style.fontWeight = '400'
                    downBtn.style.fontSize = '12px'
                    downBtn.style.border = '#157efb 1px solid'
                    downBtn.style.color = '#FFF'
                    downBtn.style.backgroundColor = ' #157efb'
                    downBtn.style.boxShadow = 'none'
                    downBtn.innerHTML = '↓ 하위 요소'
                    downBtn.style.cursor = 'pointer'
                    downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    downBtn.style.setProperty('color', '#FFF', 'important');
                    downBtn.style.setProperty('boxShadow', 'none', 'important');
                }
                upDownBlock.append(downBtn)


                let delBtn = document.createElement('button')
                {
                    delBtn.setAttribute('class', 'delBtn')
                    delBtn.style.padding = '6px 10px 5px'
                    delBtn.style.lineHeight = '1.4'
                    delBtn.style.fontWeight = '400'
                    delBtn.style.fontSize = '12px'
                    delBtn.style.border = '#157efb 1px solid'
                    delBtn.style.color = '#FFF'
                    delBtn.style.backgroundColor = ' #e1185f'
                    delBtn.style.boxShadow = 'none'
                    delBtn.innerHTML = '삭제'
                    delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
                    delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
                    delBtn.style.setProperty('color', '#FFF', 'important');
                    delBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                upDownBlock.append(delBtn)

                delBtn.addEventListener('click', (event) => {
                    xpathBox.remove()
                    getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                    let count = $('#crawlingCountStep03').val()
                    count = count - 1
                    $('#crawlingCountStep03').val(count)

                })

                upBtn.addEventListener('click', (event) => {

                    let targetElement = getElementByXpath(xpathInput.value);
                    elementArr.push(targetElement)

                    if (targetElement.parentElement != null) {
                        xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                        highLightTag(getElementByXpath(xpathInput.value));
                        tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                    } else if (targetElement.parentElement == null) {
                        alert('상위 요소가 없습니다.');
                    }
                })


                downBtn.addEventListener('click', (event) => {

                    // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
                    // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

                    if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                        // 맨앞에 자식요소[0] 추가
                        elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                        if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                            alert('최초 선택 요소 입니다.')
                            // elementArr.pop();
                        } else {
                            getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                            xpathInput.value = getElementTreeXPath(elementArr.pop());
                            highLightTag(getElementByXpath(xpathInput.value))
                            tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                        }

                    } else {
                        alert('자식요소가 없습니다.')
                    }

                })

                //페이지의 pageBtnBlock
                paramOptionBtn.addEventListener('click', (event) => {
                    paramOptionBtn.style.opacity = '1'
                    moreClickOptionBtn.style.opacity = '0.3'
                    nextClickOptionBtn.style.opacity = '0.3'

                    while (targetBlock.hasChildNodes()) {
                        targetBlock.removeChild(targetBlock.firstChild);
                    }

                    try {
                        document.querySelector('.nextBtnBlock').remove()
                    } catch (e) {
                        a = 1
                    }


                    let targetNameInput = document.createElement('input')
                    {
                        targetNameInput.setAttribute('name', 'targetNameInput')
                        targetNameInput.style.padding = '0 7px'
                        targetNameInput.style.height = '32px'
                        targetNameInput.style.border = '#c4ccdd 1px solid'
                        targetNameInput.style.color = '#000'
                        targetNameInput.style.backgroundColor = '#c4ccdd'
                        targetNameInput.style.fontWeight = '500'
                        targetNameInput.style.fontSize = '13px'
                        targetNameInput.style.display = 'inline-block'
                        targetNameInput.style.width = '220%'
                        targetNameInput.style.outline = 'none'
                        targetNameInput.readOnly = 'true'
                        targetNameInput.value = '페이지'
                    }

                    targetBlock.append(targetNameInput)

                    let mappingNameInput = document.createElement('input')
                    {
                        mappingNameInput.setAttribute('name', 'mappingNameInput')
                        mappingNameInput.style.padding = '0 7px'
                        mappingNameInput.style.height = '32px'
                        mappingNameInput.style.border = '#c4ccdd 1px solid'
                        mappingNameInput.style.color = '#000'
                        mappingNameInput.style.backgroundColor = '#c4ccdd'
                        mappingNameInput.style.fontWeight = '500'
                        mappingNameInput.style.fontSize = '13px'
                        mappingNameInput.style.display = 'inline-block'
                        mappingNameInput.style.width = '100%'
                        mappingNameInput.style.outline = 'none'
                        mappingNameInput.style.marginLeft = '20px'
                        mappingNameInput.placeholder = '파라미터'
                    }

                    targetBlock.append(mappingNameInput)


                    let loopCountInput = document.createElement('input')
                    {
                        loopCountInput.setAttribute('name', 'loopCountInput')
                        loopCountInput.style.padding = '0 7px'
                        loopCountInput.style.height = '32px'
                        loopCountInput.style.border = '#c4ccdd 1px solid'
                        loopCountInput.style.color = '#000'
                        loopCountInput.style.backgroundColor = '#c4ccdd'
                        loopCountInput.style.fontWeight = '500'
                        loopCountInput.style.fontSize = '13px'
                        loopCountInput.style.display = 'inline-block'
                        loopCountInput.style.width = '100%'
                        loopCountInput.style.outline = 'none'
                        loopCountInput.style.marginLeft = '20px'
                        loopCountInput.placeholder = '루프횟수'
                    }


                    targetBlock.append(loopCountInput)


                    let offsetCount = document.createElement('input')
                    {
                        offsetCount.setAttribute('name', 'offsetCount')
                        offsetCount.style.padding = '0 7px'
                        offsetCount.style.height = '32px'
                        offsetCount.style.border = '#c4ccdd 1px solid'
                        offsetCount.style.color = '#000'
                        offsetCount.style.backgroundColor = '#c4ccdd'
                        offsetCount.style.fontWeight = '500'
                        offsetCount.style.fontSize = '13px'
                        offsetCount.style.display = 'inline-block'
                        offsetCount.style.width = '100%'
                        offsetCount.style.outline = 'none'
                        offsetCount.style.marginLeft = '20px'
                        offsetCount.placeholder = 'offset 기본 1'
                    }

                    targetBlock.append(offsetCount)

                    let pageValueHidden = document.createElement('input')
                    pageValueHidden.setAttribute('class', 'pageValueHidden')
                    pageValueHidden.setAttribute('type', 'hidden')
                    pageValueHidden.value = 'param'
                    targetBlock.append(pageValueHidden)

                    targetBlockCopy = targetBlock
                })

                moreClickOptionBtn.addEventListener('click', (event) => {
                    paramOptionBtn.style.opacity = '0.3'
                    moreClickOptionBtn.style.opacity = '1'
                    nextClickOptionBtn.style.opacity = '0.3'

                    while (targetBlock.hasChildNodes()) {
                        targetBlock.removeChild(targetBlock.firstChild);
                    }

                    try {
                        document.querySelector('.nextBtnBlock').remove()
                    } catch (e) {
                        a = 1
                    }


                    let targetNameInput = document.createElement('input')
                    {
                        targetNameInput.setAttribute('name', 'targetNameInput')
                        targetNameInput.style.padding = '0 7px'
                        targetNameInput.style.height = '32px'
                        targetNameInput.style.border = '#c4ccdd 1px solid'
                        targetNameInput.style.color = '#000'
                        targetNameInput.style.backgroundColor = '#c4ccdd'
                        targetNameInput.style.fontWeight = '500'
                        targetNameInput.style.fontSize = '13px'
                        targetNameInput.style.display = 'inline-block'
                        targetNameInput.style.width = '220%'
                        targetNameInput.style.outline = 'none'
                        targetNameInput.readOnly = 'true'
                        targetNameInput.value = '페이지'
                    }

                    targetBlock.append(targetNameInput)

                    let loopCountInput = document.createElement('input')
                    {
                        loopCountInput.setAttribute('name', 'loopCountInput')
                        loopCountInput.style.padding = '0 7px'
                        loopCountInput.style.height = '32px'
                        loopCountInput.style.border = '#c4ccdd 1px solid'
                        loopCountInput.style.color = '#000'
                        loopCountInput.style.backgroundColor = '#c4ccdd'
                        loopCountInput.style.fontWeight = '500'
                        loopCountInput.style.fontSize = '13px'
                        loopCountInput.style.display = 'inline-block'
                        loopCountInput.style.width = '100%'
                        loopCountInput.style.outline = 'none'
                        loopCountInput.style.marginLeft = '20px'
                        loopCountInput.placeholder = '루프횟수'
                    }
                    targetBlock.append(loopCountInput)


                    let pageValueHidden = document.createElement('input')
                    pageValueHidden.setAttribute('class', 'pageValueHidden')
                    pageValueHidden.setAttribute('type', 'hidden')
                    pageValueHidden.value = ''
                    targetBlock.append(pageValueHidden)

                    pageValueHidden.value = 'more'


                })

                nextClickOptionBtn.addEventListener('click', (event) => {
                    paramOptionBtn.style.opacity = '0.3'
                    moreClickOptionBtn.style.opacity = '0.3'
                    nextClickOptionBtn.style.opacity = '1'
                    // 가지고있는 xpath 값으로 역추적, event찾기

                    // console.log(xpathInput.value)
                    // console.log(xpathInput.value.replace('/crtag[1]',''))

                    // let targetEventReverse = getElementByXpath(xpathInput.value.replace('/crtag[1]',''))

                    let targetEventReverse = getElementByXpath(xpathInput.value)
                    // console.log(targetEventReverse)

                    while (targetBlock.hasChildNodes()) {
                        targetBlock.removeChild(targetBlock.firstChild);
                    }

                    try {
                        document.querySelector('.nextBtnBlock').remove()
                    } catch (e) {
                        a = 1
                    }


                    let targetNameInput = document.createElement('input')
                    {
                        targetNameInput.setAttribute('name', 'targetNameInput')
                        targetNameInput.style.padding = '0 7px'
                        targetNameInput.style.height = '32px'
                        targetNameInput.style.border = '#c4ccdd 1px solid'
                        targetNameInput.style.color = '#000'
                        targetNameInput.style.backgroundColor = '#c4ccdd'
                        targetNameInput.style.fontWeight = '500'
                        targetNameInput.style.fontSize = '13px'
                        targetNameInput.style.display = 'inline-block'
                        targetNameInput.style.width = '220%'
                        targetNameInput.style.outline = 'none'
                        targetNameInput.readOnly = 'true'
                        targetNameInput.value = '페이지'
                    }

                    targetBlock.append(targetNameInput)

                    let loopCountInput = document.createElement('input')
                    {
                        loopCountInput.setAttribute('name', 'loopCountInput')
                        loopCountInput.style.padding = '0 7px'
                        loopCountInput.style.height = '32px'
                        loopCountInput.style.border = '#c4ccdd 1px solid'
                        loopCountInput.style.color = '#000'
                        loopCountInput.style.backgroundColor = '#c4ccdd'
                        loopCountInput.style.fontWeight = '500'
                        loopCountInput.style.fontSize = '13px'
                        loopCountInput.style.display = 'inline-block'
                        loopCountInput.style.width = '100%'
                        loopCountInput.style.outline = 'none'
                        loopCountInput.style.marginLeft = '20px'
                        loopCountInput.placeholder = '루프횟수'
                    }


                    targetBlock.append(loopCountInput)


                    let pageValueHidden = document.createElement('input')
                    pageValueHidden.setAttribute('class', 'pageValueHidden')
                    pageValueHidden.setAttribute('type', 'hidden')
                    pageValueHidden.value = ''
                    targetBlock.append(pageValueHidden)
                    pageValueHidden.value = 'next'

                    targetBlockCopy = targetBlock
                    // detailJsonData[jsonKey]['target']

                    let pageJson = JSON.parse(detailJsonData[jsonKey]['options'])


                    let nextBtnBlock = document.createElement('div')
                    nextBtnBlock.setAttribute('class', 'nextBtnBlock')
                    nextBtnBlock.style.width = '100%'
                    nextBtnBlock.style.display = 'flex'
                    nextBtnBlock.style.flexDirection = 'column'

                    changeDiv.append(nextBtnBlock)


                    let nextBtnSearchBar = document.createElement('input')
                    {
                        nextBtnSearchBar.setAttribute('class', 'nextBtnSearchBar')
                        nextBtnSearchBar.style.padding = '0 7px'
                        nextBtnSearchBar.style.height = '32px'
                        nextBtnSearchBar.style.border = '#c4ccdd 1px solid'
                        nextBtnSearchBar.style.color = '#000'
                        nextBtnSearchBar.style.backgroundColor = '#c4ccdd'
                        nextBtnSearchBar.style.fontWeight = '500'
                        nextBtnSearchBar.style.fontSize = '13px'
                        nextBtnSearchBar.style.display = 'block'
                        nextBtnSearchBar.style.width = '90%'
                        nextBtnSearchBar.style.outline = 'none'
                        nextBtnSearchBar.style.marginTop = '30px'
                        nextBtnSearchBar.placeholder = 'next btn feature'
                        nextBtnSearchBar.value = JSON.parse(dbDataJson[jsonKey]['options'])['option_page_next_btn_str']
                    }

                    nextBtnBlock.append(nextBtnSearchBar)

                })


            })


        }

        if (tabFlag == 'field') {
            btnField.addEventListener('click', (event) => {
                // btnList.style.opacity = '0.3'
                // btnPage.style.opacity = '0.3'
                btnField.style.opacity = '1'
                // btnDetailList.style.opacity = '0.3'

                while (changeDiv.hasChildNodes()) {
                    changeDiv.removeChild(changeDiv.firstChild);
                }

                let targetBlock = document.createElement('div')
                targetBlock.setAttribute('class', 'targetBlock')
                targetBlock.style.marginRight = '20px'
                targetBlock.style.display = 'flex'
                changeDiv.append(targetBlock)

                let targetNameInput = document.createElement('input')
                {
                    targetNameInput.setAttribute('name', 'targetNameInput')
                    targetNameInput.style.padding = '0 7px'
                    targetNameInput.style.height = '32px'
                    targetNameInput.style.border = '#c4ccdd 1px solid'
                    targetNameInput.style.color = '#000'
                    targetNameInput.style.backgroundColor = '#c4ccdd'
                    targetNameInput.style.fontWeight = '500'
                    targetNameInput.style.fontSize = '13px'
                    targetNameInput.style.display = 'inline-block'
                    targetNameInput.style.width = '220%'
                    targetNameInput.style.outline = 'none'
                    targetNameInput.readOnly = 'true'
                    targetNameInput.value = '필드'
                }

                targetBlock.append(targetNameInput)

                targetNameField = document.createElement('input')
                {
                    targetNameField.setAttribute('name', 'targetNameField')
                    targetNameField.style.padding = '0 7px'
                    targetNameField.style.height = '32px'
                    targetNameField.style.border = '#c4ccdd 1px solid'
                    targetNameField.style.color = '#000'
                    targetNameField.style.backgroundColor = '#c4ccdd'
                    targetNameField.style.fontWeight = '500'
                    targetNameField.style.fontSize = '13px'
                    targetNameField.style.display = 'inline-block'
                    targetNameField.style.width = '100%'
                    targetNameField.style.marginLeft = '20px'
                    targetNameField.style.outline = 'none'
                    targetNameField.placeholder = '명칭(Target Name)'
                }

                targetBlock.append(targetNameField)


                mappingNameField = document.createElement('input')
                {
                    mappingNameField.setAttribute('name', 'mappingNameField')
                    mappingNameField.style.padding = '0 7px'
                    mappingNameField.style.height = '32px'
                    mappingNameField.style.border = '#c4ccdd 1px solid'
                    mappingNameField.style.color = '#000'
                    mappingNameField.style.backgroundColor = '#c4ccdd'
                    mappingNameField.style.fontWeight = '500'
                    mappingNameField.style.fontSize = '13px'
                    mappingNameField.style.display = 'inline-block'
                    mappingNameField.style.width = '100%'
                    mappingNameField.style.outline = 'none'
                    mappingNameField.style.marginLeft = '20px'
                    mappingNameField.placeholder = '맵핑(Mapping Name)'
                }

                targetBlock.append(mappingNameField)


                let htmlOrTextOptionBlock = document.createElement('div')
                {
                    htmlOrTextOptionBlock.setAttribute('class', 'htmlOrTextOption')
                    htmlOrTextOptionBlock.style.marginRight = '20px'
                    htmlOrTextOptionBlock.style.marginTop = '20px'
                    htmlOrTextOptionBlock.style.display = 'flex'
                }

                changeDiv.append(htmlOrTextOptionBlock)

                htmlBtn = document.createElement('button')
                {
                    htmlBtn.style.marginRight = '20px'
                    htmlBtn.style.width = '40%'
                    htmlBtn.style.padding = '6px 10px 5px'
                    htmlBtn.style.lineHeight = '1.4'
                    htmlBtn.style.fontWeight = '400'
                    htmlBtn.style.fontSize = '12px'
                    htmlBtn.style.border = '#157efb 1px solid'
                    htmlBtn.style.color = '#FFF'
                    htmlBtn.style.backgroundColor = ' #157efb'
                    htmlBtn.style.boxShadow = 'none'
                    htmlBtn.innerHTML = 'HTML'
                    htmlBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    htmlBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    htmlBtn.style.setProperty('color', '#FFF', 'important');
                    htmlBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                htmlOrTextOptionBlock.append(htmlBtn)

                textBtn = document.createElement('button')
                {
                    textBtn.style.opacity = '0.3'
                    textBtn.style.width = '40%'
                    textBtn.style.padding = '6px 10px 5px'
                    textBtn.style.lineHeight = '1.4'
                    textBtn.style.fontWeight = '400'
                    textBtn.style.fontSize = '12px'
                    textBtn.style.border = '#157efb 1px solid'
                    textBtn.style.color = '#FFF'
                    textBtn.style.backgroundColor = ' #157efb'
                    textBtn.style.boxShadow = 'none'
                    textBtn.innerHTML = 'TEXT'
                    textBtn.style.marginRight = '20px'
                    textBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    textBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    textBtn.style.setProperty('color', '#FFF', 'important');
                    textBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                htmlOrTextOptionBlock.append(textBtn)

                fileBtn = document.createElement('button')
                {
                    fileBtn.style.marginRight = '20px'
                    fileBtn.style.width = '40%'
                    fileBtn.style.padding = '6px 10px 5px'
                    fileBtn.style.lineHeight = '1.4'
                    fileBtn.style.fontWeight = '400'
                    fileBtn.style.fontSize = '12px'
                    fileBtn.style.border = '#157efb 1px solid'
                    fileBtn.style.color = '#FFF'
                    fileBtn.style.backgroundColor = ' #157efb'
                    fileBtn.style.boxShadow = 'none'
                    fileBtn.innerHTML = 'FILE'
                    fileBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    fileBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    fileBtn.style.setProperty('color', '#FFF', 'important');
                    fileBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                htmlOrTextOptionBlock.append(fileBtn)


                textOnlyBtn = document.createElement('button')
                {
                    textOnlyBtn.style.marginRight = '20px'
                    textOnlyBtn.style.opacity = '0.3'
                    textOnlyBtn.style.width = '40%'
                    textOnlyBtn.style.padding = '6px 10px 5px'
                    textOnlyBtn.style.lineHeight = '1.4'
                    textOnlyBtn.style.fontWeight = '400'
                    textOnlyBtn.style.fontSize = '12px'
                    textOnlyBtn.style.border = '#157efb 1px solid'
                    textOnlyBtn.style.color = '#FFF'
                    textOnlyBtn.style.backgroundColor = ' #157efb'
                    textOnlyBtn.style.boxShfadow = 'none'
                    textOnlyBtn.innerHTML = 'TEXT-ONLY'
                    textOnlyBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    textOnlyBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    textOnlyBtn.style.setProperty('color', '#FFF', 'important');
                    textOnlyBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                htmlOrTextOptionBlock.append(textOnlyBtn)

                htmlOrTextOptionValueInput = document.createElement('input')
                {
                    htmlOrTextOptionValueInput.setAttribute('class', 'htmlOrTextOptionValueInput')
                    htmlOrTextOptionValueInput.setAttribute('type', 'hidden')
                    htmlOrTextOptionValueInput.value = 'html'
                }

                htmlOrTextOptionBlock.append(htmlOrTextOptionValueInput)

                htmlBtn.addEventListener('click', (event) => {
                    htmlBtn.style.opacity = '1'
                    textBtn.style.opacity = '0.3'
                    fileBtn.style.opacity = '0.3'
                    textOnlyBtn.style.opacity = '0.3'
                    htmlOrTextOptionValueInput.value = 'html'
                })

                textBtn.addEventListener('click', (event) => {
                    htmlBtn.style.opacity = '0.3'
                    textBtn.style.opacity = '1'
                    fileBtn.style.opacity = '0.3'
                    textOnlyBtn.style.opacity = '0.3'
                    htmlOrTextOptionValueInput.value = 'text'

                })

                fileBtn.addEventListener('click', (event) => {
                    htmlBtn.style.opacity = '0.3'
                    textBtn.style.opacity = '0.3'
                    fileBtn.style.opacity = '1'
                    textOnlyBtn.style.opacity = '0.3'
                    htmlOrTextOptionValueInput.value = 'file'

                })

                textOnlyBtn.addEventListener('click', (event) => {
                    htmlBtn.style.opacity = '0.3'
                    textBtn.style.opacity = '0.3'
                    fileBtn.style.opacity = '0.3'
                    textOnlyBtn.style.opacity = '1'
                    htmlOrTextOptionValueInput.value = 'text_only'

                })

                let upDownBlock = document.createElement('div')
                {
                    upDownBlock.setAttribute('class', 'fieldBlock')
                    upDownBlock.style.marginRight = '20px'
                    upDownBlock.style.marginTop = '20px'
                    upDownBlock.style.display = 'flex'
                    upDownBlock.style.justifyContent = 'space-between'
                }
                changeDiv.append(upDownBlock)

                let upBtn = document.createElement('button')
                {
                    upBtn.style.width = '40%'
                    upBtn.style.padding = '6px 10px 5px'
                    upBtn.style.lineHeight = '1.4'
                    upBtn.style.fontWeight = '400'
                    upBtn.style.fontSize = '12px'
                    upBtn.style.border = '#157efb 1px solid'
                    upBtn.style.color = '#FFF'
                    upBtn.style.backgroundColor = ' #157efb'
                    upBtn.style.boxShadow = 'none'
                    upBtn.innerHTML = '↑ 상위 요소'
                    upBtn.style.cursor = 'pointer'
                    upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    upBtn.style.setProperty('color', '#FFF', 'important');
                    upBtn.style.setProperty('boxShadow', 'none', 'important');
                }
                upDownBlock.append(upBtn)

                let downBtn = document.createElement('button')
                {
                    downBtn.style.width = '40%'
                    downBtn.style.padding = '6px 10px 5px'
                    downBtn.style.lineHeight = '1.4'
                    downBtn.style.fontWeight = '400'
                    downBtn.style.fontSize = '12px'
                    downBtn.style.border = '#157efb 1px solid'
                    downBtn.style.color = '#FFF'
                    downBtn.style.backgroundColor = ' #157efb'
                    downBtn.style.boxShadow = 'none'
                    downBtn.innerHTML = '↓ 하위 요소'
                    downBtn.style.cursor = 'pointer'
                    downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    downBtn.style.setProperty('color', '#FFF', 'important');
                    downBtn.style.setProperty('boxShadow', 'none', 'important');
                }
                upDownBlock.append(downBtn)


                let delBtn = document.createElement('button')
                {
                    delBtn.setAttribute('class', 'delBtn')
                    delBtn.style.padding = '6px 10px 5px'
                    delBtn.style.lineHeight = '1.4'
                    delBtn.style.fontWeight = '400'
                    delBtn.style.fontSize = '12px'
                    delBtn.style.border = '#157efb 1px solid'
                    delBtn.style.color = '#FFF'
                    delBtn.style.backgroundColor = ' #e1185f'
                    delBtn.style.boxShadow = 'none'
                    delBtn.innerHTML = '삭제'
                    delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
                    delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
                    delBtn.style.setProperty('color', '#FFF', 'important');
                    delBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                upDownBlock.append(delBtn)

                delBtn.addEventListener('click', (event) => {
                    xpathBox.remove()
                    getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                    let count = $('#crawlingCountStep03').val()
                    count = count - 1
                    $('#crawlingCountStep03').val(count)

                })

                upBtn.addEventListener('click', (event) => {

                    let targetElement = getElementByXpath(xpathInput.value);
                    elementArr.push(targetElement)

                    if (targetElement.parentElement != null) {
                        xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                        highLightTag(getElementByXpath(xpathInput.value));
                        tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                    } else if (targetElement.parentElement == null) {
                        alert('상위 요소가 없습니다.');
                    }
                })

                downBtn.addEventListener('click', (event) => {

                    // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
                    // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

                    if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                        // 맨앞에 자식요소[0] 추가
                        elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                        if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                            alert('최초 선택 요소 입니다.')
                            // elementArr.pop();
                        } else {
                            getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                            xpathInput.value = getElementTreeXPath(elementArr.pop());
                            highLightTag(getElementByXpath(xpathInput.value))
                            tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                        }

                    } else {
                        alert('자식요소가 없습니다.')
                    }

                })

            })
        }

        if (tabFlag == 'filter') {
            btnFilter.addEventListener('click', (event) => {
                // btnList.style.opacity = '0.3'
                // btnPage.style.opacity = '0.3'
                // btnField.style.opacity = '0.3'
                // btnDetailList.style.opacity = '0.3'


                btnFilter.style.opacity = '1'

                while (changeDiv.hasChildNodes()) {
                    changeDiv.removeChild(changeDiv.firstChild);
                }

                //////// 페이지는 한 블럭이 더 있어야함 ( 옵션 설정 블록 )  //////

/////////////////////////////////////

                let filterBtnBlock = document.createElement('div')
                {
                    filterBtnBlock.setAttribute('class', 'filterBtnBlock')
                    filterBtnBlock.style.marginLeft = '20px'
                    filterBtnBlock.style.marginRight = '20px'
                    filterBtnBlock.style.marginBottom = '20px'
                    filterBtnBlock.style.display = 'flex'
                }
                changeDiv.append(filterBtnBlock)


                // normal_filter click option btn
                notSelectFilterBtn = document.createElement('button')
                {
                    notSelectFilterBtn.setAttribute('class', 'notSelectFilterBtn')
                    notSelectFilterBtn.style.display = 'inline-block'
                    notSelectFilterBtn.style.color = '#FFF '
                    notSelectFilterBtn.style.backgroundColor = '#87d245'
                    notSelectFilterBtn.style.padding = '6px 10px 5px'
                    notSelectFilterBtn.style.lineHeight = '1.4'
                    notSelectFilterBtn.style.fontWeight = '400'
                    notSelectFilterBtn.style.fontSize = '12px'
                    notSelectFilterBtn.innerHTML = 'not Select'
                    notSelectFilterBtn.style.cursor = 'pointer'
                    notSelectFilterBtn.style.marginRight = '8px'
                    notSelectFilterBtn.style.opacity = '0.3'
                    notSelectFilterBtn.style.setProperty('color', '#FFF', 'important');
                    notSelectFilterBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                    notSelectFilterBtn.style.setProperty('boxShadow', 'none', 'important');
                }
                filterBtnBlock.append(notSelectFilterBtn)

                // normal_filter click option btn
                selectFilterBtn = document.createElement('button')
                {
                    selectFilterBtn.setAttribute('class', 'selectFilterBtn')
                    selectFilterBtn.style.display = 'inline-block'
                    selectFilterBtn.style.color = '#FFF '
                    selectFilterBtn.style.backgroundColor = '#87d245'
                    selectFilterBtn.style.padding = '6px 10px 5px'
                    selectFilterBtn.style.lineHeight = '1.4'
                    selectFilterBtn.style.fontWeight = '400'
                    selectFilterBtn.style.fontSize = '12px'
                    selectFilterBtn.innerHTML = 'select'
                    selectFilterBtn.style.cursor = 'pointer'
                    selectFilterBtn.style.marginRight = '8px'
                    selectFilterBtn.style.opacity = '0.3'
                    selectFilterBtn.style.setProperty('color', '#FFF', 'important');
                    selectFilterBtn.style.setProperty('backgroundColor', '#87d245', 'important');
                    selectFilterBtn.style.setProperty('boxShadow', 'none', 'important');
                }
                filterBtnBlock.append(selectFilterBtn)


                let targetBlock = document.createElement('div')
                {
                    targetBlock.setAttribute('class', 'targetBlock')
                    targetBlock.style.marginRight = '20px'
                    targetBlock.style.display = 'flex'
                }

                changeDiv.append(targetBlock)

                targetNameInput = document.createElement('input')
                {
                    targetNameInput.setAttribute('name', 'targetNameInput')
                    targetNameInput.style.padding = '0 7px'
                    targetNameInput.style.height = '32px'
                    targetNameInput.style.border = '#c4ccdd 1px solid'
                    targetNameInput.style.color = '#000'
                    targetNameInput.style.backgroundColor = '#c4ccdd'
                    targetNameInput.style.fontWeight = '500'
                    targetNameInput.style.fontSize = '13px'
                    targetNameInput.style.display = 'inline-block'
                    targetNameInput.style.width = '220%'
                    targetNameInput.style.outline = 'none'
                    targetNameInput.readOnly = 'true'
                    targetNameInput.value = '필터'
                }

                targetBlock.append(targetNameInput)

                targetNameField = document.createElement('input')
                {
                    targetNameField.setAttribute('name', 'targetNameField')
                    targetNameField.style.padding = '0 7px'
                    targetNameField.style.height = '32px'
                    targetNameField.style.border = '#c4ccdd 1px solid'
                    targetNameField.style.color = '#000'
                    targetNameField.style.backgroundColor = '#c4ccdd'
                    targetNameField.style.fontWeight = '500'
                    targetNameField.style.fontSize = '13px'
                    targetNameField.style.display = 'inline-block'
                    targetNameField.style.width = '100%'
                    targetNameField.style.marginLeft = '20px'
                    targetNameField.style.outline = 'none'
                    targetNameField.placeholder = '명칭(Target Name)'
                }

                targetBlock.append(targetNameField)


                mappingNameField = document.createElement('input')
                {
                    mappingNameField.setAttribute('name', 'mappingNameField')
                    mappingNameField.style.padding = '0 7px'
                    mappingNameField.style.height = '32px'
                    mappingNameField.style.border = '#c4ccdd 1px solid'
                    mappingNameField.style.color = '#000'
                    mappingNameField.style.backgroundColor = '#c4ccdd'
                    mappingNameField.style.fontWeight = '500'
                    mappingNameField.style.fontSize = '13px'
                    mappingNameField.style.display = 'inline-block'
                    mappingNameField.style.width = '100%'
                    mappingNameField.style.outline = 'none'
                    mappingNameField.style.marginLeft = '20px'
                    mappingNameField.placeholder = '맵핑(Mapping Name)'
                }


                targetBlock.append(mappingNameField)

/////////////////////////////////////////

                let upDownBlock = document.createElement('div')
                upDownBlock.setAttribute('class', 'fieldBlock')
                upDownBlock.style.marginRight = '20px'
                upDownBlock.style.marginTop = '20px'
                upDownBlock.style.display = 'flex'
                upDownBlock.style.justifyContent = 'space-between'
                changeDiv.append(upDownBlock)


                let upBtn = document.createElement('button')
                {
                    upBtn.style.width = '40%'
                    upBtn.style.padding = '6px 10px 5px'
                    upBtn.style.lineHeight = '1.4'
                    upBtn.style.fontWeight = '400'
                    upBtn.style.fontSize = '12px'
                    upBtn.style.border = '#157efb 1px solid'
                    upBtn.style.color = '#FFF'
                    upBtn.style.backgroundColor = ' #157efb'
                    upBtn.style.boxShadow = 'none'
                    upBtn.innerHTML = '↑ 상위 요소'
                    upBtn.style.cursor = 'pointer'
                    upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    upBtn.style.setProperty('color', '#FFF', 'important');
                    upBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                upDownBlock.append(upBtn)

                let downBtn = document.createElement('button')
                {
                    downBtn.style.width = '40%'
                    downBtn.style.padding = '6px 10px 5px'
                    downBtn.style.lineHeight = '1.4'
                    downBtn.style.fontWeight = '400'
                    downBtn.style.fontSize = '12px'
                    downBtn.style.cursor = 'pointer'

                    downBtn.style.border = '#157efb 1px solid'
                    downBtn.style.color = '#FFF'
                    downBtn.style.backgroundColor = ' #157efb'
                    downBtn.style.boxShadow = 'none'
                    downBtn.innerHTML = '↓ 하위 요소'
                    downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
                    downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
                    downBtn.style.setProperty('color', '#FFF', 'important');
                    downBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                upDownBlock.append(downBtn)


                let delBtn = document.createElement('button')
                {
                    delBtn.setAttribute('class', 'delBtn')
                    delBtn.style.padding = '6px 10px 5px'
                    delBtn.style.lineHeight = '1.4'
                    delBtn.style.fontWeight = '400'
                    delBtn.style.fontSize = '12px'
                    delBtn.style.border = '#157efb 1px solid'
                    delBtn.style.color = '#FFF'
                    delBtn.style.backgroundColor = ' #e1185f'
                    delBtn.style.boxShadow = 'none'
                    delBtn.innerHTML = '삭제'
                    delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
                    delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
                    delBtn.style.setProperty('color', '#FFF', 'important');
                    delBtn.style.setProperty('boxShadow', 'none', 'important');
                }

                upDownBlock.append(delBtn)

                delBtn.addEventListener('click', (event) => {
                    xpathBox.remove()
                    getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                    let count = $('#crawlingCountStep03').val()
                    count = count - 1
                    $('#crawlingCountStep03').val(count)

                })

                upBtn.addEventListener('click', (event) => {

                    let targetElement = getElementByXpath(xpathInput.value);
                    elementArr.push(targetElement)

                    if (targetElement.parentElement != null) {
                        xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                        highLightTag(getElementByXpath(xpathInput.value));
                        tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                        pageNavBar = getElementByXpath(xpathInput.value)
                        // console.log(pageNavBar)

                    } else if (targetElement.parentElement == null) {
                        alert('상위 요소가 없습니다.');
                    }
                })


                downBtn.addEventListener('click', (event) => {

                    // 부모요소는 한개로 통일하더라도, 다시 자식요소로 탐색방향으롤 바꾸면, 자식은 하나 이상일 수 있기떄문에
                    // 한 자식요소를 특정하여 하이라이팅하는 것은 불가능하다고 판단.  최초로 클릭한 요소가 종단요소라는 가정

                    if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                        // 맨앞에 자식요소[0] 추가
                        elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                        if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                            alert('최초 선택 요소 입니다.')
                            // elementArr.pop();
                        } else {
                            getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                            xpathInput.value = getElementTreeXPath(elementArr.pop());
                            highLightTag(getElementByXpath(xpathInput.value))
                            tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;


                            pageNavBar = getElementByXpath(xpathInput.value)
                            // console.log(pageNavBar)

                        }

                    } else {
                        alert('자식요소가 없습니다.')
                    }

                })


                // 페이지의 pageBtnBlock


                notSelectFilterBtn.addEventListener('click', (event) => {

                    notSelectFilterBtn.style.opacity = '1'
                    selectFilterBtn.style.opacity = '0.3'


                    while (targetBlock.hasChildNodes()) {
                        targetBlock.removeChild(targetBlock.firstChild);
                    }
                    // try{
                    //     document.querySelector('.nextBtnBlock').remove()
                    // }
                    // catch(e){
                    //     a=1
                    // }


                    targetNameInput = document.createElement('input')
                    {
                        targetNameInput.setAttribute('name', 'targetNameInput')
                        targetNameInput.style.padding = '0 7px'
                        targetNameInput.style.height = '32px'
                        targetNameInput.style.border = '#c4ccdd 1px solid'
                        targetNameInput.style.color = '#000'
                        targetNameInput.style.backgroundColor = '#c4ccdd'
                        targetNameInput.style.fontWeight = '500'
                        targetNameInput.style.fontSize = '13px'
                        targetNameInput.style.display = 'inline-block'
                        targetNameInput.style.width = '220%'
                        targetNameInput.style.outline = 'none'
                        targetNameInput.readOnly = 'true'
                        targetNameInput.value = 'not_select_filter'
                    }
                    targetBlock.append(targetNameInput)


                    targetNameField = document.createElement('input')
                    {
                        targetNameField.setAttribute('name', 'targetNameField')
                        targetNameField.style.padding = '0 7px'
                        targetNameField.style.height = '32px'
                        targetNameField.style.border = '#c4ccdd 1px solid'
                        targetNameField.style.color = '#000'
                        targetNameField.style.backgroundColor = '#c4ccdd'
                        targetNameField.style.fontWeight = '500'
                        targetNameField.style.fontSize = '13px'
                        targetNameField.style.display = 'inline-block'
                        targetNameField.style.width = '100%'
                        targetNameField.style.marginLeft = '20px'
                        targetNameField.style.outline = 'none'
                        targetNameField.placeholder = '명칭(Target Name)'
                    }

                    targetBlock.append(targetNameField)


                    mappingNameField = document.createElement('input')
                    {
                        mappingNameField.setAttribute('name', 'mappingNameField')
                        mappingNameField.style.padding = '0 7px'
                        mappingNameField.style.height = '32px'
                        mappingNameField.style.border = '#c4ccdd 1px solid'
                        mappingNameField.style.color = '#000'
                        mappingNameField.style.backgroundColor = '#c4ccdd'
                        mappingNameField.style.fontWeight = '500'
                        mappingNameField.style.fontSize = '13px'
                        mappingNameField.style.display = 'inline-block'
                        mappingNameField.style.width = '100%'
                        mappingNameField.style.outline = 'none'
                        mappingNameField.style.marginLeft = '20px'
                        mappingNameField.placeholder = 'mappingName'
                    }
                    targetBlock.append(mappingNameField)


                    let filterValueHidden = document.createElement('input')
                    {
                        filterValueHidden.setAttribute('class', 'filterValueHidden')
                        filterValueHidden.setAttribute('type', 'hidden')
                        filterValueHidden.value = ''
                    }

                    targetBlock.append(filterValueHidden)

                    filterValueHidden.value = 'not_select'


                })

                selectFilterBtn.addEventListener('click', (event) => {

                    notSelectFilterBtn.style.opacity = '0.3'
                    selectFilterBtn.style.opacity = '1'


                    while (targetBlock.hasChildNodes()) {
                        targetBlock.removeChild(targetBlock.firstChild);
                    }
                    // try{
                    //     document.querySelector('.nextBtnBlock').remove()
                    // }
                    // catch(e){
                    //     a=1
                    // }


                    targetNameInput = document.createElement('input')
                    {
                        targetNameInput.setAttribute('name', 'targetNameInput')
                        targetNameInput.style.padding = '0 7px'
                        targetNameInput.style.height = '32px'
                        targetNameInput.style.border = '#c4ccdd 1px solid'
                        targetNameInput.style.color = '#000'
                        targetNameInput.style.backgroundColor = '#c4ccdd'
                        targetNameInput.style.fontWeight = '500'
                        targetNameInput.style.fontSize = '13px'
                        targetNameInput.style.display = 'inline-block'
                        targetNameInput.style.width = '220%'
                        targetNameInput.style.outline = 'none'
                        targetNameInput.readOnly = 'true'
                        targetNameInput.value = 'select_filter'
                    }
                    targetBlock.append(targetNameInput)

                    targetNameField = document.createElement('input')
                    {
                        targetNameField.setAttribute('name', 'targetNameField')
                        targetNameField.style.padding = '0 7px'
                        targetNameField.style.height = '32px'
                        targetNameField.style.border = '#c4ccdd 1px solid'
                        targetNameField.style.color = '#000'
                        targetNameField.style.backgroundColor = '#c4ccdd'
                        targetNameField.style.fontWeight = '500'
                        targetNameField.style.fontSize = '13px'
                        targetNameField.style.display = 'inline-block'
                        targetNameField.style.width = '100%'
                        targetNameField.style.marginLeft = '20px'
                        targetNameField.style.outline = 'none'
                        targetNameField.placeholder = '명칭(Target Name)'
                    }

                    targetBlock.append(targetNameField)


                    mappingNameField = document.createElement('input')
                    {
                        mappingNameField.setAttribute('name', 'mappingNameField')
                        mappingNameField.style.padding = '0 7px'
                        mappingNameField.style.height = '32px'
                        mappingNameField.style.border = '#c4ccdd 1px solid'
                        mappingNameField.style.color = '#000'
                        mappingNameField.style.backgroundColor = '#c4ccdd'
                        mappingNameField.style.fontWeight = '500'
                        mappingNameField.style.fontSize = '13px'
                        mappingNameField.style.display = 'inline-block'
                        mappingNameField.style.width = '100%'
                        mappingNameField.style.outline = 'none'
                        mappingNameField.style.marginLeft = '20px'
                        mappingNameField.placeholder = 'mappingName'
                    }
                    targetBlock.append(mappingNameField)


                    let filterValueHidden = document.createElement('input')
                    {
                        filterValueHidden.setAttribute('class', 'filterValueHidden')
                        filterValueHidden.setAttribute('type', 'hidden')
                        filterValueHidden.value = ''
                    }

                    targetBlock.append(filterValueHidden)

                    filterValueHidden.value = 'select'


                })

                // 필터버튼을 그냥 다시 클릭했을때의 default는 notSelectFilterBtn이 클릭된 상태
                notSelectFilterBtn.click()
            })


            // btnFilter에 이벤트를 붙였으니 클릭 하여 초기화, 바로위에 notSelectFilterBtn으로 클릭걸어놨음, 클릭 걸어놓은거와 별개로 로드할 떄에는 무조건 밑에 조건문 두개를 탈 예정
            btnFilter.click()


            if (JSON.parse(detailJsonData[jsonKey]['options'])['option_filter'] == 'select_filter') {
                selectFilterBtn.click()
                targetNameField.value = detailJsonData[jsonKey]['targetName']
                mappingNameField.value = detailJsonData[jsonKey]['mapping'].replace('filter_','')

            } else if (JSON.parse(detailJsonData[jsonKey]['options'])['option_filter'] == 'not_select_filter') {
                notSelectFilterBtn.click()
                targetNameField.value = detailJsonData[jsonKey]['targetName']
                mappingNameField.value = detailJsonData[jsonKey]['mapping'].replace('filter_','')

            }


        }        //select인지 아닌지 모름

    }


    /////////////////////////////////////////////////////////
    // 로드부분은 세팅 후에 키값에 따라 클릭

    if (tabFlag == 'list/page') {

        if (jsonKey == '리스트') {
            btnList.click()

        }
        else if (jsonKey == '페이지') {
            btnPage.click()
            let pageJson = JSON.parse(detailJsonData[jsonKey]['options'])
            if (pageJson['option_page_type'] == 'param') {
                paramOptionBtn.click()
                targetBlockCopy.querySelector("input[name='mappingNameInput']").value = pageJson['option_page_param']
                targetBlockCopy.querySelector("input[name='loopCountInput']").value = pageJson['option_page_loop']
                targetBlockCopy.querySelector("input[name='offsetCount']").value = pageJson['option_page_offset']


            } else if (pageJson['option_page_type'] == 'more_click') {
                moreClickOptionBtn.click()
                targetBlockCopy.querySelector("input[name='loopCountInput']").value = pageJson['option_page_loop']

            } else if (pageJson['option_page_type'] == 'next_click') {
                nextClickOptionBtn.click()
                targetBlockCopy.querySelector("input[name='loopCountInput']").value = pageJson['option_page_loop']

            }


        }
        else if ((jsonKey == '게시물영역') || (jsonKey == '게시물클릭영역')) {
            btnField.click()
            htmlBtn.style.opacity = '1'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '0.3'
            htmlOrTextOptionValueInput.value = 'html'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
        }
        else if (jsonKey == 'select_filter') {
            btnFilter.click()
            selectFilterBtn.click()

            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']

        } else if (jsonKey == 'not_select_filter') {
            btnFilter.click()
            notSelectFilterBtn.click()

            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
        }

    }
    // 상세 리스트 탭 로딩 부분
    else if (tabFlag == 'fieldInList') {


        while (changeDiv.hasChildNodes()) {
            changeDiv.removeChild(changeDiv.firstChild);
        }

        let targetBlock = document.createElement('div')
        targetBlock.setAttribute('class', 'targetBlock')
        targetBlock.style.marginRight = '20px'
        targetBlock.style.display = 'flex'
        changeDiv.append(targetBlock)

        let targetNameInput = document.createElement('input')
        {
            targetNameInput.setAttribute('name', 'targetNameInput')
            targetNameInput.style.padding = '0 7px'
            targetNameInput.style.height = '32px'
            targetNameInput.style.border = '#c4ccdd 1px solid'
            targetNameInput.style.color = '#000'
            targetNameInput.style.backgroundColor = '#c4ccdd'
            targetNameInput.style.fontWeight = '500'
            targetNameInput.style.fontSize = '13px'
            targetNameInput.style.display = 'inline-block'
            targetNameInput.style.width = '220%'
            targetNameInput.style.outline = 'none'
            targetNameInput.readOnly = 'true'
            targetNameInput.value = '상세리스트'
        }

        targetBlock.append(targetNameInput)

        targetNameField = document.createElement('input')
        {
            targetNameField.setAttribute('name', 'targetNameField')
            targetNameField.style.padding = '0 7px'
            targetNameField.style.height = '32px'
            targetNameField.style.border = '#c4ccdd 1px solid'
            targetNameField.style.color = '#000'
            targetNameField.style.backgroundColor = '#c4ccdd'
            targetNameField.style.fontWeight = '500'
            targetNameField.style.fontSize = '13px'
            targetNameField.style.display = 'inline-block'
            targetNameField.style.width = '100%'
            targetNameField.style.marginLeft = '20px'
            targetNameField.style.outline = 'none'
            targetNameField.placeholder = '명칭(Target Name)'
        }

        targetBlock.append(targetNameField)


        mappingNameField = document.createElement('input')
        {
            mappingNameField.setAttribute('name', 'mappingNameField')
            mappingNameField.style.padding = '0 7px'
            mappingNameField.style.height = '32px'
            mappingNameField.style.border = '#c4ccdd 1px solid'
            mappingNameField.style.color = '#000'
            mappingNameField.style.backgroundColor = '#c4ccdd'
            mappingNameField.style.fontWeight = '500'
            mappingNameField.style.fontSize = '13px'
            mappingNameField.style.display = 'inline-block'
            mappingNameField.style.width = '100%'
            mappingNameField.style.outline = 'none'
            mappingNameField.style.marginLeft = '20px'
            mappingNameField.placeholder = '맵핑(Mapping Name)'
        }

        targetBlock.append(mappingNameField)


        let htmlOrTextOptionBlock = document.createElement('div')
        {
            htmlOrTextOptionBlock.setAttribute('class', 'htmlOrTextOption')
            htmlOrTextOptionBlock.style.marginRight = '20px'
            htmlOrTextOptionBlock.style.marginTop = '20px'
            htmlOrTextOptionBlock.style.display = 'flex'
        }

        changeDiv.append(htmlOrTextOptionBlock)

        htmlBtn = document.createElement('button')
        {
            htmlBtn.style.marginRight = '20px'
            htmlBtn.style.width = '40%'
            htmlBtn.style.padding = '6px 10px 5px'
            htmlBtn.style.lineHeight = '1.4'
            htmlBtn.style.fontWeight = '400'
            htmlBtn.style.fontSize = '12px'
            htmlBtn.style.border = '#157efb 1px solid'
            htmlBtn.style.color = '#FFF'
            htmlBtn.style.backgroundColor = ' #157efb'
            htmlBtn.style.boxShadow = 'none'
            htmlBtn.innerHTML = 'HTML'
            htmlBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            htmlBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            htmlBtn.style.setProperty('color', '#FFF', 'important');
            htmlBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        htmlOrTextOptionBlock.append(htmlBtn)

        textBtn = document.createElement('button')
        {
            textBtn.style.opacity = '0.3'
            textBtn.style.width = '40%'
            textBtn.style.padding = '6px 10px 5px'
            textBtn.style.lineHeight = '1.4'
            textBtn.style.fontWeight = '400'
            textBtn.style.fontSize = '12px'
            textBtn.style.border = '#157efb 1px solid'
            textBtn.style.color = '#FFF'
            textBtn.style.backgroundColor = ' #157efb'
            textBtn.style.boxShadow = 'none'
            textBtn.innerHTML = 'TEXT'
            textBtn.style.marginRight = '20px'
            textBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            textBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            textBtn.style.setProperty('color', '#FFF', 'important');
            textBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        htmlOrTextOptionBlock.append(textBtn)

        fileBtn = document.createElement('button')
        {
            fileBtn.style.opacity = '0.3'
            fileBtn.style.marginRight = '20px'
            fileBtn.style.width = '40%'
            fileBtn.style.padding = '6px 10px 5px'
            fileBtn.style.lineHeight = '1.4'
            fileBtn.style.fontWeight = '400'
            fileBtn.style.fontSize = '12px'
            fileBtn.style.border = '#157efb 1px solid'
            fileBtn.style.color = '#FFF'
            fileBtn.style.backgroundColor = ' #157efb'
            fileBtn.style.boxShadow = 'none'
            fileBtn.innerHTML = 'FILE'
            fileBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            fileBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            fileBtn.style.setProperty('color', '#FFF', 'important');
            fileBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        htmlOrTextOptionBlock.append(fileBtn)


        textOnlyBtn = document.createElement('button')
        {
            textOnlyBtn.style.marginRight = '20px'
            textOnlyBtn.style.opacity = '0.3'
            textOnlyBtn.style.width = '40%'
            textOnlyBtn.style.padding = '6px 10px 5px'
            textOnlyBtn.style.lineHeight = '1.4'
            textOnlyBtn.style.fontWeight = '400'
            textOnlyBtn.style.fontSize = '12px'
            textOnlyBtn.style.border = '#157efb 1px solid'
            textOnlyBtn.style.color = '#FFF'
            textOnlyBtn.style.backgroundColor = ' #157efb'
            textOnlyBtn.style.boxShfadow = 'none'
            textOnlyBtn.innerHTML = 'TEXT-ONLY'
            textOnlyBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            textOnlyBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            textOnlyBtn.style.setProperty('color', '#FFF', 'important');
            textOnlyBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        htmlOrTextOptionBlock.append(textOnlyBtn)

        htmlOrTextOptionValueInput = document.createElement('input')
        {
            htmlOrTextOptionValueInput.setAttribute('class', 'htmlOrTextOptionValueInput')
            htmlOrTextOptionValueInput.setAttribute('type', 'hidden')
            htmlOrTextOptionValueInput.value = 'html'
        }

        htmlOrTextOptionBlock.append(htmlOrTextOptionValueInput)

        htmlBtn.addEventListener('click', (event) => {
            htmlBtn.style.opacity = '1'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '0.3'
            htmlOrTextOptionValueInput.value = 'html'
        })

        textBtn.addEventListener('click', (event) => {
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '1'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '0.3'
            htmlOrTextOptionValueInput.value = 'text'

        })

        fileBtn.addEventListener('click', (event) => {
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '1'
            textOnlyBtn.style.opacity = '0.3'
            htmlOrTextOptionValueInput.value = 'file'

        })

        textOnlyBtn.addEventListener('click', (event) => {
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '1'
            htmlOrTextOptionValueInput.value = 'text_only'

        })

        let upDownBlock = document.createElement('div')
        {
            upDownBlock.setAttribute('class', 'fieldBlock')
            upDownBlock.style.marginRight = '20px'
            upDownBlock.style.marginTop = '20px'
            upDownBlock.style.display = 'flex'
            upDownBlock.style.justifyContent = 'space-between'
        }
        changeDiv.append(upDownBlock)

        let upBtn = document.createElement('button')
        {
            upBtn.style.width = '40%'
            upBtn.style.padding = '6px 10px 5px'
            upBtn.style.lineHeight = '1.4'
            upBtn.style.fontWeight = '400'
            upBtn.style.fontSize = '12px'
            upBtn.style.border = '#157efb 1px solid'
            upBtn.style.color = '#FFF'
            upBtn.style.backgroundColor = ' #157efb'
            upBtn.style.boxShadow = 'none'
            upBtn.innerHTML = '↑ 상위 요소'
            upBtn.style.cursor = 'pointer'
            upBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            upBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            upBtn.style.setProperty('color', '#FFF', 'important');
            upBtn.style.setProperty('boxShadow', 'none', 'important');
        }
        upDownBlock.append(upBtn)

        let downBtn = document.createElement('button')
        {
            downBtn.style.width = '40%'
            downBtn.style.padding = '6px 10px 5px'
            downBtn.style.lineHeight = '1.4'
            downBtn.style.fontWeight = '400'
            downBtn.style.fontSize = '12px'
            downBtn.style.border = '#157efb 1px solid'
            downBtn.style.color = '#FFF'
            downBtn.style.backgroundColor = ' #157efb'
            downBtn.style.boxShadow = 'none'
            downBtn.innerHTML = '↓ 하위 요소'
            downBtn.style.cursor = 'pointer'
            downBtn.style.setProperty('border', '#157efb 1px solid', 'important');
            downBtn.style.setProperty('backgroundColor', '#157efb', 'important');
            downBtn.style.setProperty('color', '#FFF', 'important');
            downBtn.style.setProperty('boxShadow', 'none', 'important');
        }
        upDownBlock.append(downBtn)


        let delBtn = document.createElement('button')
        {
            delBtn.setAttribute('class', 'delBtn')
            delBtn.style.padding = '6px 10px 5px'
            delBtn.style.lineHeight = '1.4'
            delBtn.style.fontWeight = '400'
            delBtn.style.fontSize = '12px'
            delBtn.style.border = '#157efb 1px solid'
            delBtn.style.color = '#FFF'
            delBtn.style.backgroundColor = ' #e1185f'
            delBtn.style.boxShadow = 'none'
            delBtn.innerHTML = '삭제'
            delBtn.style.setProperty('border', '#e1185f 1px solid', 'important');
            delBtn.style.setProperty('backgroundColor', '#e1185f', 'important');
            delBtn.style.setProperty('color', '#FFF', 'important');
            delBtn.style.setProperty('boxShadow', 'none', 'important');
        }

        upDownBlock.append(delBtn)

        delBtn.addEventListener('click', (event) => {
            xpathBox.remove()
            getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
            let count = $('#crawlingCountStep03').val()
            count = count - 1
            $('#crawlingCountStep03').val(count)

        })

        upBtn.addEventListener('click', (event) => {

            let targetElement = getElementByXpath(xpathInput.value);
            elementArr.push(targetElement)

            if (targetElement.parentElement != null) {
                xpathInput.value = getElementTreeXPath(targetElement.parentElement);
                highLightTag(getElementByXpath(xpathInput.value));
                tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

            } else if (targetElement.parentElement == null) {
                alert('상위 요소가 없습니다.');
            }
        })

        downBtn.addEventListener('click', (event) => {


            if (getElementByXpath(xpathInput.value).hasChildNodes()) {

                // 맨앞에 자식요소[0] 추가
                elementArr.unshift(getElementByXpath(xpathInput.value).childNodes[0]);

                if (getElementTreeXPath(elementArr[elementArr.length - 1]) == null) {
                    alert('최초 선택 요소 입니다.')
                    // elementArr.pop();
                } else {
                    getElementByXpath(xpathInput.value).style.backgroundColor = 'transparent';
                    xpathInput.value = getElementTreeXPath(elementArr.pop());
                    highLightTag(getElementByXpath(xpathInput.value))
                    tagOfXpathInput.value = getElementByXpath(xpathInput.value).outerHTML;

                }

            } else {
                alert('자식요소가 없습니다.')
            }

        })

        /////////////////////

        let rowClickBlock = document.createElement('div')
        rowClickBlock.setAttribute('class', 'rowClickBlock')
        rowClickBlock.style.marginTop = '20px'

        let rowXpathInputSpan = document.createElement('span')
        {
            rowXpathInputSpan.style.display = 'block'
            rowXpathInputSpan.style.fontSize = '18px'
            rowXpathInputSpan.innerText = '클릭을 반복 하려는 xpath \n[ 루프할 숫자에 \'?\' 를 꼭 넣어주세요 ]'
            rowXpathInputSpan.style.color = 'white'
            rowXpathInputSpan.style.fontWeight = 'bold'
            rowXpathInputSpan.style.lineHeight = '25px'

        }
        rowClickBlock.append(rowXpathInputSpan)
        let rowXpathInput = document.createElement('input')
        {
            rowXpathInput.setAttribute('class', 'rowXpathInput')
            rowXpathInput.style.height = '32px'
            rowXpathInput.style.border = '#c4ccdd 1px solid'
            rowXpathInput.style.borderRadius = '0'
            rowXpathInput.style.color = '#000'
            rowXpathInput.style.backgroundColor = '#ba96e2'
            rowXpathInput.style.fontWeight = '500'
            rowXpathInput.style.fontSize = '13px'
            rowXpathInput.style.display = 'block'
            rowXpathInput.style.outline = 'none'
            rowXpathInput.style.width = '88%'
            rowXpathInput.style.marginBottom = '15px'


            // rowXpathInput.value = xpathInput.value;
            rowXpathInput.value = detailJsonData[jsonKey]['target'];

            rowXpathInput.style.marginTop = '10px'
        }


        rowClickBlock.append(rowXpathInput)

        changeDiv.append(rowClickBlock)


        let fieldJson_option = JSON.parse(detailJsonData[jsonKey]['options'])
        if (fieldJson_option['option_html'] == 'html') {
            htmlBtn.click()
            htmlOrTextOptionValueInput.value = 'html'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
            // crawlingFieldInListCountStep03.value=detailJsonData[jsonKey]['option_loop']
        } else if (fieldJson_option['option_html'] == 'text') {
            textBtn.click()
            htmlOrTextOptionValueInput.value = 'text'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
            // crawlingFieldInListCountStep03.value=detailJsonData[jsonKey]['option_loop']
        } else if (fieldJson_option['option_html'] == 'file') {
            fileBtn.click()
            htmlOrTextOptionValueInput.value = 'text'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
            // crawlingFieldInListCountStep03.value=detailJsonData[jsonKey]['option_loop']
        } else if (fieldJson_option['option_html'] == 'text_only') {
            textOnlyBtn.click()
            htmlOrTextOptionValueInput.value = 'text_only'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
            // crawlingFieldInListCountStep03.value=detailJsonData[jsonKey]['option_loop']
        }

    }
    else if (((tabFlag == 'field')) && (jsonKey != '게시물영역') && (jsonKey != '게시물클릭영역') && jsonKey != 'permission') {

        let fieldJson_option = JSON.parse(detailJsonData[jsonKey]['options'])
        if (fieldJson_option['option_html'] == 'html') {
            btnField.click()
            htmlBtn.style.opacity = '1'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '0.3'

            htmlOrTextOptionValueInput.value = 'html'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
        } else if (fieldJson_option['option_html'] == 'text') {
            btnField.click()
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '1'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '0.3'

            htmlOrTextOptionValueInput.value = 'text'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']

        } else if (fieldJson_option['option_html'] == 'file') {

            btnField.click()
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '1'
            textOnlyBtn.style.opacity = '0.3'

            htmlOrTextOptionValueInput.value = 'text'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
        } else if (fieldJson_option['option_html'] == 'text_only') {
            btnField.click()
            htmlBtn.style.opacity = '0.3'
            textBtn.style.opacity = '0.3'
            fileBtn.style.opacity = '0.3'
            textOnlyBtn.style.opacity = '1'
            htmlOrTextOptionValueInput.value = 'text_only'
            targetNameField.value = detailJsonData[jsonKey]['targetName']
            mappingNameField.value = detailJsonData[jsonKey]['mapping']
        }

    }


    // 하이라이팅 해주는 부분
    let element = getElementByXpath(detailJsonData[jsonKey]['target'].replace('?', '1'));
    highLightTag(element)


    if (element == null) {
        // null 인경우 현재 페이지에서 해당 xpath가 없는 경우 -> 상세인지 리스트페이지인지 알아서 분기
        return
    }




}



// 하이라이팅 함수
function highLightTag(element) {
    try {
        element.style.backgroundColor = '#d9965b';
    } catch (e) {
        // console.log("배경색이 없습니다.");
        var no_matter_var = 1
    }
}



// xpath로 웹 요소 얻기
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


// 웹요소의 xpath 얻기
function getElementTreeXPath(element) {

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


// 마우스로 요소 하이이팅 하는 함수
function getFocusElement(element) {
    try {
        element.style.backgroundColor = '#a1e058';

    } catch (e) {
        console.log("배경색이 없습니다.");
    }
}

// 요소의 배경색 얻기
function getBackgroundColorOfElement(element, color) {
    element.style.backgroundColor = color;
}


// 버그가 많아 사용 X
function showTagType(myEvent, x, y, targetDiv) {
    targetDiv.style.top = y + "px";
    targetDiv.style.left = x + "px";
    let targetTag = document.querySelector('#mouse-over-context ul li:nth-child(1)');
    targetTag.innerHTML = "[ tag ] : " + myEvent.target.tagName.toLowerCase();

    let targetClass = document.querySelector('#mouse-over-context ul li:nth-child(2)');
    targetClass.innerHTML = "[ class ] : " + myEvent.target.className;

}












