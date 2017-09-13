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
	//遍历分类
//	var arr=['m','g','d','x']
	function getCf(cf,num,imgname){
		$.getJSON("http://query.yahooapis.com/v1/public/yql",
				 { q:"select * from json where url='http://api.zhuishushenqi.com/cats/lv2/statistics'",format: "json"},
				 function(data){
					var dt=data.query.results.json[cf]; 
					for(var i=0;i<dt.length;i++){
						$("<section class='cfdiv' data-name='"+dt[i].name+"'><div class='cfimg'><img src='img/"+imgname+(i+1)+".jpg'/></div><div class='cffl'><span>"+dt[i].name+"<br/>"+dt[i].bookCount+"册</span></div></section>").appendTo($('#lcf').find("li:nth-child("+num+")"));
					}
				})
	}
	
	getCf("male",1,'m');
	getCf("female",2,'g');
	getCf("picture",3,'d');
	getCf("press",4,'x');
	
	//点击分类，当前分类显示，其它子分类隐藏
	function fl(num){
		$('#cf').on('touchend',"li:nth-child("+num+")",function(){
			$('#lcf').find("li:nth-child("+num+")").show().siblings('li').hide();
	    })
	}
	fl(1);
	fl(2);
	fl(3);
	fl(4);
	
	//
	function qie(arr1){
		$.getJSON("http://query.yahooapis.com/v1/public/yql",
				 { q: "select * from json where url='https://api.zhuishushenqi.com/book/by-categories?gender="+arr[ind1]+"&type="+arr1+"&major="+name+"&start=0&limit=20'",format: "json"},
				 function(data){
					getList(data,'#cfrs')
				})
	}
	var arr=['male','female','picture','press'];
	var arr1=['hot','new','reputation','over'];
	var n1=0;
	var name,ind1;
	//获取小说列表
	var isClick=true;
	$('.cfg').on('touchstart',function(){
			isClick=true;
	})
	$('.cfg').on('touchmove',function(){
			isClick=false;
	})
	$('.cfg').on('touchend','.cfdiv',function(){
		if(isClick){
			$('.flrs>p').find('span:first').addClass('red').siblings('span').removeClass('red');
			$('#flrs ul').html('');
			name=$(this).attr('data-name');
			ind1=$(this).parent('li').index();
			name=encodeURIComponent(name);//编码
			$('#flrs').show().siblings().hide();
			qie(arr1[n1]);
		}
	})
	//按hot等排序
	$('#flrs p').on('touchend','span',function(){
		n1=$(this).index();
		$('#cfrs').html('');
		console.log(typeof arr1[n1],arr1[n1],n1)
		qie(arr1[n1]);
	})
	//点击变红
	$('.flrs').on('touchend','p>span',function(){
		$(this).addClass('red').siblings('span').removeClass('red');
	})
	//分类结果隐藏
	$('.imgs').on('touchend',function(){
		$('#flrs').hide().siblings().show();
		$('#pht').hide().siblings().show();
	})
	//大分类大排行点击样式
	$('.cf').on('touchend','li',function(){
		$(this).addClass('btm').siblings('li').removeClass('btm');
	})
})
