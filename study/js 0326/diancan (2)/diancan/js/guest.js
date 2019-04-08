/**
 * Created by Administrator on 2019/3/29.
 */
var back = document.getElementById('back');
back.onclick = function () {
  // history.back()
  history.go(-1)
}


var del = document.getElementsByClassName('del');
del[0].onclick = function () {
  document.getElementById('people').value = ''
}
del[1].onclick = function () {
  document.getElementById('phone').value = ''
}
del[2].onclick = function () {
  document.getElementById('money').value = ''
}


function showTools(message) {
  var tools = document.getElementsByClassName('tools')[0];
  tools.innerText = message
  tools.classList.remove('none');
  setTimeout(function () {
    tools.classList.add('none');
  },2000)
}

// 确定提交
var post = document.getElementsByClassName('post')[0];
post.onclick = function () {
  var people = document.getElementById('people').value;
  var phone = document.getElementById('phone').value;
  var money = document.getElementById('money').value;
  if (people =='') {
    showTools('请输入人数')
    return;
  }
  if (phone =='') {
    showTools('请输入手机号')
    return;
  }
  if (money =='') {
    showTools('请输入金额')
    return;
  }

  // ajax
  var xhr = new XMLHttpRequest()
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/addCustomerInfo.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  /*
   deskId:
   peopleNumbers:
   callingNumber:
   prepaidPay:
   memberId:
   memberName:

   */
  var userid= getCookie('memberId') ;
  var username= getCookie('memberName')
  debugger
  xhr.send('deskId='+  getCookie('deskid')  +'&peopleNumbers='+ people +'&callingNumber='+ phone  +'&prepaidPay='+ money +'&memberId='+ userid +'&memberName=' + username );
  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      var text= xhr.responseText;
      var json = JSON.parse(text);
      if (json.errCode ==='000') {
        showTools('添加客户信息成功')
        setTimeout(function () {
          // location.href = 'menu.html'
        },2000)
      }
    }
  }


}