$(function(){
	//遍历男生女生排行分类榜
	function getPh(ph,ind,imgname){
		$.getJSON("http://query.yahooapis.com/v1/public/yql",
				 { q: "select * from json where url='http://api.zhuishushenqi.com/ranking/gender'",format: "json"},
				 function(data){
				 	var dt=data.query.results.json[ph]; 
				 	console.log(dt)
					for(var i=0;i<dt.length;i++){
						$("<section class='phdiv' data-id='"+dt[i]._id+"'"+"data-moth='"+dt[i].monthRank+"'"+"data-total='"+dt[i].totalRank+"'><div class='phimg'><img src='img/"+imgname+(i+1)+".jpg'/></div><div class='phfl'><span>"+dt[i].title+"</span></div></section>").appendTo( $('#phn').find('li:'+ind));
					}
		})
	}
	//        男生排行榜
	getPh('male','first','mp')
	//	    	女生排行榜
	getPh('female','last','gp')
	
	//点击切换男女生排行
		$("#phs").on('touchend','li',function(){
			var ind=$(this).index();
			$('#phn').find('li').eq(ind).show().siblings('li').hide();
		})
		
		//排行榜小说
		function getZyzb(zb){
			$('#phrs').html('');
			$.getJSON("http://query.yahooapis.com/v1/public/yql",
				 { q: "select * from json where url='http://api.zhuishushenqi.com/ranking/"+zb+"'",format: "json"},
				 function(data){
					console.log(data)
					var dt=data.query.results.json.ranking.books; 
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
						 <span>人气:"+dt[i].latelyFollower+"万</span>\
						 </div></li>").appendTo($('#phrs'));
				    }
				})
		}
		
		//点击排行榜小说列表
		var isClick=true;
		$('.phg').on('touchstart',function(){
			isClick=true;
		})
		$('.phg').on('touchmove',function(){
			isClick=false;
		})
		var zhb,yb,zb;
		$('.phg').on('touchend','.phdiv',function(){
			if(isClick){
				zhb=$(this).attr('data-id');
				yb=$(this).attr('data-moth');
				zb=$(this).attr('data-total');
				$('#pht').show().siblings().hide();
				getZyzb(zhb);
			}
		})
		//周榜,月榜,总榜
		$('#pht>p').on('touchend','span',function(){
			console.log(zhb,yb,zb)
			var ind=$(this).index();
			if(ind==0&&zhb!='undefined'){
				getZyzb(zhb);
				return;
			}
			else{
				$(this).parent('p').siblings('#phrs').html('对不起,暂时没有这个排行!')
			}
			if(ind==1&&yb!='undefined'){
				getZyzb(yb);
				return;
			}
			else{
				$(this).parent('p').siblings('#phrs').html('对不起,暂时没有这个排行!')
			}
			if(ind==2&&yb!='undefined'){
				getZyzb(zb);
			}
			else{
				$(this).parent('p').siblings('#phrs').html('对不起!<br/>暂时没有这个排行!')
			}
		})
		
})
