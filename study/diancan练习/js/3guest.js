/**
 * Created by dell on 2019/3/29.
 */
var dl=document.getElementsByClassName('dl');
var back=document.getElementById('back');
back.onclick=function () {
    window.history.go(-1)
};
dl[0].onclick=function () {
    document.getElementsByClassName('people')[0].value ='';
};
dl[1].onclick=function () {
    document.getElementsByClassName('phone')[0].value=''
};
dl[2].onclick=function () {
    document.getElementsByClassName('money')[0].value='';
};
var down=document.getElementsByClassName('down')[0];
var ts=document.getElementsByClassName('ts')[0];
function setts( value) {
    ts.classList.remove('none');
    ts.innerText=value;
    setTimeout(function () {
        ts.classList.add('none')
    },2000);
    return
}
down.onclick=function () {
    var people=document.getElementsByClassName('people')[0].value
    if( people ==''){
        setts('请输入人数')
    }
    var phone=document.getElementsByClassName('phone')[0].value
    if( phone ==''){
        setts('请输入手机号')
    }
    var money=document.getElementsByClassName('money')[0].value
    if( money ==''){
        setts('请输入金额')
    }
    var xhr=new XMLHttpRequest()
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/addCustomerInfo.do?method=login')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send(
        'deskId='+getCookie('deskid') +
        '&peopleNumbers='+people+
        '&callingNumber='+phone+
        '&prepaidPay='+money+
        '&memberId='+getCookie('memberId')+
        '&memberName='+getCookie('membername')
    )
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&xhr.status==200){
            var text=xhr.responseText
            var json=JSON.parse(text)
            if(json.errCode='000'){
                location.href='5.html'
            }
            else {
                alert('保存失败')
            }
        }
    }
}