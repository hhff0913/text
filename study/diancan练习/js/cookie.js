/**
 * Created by Administrator on 2019/3/27.
 */

function setCookie(key,value,day) {
  // 获取当前日期
  var date = new Date();
  // 设置有效期
  date.setTime(date.getTime()+ day*24*60*60*1000 );
  document.cookie = key +'='+value +';expires='+ date.toString();
}


function getCookie(key) {
  // 获取所有Cookie
  var cookies = document.cookie;
  // 分割获取的Cookie
  var cookieArr = cookies.split('; ');
  // 分割Cookie的键值对
  for(var i=0;i<cookieArr.length;i++) {
    var temp = cookieArr[i];
    var tempArr = temp.split('=');
    // 获取键对应的值
    if (tempArr[0] === key) {
      return tempArr[1];
    }
  }
  return ''
}
// 删除Cookie
function delCookie(key) {
  setCookie(key,'',-1);
}