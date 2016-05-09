# JS实现瀑布流
### 1.问题一：异步执行
首先，我HTML页面中并未放太多代码，采用JS获取模板添加图片，而该程序的执行就会耗费很多时间，虽然用的innerHTML最后一起添加。所以会导致后面waterfall获取到的数据都不准确。开始是这样的：
```javascript
window.onload=function(){
    /*
为模板添加图片
 */
(function(){
    //1获取模板，清除空白符
    var _img=$("#main").innerHTML
              .replace(/^\s*/,"")
              .replace(/\s*$/,"");
    //2定义最终输出的html变量
    var out_img=[];
    //3遍历数据
    for(var i in data){
        var html_img=_img
                .replace(/{{index}}/g,data[i].index);
        out_img.push(html_img);
    }
    //4将HTML回写到DOM中
    $("#main").innerHTML+=out_img.join(""); 
})();
/*
排版
 */
waterfall();
};
```
**最终导致图片是重叠的，因为两个函数是同步执行的，导致waterfall在获取高度的时候出现误差。改为下面这样，问题就解决了**
```javascript
    /*
为模板添加图片
 */
(function(){
    //1获取模板，清除空白符
    var _img=$("#main").innerHTML
              .replace(/^\s*/,"")
              .replace(/\s*$/,"");
    //2定义最终输出的html变量
    var out_img=[];
    //3遍历数据
    for(var i in data){
        var html_img=_img
                .replace(/{{index}}/g,data[i].index);
        out_img.push(html_img);
    }
    //4将HTML回写到DOM中
    $("#main").innerHTML+=out_img.join(""); 
})();
window.onload=function(){
/*
排版
 */
waterfall();
};
```
**原因何在呢？其实下面这样异步也可以解决**
```javascript
window.onload=function(){
/*
为模板添加图片
*/
(function(){
    //1获取模板，清除空白符
    var _img=$("#main").innerHTML
              .replace(/^\s*/,"")
              .replace(/\s*$/,"");
    //2定义最终输出的html变量
    var out_img=[];
    //3遍历数据
    for(var i in data){
        var html_img=_img
                .replace(/{{index}}/g,data[i].index);
        out_img.push(html_img);
    }
    //4将HTML回写到DOM中
    $("#main").innerHTML+=out_img.join(""); 
})();
/*
排版
 */
setTimeout(waterfall,20);
};
```
**setTimeout实现异步执行**
innerHTML添加元素和document.createElement添加元素执行速度不一样，看下面这个就不存在同步出现问题的情况
```javascript
window.onload=function(){
    waterfall();
    window.onscroll=function(){
        if(checkScrollSlide){
            addData();
            waterfall();
        }
    };
};
/*
加载数据模块
 */
var addData=function(){
    var oParent=$("#main");
    for(var i=0;i<json.schema.length;i++){
        var oBox,
            oPic,
            oImg;
        oBox=document.createElement("div");
        oBox.className="box";
        oParent.appendChild(oBox);
        oPic=document.createElement("div");
        oPic.className="pic";
        oBox.appendChild(oPic);
        oImg=document.createElement("img");
        oImg.src="img/"+json.schema[i].src;
        oPic.appendChild(oImg);
    }
};
```
##### ok,写到这里吧，具体原理我要去研究一下了，虽然我遇到的问题解决了...