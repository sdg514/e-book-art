/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				DRAWING.start(ms);
			break;
			case 'unload':
				DRAWING.destroy();
			break;
		};
	};
});
/*=============
 DRAWING
===============*/
DRAWING=(function(){
	/*기본 정보*/
	var mRegist,mRegistPath;
	var mDatas;
	
	/*그리기 정보*/
	var mStyle={
		type:'pen', 
		thick:'1', 
		color:'#000', 
		x:null, 
		y:null/*end*/
	};
	/*화면 사이즈 정보*/
	var mSize={w:1920,h:1080};
	var mToolSize={w:530,h:68};
	var mToolLimit={top:0,bottom:0};
	/*객체 변수*/
	var $mPlugin;
	var $mCanvas, $mMover, $mTools, $mSelects, $mBtns;
	/*드로잉 기능 정보*/
	var $mFnMover;
	var mDrawPath='';
	var mCTX;
	
return {
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mRegistPath=mDatas.regist+'.plugin.drawing';
		
		/*인터넷은 쿠키 용량 제한이 있기 때문에 그리기 저장은 EXE 실행에서만 한다*/
		if(EXE.is()){
			if(mDatas.pages){
				mRegistPath+=mDatas.pages.join('-');
			}else if(mDatas.depths&&mDatas.group){
				mRegistPath+=mDatas.depths.join('-')+'.'+mDatas.group;
			};
		};
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mCanvas=$mPlugin.querySelector('.dw-canvas');
		$mTools=$mPlugin.querySelector('.dw-tools');
		$mMover=$mTools.querySelector('.head>.mover');
		$mSelects=$mTools.querySelectorAll('[data-select]');
		$mBtns=$mPlugin.querySelectorAll('[data-btn]');
		
		/*화면 사이즈*/
		mSize={w:parseInt($mPlugin.css('width')), h:parseInt($mPlugin.css('height'))};
		mToolSize={w:parseInt($mTools.css('width')), h:parseInt($mTools.css('height'))};
		mToolLimit={top:0, bottom:mSize.h-mToolSize.h};
		/*켄버스 크기 설정*/
		$mCanvas.attr({width:mSize.w+'px',height:mSize.h+'px'});
		mCTX=$mCanvas.getContext('2d');
		mCTX.lineJoin="round";
		mCTX.lineCap="round";
		mCTX.globalAlpha=1;
		
		/*데이터 불러오기*/
		loadTools();
		loadDrawPath();
		
		/*기능 실행*/
		makeTools();
		startMover();
		startCanvas();
		addEvents();
		
		/*목차 업데이트 하기*/
		updateSize();
	},
	/**
	 * 제거하기
	 */
	destroy:function(){
		DRAWING.clear();
		
		if($mFnMover){
			$mFnMover.destroy();
			$mFnMover=null;
		};
		if($mCanvas){
			$mCanvas.off();
		};
		if($mBtns){
			$mBtns.off();
		};
		if($mPlugin){
			$mPlugin.querySelectorAll('[data-val]').off();
			$mPlugin=null;
		};
		mCTX=null;
		$mMover=null;
		$mTools=null;
		mDatas=mRegist=mRegistPath=null;
		mDrawPath=null;
		mStyle=null;
		mSize=mToolSize=mToolLimit=null;
	},
	/**
	 * 켄버스 지우기
	 */
	clear:function(){
		if(mCTX) mCTX.clearRect(0, 0, mSize.w, mSize.h);
		mDrawPath='';
		
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
	 드로잉 이벤트  
	===========*/
	/*버튼 이벤트 등록*/
	function addEvents(){
		$mBtns.on('click',function(){
			switch(this.attr('data-btn')){
				case 'close':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
			};
		});
	};
	/*켄버스 기능 시작하기*/
	function startCanvas(){
		/*좌표 위치*/
		var mSP,mMP;
		/*켄버스 백업*/
		var cBU;
		/*화면 스케일*/
		var scale=1;
		/*그리기 상태*/
		var isDraw=false;
		var isOut=false;
		/*그리기 이벤트 등록*/
		$mCanvas.off();
		if(!UTIL.touch){
			$mCanvas.on('mousedown',onDown)
					.on('mouseenter',onEnter)
					.on('mouseleave',onLeave);
		}else{
			$mCanvas.on('touchstart',onDown);
		};
		/*그리기 준비*/
		function onEnter(e){
			isOut=false;
		};
		/*그리기 일시 정지*/
		function onLeave(){
			isOut=true;
		};
		/*마우스 다운 그리기 시작*/
		function onDown(e){
			/*초기 위치 저장*/
			mSP=mMP=UTIL.get.mouse(e);
			
			/*그리기 설정하기*/
			mCTX.strokeStyle=mStyle.color;
			mCTX.lineWidth=mStyle.thick;
			/*지우개 모드 확인*/
			if(mStyle.type!='eraser'){
				mCTX.globalCompositeOperation="source-over";
			}else{
				mCTX.globalCompositeOperation="destination-out";
			};	
			/*라인 모드 확인*/
			if(mStyle.type=='line'){
				cBU=mCTX.getImageData(0, 0, mSize.w, mSize.h);
			};
			/*그리기 이동하기*/
			mCTX.moveTo(mSP.x, mSP.y);
			mCTX.beginPath();
			mCTX.lineTo(mSP.x, mSP.y);
			mCTX.stroke();
			/*그리기 저장하기*/
			if(mDrawPath!='') mDrawPath+='▣';
			mDrawPath+=mStyle.type+'|'+mStyle.color+'|'+mStyle.thick+'◈';
			mDrawPath+='move,'+mSP.x+','+mSP.y+'|draw,'+mSP.x+','+mSP.y;
			/*이벤트 등록하기*/
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
			mMP=UTIL.get.mouse(e);
			/*일반 그리기 모드 일 때*/
			if(mStyle.type!='line'){
				
				if(!isOut){
					/*선 그리기*/
					mCTX.lineTo(mMP.x, mMP.y);
					mCTX.stroke();
					/*그리기 정보 등록*/
					mDrawPath+='|draw,'+mMP.x+','+mMP.y;
				}else{
					/*그리기 좌표 이동하기*/
					mCTX.moveTo(mMP.x, mMP.y);
					mCTX.beginPath();
					/*그리기 정보 등록*/
					mDrawPath+='|move,'+mMP.x+','+mMP.y;
				};
			}else{
				/*직선 표시하기*/
				mCTX.putImageData(cBU, 0, 0);
				mCTX.beginPath();
				mCTX.moveTo(mSP.x, mSP.y);
				mCTX.lineTo(mMP.x, mMP.y);
				mCTX.stroke();
			};
			
			return false;
		};
		/*마우스 업 그리기 종료*/
		function onUp(){
			/*선 그리기 일때 선 표시*/
			if(mStyle.type=='line'){
				/*직선 표시하기*/
				mCTX.putImageData(cBU, 0, 0);
				mCTX.beginPath();
				mCTX.moveTo(mSP.x, mSP.y);
				mCTX.lineTo(mMP.x, mMP.y);
				mCTX.stroke();
				/*그리기 정보 등록*/
				mDrawPath+='|draw,'+mMP.x+','+mMP.y;
			};
			/*그리기 패스 종료*/
			mCTX.closePath();
			/*그리기 데이터 저장*/
			saveDrawPath();
			/*이벤트 제거*/
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
	/**
	 * 그리기 도구 만들기
	 */
	function makeTools(){
		
		/*셀렉터 설정*/
		for(var i=0; i<$mSelects.length; i++){
			makeSelect($mSelects[i]);
		};
		/*초기 툴 위치*/
		if(mStyle.x==null||mStyle.y==null){
			var tW=parseInt($mTools.css('width'));
			var tH=parseInt($mTools.css('height'));
			mStyle.x=Math.floor((mSize.w-tW)/2);
			mStyle.y=(mSize.h-tH-20);
		};
		/*초기 틀 위치 설정*/
		$mTools.css({
			left:mStyle.x+'px',
			top:mStyle.y+'px',
			opacity:1/*end*/
		});
		/**
		 * 툴 선택 기능 만들기
		 */
		function makeSelect($st){
			
			var t=$st.attr('data-select');
			var $vals=$st.querySelectorAll('[data-val]');
			/*타입변 아이콘 만들기*/
			switch(t){
				case 'type':
					makeType($vals,t);
				break;
				case 'thick':
					makeThicks($vals,t);
				break;
				case 'color':
					makeColor($vals,t);
				break;
			};
			/*아이콘 선택 이벤트 등록*/
			$vals.on('click',function(){
				change(t, this.attr('data-val'));
				saveTools();
			});
		};
		/**
		 * 타임 아이콘 만들기
		 */
		function makeType($vals,type){
			
			var $v, $img, name;
			for(var i=0; i<$vals.length; i++){
				$v=$vals[i];
				$v.empty();
				name=$v.attr('data-val');
				if(mStyle.type==name){
					change(type, name);
				};
				$img=document.createElement('img');
				$img.src='res/icon-'+name+'.png';
				$v.append($img);
			};
		};
		/**
		 * 선 굵기 아이콘 만들기
		 */
		function makeThicks($vals,type){
			
			var $v, $rect, size;
			var w,h;
			for(var i=0; i<$vals.length; i++){
				$v=$vals[i];
				if(i==0){
					w=parseInt($v.css('width'));
					h=parseInt($v.css('height'));
				};
				$v.empty();
				size=$v.attr('data-val');
				if(mStyle.thick==size){
					change(type, size);
				};
				size=parseInt(size)+1;
				$rect=document.createElement('div');
				$rect.css({
					width:size+'px',
					height:size+'px',
					left:Math.floor((w-size)/2)-1+'px',
					top:Math.floor((h-size)/2)-1+'px'/*end*/
				});
				$v.append($rect);
			};
		};
		/**
		 * 선 색깔 아이콘 만들기
		 */
		function makeColor($vals,type){
			
			var $v, $color, c;
			var w,h;
			for(var i=0; i<$vals.length; i++){
				$v=$vals[i];
				if(i==0){
					w=parseInt($v.css('width'));
					h=parseInt($v.css('height'));
				};
				$v.empty();
				c=$v.attr('data-val');
				if(mStyle.color==c){
					change(type, c);
				};
				$color=document.createElement('div');
				$color.css('background-color',c);
				$v.append($color);
			};
		};
	};
	/**
	 * 선택한 아이콘 표시하기
	 */
	function change(t,v){
		switch(v){
			case 'eraser-all':
				mDrawPath='';
				saveDrawPath();
				DRAWING.clear();
			break;
			default:
				mStyle[t]=v;
				$mTools.querySelectorAll('[data-select="'+t+'"] [data-val].on').removeClass('on');
				$mTools.querySelectorAll('[data-select="'+t+'"] [data-val="'+v+'"]').addClass('on');
			break;
		};
	};
	/**
	 * 그리기 툴 이동하는 기능 
	 */
	function startMover(){
		/*이동 객체 만들기*/
		$mFnMover=$FN.Drag($mMover,{
			target:$mTools
		}).start(function(ds){
			switch(ds.type){
				case 'move':
					mStyle.x=parseInt($mTools.css('left'));
					mStyle.y=parseInt($mTools.css('top'));
					if(mStyle.y<mToolLimit.top){
						mStyle.y=0;
					}else if(mStyle.y>mToolLimit.bottom){
						mStyle.y=mToolLimit.bottom;
					};
					$mMover.css('top',mStyle.y+'px');
					
					/*툴 정보 저장하기*/
					saveTools();
				break;
			};
		});
	};
	
	/**
	 * 패스 정보 불어오기
	 */
	function loadDrawPath(){
		
		var ps=EXE.loadValue(mRegistPath+'.path');
		
		if(ps){
			mDrawPath=ps;
			
			var datas=ps.split('▣');
			for(var i=0; i<datas.length; i++){
				makePath(datas[i]);
			};
		};
		
		function makePath(str){
			if(!mCTX) return;
			
			var arr=str.split('◈');
			var arrInfo;
			var arrPath;
			var type;
			
			if(arr.length==2){
				arrInfo=arr[0].split('|');
				arrPath=arr[1].split('|');
				
				if(arrInfo.length==3){
					type=arrInfo[0];
					mCTX.strokeStyle=arrInfo[1];
					mCTX.lineWidth=arrInfo[2];
					
					if(type!='eraser'){
						mCTX.globalCompositeOperation="source-over";
					}else{
						mCTX.globalCompositeOperation="destination-out";
					};
					
					if(arrPath.length>1){
						for(var i=0; i<arrPath.length; i++){
							var path=arrPath[i].split(',');
							if(path[0]=='move'){
								mCTX.moveTo(path[1], path[2]);
								mCTX.beginPath();
							}else{
								mCTX.lineTo(path[1], path[2]);
								mCTX.stroke();
							};
						};
						mCTX.closePath();
					};
				};
			};
		};
	};
	/**
	 * 패스 정보 저장하기
	 */
	function saveDrawPath(){
		EXE.saveValue(mRegistPath+'.path',mDrawPath);
	};
	/**
	 * 컨트롤러 정보 불러오기
	 */
	function loadTools(){
		var strs=EXE.loadValue(mRegist+'.tools');
		
		if(strs){
			var arr=strs.split('◈');
			if(arr.length==5){
				mStyle.type=arr[0];
				mStyle.thick=arr[1];
				mStyle.color=arr[2];
				mStyle.x=parseInt(arr[3]);
				mStyle.y=parseInt(arr[4]);
			};
		};
	};
	/**
	 * 컨트롤러 정보 저장하기
	 */
	function saveTools(){
		var strs=mStyle.type+'◈'+mStyle.thick+'◈'+mStyle.color+'◈'+mStyle.x+'◈'+mStyle.y;
		EXE.saveValue(mRegist+'.tools', strs);
	};
}());
