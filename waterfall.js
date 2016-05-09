/*
模板数据定义
 */
var data=[
{index:0},
{index:1},
{index:2},
{index:3},
{index:4},
{index:5},
{index:6},
{index:7},
{index:8},
{index:9},
{index:0},
{index:1},
{index:2},
{index:3},
{index:4},
{index:5},
{index:6},
{index:7},
{index:8},
{index:9},
{index:0},
{index:1},
{index:2},
{index:3},
{index:4},
{index:5},
{index:6},
{index:7},
{index:8},
{index:9}
],
/*
json一般后台给出
 */
json={
	"schema":[
	{"src":"10.jpg"},
	{"src":"11.jpg"},
	{"src":"12.jpg"},
	{"src":"13.jpg"},
	{"src":"14.jpg"},
	{"src":"15.jpg"},
	{"src":"16.jpg"},
	{"src":"17.jpg"},
	{"src":"18.jpg"}
	]
};
/*
通用函数，获得元素
 */
var $=function(str){
	if(str.substr(0,1)==="#"){
		return document.getElementById(str.substr(1));
	}else{
		if(str.substr(0,1)==="."){
			return document.getElementsByClassName(str.substr(1));
		}else{
			return document.getElementsByTagName(str);
		}
	}
};
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
与页面加载同步
*/
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
瀑布流
 */
var waterfall=function(){
	//1固定列数
	var oboxs=$(".box"),
		boxW=oboxs[0].offsetWidth,
		cols=Math.floor(document.documentElement.clientWidth/boxW);
		$("#main").style.cssText="width:"+cols*boxW+"px;margin:0 auto;";
	//2高度相当
	var hArr=[];
	for(var i=0;i<oboxs.length;i++){
		if(i<cols){
			hArr.push(oboxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr),
				minIndex=hArr.indexOf(minH);
			oboxs[i].style.position="absolute";
			oboxs[i].style.top=minH+"px";
			oboxs[i].style.left=boxW*minIndex+"px";
			hArr[minIndex]+=oboxs[i].offsetHeight;
		}
	}
};
/*
检测是否具备加载数据块的条件
 */
var checkScrollSlide=function(){
	var oboxs=$(".box"),
		lastH=oboxs[oboxs.length-1].offsetHeight,
		signH=oboxs[oboxs.length-1].offsetTop+Math.floor(lastH/2),
		scrollTop=document.body.scrollTop||document.documentElement.scrollTop,
		clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
	return (scrollTop+clientHeight>signH)?true:false;
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
