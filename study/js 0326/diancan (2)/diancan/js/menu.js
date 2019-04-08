/**
 * Created by Administrator on 2019/4/1.
 */

// 查询菜品类别列表
function getMenuList(deskId) {
  var xhr = new XMLHttpRequest();
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryMenuClassList.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send('deskId='+ deskId);
  xhr.onreadystatechange = function () {
    if (xhr.status ===200 && xhr.readyState===4){
      var text = xhr.responseText;
      var json = JSON.parse(text);
      var menuClassList = json.responseBody.menuClassList ;



      // 生成菜类列表
      var left = document.getElementsByClassName('left')[0];
      for(var i=0;i< menuClassList.length ; i++) {
        /*
         <div class="item active">
           <span class="name">鱼类</span>
           <span class="qipao">1</span>
         </div>
         */
        // 创建容器
        var item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('classid', menuClassList[i].menuClassId)
        if (i===0) {
          item.classList.add('active');
        }
        // 切换类别
        item.onclick = function () {
          var children = document.getElementsByClassName('left')[0].children;
          for(var i=0 ; i< children.length; i++) {
            children[i].classList.remove('active');
          }
          this.classList.add('active');
          // 根据本身的类别id，获取菜品列表
          getMenuListByClassId( this.getAttribute('classid') )

        }

        // 创建span
        var span = document.createElement('span');
        span.className = 'name';
        span.innerText = menuClassList[i].menuClassCaption

        var qipao = document.createElement('span');
        qipao.innerText = menuClassList[i].count;
        qipao.className = 'qipao'
        if (menuClassList[i].count <=0) {
          qipao.classList.add('none');
        };

        // item加入两个span
        item.appendChild(span);
        item.appendChild(qipao);

        // 加入大的容器
        left.appendChild(item)

      }
      // 加载默认的鱼类对应的菜品列表
      getMenuListByClassId( menuClassList[0].menuClassId )


    }
  }
}

// 调用

getMenuList( getCookie('deskid'))


// 根据菜品类别id，查询此类别对应菜品列表
function getMenuListByClassId(classId) {
  var xhr = new XMLHttpRequest();
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryMenuListByDesk.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  /*
   menuClassId:
   deskId:
   pageIndex:1
   pageSize:20
   */
  var canshu = 'menuClassId=' + classId + '&deskId='+ getCookie('deskid') + '&pageIndex=1&pageSize=100'
  xhr.send( canshu );
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var text = xhr.responseText;
      var json = JSON.parse(text);
      var menuList = json.responseBody.menuList ;

      // 获取right容器
      var right = document.getElementsByClassName('right')[0];
      right.innerText = '';
      for( var i = 0; i< menuList.length ; i++) {
        // 创建元素
        /*
         <div class="menubox">
             <img src="image/menu.png" alt="">
             <div class="menuname">
                 <p class="p1">小炒肉</p>
                 <p class="p2">60元</p>
                 <p class="p3">30元</p>
             </div>
             <span class="qipao">1</span>
             <span class="btn selected"> </span>
         </div>
         */
        var menubox = document.createElement('div');
        menubox.className = 'menubox';
        var img = document.createElement('img');
        img.src = 'image/menu.png';

        // 名称容器
        var menuname = document.createElement('menuname');
        menuname.className = 'menuname'
        var p1 = document.createElement('p')
        p1.innerText = menuList[i].menuName;
        p1.className = 'p1'

        var p2 = document.createElement('p')
        p2.innerText = menuList[i].menuPrice;
        p2.className = 'p2'

        var p3 = document.createElement('p')
        p3.innerText = menuList[i].promotionPrice;
        p3.className = 'p3'

        menuname.appendChild(p1);
        menuname.appendChild(p2);
        menuname.appendChild(p3);

        // 气泡
        var qipao = document.createElement('span')
        qipao.innerText = menuList[i].menuCount ;
        qipao.className = 'qipao'
        if ( menuList[i].menuCount <=0 ) {
          qipao.classList.add('none');
        }

        // 选择按钮
        var btn = document.createElement('span')
        btn.className = 'btn' ;
        if (menuList[i].menuCount > 0 ) {
          btn.classList.add('selected');
        }

        menubox.appendChild(img)
        menubox.appendChild(menuname)
        menubox.appendChild(qipao)
        menubox.appendChild(btn)
        right.appendChild( menubox )
      }


    }
  }

}



