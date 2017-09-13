//window.onload=function(){
//var yc=document.getElementById('yincang');
//var box=document.getElementById('box');
//var list=document.getElementById('list');
//var lis=list.getElementsByTagName('li');
//function aa(a,b){
//	return getComputedStyle(a,null)[b];
//}
//var w=parseInt(aa(lis[0],'width'));
//			var lis=list.getElementsByTagName('li');
//			box.addEventListener('touchend',function(e){
//				e.preventDefault();
//				var ex=e.changedTouches[0].pageX;
//				oLeft=list.offsetLeft;
//				box.addEventListener('touchmove',function(e){
//					var dis=e.changedTouches[0].pageX-ex;
//					list.style.marginLeft=oLeft+dis+'px';
//				})
//				box.addEventListener('touchend',function(){
//					var n=Math.round(list.offsetLeft/w);
//					if(n>0){
//						n=0;
//					}
//					if(n<-lis.length+1){
//						n=-lis.length+1;
//					}
//					list.style.marginLeft=n*w+'px';
//				})
//			})
//		yc.addEventListener('touchend',function(e){
//				e.preventDefault();
//		})
//		document.addEventListener('touchend',function(e){
////			e.preventDefault();
//		})
//}		
$(function(){
	$('#oul>li:first').on('touchend',function(){
		$('.yincang').css('left',0);
    })
	$('.yc').on('touchend',function(){
		$('#yincang').css('left','-100%')
	})
})