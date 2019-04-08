
// 设置+-标识的全局变量
var jiajian = "";
var menuid = '';
var lineno = '' ;
var danqianObj = ''

// 加载菜品类别
function getMenuList() {
  var xhr = new XMLHttpRequest()
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryMenuClassList.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send('deskId='+ getCookie('deskid'));
  xhr.onreadystatechange = function () {
    if (xhr.status ===200 && xhr.readyState ===4) {
      var text = xhr.responseText;
      var json = JSON.parse(text);
      //取菜类列表
      var menuList = json.responseBody.menuClassList;

      // 加载第一的菜类对应的菜品列表
      getMenuListByClassId( menuList[0].menuClassId )

      // 创建菜类列表
      var left = document.getElementsByClassName('left')[0];
      /*
       <div class="item active">
           <span class="name">鱼类</span>
           <span class="qipao">1</span>
       </div>
       */
      for(var i=0;i< menuList.length ;i++) {
        var item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('classid', menuList[i].menuClassId )
        if (i===0) {
          item.classList.add('active')
        }
        // item容器的（即菜类）切换
        item.onclick= function () {
          var children = left.children ;
          for(var j = 0; j<children.length; j++) {
            children[j].classList.remove('active')
          }
          this.classList.add('active');
          // 加载对应菜品列表
          getMenuListByClassId(this.getAttribute('classid'))
        }

        // 创建名称和气泡
        var name = document.createElement('span');
        name.innerText = menuList[i].menuClassCaption;
        name.className = 'name';
        var qipao = document.createElement('span');
        qipao.innerText =  menuList[i].count;
        qipao.className = 'qipao';
        if (menuList[i].count ==0) {
          qipao.classList.add('none');
        }
        // 加入item容器
        item.appendChild(name)
        item.appendChild(qipao)
        left.appendChild(item);


      }
    }
  }
}

getMenuList() ;

// 加载菜品列表（根据菜类）
function getMenuListByClassId(classId) {
  var xhr = new XMLHttpRequest()
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryMenuListByDesk.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  /*
   menuClassId:
   deskId:
   pageIndex:1
   pageSize:20

   */
  xhr.send('menuClassId='+classId + '&deskId='+ getCookie('deskid') + '&pageIndex=1&pageSize=20');
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var text = xhr.responseText;
      var json = JSON.parse(text);
      var menuList = json.responseBody.menuList;
      //
      var right = document.getElementsByClassName('right')[0];
      right.innerText = ''
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
      for(var i=0;i<menuList.length; i++) {
        var menubox = document.createElement('div');
        menubox.className = 'menubox';

        var img = document.createElement('img');
        img.src='image/menu.png';

        var menuname = document.createElement('div');
        menuname.className = 'menuname';
        var p1 = document.createElement('p');
        p1.className='p1';
        p1.innerText = menuList[i].menuName;
        var p2 = document.createElement('p');
        p2.className='p2';
        p2.innerText = menuList[i].menuPrice;
        var p3 = document.createElement('p');
        p3.className='p3';
        p3.innerText = menuList[i].promotionPrice;
        menuname.appendChild(p1)
        menuname.appendChild(p2)
        menuname.appendChild(p3);
        // 创建气泡
        var qipao = document.createElement('span');
        qipao.className = 'qipao';
        qipao.innerText = menuList[i].menuCount;
        if (   menuList[i].menuCount ==0 ) {
          qipao.classList.add('none')
        }

        // 判断是否酒类菜品
        if (menuList[i].accumlateFlag ==='1') {
          //酒水类
          /*
           <span class="btnbox">
               <span class="sub">-</span>
               <span class="num">8</span>
               <span class="add">+</span>
           </span>
           */
          var btnbox = document.createElement('span');
          btnbox.className = 'btnbox';
          btnbox.setAttribute('menuid',menuList[i].menuId );
          btnbox.setAttribute('lineno',menuList[i].lineNo);
          var sub = document.createElement('span');
          sub.className = 'sub';
          sub.innerText = '-'
          sub.onclick = function () {
            jiajian = '-';
            danqianObj = this;
            if (this.parentNode.children[1].innerText <=0) {
              alert('请选择一个数量')
            } else {
              // 已选了数量
              showOrHideKeyboard(true);
            }


          }

          var num = document.createElement('span');
          num.className = 'num';
          num.innerText = 0;
          var add = document.createElement('span');
          add.className = 'add';
          add.innerText = "+";
          add.onclick = function () {
            jiajian = '+';
            //存入全局
            menuid = this.parentNode.getAttribute('menuid');
            lineno = this.parentNode.getAttribute('lineno');
            danqianObj = this;
            showOrHideKeyboard(true);
          }

          // 加入容器
          btnbox.appendChild(sub);
          btnbox.appendChild(num)
          btnbox.appendChild(add)
          menubox.appendChild(btnbox)
        } else {
          // 普通菜品
          var btn = document.createElement('span');
          btn.className = 'btn';
          btn.setAttribute('menuid', menuList[i].menuId   )
          btn.setAttribute('lineno', menuList[i].lineNo   )
          if (menuList[i].menuCount >0) {
            btn.classList.add('selected');
          }
          btn.onclick = function () {
            debugger
            // 实现选中菜或取消菜
            if (this.classList.contains('selected') === true) {
              //执行取消菜
              deleteMenu(this   )
            } else {
              // 执行加菜
              selectMenu(this)
            }
          }
          menubox.appendChild(btn)
        }

        // 加入到menubox
        menubox.appendChild(img)
        menubox.appendChild(menuname)
        menubox.appendChild(qipao)

        // 加入到right
        right.appendChild(menubox)

      }

    }
  }
}


