$(function(){
	 //登录
		     $("#dddd").on('touchstart',function(){
		     		$("#sss").show();
		     })
			//注册
//			   $("#dddd").on('touchend','span:last-child',function(){
//		     	$("#sss").show();
//
//		    })
		var db=openDatabase("login","1.0","denglu","1024*1024");
		createTable=function(){
				db.transaction( function(tx) { 
				tx.executeSql("create table if not exists login (username REAL UNIQUE,password TEXT)", [],
				)
				});
		};
			createTable();
				register = function () {
				db.transaction(function (tx) {
				tx.executeSql(
				"insert into login (username,password) values(?, ?)",
				[$('#username').val(),$('#pass').val()],
					function () {
					alert('注册成功');$('#username').val(''),$('#pass').val('')
					$("#sss").show();
					
					},
					function (tx, error) { alert('注册失败: ' + error.message); }
				);
				});
			}
			$('#btn1').on('touchend',function(){
					register();
			})
         var flag=true;
			query = function () {
				db.transaction(function (tx) {
					tx.executeSql("select * from login where username=? and password=?", [$('#username').val(),$('#pass').val()],
						function (tx, result) {
							for(var i=0;i<result.rows.length;i++){
							 if(result.rows[i].username&&result.rows[i].password){
							 	$("#dddd").html($('#username').val());
							 	flag=false;
							 	alert('登录成功')
							 }
					      }
							if(flag){
								alert("请先注册")
								$("#sss").show();
				$("#dddd").html("<span>登录</span>/<span>注册</span>");
								
							}
							flag=true;
							$('#username').val('');
							$('#pass').val('');
						},
						function (tx, error) {console.log('登录失败: ' + error.message);}
					);
				});
			}
			$('#btn').on('touchend',function(){
				query()
				$("#sss").hide()
			}) 
		    $('#admin').on('touchend',function(){
				$("#dddd").html("<span>登录</span>/<span>注册</span>");
				$("#xs1").val("请登录")
			}) 
			$("#xsss").on('touchend',function(){
				$("#sss").hide()
			})
})