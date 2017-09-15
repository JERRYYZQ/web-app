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
				
			//小说阅读体验，设置
			var n=0;
			var ctTouch=true;
			$('#ct').on('touchstart',function(){
				console.log('rs33')
				ctTouch=true;
			})
			$('#ct').on('touchmove',function(){
				console.log('rs33')
				ctTouch=false;
			})
			$('#ct').on('touchend',function(){
				console.log('rs33')
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
			 //点击设置出现
		    $("#sz").on('touchend',function(){
		    	$('#ct').nextAll().hide()
		    	$("#msz").show();
		    })
		    $('#ju').on('touchend',function(){
		    	$('#ct').nextAll().hide()
		    	$("#jju").show();
		    })
			//目录返回阅读
		    $("#tl").on('touchend','img',function(){
		       	$('#link').hide().siblings('#conter').show();
		    })
			//返回主页
			$('#top1>img').on('touchend',function(){
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
		    //返回首页
		    $("#tl").on('touchend','span:first',function(){
		       	location.href="../index.html"
		    })
           