/**
 * Created by Administrator on 2019/3/26.
 */

// 判断是否自动登录
if (getCookie('memberId')!='') {
  document.getElementById('user').value = getCookie('memberId') ;
}

if (getCookie('password')!='') {
  document.getElementById('pwd').value = getCookie('password') ;
}

if (getCookie('memberId')!=''  && getCookie('password')!='' ) {
  document.getElementsByClassName('switch')[0].classList.add('open');
}





//绑定删除按钮
var del = document.getElementsByClassName('del');
del[0].onclick = function() {
  // 删除账号的值
  document.getElementById('user').value = '';
}

del[1].onclick = function() {
  // 删除密码的值
  document.getElementById('pwd').value = '';
}

//自动登录-开关，绑定点击
var kaiguan = document.getElementsByClassName('switch')[0];
kaiguan.onclick = function() {
  if ( this.classList.contains('open') ==true ) {
    this.classList.remove('open')
  } else {
    this.classList.add('open')
  }
}


//绑定登录方法
var login = document.getElementsByClassName('login')[0];
login.onclick = function () {
  // 取账号
  var userValue =  document.getElementById('user').value;
  //取密码
  var pwdVaule = document.getElementById('pwd').value;
  if (userValue =='') {
    // alert('请输入账号！');
    var tools = document.getElementsByClassName('tools')[0];
    tools.innerText = '请输入账号！'
    tools.classList.remove('none');   // 让吐丝显示
    setTimeout(function () {
      tools.classList.add('none');
    },2000)

    return ;
  }

  if (pwdVaule =='') {
    // alert('请输入密码！');
    var tools = document.getElementsByClassName('tools')[0];
    tools.innerText = '请输入密码！'
    tools.classList.remove('none');   // 让吐丝显示
    setTimeout(function () {
      tools.classList.add('none');
    },2000)
    return ;
  }

  // 实现ajax登录
  var xhr = new XMLHttpRequest();
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/login.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send('memberId='+ userValue +'&password='+ pwdVaule ) ;
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState === 4){
      // 取后端返回的数据（json）
      var text = xhr.responseText;
      var json = JSON.parse(text) ;
      if (json.responseBody.memberId !='') {
        // 登录成功
        // alert('登录成功')
        // 判断是否自动保存登录
        var kaiguan = document.getElementsByClassName('switch')[0];
        if (kaiguan.classList.contains('open') === true) {
          setCookie('memberId', userValue , 7 );
          setCookie('password', pwdVaule , 7) ;
        } else {
          // 取消保存的cookie
          delCookie('memberId');
          delCookie('password')
        }

        location.href = 'table.html'
      } else {
        alert('登录失败')
      }
    }
  }


}