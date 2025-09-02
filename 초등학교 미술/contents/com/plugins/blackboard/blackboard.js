/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				BLACKBOARD.start(ms);
			break;
			case 'unload':
				BLACKBOARD.destroy();
			break;
		};
	};
});

/*===========================================================================
 PLUGIN
===========================================================================*/
BLACKBOARD=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*입력창 상태 변수*/
	var mStyle={
		font:'NanumGothic', 
		size:'30', 
		color:'#fff', 
		note:''/*end*/
	};
	/*그리기 상태 변수*/
	var mDStyle={
		type:'pen',
		size:'1', 
		color:'#fff',
		figure:'circle'/*end*/
	};
	
	var mMode='text';
	
	/*객체 변수*/
	var $mPlugin;
	var $mNote,$mCanvas;
	var $mFont,$mSize,$mDFont,$mDSize,$mColor,$mDFigure,$mBtns,$mPrint;
	var $mFnFont,$mFnSize,$mFnColor,$mFnDSize,$mFnDColor,$mFnDFigure;
	var $mFnCanvas;
	
return {
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.blackboard';
		
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mNote=$mPlugin.querySelector('#note');
		$mFont=$mPlugin.querySelector('[data-dropdown="font"]');
		$mSize=$mPlugin.querySelector('[data-dropdown="size"]');
		$mColor=$mPlugin.querySelector('[data-dropdown="color"]');
		
		
		$mCanvas=$mPlugin.querySelector('#canvas');
		$mDSize=$mPlugin.querySelector('[data-dropdown="d-size"]');
		$mDColor=$mPlugin.querySelector('[data-dropdown="d-color"]');
		$mDFigure=$mPlugin.querySelector('[data-dropdown="d-figure"]');
		
		$mBtns=$mPlugin.querySelectorAll('[data-btn]');
		$mPrint=document.querySelector('#print-view');
		/*데이터 불러오기*/
		loadDatas();
		
		changeMode(mMode);
		/*기능 적용*/
		setNote();
		setFonts();
		setSizes();
		setColors();
		/*기능 적용*/
		setDrawing();
		setDSizes();
		setDColors();
		setDRects();
		/*이벤트 등록*/
		addEvents();
		
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		if($mNote){
			$mNote.off();
			$mNote=null;
		};
		if($mFnFont){
			$mFnFont.destroy();
			$mFnFont=null;
		};
		if($mFnSize){
			$mFnSize.destroy();
			$mFnSize=null;
		};
		if($mFnColor){
			$mFnColor.destroy();
			$mFnColor=null;
		};
		if($mFnDSize){
			$mFnDSize.destroy();
			$mFnDSize=null;
		};
		if($mFnDColor){
			$mFnDColor.destroy();
			$mFnDColor=null;
		};
		if($mFnDFigure){
			$mFnDFigure.destroy();
			$mFnDFigure=null;
		};
		if($mBtns){
			$mBtns.off();
			$mBtns=null;
		};
		$mPlugin=null;
		$mPrint=null;
		$mFont=null;
		$mSize=null;
		$mColor=null;
		$mDSize=null;
		$mDColor=null;
		$mDFigure=null;
		
		mStyle=null;
		mDatas=null;
		mRegist=null;
		
	}/*end*/
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
	/*=========
	 플러그인 함수 
	===========*/
	/**
	 * 입력창 설정 
	 */
	function setNote(){
		/*기본 폰트 설정*/
		changeTextFormat();
		/*노트 디자인 적용*/
		$mNote.css({border:'none'});
		/*커서 제일 뒤쪽으로 이동 시키기*/
		var position=mStyle.note.length;
		$mNote.innerHTML=(mStyle.note);
		$mNote.setSelectionRange(position,position);
		
		/*노트 이벤트 등록*/
		$mNote.on('blur',function(event){
			mStyle.note=this.value;
			saveText();
		}).on('focus',function(){
			closeAll();
		});
	};
	
	function setDrawing(){
		
		$mFnCanvas=DRAWING.make($mCanvas,{
			regist:mRegist+'.drawing',
			thick:mDStyle.size,
			color:mDStyle.color/*end*/
		});
		$mFnCanvas.start();
		
		/*노트 이벤트 등록*/
		$mCanvas.on('focus',function(){
			closeAll();
		});
	};
	
	/**
	 * 폰트 설정 
	 */
	function setFonts(){
		
		$mFnFont=$FN.Dropdown({
			element:$mFont,
			val:mStyle.font
		});
		$mFnFont.start(function(datas){
			switch(datas.type){
				case 'open':
					EFFECT.play('click');
					
					changeMode('text');
					
					$mFnSize.close();
					$mFnColor.close();
					
					$mFnDSize.close();
					$mFnDColor.close();
					$mFnDFigure.close();
					
					document.querySelector('.eraser-list').hide();
				break;
				case 'change':
					EFFECT.play('open');
					
					mStyle.font=datas.val;
					changeTextFormat();
				break;
			};
		});
	};
	/**
	 * 폰트 크기 설정 
	 */
	function setSizes(){
		
		$mFnSize=$FN.Dropdown({
			element:$mSize,
			val:mStyle.size
		});
		$mFnSize.start(function(datas){
			switch(datas.type){
				case 'open':
					EFFECT.play('click');
					
					changeMode('text');
					
					$mFnFont.close();
					$mFnColor.close();
					
					$mFnDSize.close();
					$mFnDColor.close();
					$mFnDFigure.close();
					
					document.querySelector('.eraser-list').hide();
				break;
				case 'change':
					EFFECT.play('open');
					
					mStyle.size=datas.val;
					changeTextFormat();
				break;
			};
		});
	};
	/**
	 * 폰트 색깔 설정 
	 */
	function setColors(){
		
		$mFnColor=$FN.Dropdown({
			element:$mColor,
			val:mStyle.color
		});
		$mFnColor.start(function(datas){
			switch(datas.type){
				case 'open':
					EFFECT.play('click');
					
					changeMode('text');
					
					$mFnFont.close();
					$mFnSize.close();
					
					$mFnDSize.close();
					$mFnDColor.close();
					$mFnDFigure.close();
					
					document.querySelector('.eraser-list').hide();
				break;
				case 'change':
					EFFECT.play('open');
					
					mStyle.color=datas.val;
					changeTextFormat();
				break;
			};
		});
	};
	
	/**
	 * 폰트 크기 설정 
	 */
	function setDSizes(){
		
		$mFnDSize=$FN.Dropdown({
			element:$mDSize,
			val:mDStyle.size
		});
		$mFnDSize.start(function(datas){
			switch(datas.type){
				case 'open':
					EFFECT.play('click');
					
					changeMode('drawing');
					
					$mFnFont.close();
					$mFnSize.close();
					$mFnColor.close();
					
					$mFnDColor.close();
					$mFnDFigure.close();
					
					document.querySelector('.eraser-list').hide();
				break;
				case 'change':
					EFFECT.play('open');
					
					mDStyle.size=datas.val;
					changeCanvasFormat('pen');
				break;
			};
		});
	};
	/**
	 * 폰트 색깔 설정 
	 */
	function setDColors(){
		
		$mFnDColor=$FN.Dropdown({
			element:$mDColor,
			val:mDStyle.color
		});
		$mFnDColor.start(function(datas){
			switch(datas.type){
				case 'open':
					EFFECT.play('click');
					
					changeMode('drawing');
					
					$mFnFont.close();
					$mFnSize.close();
					$mFnColor.close();
					
					$mFnDSize.close();
					$mFnDFigure.close();
					
					document.querySelector('.eraser-list').hide();
				break;
				case 'change':
					EFFECT.play('open');
					
					mDStyle.color=datas.val;
					changeCanvasFormat('pen');
				break;
			};
		});
	};
	/**
	 * 폰트 색깔 설정 
	 */
	function setDRects(){
		
		$mFnDFigure=$FN.Dropdown({
			element:$mDFigure,
			val:mDStyle.figure/*end*/
		});
		$mFnDFigure.start(function(datas){
			switch(datas.type){
				case 'open':
					EFFECT.play('click');
					
					changeMode('drawing');
					
					$mFnFont.close();
					$mFnSize.close();
					$mFnColor.close();
					
					$mFnDSize.close();
					$mFnDColor.close();
					
					document.querySelector('.eraser-list').hide();
				break;
				case 'change':
					EFFECT.play('open');
					
					mDStyle.figure=datas.val;
					
					changeCanvasFormat(mDStyle.figure);
				break;
			};
		});
	};
	
	function changeMode(m){
		
		mMode=m;
		
		switch(mMode){
			case 'drawing':
				$mCanvas.css('pointer-events','auto');
			break;
			case 'text':
				$mCanvas.css('pointer-events','none');
			break;
		};
		
		saveControls();
	};
	
	/**
	 * 폰트 속설 변경 
	 */
	function changeTextFormat(){
		
		var size=parseInt(mStyle.size);
		$mNote.css({ 'font-family': mStyle.font,
					'font-size': size+'px',
					'line-height': (size+(size*0.3))+'px',
					'color': mStyle.color
					});
		$mNote.focus();
		
		saveControls();
	};
	
	/**
	 * 폰트 속설 변경 
	 */
	function changeCanvasFormat(ty){
		
		if($mFnCanvas){
			$mFnCanvas.set.type(ty);
			$mFnCanvas.set.color(mDStyle.color);
			$mFnCanvas.set.thick(mDStyle.size);
		};
		
		saveControls();
	};
	
	function closeAll(){
		
		var $erList=document.querySelector('.eraser-list');
		if($erList) $erList.hide();
		
		$mFnFont.close();
		$mFnSize.close();
		$mFnColor.close();
		
		$mFnDSize.close();
		$mFnDColor.close();
	};
	
	/**
	 * 버튼 이벤트 등록 
	 */
	function addEvents(){
		
		$mBtns.on('click', function(){
			switch(this.attr('data-btn')){
				case 'close':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
				case 'eraser':
					eventEraser();
				break;
				case 'eraser-part':
					closeAll();
					if($mFnCanvas){
						EFFECT.play('open');
						$mFnCanvas.set.type('eraser');
					};
				break;
				case 'eraser-all':
					closeAll();
					EFFECT.play('open');
					$mFnCanvas.clear();
				break;
				case 'print':
					EFFECT.play('click');
					
					closeAll();
					if(mMode=='text'){
						startPrintText();
					}else{
						startPrintDrawing();
					};
				break;
			};
		});
		
		function eventEraser($btn){
			
			if(mMode=='text'){
				closeAll();
				EFFECT.play('click');
				
				$mNote.value='';
				mStyle.note='';
				saveText();
				
			}else{
				
				var $list=document.querySelector('.eraser-list');
				if($list){
					if($list.css('display')=='none'){
						EFFECT.play('click');
						
						closeAll();
						$list.show();
					}else{
						$list.hide();
					};
				};
				
			};
		};
	};
	/**
	 * 프린터 하기 
	 */
	function startPrintText(){
		
		UTIL.message.iframe(
			$mPrint,
			{
				messageMode:'change',
				messageType:'text',
				font:mStyle.font,
				size:mStyle.size,
				color:mStyle.color,
				note:mStyle.note/*end*/
			}/*end*/
		);
		
		var pID=setTimeout(function(){
			if(pID!=null){
				clearTimeout(pID);
				pID=null;
				
				UTIL.message.iframe($mPrint, {messageMode:'print'});
			};
		},100);
	};
	
	/**
	 * 프린터 하기 
	 */
	function startPrintDrawing(){
		
		var paths;
		
		if($mFnCanvas){
			paths=$mFnCanvas.get.datas();
		};
		if(paths){
			var w=parseInt($mCanvas.attr('width'));
			var h=parseInt($mCanvas.attr('height'));
			UTIL.message.iframe(
				$mPrint,
				{
					messageMode:'change',
					messageType:'drawing',
					w:w,
					h:h,
					paths:paths/*end*/
				}/*end*/
			);
			
			var pID=setTimeout(function(){
				if(pID!=null){
					clearTimeout(pID);
					pID=null;
					
					UTIL.message.iframe($mPrint, {messageMode:'print'});
				};
			},100);
		};
	};
	
	/**
	 * 저장 데이터 불러오기 
	 */
	function loadDatas(){
		
		var dataStr, arr;
		
		/*컨트롤러*/
		dataStr=EXE.loadValue(mRegist);
		if(dataStr){
			arr=dataStr.split('◈');
			if(arr.length==7){
				mMode=arr[0];
				mStyle.font=arr[1];
				mStyle.size=arr[2];
				mStyle.color=arr[3];
				mDStyle.size=arr[4];
				mDStyle.color=arr[5];
				mDStyle.figure=arr[6];
			};
		};
		
		changeMode(mMode);
		
		/*노트*/
		dataStr=EXE.loadValue(mRegist+'.note');
		if(dataStr) mStyle.note=dataStr;
	};
	
	/**
	 * 데이터 저장하기 
	 */
	function saveText(){
		EXE.saveValue(mRegist+'.note', mStyle.note);
	};
	
	function saveControls(){
		var save=mMode+'◈'
				+mStyle.font+'◈'
				+mStyle.size+'◈'
				+mStyle.color+'◈'
				+mDStyle.size+'◈'
				+mDStyle.color+'◈'
				+mDStyle.figure;
		EXE.saveValue(mRegist,save);
	};
}());

/*
setTimeout(function(){
	BLACKBOARD.start({
		regist:'',
	});
},100);
*/