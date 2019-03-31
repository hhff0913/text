/**
 * Created by dell on 2019/3/26.
 */
var dl=document.getElementsByClassName('dl');
var member=document.getElementsByClassName('user')[0];
var pass=document.getElementsByClassName('pwd')[0];
var down=document.getElementsByClassName('down')[0];
var ts=document.getElementsByClassName('ts')[0];
var dzd=document.getElementsByClassName('dzd')[0];
// 判断是否自动登录
if(getCookie('memberId')!=''){
    member.value=getCookie('memberId')
}
if(getCookie('password')!=''){
    pass.value=getCookie('password')
}
// 登录继续保存Cookie
if(getCookie('memberId')!=''&&getCookie('password')!=''){
    dzd.classList.add('open')
}
// 点击清除账号
dl[0].onclick=function () {
    member.value='';
};
// 点击清除密码
dl[1].onclick=function () {
    pass.value='';
};
// 控制小球的背景及浮动
dzd.onclick=function () {
    if ( this.classList.contains('open') ===true ) {
        this.classList.remove('open')
    } else {
        this.classList.add('open')
    }
}
// 密码账号为空时进行吐丝
down.onclick=function () {
    var memberId = member.value;
    var password = pass.value;
    if (memberId === '') {
        ts.innerText = '请输入账号!';
        ts.classList.remove('none');
        setTimeout(function () {
            ts.classList.add('none')
        }, 2000);
        return;
    }
    if (password === '') {
        ts.innerText = '请输入密码!';
        ts.classList.remove('none');
        setTimeout(function () {
            ts.classList.add('none')
        }, 2000);
        return;
    }
    // 创建ajax登录接口
    var xhr = new XMLHttpRequest();
    // ajax后端接口登录地址
    xhr.open('post', 'http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/login.do?method=login')
    // 设置请求头的内容信息与后端配合
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // 发送数据给后端
    xhr.send('memberId=' + memberId + '&password=' + password)
    // 获取请求状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var text = xhr.responseText;
            var json = JSON.parse(text);
            // 判断是否登录成功(根据返回的memberId或memberName不为空)
            if (json.responseBody.memberId !== '') {
                // alert('登录成功')
                location.href = '2table.html'
                // 登录成功后保存Cookie
                if (dzd.classList.contains('open') === true) {
                    setCookie('memberId', memberId, 7)
                    setCookie('password', password, 7)
                    setCookie('memberName',json.responseBody.memberName,7)
                }
                else {
                    removeCookie('memberId');
                    removeCookie('password')

                }

            } else {
                alert('登录失败')
            }
        }
    }

}

// down.onclick=function (){
//     var xhr = new XMLHttpRequest() ;
//     var memberId=member.value;
//     var password=pass.value;
//     xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/login.do?method=login')
//     xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
//     xhr.send('memberId='+memberId+'&password='+password)
//     xhr.onreadystatechange=function () {
//         if (xhr.readyState===4 && xhr.status===200){
//             var text = xhr.responseText;
//             var json = JSON.parse(text);
//             if (json.responseBody.memberId !=='') {
//                 alert('登录成功')
//                 location.href='2table.html'
//             } else {
//                 alert('登录失败')
//             }
//         }
//     }
// };
//
//
