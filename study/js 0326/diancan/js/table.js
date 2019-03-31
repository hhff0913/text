/**
 * Created by Administrator on 2019/3/27.
 */

//获取楼层
function getAreaList(){
  var xhr = new XMLHttpRequest()
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryDeskArea.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState ===4 && xhr.status ===200) {
      var text = xhr.responseText ;
      var json = JSON.parse(text);
      // 得到楼层列表
      var areaList = json.responseBody.deskAreaList ;
      // 生成界面上的楼层列表
      var area = document.getElementsByClassName('area')[0];
      for (var i =0 ;i < areaList.length ;i++ ){
        var span = document.createElement('span');
        // 加高亮
        if (i===0) {
          span.className = 'active';
        }
        span.innerText = areaList[i].deskAreaCaption
        area.appendChild(span);
      }
    }
  }
}
getAreaList();
