$(function(){
//	var w=$(".shouye").height();
//	console.log(w)
//	$("body").height(w);
	//点击进入编辑页面
	$(".shouye .right").on("touchend",function(e){
		$(".shuquye").css('display','block').delay(100).queue(function(){	
		$('.shouye').css('transition',"transform 0.8s ease");
		$('.shouye').css('transform','translate3d(-100%,0,0)')
		$(this).addClass("yiru").dequeue()
		
		})
	})
	//从编辑页面返回首页
	$(".shuquye .left").on("touchend",function(){
		$('.shouye').css('transform','translate3d(0,0,0)');
		$(".shuquye").removeClass("yiru").delay(800).queue(function(){
			$(this).css('display','none').dequeue();
		});
		
	})
	//从修改页面返回到主页
	$(".bianji .left").on("touchend",function(){
		$('.shouye').css('transform','translate3d(0,0,0)')
		$(".bianji").removeClass("yiru").delay(800).queue(function(){
			$(this).css('display','none').dequeue();
		})
	})
//	获取实时时间
	var str;
	var date=new Date();
	var y=date.getFullYear(); 
	var m=date.getMonth()+1; 
	var d=date.getDate();
	var h=date. getHours();
	var t=date.getMinutes();
	if(t<10){
		t='0'+t;
	}
	var times=y+"/"+m+"/"+d+"  "+h+":"+t;
//	$("#text").on("blur",function(){
//		str=$(this).val();
//	})
	
	var todos=[];
	//判断localsorage表有没有内容 有则渲染 没有就创建
	//parse  把字符串转换成数组
	//stringify    把数组转换成字符串
	if(localStorage.todo_data){
		todos=JSON.parse(localStorage.todo_data)
		render()
	}else{
		localStorage.todo_data=JSON.stringify(todos);
	}	
	//点击创建留言
	$(".shuquye .text").on('click',function(){
		$("#text").on("blur",function(){
		str=$(this).val();
		})
		if(str){
			addTodo()
			$("#text").val("");
			str=""
			$(".shuquye").removeClass("yiru");
			$('.shouye').css('transform','translate3d(0,0,0)')
		}else{
			alert("对不起!请输入相关内容")
		}
	})
	//创建表 传到本地缓存
		function  addTodo(){
			todos.push({title:str,state:times,isDel:0})
			localStorage.todo_data=JSON.stringify(todos);
			render()
		}
	//创建一个标签组 追加到一个元素里面
	function render(){
		$('.shouye .lists').empty();
		$.each(todos,function(i,v){
			$('<ul><li class="lis1"><b class="b1 iconfonts icon-shijian"></b><b class="b2">'+v.state+'<p class="iconfont icon-iconfontwujiaoxing"></p></b></li><li class="lis2"><b class="b1 iconfonts icon-shijian1"></b><b class="b2">'+v.title+'</b></li><div class="delete"><img class="fanhui" src="img/5.png"/><img class="del" src="img/delete (1).png"/></div></ul>')
			.appendTo(".lists")
		})
	}
	var left=null;
	var n;
	var flag;
	//手指接触到屏幕得到的值
	$(".lists").on('touchstart','ul',function(e){
		left=e.originalEvent.changedTouches[0].pageX;
	})
	//手指滑动的到的数值
	$(".lists").on('touchmove','ul',function(e){
		var n=e.originalEvent.changedTouches[0].pageX;
		var x=n-left;
		$(this).css('transform','translate3d('+x+'px,0,0)');
	})
	//手指离开要完成的事
	$(".lists").on('touchend','ul',function(e){
		
		$(this).css('transition',"transform 0.8s ease");
		$(this).css('transform','translate3d(0.6rem,0,0)');
		$(this).find(".delete").addClass('shezhi')
		$(this).delay(800).queue(function(){
			$(this).css('transition','none').dequeue();
		})
	})
	var index;
	//点击进去修改页面
	$(".shouye").on('touchend', ".fanhui", function(){
		index=$(this).closest('ul').index();
		var text=todos[index].title
		$("#tex").val(text)
		$(this).closest('ul').css('transform','translate3d(0,0,0)');
		$(".bianji").css('display','block').delay(100).queue(function(){			
			$(this).addClass('yiru')
			$('.shouye').css('transition',"transform 0.8s ease");
			$('.shouye').css('transform','translate3d(-100%,0,0)')
			$(this).dequeue();
		})
		$(this).closest('.delete').removeClass('shezhi')
//		$("#text").focus()
	})
	//点击删除对应的内容
	$(".shouye").on('touchend', ".del", function(){
		var i=$(this).closest('ul').index();
		todos.splice(i,1);
		$(this).closest('ul').css('transform',' translate3d(-100%,0,0)').queue(function(){
		$(this).closest('ul').remove();
		$(this).dequeue();
		})
		localStorage.todo_data=JSON.stringify(todos);	
	})
	//完成修改的任务
	$(".bianji .text").on('click',function(){
		
//		todos.splice(index,1);
//		localStorage.todo_data=JSON.stringify(todos);
		if(strs){
			date=new Date();
			render()
			$("#tex").val("");
			strs=""
			$(".bianji").removeClass("yiru");
			$('.shouye').css('transform','translate3d(0,0,0)')
		}else{
			alert("亲！你没有做任何修改")
		}
	})
	//修改后页面输入框失去焦点
	$("#tex").on("blur",function(){
		todos=JSON.parse(localStorage.todo_data)
		strs=$(this).val();
		todos[index].title=strs;
		todos[index].state=times;
		localStorage.todo_data=JSON.stringify(todos)
	})
	//查找功能
	$("#sousuo").on('keyup',function(){
		var key = $(this).val().trim();
		$('.shouye .lists').empty();
		todos=JSON.parse(localStorage.todo_data)
		$(todos).each(function(i,v){
			if(v.title.indexOf(key)!==-1){
       			if(v.title){
       			$('<ul><li class="lis1"><b class="b1 iconfonts icon-shijian"></b><b class="b2">'+v.state+'<p class="iconfont icon-iconfontwujiaoxing"></p></b></li><li class="lis2"><b class="b1 iconfonts icon-shijian1"></b><b class="b2">'+v.title+'</b></li><div class="delete"><img class="fanhui" src="img/5.png"/><img class="del" src="img/delete (1).png"/></div></ul>')
			.appendTo(".lists")	
       			}			
       		}
		})		
	})
})
