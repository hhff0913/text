/**
 * Created by Administrator on 2019/3/27.
 */

function setCookie(key,value,day) {
  var date = new Date();
  date.setTime(date.getTime()+ day*24*60*60*1000 );
  document.cookie = key +'='+value +';expires='+ date.toString();
}

function getCookie(key) {
  var cookies = document.cookie;
  var cookieArr = cookies.split('; ');
  for(var i=0;i<cookieArr.length;i++) {
    var temp = cookieArr[i];
    var tempArr = temp.split('=');
    if (tempArr[0] === key) {
      return tempArr[1];
    }
  }
  return ''
}

function delCookie(key) {
  setCookie(key,'',-1);
}