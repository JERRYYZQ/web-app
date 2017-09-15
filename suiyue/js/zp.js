$(function(){
	//加载书架
		var db=openDatabase("bookcase","1.0","书架",1024*1024,function(){});
				db.transaction(function(tx){
					tx.executeSql('select id from bookcase',[],function(tx,rs){
						if(rs.rows.length==0){
							$('#sjyd').text('还没有书？快去收藏几本书吧！');$('#sjyd').css('display','flex')
						}else{
							$('#sjyd').text('');$('#sjyd').css('display','inline-block');
						}
						for(var i=0;i<rs.rows.length;i++){
							var ar=rs.rows[i].id;
							$.getJSON("http://query.yahooapis.com/v1/public/yql",
							{ q: "select * from json where url='http://api.zhuishushenqi.com/book/"+ar+"'",format: "json"},
							function(data){
								var dt=data.query.results.json;
										var imgs=dt.cover.substr(7,dt.cover.length-1);
										if(imgs.indexOf('%')!=-1){
											imgs=decodeURIComponent(imgs);
										}
										$("<div data-id='"+dt._id+"' class='sdiv' id='sdiv'>"+"<div id='simg' class='simg'><img src='"+imgs +"' alt='抱歉!没找到图片'/></div>\
										<div class='sspan' id='ssapn'><span>"+dt.title+"</span>\
										 <span>作者:"+dt.author+"</span>\
										 <span>简介:"+dt.longIntro+"</span>\
										 <span>最新章节:"+dt.lastChapter+"</span>\
										 </div></div>").appendTo('#list>li:first');
							})
						}
					})
				})
		//书架阅读
	    var flag=true;
		$('#sjyd').on('touchstart',function(){
			flag=true;
		})
		$('#sjyd').on('touchmove',function(){
			flag=false;
		})
		$('#sjyd').on('touchend','.sdiv',function(){
			if(flag){
				var id=$(this).attr('data-id');
				var title=$(this).find('span:first').text();
				title=encodeURIComponent(encodeURIComponent(title));
				location.href='subpage/rs.html?id='+id+"&title="+title;
			}
		})
	//遍历小说列表
	function getList(data,obj){
			var dt=data.query.results.json.books;
					for(var i=0;i<dt.length-1;i++){
						var imgs=dt[i].cover.substr(7,dt[i].cover.length-1)
						if(imgs.indexOf('%')!=-1){
							imgs=decodeURIComponent(imgs);
						}
						 $("<li data-id='"+dt[i]._id+"'><div id='lf' class='lf'><img src='"+imgs +"'alt='抱歉!没找到图片'/></div>\
						 <div id='rg' class='rg'>\
						 <span>"+dt[i].title+"</span>\
						 <span>作者:"+dt[i].author+"</span>\
						 <span>简介:"+dt[i].shortIntro+"</span>\
						 <span>最新章节:"+dt[i].lastChapter+"</span>\
						 </div></li>").appendTo(obj);
				    }
	}
	//搜索界面出现隐藏
		$("#sou").on("touchend",function(){
			$('.sou').fadeIn();
		})
		$("#fh").on("touchend",function(){
			$('.sou').fadeOut();		
		})
	//获得搜索小说列表
		$('#sousuo').on('touchend',function(){
			$('#rs').html('');
			var kw=encodeURIComponent($('#ss').val());//编码
				$.getJSON("http://query.yahooapis.com/v1/public/yql",
				{ q: "select * from json where url='http://api.zhuishushenqi.com/book/fuzzy-search?query="+kw+"'",format: "json"},
				function(data){
					getList(data,'#rs');
					$('#ss').val('')
				});
		})
		//搜索小说列表点击阅读
		var isClick=true;
		$('.rs').on('touchstart','li',function(e){
			isClick=true;
		})
		$('.rs').on('touchmove','li',function(){
			isClick=false;
		})
		var title;
		$('.rs').on('touchend','li',function(e){
			if(isClick){
					var id=$(this).attr('data-id');
					title=$(this).find('span:first').text();
					title=encodeURIComponent(encodeURIComponent(title));
					location.href="subpage/rs.html?id="+id+"&title="+title;
			}
		})		
	//点击人头出现登录页面
	$('#oul>li:first').on('touchend',function(){
		$('.yincang').css('left',0);
    })
	$('.yc').on('touchend',function(){
		$('#yincang').css('left','-100%')
	})
	//点击底部切换中部页面
	$("#fb").on("click",'li',function(){
		var n=$(this).index();
		var w=$("#box").width();
		$("#list").css('marginLeft',-w*n+'px');
		$(".current").removeClass('current');
		$(this).addClass('current');
	})
	
	
	function defa(node){
		$(node).on('touchmove',function(ev){
			ev.preventDefault();
		console.log('b')
		})
	}
	defa('header');
	defa('footer');
	defa('#yincang');
})