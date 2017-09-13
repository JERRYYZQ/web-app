$(function(){
	//获取地址上的id
				function GetQueryString(name){
				     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				     var r = window.location.search.substr(1).match(reg);
				     if(r!=null)return  unescape(r[2]); return null;
			    }
				//获取小说章节
				var id=GetQueryString('id');
				$.getJSON("http://query.yahooapis.com/v1/public/yql",
					{ q: "select * from json where url='http://api.zhuishushenqi.com/mix-atoc/"+id+"?view=chapters"+"'",format: "json"},
					function(data){
						var dt=data.query.results.json.mixToc.chapters;
						console.log(data)
						for(var i=0;i<dt.length;i++){
							$("<li data-link='"+dt[i].link+"'"+"><span>"+dt[i].title+"</span></li>").appendTo('#list')
						}
				})
				//一件底部
				$('#top').on('touchend',function(){ 
					var h=$('#list')[0].scrollHeight;
					var that=$(this);
					$('#list').animate({scrollTop: h+'px'}, 800,function(){
						that.hide();
						$('#bom').show();
					});
					return false; 
				}); 
				//一键顶部
				$('#bom').on('touchend',function(){ 
					var that=$(this);
					$('#list').animate({scrollTop: 0}, 800,function(){
						that.hide();
						$('#top').show();
					});
					return false; 
				});
				//正序，倒叙
				var int=0;
				$('#tl').on('touchend','span:last',function(){
					$('#list>li').each(function(){
						$(this).prependTo('#list')
					})
					if(int%2==0){
						$(this).text('正序')
					}else{
						$(this).text('倒序')
					}
					int++;
				})
				//获取内容封装
				function getContent(lin,hd){
					$.getJSON("http://query.yahooapis.com/v1/public/yql",
							{ q: "select * from json where url='http://chapter2.zhuishushenqi.com/chapter/"+lin+"?k=2124b73d7e2e1945&t=1468223717"+"'",format: "json"},
							function(data){
								$('#conter').find('h4').text(hd).end().show().siblings().hide();
								var content=data.query.results.json.chapter.body;
								$('#ct').text(content);
							})
				}
				//获取小说章节内容
				var isClick=true;
				$('#list').on('touchstart','li',function(){
					isClick=true;
				})
				$('#list').on('touchmove','li',function(){
					isClick=false;
				})
				var index;
				$('#list').on('touchend','li',function(){
					  index=$(this).index();
			        if(isClick){
							var lin=$(this).attr('data-link');
							var hd=$(this).find('span').text();
							lin=encodeURIComponent(lin);//编码
							getContent(lin,hd);
					}
				})
				
				
				//加入书架,创建数据库
				var db=openDatabase("bookcase","1.0","书架",1024*1024,function(){});
				createTable=function(){
					db.transaction( function(tx) { 
					tx.executeSql("create table if not exists bookcase(id REAL UNIQUE)",[] ,function(){
						
					},function(){
						alert('创建失败')
					})
					});
		        };
		createTable();
			inser=function(){
					db.transaction(function (tx) {
				tx.executeSql(
				"insert into bookcase (id) values(?)",
				[id],
					function () {  },
					function (tx, error) { alert('已加入书架'); }
				);
				});
			}
			$("#mtui").on('touchend',function(){
				inser();
			})


//小说阅读体验，设置
			var n=0;
			$('#ct').on('touchend',function(){
				if(n%2==0){
					$("#top1").show();
					$("#bottom").show();
				}
				else{
					$('#ct').nextAll().hide()
				}
				n++;
			})
			//返回首页
			$('#top1 span').on('touchend',function(){
				location.href='../index.html'
			})
				//返回目录
			$('#bottom #mml').on('touchend',function(){
//				  window.location.reload();
				$("#link").show();
				$("#conter").hide();
				$('#ct').nextAll().hide()
			})
				//换皮肤
			$("#pf").on('touchend','li',function(){
			var color=$(this).css('backgroundColor');
				$("body").css('backgroundColor',color)
				.css('color','#000');
			})
			//字体大小
		    $('#msz p').on('touchend','span:first',function(){
		    var fontSize=$("#ct").css('fontSize');
		    var vv=parseInt(fontSize)-6;
		    $("#ct").css('fontSize',vv)
		    })
		     $('#msz p').on('touchend','span:last',function(){
		    var fontSize=$("#ct").css('fontSize');
		    var vv=parseInt(fontSize)+6;
		    if(vv<=72){
		    	$("#ct").css('fontSize',vv);		    	
		    }
		    })
			//夜间模式
		    $(".yj").on('touchend',function(){
		    		console.log('夜间')
          	 $("body").css('backgroundColor','#000')
          	 .css('color','#fff');
               
		    })
		    //点击设置出现
		    $("#sz").on('touchend',function(){
		    	$('#ct').nextAll().hide()
		    	$("#msz").show();
		    })
		    $('#ju').on('touchend',function(){
		    	$('#ct').nextAll().hide()
		    	$("#jju").show();
		    })
		    //间距
		    var jl=5;
		     $("#jju").on('touchend','span:first',function(){
		     	console.log('间距减',jl)
		     	if(jl>0){
			    	jl=parseInt(jl)-1;
			    	$("#ct").css('letter-spacing',jl);
		     	}
		    	
		    })
		    $("#jju").on('touchend','span:last',function(){
		        console.log('间距加',jl)
		        if(jl<15){
			    	jl=parseInt(jl)+1;
			    	$("#ct").css('letter-spacing',jl);
		    	}
		    })
		          //点击目录第一栏返回首页
		          $("#tl").on('touchend','span:first',function(){
		          	location.href="../index.html"
		          })
            //下一章节
            $('.xzz').on('touchend',function(){
            	index=index+1;
            	var lin=$('#list').find('li').eq(index).attr('data-link');
				var hd=$('#list').find('li').eq(index).find('span').text();
				lin=encodeURIComponent(lin);//编码
					getContent(lin,hd)
            })
            //上一章
             $('.sasa').on('touchend',function(){
            	index=index-1;
            	var lin=$('#list').find('li').eq(index).attr('data-link');
				var hd=$('#list').find('li').eq(index).find('span').text();
				lin=encodeURIComponent(lin);//编码
				getContent(lin,hd)
            })
})