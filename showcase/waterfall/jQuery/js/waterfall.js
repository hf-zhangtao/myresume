$(window).on('load',function(){
	//窗口调整时触发

	$(window).on("resize",function () {

		waterfall();
		

	});

	waterfall();	
	 var dataInt={"data":[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'}]}; //json数据
	$(window).on('scroll',function(){		//判断是否加载
		if(checkscrollslide){
			$.each(dataInt.data,function(keyindex,value){	//第一个参数为索引值0,1,2,3，第二个参数是数值;	遍历dateint数组中data的属性值
			var oBox=$('<div>').addClass('box').appendTo($('#main'));	//给id为main添加节点div每遍历一项便创建一个盒子
			var oPic=$('<div>').addClass('pic').appendTo($(oBox));	//给obox添加节点div
			//console.log($(value).attr('src'));
			$('<img>').attr('src','images/'+$(value).attr('src')).appendTo(oPic);
			});
			waterfall();
		}
		
	});
});
function waterfall(){
	var $boxs=$('#main>div');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(document).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');
	var hArr=[];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();
		//小于第一列时
		if(index<cols){hArr.push(h);}
		//大于第一列获取最小值与所对应的索引	
			else{
			 var minh=Math.min.apply(null,hArr);//求数组的最小值	
			 var minhindex=$.inArray(minh,hArr);//求数组中最小值索引
			 $(value).css({
				 'position':'absolute',
				 'top':minh+'px',
				 'left':$boxs.eq(minhindex).position().left
			 });
			//改变数组高度值
			hArr[minhindex]+=$boxs.eq(index).outerHeight();
			}
		//console.log(value)
	});
	
}
function checkscrollslide(){
	var $lastBox=$('#main>div').last();//获取最后一个div元素
	var lastBoxdis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);	//获取最后一个盒子距顶部距离
	var scrolltop=$(window).scrollTop();	//获取窗口已经滚动的距离
	var documenth=$(window).height();	//获取浏览器可视窗口距离
	return (lastBoxdis<scrolltop+documenth)?true:false;	//判断最后一个盒子的距离
}




