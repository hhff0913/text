// 判断是否有保存账号和密码的cookie
if (getCookie('memberId') !='') {
  document.getElementById('user').value= getCookie('memberId');
}
if (getCookie('password')!='') {
  document.getElementById('pwd').value = getCookie('password');
}

// 如果账号和密码的cookie都存在，则打开“自动保存的”开关
if (getCookie('memberId') !='' && getCookie('password')!='' ) {
  document.getElementsByClassName('switch')[0].classList.add('open');
}


var login = document.getElementsByClassName('login')[0];
login.onclick = function () {
  // 实现登录
  var memberId = document.getElementById('user');
  var pwd = document.getElementById('pwd');
  // 判断账号是否为空
  if (memberId.value ==='') {
    alert('账号不能为空');
    return;
  }
  if (pwd.value ==='') {
    alert('密码不能为空')
    return;
  }
  // 发送账号和密码（请求登录接口）
  var xhr = new XMLHttpRequest()
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/login.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send('memberId='+ memberId.value + '&password='+ pwd.value);
  xhr.onreadystatechange = function () {
    if (xhr.status ===200 && xhr.readyState ===4) {
      var text = xhr.responseText;
      var json = JSON.parse(text);
      if (json.responseBody.memberId !='') {
        // 登录成功
        // alert('登录成功')
        // 判断是否选中了"自动登录"
        var sw2 = document.getElementsByClassName('switch')[0];
        if (sw2.classList.contains('open') === true) {
          // 设置账号和密码
          setCookie('memberId',memberId.value ,30 );
          setCookie('password', pwd.value,30)
          // 跳转到第二个餐台页面

        } else {
          // 删除cookie的账号和密码
          delCookie('memberId')
          delCookie('password')
        }
        location.href=  'table.html'
      } else {
        //失败
        alert('登录失败了')
      }
    }
  }
}
//自动登录的开关
var sw = document.getElementsByClassName('switch')[0];
sw.onclick = function () {
  if (this.classList.contains('open') === true) {
    this.classList.remove('open')
  } else {
    this.classList.add('open')
  }
}