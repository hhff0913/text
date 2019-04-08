/**
 * Created by dell on 2019/4/1.
 */
var jijiajian='';
var dangqianobj='';
var menuid='';
var lineno='';
// 设置后退
var back=document.getElementsByClassName('back')[0];
back.onclick=function () {
    window.window.history.go(-1)
};
// 设置房间号对应后台
var deskCaption=document.getElementsByClassName('deskCaption')[0];
deskCaption.innerText=getCookie('deskCaption')+'菜谱';
// 获取菜类别
function cailei(deskId) {
    var xhr=new XMLHttpRequest();
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryMenuClassList.do?method=login')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send('deskId='+getCookie('deskId'));
    xhr.onreadystatechange=function () {
        if (xhr.status===200&&xhr.readyState===4){
            var text=xhr.responseText;
            var json=JSON.parse(text);
            var menuleft=document.getElementsByClassName('menuleft')[0];
            // 得到菜类列表
            var menuClassLi=json.responseBody.menuClassList;
            // 获取默认的菜
            caipinliebiao(menuClassLi[0].menuClassId);
            // 获取所有类别
            for(i=0;i<menuClassLi.length;i++){
                var menuli=document.createElement('div');
                menuli.className='menuli';
                // 给默认第一个加高亮
                if(i==0){
                    menuli.classList.add('xz')
                }
                // 设置一个新属性对应菜类id
                menuli.setAttribute('clid',menuClassLi[i].menuClassId);
                // // 设置菜类的的点击事件
                menuli.onclick=function () {
                    var children=document.getElementsByClassName('menuleft')[0].children;
                    for (var j=0;j<children.length;j++){
                        // 移除所有高亮背景
                        children[j].classList.remove('xz')
                    }
                    // 给当前加高亮
                    this.classList.add('xz')
                    // 清除所有右边的菜
                    document.getElementsByClassName('menuright')[0].innerText='';
                    // 加载对应的菜类的菜
                    caipinliebiao(this.getAttribute("clid"));
                };
                // 创建标签加入盒子
                var lei=document.createElement('span');
                lei.className='lei';
                lei.innerText=menuClassLi[i].menuClassCaption;
                var qipao=document.createElement('span');
                qipao.className='qipao';
                if(menuClassLi[i].count ==0){
                    qipao.classList.add('none')
                }
                qipao.innerText=menuClassLi[i].count;
                menuli.appendChild(lei);
                menuli.appendChild(qipao);
                menuleft.appendChild(menuli)

            }
        }

    }
}
cailei(getCookie('deskId'));
function caipinliebiao(menuClassId) {
    var xhr=new XMLHttpRequest();
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryMenuListByDesk.do?method=login')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send('menuClassId='+menuClassId+
             '&deskId='+getCookie('deskId')+
             '&pageIndex=1&pageSize=20');
    xhr.onreadystatechange=function () {
        if (xhr.readyState==4&&xhr.status==200){
            var text=xhr.responseText;
            json=JSON.parse(text);
            menuList=json.responseBody.menuList;
            var menuright=document.getElementsByClassName('menuright')[0]
            for(i=0;i<menuList.length;i++){
                // 获取menutable盒子
                var menutable=document.createElement('div');
                menutable.className='menutable';
                // 获取图片标签
                var img=document.createElement('img');
                img.src='1.jpg';
                // 获取菜名金额大盒子
                var menucai=document.createElement('div');
                menucai.className='menucai';
                // 获取菜名盒子
                var dishname=document.createElement('div');
                dishname.className='dishname';
                dishname.innerText=menuList[i].menuName;
                // 获取金额
                var price=document.createElement('div');
                price.className='price';
                price.innerText=menuList[i].menuPrice+'元/份';
                // 获取打折金额
                var bargain=document.createElement('div');
                bargain.className='bargain';
                bargain.innerText=menuList[i].promotionPrice+'元/份';
                // 加入菜名金额盒子
                menucai.appendChild(dishname);
                menucai.appendChild(price);
                menucai.appendChild(bargain);
                // 获取数量盒子
                var quantity=document.createElement('div');
                quantity.innerText=menuList[i].menuCount;
                quantity.className='quantity';
                if(menuList[i].menuCount==0){
                    quantity.classList.add('none')
                }
                menutable.appendChild(img);
                menutable.appendChild(menucai);
                menutable.appendChild(quantity);
                // 判断为酒水
                if (menuList[i].accumlateFlag=='1'){
                    var jiushuibox=document.createElement('div');
                    jiushuibox.className='jiushuibox';
                    jiushuibox.setAttribute('menuid',menuList[i].menuId );
                    jiushuibox.setAttribute('lineno',menuList[i].lineNo);
                    var prune=document.createElement('span');
                    prune.className='prune';
                    prune.innerText='-';
                    prune.onclick=function () {
                        jijiajian='-';
                        dangqianobj=this;
                        if (this.parentNode.children[1].innerText<=0){
                            alert('数量为零')
                        }
                        else {
                            var anjian=document.getElementsByClassName('jianpan')[0].children;

                            for (i=0;i<anjian.length;i++){
                               if(this.parentNode.children[1].innerText*1<anjian[i].innerText*1){
                                 anjian[i].classList.add('disable')
                               }

                            }
                            xianshijianpan(true);
                        }
                    };
                    var plus=document.createElement('span');
                    plus.className='plus';
                    plus.innerText='+';

                    plus.onclick=function () {
                        xianshijianpan(true);
                        dangqianobj=this;
                        jijiajian='+'

                    };
                    var num=document.createElement('span');
                    num.className='num';
                    num.innerText='0';
                    jiushuibox.appendChild(prune);
                    jiushuibox.appendChild(num);
                    jiushuibox.appendChild(plus);
                    menutable.appendChild(jiushuibox)
                }
                // 判断为普通菜品
                else {
                    // 获取选中盒子
                    var checked = document.createElement('div');
                    checked.className = 'checked';
                    if (menuList[i].menuCount > 0) {
                        checked.classList.add('active')
                    }
                    menutable.appendChild(checked)
                    checked.onclick = function () {
                        if (this.classList.contains('active') == true) {
                            // 取消菜品
                            quxiaocaipin(this)
                        }
                        else {
                            //加入菜品
                            tianjiacaipin(this)
                        }
                    }
                }
                menuright.appendChild(menutable)
            }
        }
    }
}
function quxiaocaipin(target) {
    var xhr=new XMLHttpRequest();
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/cancleOrderMenu.do?method=login')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send('lineNo='+target.getAttribute('lineno')+
        '&menuId='+target.getAttribute('menuid')+
        '&deskId='+getCookie('deskid'));
    xhr.onreadystatechange=function () {
        if (xhr.status===200&&xhr.readyState===4){
            var text=xhr.responseText;
            var json=JSON.parse(text);
            if (json.errCode=='000'){
                // 去除背景对勾
                target.classList.remove('active');
                // 获取数量气泡
                var quantity=target.parentNode.children[2];
                // 加上隐藏类名样式
                quantity.classList.add('none');
                // 获取左边选中的标签元素
                var xz=document.getElementsByClassName('xz')[0];
                // 通过标签元素子系设置总数量气泡的文本
                xz.children[1].innerText=Number(xz.children[1].innerText)-1;
                // 判断总数量气泡为0时隐藏
                if(xz.children[1].innerText==0){
                    xz.children[1].classList.add('none')
                }
            }
            else {
                alert('取消失败')
            }
        }
    }
}
function tianjiacaipin(target) {
    var xhr=new XMLHttpRequest();
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/orderMenu.do?method=login')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send('deskCaption='+getCookie('deskCaption')+
        '&menuId='+target.getAttribute('menuid') +
        '&deskId='+getCookie('deskid'));
    xhr.onreadystatechange=function () {
        if (xhr.status===200&&xhr.readyState===4){
            var text=xhr.responseText;
            var json=JSON.parse(text);
            if(json.errCode==='000'){
                // 添加背景对勾
                target.classList.add('active');
                // 获取数量气泡
                var quantity=target.parentNode.children[2];
                // 去除隐藏类名样式
                quantity.classList.remove('none');
                quantity.innerText=1
                // 获取左边选中的标签元素
                var xz=document.getElementsByClassName('xz')[0];
                xz.children[1].classList.remove('none')
                // 通过标签元素子系设置总数量气泡的文本
                xz.children[1].innerText=Number(xz.children[1].innerText)+1;
            }else {
                alert('添加失败')
            }
        }

    }
}
// 封装键盘显示
function xianshijianpan(xianshi) {
    var show=document.getElementsByClassName('show')[0]
    if(xianshi==true){
        // 显示
        show.classList.remove('none')
    }
    else {
        // 隐藏
        show.classList.add('none')
    }
}
// 设置零键点击关闭键盘
var zero=document.getElementsByClassName('zero')[0];
zero.onclick=function(){
    xianshijianpan(false);
}
// 设置键盘按键的点击
var jianpan=document.getElementsByClassName('jianpan')[0];
for (i=0;i<jianpan.children.length;i++){
    jianpan.children[i].onclick=function () {
        // 加酒水
        if(jijiajian=='+'){
            jiajiushui(Number(this.innerText)+Number( dangqianobj.parentNode.children[1].innerText))
        }
        // 减酒水
        else {

            if(this.classList.contains('disable')) {
                return
            }
             else {
                jianjiushui(Number( dangqianobj.parentNode.children[1].innerText)-Number(this.innerText))
            }

        }
    }
}
function jiajiushui(menuCount) {
    var xhr=new XMLHttpRequest()
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/accumlateMenu.do?method=login')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send(
        'menuId='+menuid +'&deskId='+getCookie('deskId') +'&deskCaption='+getCookie('deskCaption') +'&lineNo='+lineno +'&menuCount='+menuCount
    )
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var text = xhr.responseText;
            var json = JSON.parse(text);
            if(json.errCode=='000'){
                // 加酒水成功
                dangqianobj.parentNode.children[1].innerText=menuCount;
                var xz=document.getElementsByClassName('xz')[0];
                xz.children[1].innerText=Number(xz.children[1].innerText)+menuCount;
                if (xz.children[1].innerText>0){
                   xz.classList.remove('none')
                }
                xianshijianpan(false)
            }
        }
    }
}
function jianjiushui(menuCount) {
    var xhr=new XMLHttpRequest()
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/subAccumlateMenu.do?method=login')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send('accumlateFlag='+'1' +'&lineNo='+lineno+'&menuCount='+menuCount)
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var text = xhr.responseText;
            var json = JSON.parse(text);
            if(json.errCode=='000'){
                // 减酒水成功
                dangqianobj.parentNode.children[1].innerText=menuCount;
                var xz=document.getElementsByClassName('xz')[0];
                xz.children[1].innerText=Number(xz.children[1].innerText)-menuCount;
                if( xz.children[1].innerText==0){
                    xz.classList.add('none')
                }
                xianshijianpan(false)
            }
        }
    }
}