/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var datas=e.data;
	if(datas!=null){
		
		switch(datas.messageMode){
			case 'change':
			
				if(datas.messageType=='text'){
					setText(datas);
				}else{
					setDrawing(datas);
				};
				
			break;
			case 'print':
				startPrint(datas);
			break;
		};
	};
});
/**
 * 내용 변경하기 
 */
function setText(datas){
	/*용지 크기*/
	var mA4={w:763, h:1113};
	/*화면 비우기*/
	var $body=document.querySelector('body');
		$body.empty();
	/*입력할 엘리먼트*/
	var $div=document.createElement('div');
	$div.innerHTML=(datas.note);
	/*글자 크기*/
	var size=parseInt(datas.size);	
	/*적용*/
	$div.css({
		'font-family': datas.font,
		'font-size': size+'px',
		'line-height': (size+(size*0.3))+'px',
		'color': datas.color,
		width:mA4.w+'px',
		height:mA4.h+'px'
	});
	/*엘리먼트 등록*/
	$body.append($div);
	$body.opacity(1);
};

function setDrawing(datas){
	/*용지 크기*/
	var mA4={w:763, h:1113};
	/*화면 비우기*/
	var $body=document.querySelector('body');
		$body.empty();
		
	if(datas.paths){
		var $dw=document.createElement('canvas');
		$body.append($dw);
		
		/*화면 크기 설정*/
		var w=datas.w;
		if(!w) w=mA4.w;
		var h=datas.h;
		if(!h) h=mA4.h;
		$dw.attr({width:w+'px',height:h+'px'});
		
		/*켄버스 크기 설정*/
		var ctx=$dw.getContext('2d');
		ctx.lineJoin="round";
		ctx.lineCap="round";
		
		loadDrawing(ctx, datas.paths);
		
		var scale=Math.floor(mA4.w/w*1000)/1000;
		UTIL.change.scale($dw, scale, scale, null);
	};
	
	$body.opacity(1);
	
	function loadDrawing(ctx, pathStr){
		
		if(pathStr){
			var paths=pathStr.split('◈');
			for(var i=0; i<paths.length; i++){
				draw(paths[i]);
			};
		};
		
		function draw(path){
			
			var arr=path.split('▣');
			if(arr.length==2){
				
				var arrInfo=arr[0].split(',');
				
				if(arrInfo.length==4){
					
					type=arrInfo[0];
					ctx.lineWidth=arrInfo[1];
					ctx.strokeStyle=arrInfo[2];
					ctx.globalAlpha=arrInfo[3];
					
					if(arrInfo[0]!='eraser'){
						ctx.globalCompositeOperation="source-over";
					}else{
						ctx.globalCompositeOperation="destination-out";
					};
					
					var arrPath=arr[1].split(' ');
					if(arrPath.length>0){
						
						for(var i=0; i<arrPath.length; i++){
							
							var path=arrPath[i].split(',');
							
							if(path.length==2){
								
								if(i==0){
									ctx.moveTo(path[0], path[1]);
									ctx.beginPath();
								}else{
									ctx.lineTo(path[0], path[1]);
									ctx.stroke();
								};
							};
						};
						ctx.closePath();
					};
				};
			};
		};
	};
};

/**
 * 프린트 시작하기 
 */
function startPrint(){
	document.execCommand('print',false,null)||window.print();
};
