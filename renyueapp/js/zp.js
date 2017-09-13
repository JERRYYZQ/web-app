$(function(){
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
	$("#fb").on("click",'li',function(){
		var n=$(this).index();
		var w=$("#box").width();
		$("#list").css('marginLeft',-w*n+'px');
		$(".current").removeClass('current');
		$(this).addClass('current');
	})
	
		$("#sou").on("touchend",function(){
			$('.sou').fadeIn();
		})
		$("#fh").on("touchend",function(){
			$('.sou').fadeOut();		
		})
		//搜索事件
		$('#sousuo').on('touchend',function(){
			$('#rs').html('');
			var kw=encodeURIComponent($('#ss').val());//编码
				$.getJSON("http://query.yahooapis.com/v1/public/yql",
				{ q: "select * from json where url='http://api.zhuishushenqi.com/book/fuzzy-search?query="+kw+"'",format: "json"},
				function(data){
					getList(data,'#rs');
				});
		})
		//获得小说列表
		var isClick=true;
//		var x1,y1;
		$('.rs').on('touchstart','li',function(e){
			isClick=true;
//			var touch = e.originalEvent.targetTouches[0];
//	            x1= touch.pageX;
//	            y1= touch.pageY;
//	            console.log(x1,y1)
		})
		$('.rs').on('touchmove','li',function(){
			isClick=false;
		})
		$('.rs').on('touchend','li',function(e){
//			var touch = e.originalEvent.changedTouches[0];
//			console.log(touch.pageX)
//	        var x2= touch.pageX;
//	        var y2= touch.pageY;
//	        var h=Math.abs(x2-x1);
//	        var z=Math.abs(y2-y1);
//	        console.log(typeof h,z)
			if(isClick){
//				if(h>10||z>10){
					var id=$(this).attr('data-id');
					location.href="subpage/rs.html?id="+id;
//				}
			}
		})
		
		
		
		//加入书架
		var db=openDatabase("bookcase","1.0","书架",1024*1024,function(){});
				db.transaction(function(tx){
					tx.executeSql('select id from bookcase',[],function(tx,rs){
						for(var i=0;i<rs.rows.length;i++){
							var ar=rs.rows[i].id;
							
							$.getJSON("http://query.yahooapis.com/v1/public/yql",
							{ q: "select * from json where url='http://api.zhuishushenqi.com/book/"+ar+"'",format: "json"},
							function(data){
								console.log(data)
								var dt=data.query.results.json;
										var imgs=dt.cover.substr(7,dt.cover.length-1)
										if(imgs.indexOf('%')!=-1){
											imgs=decodeURIComponent(imgs);
										}
										 $("<div data-id='"+dt._id+"'class='sdiv' id='sdiv'>"+"<div id='simg' class='simg'><img src='"+imgs +"'alt='抱歉!没找到图片'/></div>\
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
		$('#sjyd').on('touchend','div',function(){
			var id=$(this).attr('data-id');
			location.href='subpage/rs.html?id='+id;
		})

		
})