/*=========
 listener
===========*/
UTIL.message.listener(function(e){
	
	var datas=e.data;
	if(datas&&datas.messageType=='plugin'){
		switch(datas.messageMode){
			case 'load':
				SCREENSHOT.start(datas);
				document.querySelector('body').opacity(1);
			break;
			case 'unload':
				SCREENSHOT.stop();
			break;
		};
	};
});


SCREENSHOT=(function(){
	
	/*파일 초기 위치 조정*/
	EXE.root('./../../../', 'contents\\');
	EXE.appType(USER.appType,'');
	
	var mUrl='files/download/screenShot.jpg';
	
	var mDatas,mRegist;
	var $mPlugin,$mScreenshot,$mDrawBox,$mContent;
	
return {
	start:start,
	stop:stop/*end*/
};
	/*=========
	 업데이트 
	===========*/
	/*업데이트 플러그인 사이즈*/
	function updateSize(){
		mDatas.messageMode='resize';
		mDatas.w=parseInt($mPlugin.css('width'));
		mDatas.h=parseInt($mPlugin.css('height'));
		UTIL.message.parent(mDatas);
	};
	
	/**
	 * 시작하기
	 */
	function start(datas){
		/*셋팅 데이터*/
		mDatas=datas;
		mRegist=mDatas.regist+'.plugin.screenshot';
		
		$mPlugin=document.querySelector('#plugin');
		$mScreenshot=document.querySelector('#screenshot');
		$mDrawBox=document.querySelector('#draw-box');
		$mContent=document.querySelector('#content');
		/*화면 캡쳐 이벤트*/
		screenshotEvents();
		/*컨텐츠 이벤트*/
		contentEvents();
		/*플러그인 사이즈 전달*/
		updateSize();
	};
	
	function contentEvents(){
		
		document.querySelectorAll('#content [data-btn]').on('click',function(){
			
			switch(this.attr('data-btn')){
				case 'close':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
				case 'download':
					EXE.downloadFile(mUrl);
				break;
				case 'print':
					startPrint();
				break;
				case 'screenshot':
					showScreenshot();
				break;
			};
		});
	};
	function screenshotEvents(){
		/*그리기 상태*/
		var isDraw=false;
		
		var stScreen,movScreen;
		var stPos,movPos;
		var disW,disH;
		
		/*그리기 이벤트 등록*/
		$mScreenshot.off();
		if(!UTIL.touch){
			$mScreenshot.on('mousedown',onDown)
					.on('mouseenter',onEnter)
					.on('mouseleave',onLeave);
		}else{
			$mScreenshot.on('touchstart',onDown);
		};
		
		/*그리기 준비*/
		function onEnter(){
			$mScreenshot.css('cursor','crosshair');
		};
		/*그리기 일시 정지*/
		function onLeave(){
			$mScreenshot.css('cursor','default');
		};
		
		/*마우스 다운 그리기 시작*/
		function onDown(){
			event.stopPropagation();
			event.preventDefault();
			
			$mDrawBox.hide();
			
			isDraw=false;
			/*초기 위치 저장*/
			stScreen=UTIL.get.screen(event);
			stPos=UTIL.get.client(event);
			
			$mDrawBox.css({left:stPos.x+'px', top:stPos.y+'px'});
			
			if(!UTIL.touch){
				document.addEventListener('mousemove', onMove);
				document.addEventListener('mouseup', onUp);
			}else{
				document.addEventListener('touchmove', onMove);
				document.addEventListener('touchend', onUp);
				document.addEventListener('touchcancel', onUp);
			};
		};
		/*마우스 이동 그리기*/
		function onMove(e){
			/*이동 좌표*/
			movScreen=UTIL.get.screen(event);
			movPos=UTIL.get.client(event);
			
			disW=movScreen.x-stScreen.x;
			disH=movScreen.y-stScreen.y;
			
			$mDrawBox.css({width:(movPos.x-stPos.x)+'px', height:(movPos.y-stPos.y)+'px'});
			
			if(!isDraw&&Math.abs(disW)>5&&Math.abs(disH)>5){
				isDraw=true;
				$mDrawBox.show();
			};
		};
		/*마우스 이동 그리기*/
		function onUp(){
			$mDrawBox.hide();
			
			if(isDraw){
				/*캡쳐 시작*/
				screenshot(stScreen.x,stScreen.y,disW,disH);
			}else{
				/*캡쳐 확인*/
				alert('캡쳐할 화면 영역이 그려지지 않았습니다.');
			};
			if(!UTIL.touch){
				document.removeEventListener('mousemove', onMove);
				document.removeEventListener('mouseup', onUp);
			}else{
				document.removeEventListener('touchmove', onMove);
				document.removeEventListener('touchend', onUp);
				document.removeEventListener('touchcancel', onUp);
			};
		};
	};
	
	function showScreenshot(){
		$mScreenshot.show();
		$mContent.hide();
	};
	
	function screenshot(sx,sy,sw,sh){
		$mScreenshot.hide();
		
		var x,y,w,h;
		
		if(sw>0){
			x=sx;
			w=Math.round(sw);
		}else{
			x=sx+sw;
			w=Math.abs(sw);
		};
		
		if(sh>0){
			y=sy;
			h=Math.round(sh);
		}else{
			y=sy+sh;
			h=Math.abs(sh);
		};
		
		var screenID=setTimeout(function(){
			if(screenID){
				clearTimeout(screenID);
				screenID=null;
				
				EXE.screenShot(x+'|'+y+'|'+w+'|'+h, null);
				showContent();
			};
		},50);
	};
	
	function showContent(){
		
		var $view=document.querySelector('.screenView');
		$view.empty();
		
		var $img=document.createElement('img');
		$view.append($img);
		$img.on('load',function(){
			UTIL.image.fit($img);
		});
		
		var screenID=setTimeout(function(){
			if(screenID){
				clearTimeout(screenID);
				screenID=null;
				
				$mContent.show();
				
				$img.src='./../../../'+mUrl+'?'+UTIL.get.now();
				
				setPrintView();
			};
		},100);
	};
	
	function setPrintView(){
		
		var $pView=document.querySelector('#print-view');
		$pView.empty();
		/*페이지 이미지 만들기*/
		var $iFra=document.createElement('iframe');
		$iFra.attr('scrolling','no');
		$pView.append($iFra);
		
		$iFra.on('load', function(){
			UTIL.message.iframe(
				$iFra, 
				{
					messageTyep:'print',
					messageMode:'change',
					url:'./../../../'+mUrl/*end*/
				}/*end*/
			);
		});
		$iFra.src='print.view.html';
	};
	
	function startPrint(){
		UTIL.message.iframe(
			document.querySelector('#print-view iframe'), 
			{
				messageTyep:'print',
				messageMode:'print'/*end*/
			}/*end*/
		);
	};
	/**
	 * 종료하기
	 */
	function stop(){
		
	};
}());
