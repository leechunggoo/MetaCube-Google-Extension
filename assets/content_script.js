console.log('metacube 에서 호출하는 content script')

function crawlingpage(res){

    const crtag = document.querySelector('.temp-right')
    const divEl = crtag.querySelector('div')
    

    // step 01
    let UserName = document.createElement('span')
    UserName.innerHTML = res.body.member.username +' 님'
    UserName.style.color = '#fff'
    UserName.style.fontSize = '20px'
    UserName.style.marginBottom = '7px'
    UserName.style.fontWeight = '600'
    UserName.style.display = 'block'
    divEl.append(UserName)

    let row01 = document.createElement('div')
    divEl.append(row01)
    
    let crawlingtitleSpan = document.createElement('span')
    crawlingtitleSpan.innerHTML = '타이틀'
    crawlingtitleSpan.style.color = '#fff'
    crawlingtitleSpan.style.fontSize = '12px'
    crawlingtitleSpan.style.marginBottom = '5px'
    crawlingtitleSpan.style.fontWeight = '200'
    crawlingtitleSpan.style.display = 'block'
    crawlingtitleSpan.style.width ='20%'
    row01.append(crawlingtitleSpan)

    let crawlingTITELinput = document.createElement('input')
    crawlingTITELinput.setAttribute('id','crawlingTITELinput')
    crawlingTITELinput.style.padding = '0 7px'
    crawlingTITELinput.style.height = '32px'
    crawlingTITELinput.style.border = '#c4ccdd 1px solid'
    crawlingTITELinput.style.borderRadius = '0'
    crawlingTITELinput.style.color = '#000'
    crawlingTITELinput.style.backgroundColor = '#c4ccdd'
    crawlingTITELinput.style.fontWeight = '500'
    crawlingTITELinput.style.fontSize = '13px'
    crawlingTITELinput.style.display = 'block'
    crawlingTITELinput.style.fontSize = '100%'
    crawlingTITELinput.style.outline = 'none'
    crawlingTITELinput.style.width = '80%'
    crawlingTITELinput.style.placeHolder = 'ex.. 74'
    row01.append(crawlingTITELinput)

    //제목입력
    let title = document.querySelector('title').textContent;
    crawlingTITELinput.value=title

    let crawlingURLspanStep02 = document.createElement('span')
    crawlingURLspanStep02.innerHTML = '도메인';
    crawlingURLspanStep02.style.color = '#fff'
    crawlingURLspanStep02.style.fontSize = '12px'
    crawlingURLspanStep02.style.marginBottom = '5px'
    crawlingURLspanStep02.style.fontWeight = '200'
    crawlingURLspanStep02.style.display = 'block'
    crawlingURLspanStep02.style.width ='20%'
    row01.append(crawlingURLspanStep02)

    let crawlingURLinput = document.createElement('input')
    crawlingURLinput.setAttribute('id','crawlingURLinput')
    crawlingURLinput.style.padding = '0 7px'
    crawlingURLinput.style.height = '32px'
    crawlingURLinput.style.border = '#c4ccdd 1px solid'
    crawlingURLinput.style.borderRadius = '0'
    crawlingURLinput.style.color = '#000'
    crawlingURLinput.style.backgroundColor = '#c4ccdd'
    crawlingURLinput.style.fontWeight = '500'
    crawlingURLinput.style.fontSize = '13px'
    crawlingURLinput.style.display = 'block'
    crawlingURLinput.style.fontSize = '100%'
    crawlingURLinput.style.outline = 'none'
    crawlingURLinput.style.width = '80%'
    crawlingURLinput.style.placeHolder = 'ex.. 74'
    row01.append(crawlingURLinput)
    
    let crawlingTARGETspan = document.createElement('span')
    crawlingTARGETspan.innerHTML = '수집대상';
    crawlingTARGETspan.style.color = '#fff'
    crawlingTARGETspan.style.fontSize = '12px'
    crawlingTARGETspan.style.marginBottom = '5px'
    crawlingTARGETspan.style.fontWeight = '200'
    crawlingTARGETspan.style.display = 'block'
    crawlingTARGETspan.style.width ='20%'
    row01.append(crawlingTARGETspan)

    let crawlingTARGETinput = document.createElement('input')
    crawlingTARGETinput.setAttribute('id','crawlingTARGETinput')
    crawlingTARGETinput.style.padding = '0 7px'
    crawlingTARGETinput.style.height = '32px'
    crawlingTARGETinput.style.border = '#c4ccdd 1px solid'
    crawlingTARGETinput.style.borderRadius = '0'
    crawlingTARGETinput.style.color = '#000'
    crawlingTARGETinput.style.backgroundColor = '#c4ccdd'
    crawlingTARGETinput.style.fontWeight = '500'
    crawlingTARGETinput.style.fontSize = '13px'
    crawlingTARGETinput.style.display = 'block'
    crawlingTARGETinput.style.fontSize = '100%'
    crawlingTARGETinput.style.outline = 'none'
    crawlingTARGETinput.style.width = '80%'
    crawlingTARGETinput.style.placeHolder = 'ex.. 74'
    row01.append(crawlingTARGETinput)

    let crawlingPLANspan = document.createElement('span')
    crawlingPLANspan.innerHTML = '설명';
    crawlingPLANspan.style.color = '#fff'
    crawlingPLANspan.style.fontSize = '12px'
    crawlingPLANspan.style.marginBottom = '5px'
    crawlingPLANspan.style.fontWeight = '200'
    crawlingPLANspan.style.display = 'block'
    crawlingPLANspan.style.width ='20%'
    row01.append(crawlingPLANspan)

    let crawlingPLANinput = document.createElement('input')
    crawlingPLANinput.setAttribute('id','crawlingPLANinput')
    crawlingPLANinput.style.padding = '0 7px'
    crawlingPLANinput.style.height = '32px'
    crawlingPLANinput.style.border = '#c4ccdd 1px solid'
    crawlingPLANinput.style.borderRadius = '0'
    crawlingPLANinput.style.color = '#000'
    crawlingPLANinput.style.backgroundColor = '#c4ccdd'
    crawlingPLANinput.style.fontWeight = '500'
    crawlingPLANinput.style.fontSize = '13px'
    crawlingPLANinput.style.display = 'block'
    crawlingPLANinput.style.fontSize = '100%'
    crawlingPLANinput.style.outline = 'none'
    crawlingPLANinput.style.width = '80%'
    crawlingPLANinput.style.placeHolder = 'ex.. 74'
    row01.append(crawlingPLANinput)
    
    let crawlingCATEGORYspan = document.createElement('span')
    crawlingCATEGORYspan.innerHTML = '유형';
    crawlingCATEGORYspan.style.color = '#fff'
    crawlingCATEGORYspan.style.fontSize = '12px'
    crawlingCATEGORYspan.style.marginBottom = '5px'
    crawlingCATEGORYspan.style.fontWeight = '200'
    crawlingCATEGORYspan.style.display = 'block'
    crawlingCATEGORYspan.style.width ='20%'
    row01.append(crawlingCATEGORYspan)

    let crawlingCATEGORYinput = document.createElement('input')
    crawlingCATEGORYinput.setAttribute('id','crawlingCATEGORYinput')
    crawlingCATEGORYinput.style.padding = '0 7px'
    crawlingCATEGORYinput.style.height = '32px'
    crawlingCATEGORYinput.style.border = '#c4ccdd 1px solid'
    crawlingCATEGORYinput.style.borderRadius = '0'
    crawlingCATEGORYinput.style.color = '#000'
    crawlingCATEGORYinput.style.backgroundColor = '#c4ccdd'
    crawlingCATEGORYinput.style.fontWeight = '500'
    crawlingCATEGORYinput.style.fontSize = '13px'
    crawlingCATEGORYinput.style.display = 'block'
    crawlingCATEGORYinput.style.fontSize = '100%'
    crawlingCATEGORYinput.style.outline = 'none'
    crawlingCATEGORYinput.style.width = '80%'
    crawlingCATEGORYinput.style.placeHolder = 'ex.. 74'
    row01.append(crawlingCATEGORYinput)

    let crawlingXPATHspan = document.createElement('span')
    crawlingXPATHspan.innerHTML = 'XPATH';
    crawlingXPATHspan.style.color = '#fff'
    crawlingXPATHspan.style.fontSize = '12px'
    crawlingXPATHspan.style.marginBottom = '5px'
    crawlingXPATHspan.style.fontWeight = '200'
    crawlingXPATHspan.style.display = 'block'
    crawlingXPATHspan.style.width ='20%'
    row01.append(crawlingXPATHspan)

    let crawlingXPATHinput = document.createElement('input')
    crawlingXPATHinput.setAttribute('id','crawlingXPATHinput')
    crawlingXPATHinput.style.padding = '0 7px'
    crawlingXPATHinput.style.height = '32px'
    crawlingXPATHinput.style.border = '#c4ccdd 1px solid'
    crawlingXPATHinput.style.borderRadius = '0'
    crawlingXPATHinput.style.color = '#000'
    crawlingXPATHinput.style.backgroundColor = '#c4ccdd'
    crawlingXPATHinput.style.fontWeight = '500'
    crawlingXPATHinput.style.fontSize = '13px'
    crawlingXPATHinput.style.display = 'block'
    crawlingXPATHinput.style.fontSize = '100%'
    crawlingXPATHinput.style.outline = 'none'
    crawlingXPATHinput.style.width = '80%'
    crawlingXPATHinput.style.placeHolder = 'ex.. 74'
    row01.append(crawlingXPATHinput)

    

}