// 选取菜品
function selectMenu(target) {
  var xhr = new XMLHttpRequest()
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/orderMenu.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

  xhr.send("menuId="+ target.getAttribute('menuid') +"&deskId="+ getCookie('deskid') +"&deskCaption="+ getCookie('deskcaption'));
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var text = xhr.responseText;
      var json = JSON.parse(text);
      if (json.responseBody.lineNo !='') {
        // 本身要加勾
        target.classList.add('selected');
        // 成功后显示气泡 ， 改变大类的数量
        var qipao= target.parentNode.children[2];
        qipao.innerText = 1;
        qipao.classList.remove('none');
        //改变大类的总数
        var active = document.getElementsByClassName('active')[0];
        active.children[1].innerText = Number(active.children[1].innerText)+1;
        active.children[1].classList.remove('none');

      } else {
        alert('选菜失败')
      }
    }
  }
}

// 取消菜品
function deleteMenu(target) {
  var xhr = new XMLHttpRequest()
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/cancleOrderMenu.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send("menuId="+ target.getAttribute('menuid') +"&deskId="+ getCookie('deskid') +"&lineNo="+  target.getAttribute('lineno')  );
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var text = xhr.responseText;
      var json = JSON.parse(text);
      if (json.errCode==='000') {
        // 删除菜品成功
        // 本身要去勾
        target.classList.remove('selected');
        // 成功后显示气泡 ， 改变大类的数量
        var qipao= target.parentNode.children[2];
        qipao.innerText = 0;
        qipao.classList.add('none');
        //改变大类的总数
        var active = document.getElementsByClassName('active')[0];
        active.children[1].innerText = Number(active.children[1].innerText)-1;
        if (active.children[1].innerText == 0) {
          active.children[1].classList.add('none');
        }

      } else {
        alert('删除菜品失败')
      }
    }
  }
}

//显示和隐藏键盘
function showOrHideKeyboard( xianshi ) {
  var mask  =  document.getElementsByClassName('mask')[0];
  if (xianshi === true) {
    mask.classList.remove('hide')
  } else {
    mask.classList.add('hide')
  }
}
// 0键：隐藏键盘
var close = document.getElementsByClassName('close')[0];
close.onclick = function () {
  showOrHideKeyboard(false);
}

//绑定其它数字键点击功能
var keys = document.getElementsByClassName('keyboard')[0].children;
for(var i = 0; i< keys.length ;i++) {
  keys[i].onclick = function(){
    // 判断当前是加洒水还是减洒水
    if ( jiajian ==="+" ) {
      // 加酒水操作
      addJiushui( Number(this.innerText)+ Number(danqianObj.parentNode.children[1].innerText) )
    } else {
      // - 酒水操作

    }
  }
}

// 加酒水操作
function addJiushui(menucount) {
  var xhr = new XMLHttpRequest();
  xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/accumlateMenu.do?method=login');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  /*
   menuId:
   deskId:
   deskCaption:
   lineNo:
   menuCount:
   */
  xhr.send('menuId='+ menuid +'&deskId='+getCookie('deskid') + '&deskCaption='+ getCookie('deskcaption') +'&lineNo='+ lineno+ '&menuCount='+ menucount );
  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      var text = xhr.responseText;
      var json = JSON.parse(text);
      if (json.responseBody.lineNo !='') {
        // 加洒水成功
        danqianObj.parentNode.children[1].innerText = menucount ;
        document.getElementsByClassName('active')[0].children[1].innerText = Number(document.getElementsByClassName('active')[0].children[1].innerText) + Number(menucount);
        if (document.getElementsByClassName('active')[0].children[1].innerText > 0) {
          document.getElementsByClassName('active')[0].children[1].classList.remove('none');
        }
        showOrHideKeyboard(false);
      }
    }
  }
}

// - 洒水操作
function subJiushui() {
  
}