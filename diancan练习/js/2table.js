/**
 * Created by dell on 2019/3/27.
 */
//获取楼层
function gal() {
    var xhr= new XMLHttpRequest;
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryDeskArea.do?method=login');
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send();
    // 获取请求状态
    xhr.onreadystatechange=function () {
        if(xhr.readyState===4&&xhr.status===200){
            // 请求成功之后的数据
            var text=xhr.responseText;
            // 转成json
            var json=JSON.parse(text);
            // 得到楼层列表
            var liList=json.responseBody.deskAreaList;
            // 生成默认的餐桌
           ctl(liList[0].deskAreaId)
            var lc=document.getElementsByClassName('lc')[0];
            // 生成界面上的楼层列表
            for(var i=0;i<liList.length;i++){
                var span=document.createElement('span')
                // 给默认第一个加高亮
                if(i===0){
                    span.className='open'
                }
                // 修改span的文本内容对应后端属性
                span.innerText=liList[i].deskAreaCaption;
                // 设置一个新的span属性对应楼层
                span.setAttribute('lcid',liList[i].deskAreaId)
                // 设置span的点击事件
                span.onclick=function(){
                    var children = document.getElementsByClassName('lc')[0].children;
                    for(var j=0;j<children.length;j++){
                        // 清除所有选中高亮
                        children[j].className=''
                    }
                    // 给当前选中设置高亮
                    this.className='open'
                    // 清除原有的餐桌
                    document.getElementsByClassName('tablebox')[0].innerText=''
                    // 加载对应的餐桌
                    ctl(this.getAttribute("lcid"));
                }
                // 把span放进lc
                lc.appendChild(span)
            }
        }
    }
}
gal();
// 获取餐台列表
function ctl(deskId) {
    var xhr=new XMLHttpRequest;
    xhr.open('post','http://39.108.162.36:8083/CateringSystem1.0/recruitment/catering/qryDeskTopList.do?method=login')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send('deskAreaId='+ deskId);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&xhr.status==200){
            var text=xhr.responseText;
            var json=JSON.parse(text);
            var tableList=json.responseBody.deskTopList;
            // 获取tablebox
            var tablebox=document.getElementsByClassName('tablebox')[0];
            for(i=0;i<tableList.length;i++){
                // 创建table盒子
                var table=document.createElement('div');
                table.className='table';
                table.setAttribute('czid',tableList[i].deskId)
                if( tableList[i].deskStatus==1 ){
                    table.classList.add('openta');
                    table.onclick = function () {
                        location.href = '3guest.html'
                        setCookie('deskId',this.getAttribute('czid'))
                    }
                }
                else {
                    if(tableList[i].servedCount>0){
                        table.classList.add('openda');
                        table.onclick = function () {
                            location.href = '4.html'
                        }
                    }
                    else {
                        table.onclick=function () {
                            location.href='5.html'
                        }
                    }
                }
                // 创建金额盒子
                var jq=document.createElement('div');
                jq.className='jq'
                jq.innerText=tableList[i].totalAmount?Math.floor(tableList[i].totalAmount)+'元':'';
                // 创建名字盒子
                var name=document.createElement('div');
                name.className='name'
                name.innerText=tableList[i].deskCaption;
                // 创建时间盒子
                var time=document.createElement('div');
                time.className='time'
                time.innerText=tableList[i].createTime.substr(11,5);
                // 把金额名字时间盒子加入table
                table.appendChild(jq);
                table.appendChild(name);
                table.appendChild(time);
                // 把table加入tablebox
                tablebox.appendChild(table)

            }
        }
    }

}