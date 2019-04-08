
// 获取楼层区域列表
function getAreaList(){
  var xhr = new XMLHttpRequest();
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryDeskArea.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.status ==200 && xhr.readyState==4) {
      var text= xhr.responseText;
      var json = JSON.parse(text);
      var areaList = json.responseBody.deskAreaList ;

      // 加载第一个楼层对象餐台列表
      getTableList( areaList[0].deskAreaId )

      // 循环生成楼层的span标签
      var area = document.getElementsByClassName('area')[0];
      for(var i = 0 ;i < areaList.length ;i++) {
        var span = document.createElement('span');
        // 设置此楼层标签areaid
        span.setAttribute('areaid',areaList[i].deskAreaId  );
        span.innerText = areaList[i].deskAreaCaption;
        // 楼层点击事件
        span.onclick = function() {
          // 获取area下所有的span
          var children = document.getElementsByClassName('area')[0].children;
          for(var j = 0 ;j < children.length ;j++ ) {
            children[j].className = ''
          }
          this.className = 'active';

          //清空原本的餐台列表
          document.getElementsByClassName('tableBox')[0].innerText= '';

          //加载对应的餐台列表
          getTableList(this.getAttribute('areaid'));
        }
        if (i==0) {
          span.className = 'active'
        }
        area.appendChild(span);
      }
    }
  }

}
getAreaList();

// 获取餐台列表
function getTableList(deskId) {
  var xhr = new XMLHttpRequest();
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryDeskTopList.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send('deskAreaId='+ deskId);
  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      var text= xhr.responseText;
      var json = JSON.parse(text);
      var tableList = json.responseBody.deskTopList ;
      //获取tableBox容器
      var tableBox = document.getElementsByClassName('tableBox')[0];
      for(var i = 0; i< tableList.length;i++ ) {
        // 创建餐台容器
        var table = document.createElement('div');
        table.className = 'table';
        table.setAttribute('status',tableList[i].deskStatus );
        table.setAttribute('served',tableList[i].servedCount )
        table.setAttribute('deskid',tableList[i].deskId);
        table.setAttribute('deskcaption',tableList[i].deskCaption);
        table.onclick = function () {
          // 根据条件跳转到不同的页面
          // 1.未开台跳到客人信息页面  2.开台未提交订单的跳菜谱页面   3.开台已提交订单的跳我的订单页面
          var status = this.getAttribute('status');
          var served = this.getAttribute('served');

          setCookie('deskid', this.getAttribute('deskid'))
          setCookie('deskcaption', this.getAttribute('deskcaption'))
          if (status ==="1") {
            // 空台
            location.href = 'guest.html'
          } else {
            // 开台
            if (served > 0) {
              // 已下单
              location.href = 'order.html'
            } else {
              location.href = 'menu.html'
            }
          }
        }


        // 判断餐台开台状态
        if ( tableList[i].deskStatus === '2' ) {
          if (tableList[i].servedCount>0) {
            // 已下单
            table.classList.add('ordered')
          } else {
            // 未下单
            table.classList.add('opened')
          }
        }

        // 金额标签
        var price = document.createElement('div');
        price.innerText = tableList[i].deskStatus =='2' ?   Number(tableList[i].totalAmount) + '元': '' ;
        // 餐台名称
        var name = document.createElement('div');
        name.innerText = tableList[i].deskCaption;
        // 时间
        var time = document.createElement('div');
        time.innerText = tableList[i].createTime.substr(11,5);

        // table餐台容器添加子标签
        table.appendChild( price  )
        table.appendChild( name  )
        table.appendChild( time  )

        tableBox.appendChild(table);
      }

    }
  }
}

// getTableList('1002')