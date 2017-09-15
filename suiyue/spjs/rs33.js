$(function(){
	//获取地址上的id,title
//	localStorage.clear()
				function GetQueryString(name){
				     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				     var r = window.location.search.substr(1).match(reg);
				     if(r!=null)return  unescape(r[2]); return null;
			    }
				//获取小说章节
				var id=GetQueryString('id');
				var title=GetQueryString('title');
				title=decodeURIComponent(title);
				$.getJSON("http://query.yahooapis.com/v1/public/yql",
					{ q: "select * from json where url='http://api.zhuishushenqi.com/mix-atoc/"+id+"?view=chapters"+"'",format: "json"},
					function(data){
						var dt=data.query.results.json.mixToc.chapters;
						console.log(data)
						for(var i=0;i<dt.length;i++){
							$("<li data-link='"+dt[i].link+"'"+"data-orgin='"+i+"'"+"><span>"+dt[i].title+"</span></li>").appendTo('#list')
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
				if(!localStorage.getItem(id)){
					localStorage.setItem(id,'0');
				}
				var firstLink;
				var firstTitle;
				var len;
				$.getJSON("http://query.yahooapis.com/v1/public/yql",
					{ q: "select * from json where url='http://api.zhuishushenqi.com/mix-atoc/"+id+"?view=chapters"+"'",format: "json"},
					function(data){
						var dt=data.query.results.json.mixToc.chapters;
						    len=dt.length;
						console.log(len)
						var jz=parseInt(localStorage.getItem(id));
						if(jz<0){
							jz=len+jz;
							console.log(jz)
						}
						index=jz;
						localStorage.setItem(id,jz);
						firstLink=dt[jz].link;
						firstTitle=dt[jz].title;
						firstLink=encodeURIComponent(firstLink)
						getContent(firstLink,firstTitle)
				})
				var isClick=true;
				$('#list').on('touchstart','li',function(){
					isClick=true;
				})
				$('#list').on('touchmove','li',function(){
					isClick=false;
				})
				var index=0;
				$('#list').on('touchend','li',function(){
					index=$(this).index();
					if(int%2==0){
						localStorage.setItem(id,index);
					}else{
						localStorage.setItem(id,len-index-2)
					}
					
			        if(isClick){
			        	    $(this).addClass('bag').siblings('li').removeClass('bag');
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
            //查询
            var bookrack=true;
            query = function (id) {
				db.transaction(function (tx) {
				tx.executeSql("select * from bookcase", [],function (tx, result) {
					for(var i=0;i<result.rows.length;i++){
						if(result.rows[i].id==id){
							$('#mtui').text('移出书架');
							bookrack=false;
							break;
						}else{
							$('#mtui').text('加入书架');
							bookrack=true;
						}
					}
				},
				function (tx, error) {
				alert('查询失败: ' + error.message);
				} );
				});
			}
            query(id);
				
				inser=function(id){
					db.transaction(function (tx) {
					tx.executeSql("insert into bookcase (id) values(?)",[id],
						function () {alert('加入书架成功'); bookrack=false;$('#mtui').text('移出书架');},
						function (tx, error) {  }
					);
					});
				}
				

            //移出书架
            del = function (id) {
				db.transaction(function (tx) {
			        tx.executeSql("delete from bookcase where id=?",[id],function (tx, result) {
						$('#mtui').text('加入书架');
						bookrack=true;
				    },
					function (tx, error) {
						alert('移出失败: ' + error.message);
					});
				});
			}
            
            	$('#mtui').on('touchend',function(){
            		if(bookrack){
            			inser(id);
            		}else{
	            		if(confirm('确定要移出书架吗？')){
							del(id);
						}else{
							return false;
						}
            		}
            		
           		})
            
			//小说阅读体验，设置
			var n=0;
			var ctTouch=true;
			$('#ct').on('touchstart',function(){
				ctTouch=true;
			})
			$('#ct').on('touchmove',function(){
				ctTouch=false;
			})
			$('#ct').on('touchend',function(){
				if(ctTouch){
					if(n%2==0){
						$("#top1").show();
						$("#bottom").show();
					}
					else{
						$('#ct').nextAll().hide()
					}
					n++;
				}
			})
			      //点击目录第一栏返回阅读
		    $("#tl").on('touchend','img',function(){
		       	$('#link').hide().siblings('#conter').show();
		    })
			//书名
			$('#top1').find('span:first').text(title);
			//返回主页
			$('#top1>img').on('touchend',function(){
//				$('#conter').hide().siblings('#link').show();
				location.href='../index.html'
			})
			//点击短时间变色
			$('#bottom').on('touchstart','li',function(){
				$(this).addClass('bag');
				var that=$(this);
				$('#bottom').on('touchend',function(){
					that.removeClass('bag');
				})
			})
				//返回目录
			$('#bottom #mml').on('touchend',function(){
			// window.location.reload();
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
			var ye=0;
		    $(".yj").on('touchend',function(){
		    	if(ye%2==0){
		    		$("body").css('backgroundColor','#000')
		    		.css('color','#fff');
		    		$('.yj').text('日间模式');
		    	}
		    	else{
		    		$("body").css('backgroundColor','#fff')
		    		.css('color','#000');
		    		$('.yj').text('夜间模式');
		    	}
		    	ye++;
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
		    //间距减
		    var jl=4;
		    $("#jju").on('touchstart','span:first',function(){
		    	$(this).addClass('bag');
		    })
		     $("#jju").on('touchend','span:first',function(){
		     	$(this).removeClass('bag');
		     	if(jl>0){
			    	jl=parseInt(jl)-1;
			    	$("#ct").css('letter-spacing',jl);
		     	}
		    	
		    })
		     //间距加
		    $("#jju").on('touchstart','span:last',function(){
		    	$(this).addClass('bag');
		    })
		    $("#jju").on('touchend','span:last',function(){
		        $(this).removeClass('bag');
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
            $('.xzz').on('touchstart',function(){
            	$(this).addClass('bag');
            })
            $('.xzz').on('touchend',function(){
            	console.log($("*[data-orgin=11]"))
            	$(this).removeClass('bag');
            	if(int%2==0){
            		index=index+1;
            		localStorage.setItem(id,index);
            	}
            	else{
            		index=index-1;
            		localStorage.setItem(id,len-index-2);
	            		if(parseInt(localStorage.getItem(id))==len-1){
	            		localStorage.setItem(id,'0');
	            		$('#tl').find('span:last').trigger('touchend');
	            		$('.xzz').trigger('touchend')
            		}
            	}
            	var lin=$('#list').find('li').eq(index).attr('data-link');
				var hd=$('#list').find('li').eq(index).find('span').text();
				lin=encodeURIComponent(lin);//编码
					getContent(lin,hd)
            })
            //上一章
            $('.sasa').on('touchstart',function(){
            	$(this).addClass('bag');
            })
             $('.sasa').on('touchend',function(){
             	$(this).removeClass('bag');
             	if(int%2==0){
             		index=index-1;
             		localStorage.setItem(id,index);
             	}
             	else{
             		index=index+1;
            		localStorage.setItem(id,len-index-2);
             	}
            	var lin=$('#list').find('li').eq(index).attr('data-link');
				var hd=$('#list').find('li').eq(index).find('span').text();
				lin=encodeURIComponent(lin);//编码
				getContent(lin,hd)
            })
})