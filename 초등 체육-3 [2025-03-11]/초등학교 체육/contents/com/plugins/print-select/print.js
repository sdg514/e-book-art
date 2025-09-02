/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				PRINT.start(ms);
			break;
			case 'unload':
				PRINT.destroy();
			break;
		};
	};
});

/*=========
 PRINT
===========*/
PRINT=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*용지 크기*/
	var mA4={w:763,h:1113};
	/*페이지 정보*/
	var mPage;
	var mPageList;
	/*객체 정보*/
	var $mPlugin;
	var $mHead,$mBody,$mSide;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(datas){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=datas;
		mRegist=mDatas.regist+'.plugin.print';
		/*프린트 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mHead=$mPlugin.querySelector('#print-head');
		$mBody=$mPlugin.querySelector('#print-body');
		$mSide=$mPlugin.querySelector('#print-side');
		/*프리트 초기화*/
		if(mDatas.pageList){
			mPage=parseInt(mDatas.page);
			if(isNaN(mPage)) mPage=1;
			mPageList=mDatas.pageList;
			
			initHead();
			initSide();
		};
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		if($mPlugin){
			$mPlugin.querySelectorAll('[data-btn]').off();
			$mPlugin.querySelectorAll('[data-choose]').off();
			$mPlugin.querySelectorAll('[data-select]').off();
			$mPlugin.querySelectorAll('[data-val]').off();
			$mPlugin=null;
		};
		$mHead=$mBody=$mSide=null;
		mA4=mDatas=mRegist=null;
		mPage=mPageList=null;
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
	 * 상단 이벤트 등록하기 
	 */
	function initHead(){
		/*닫기 버튼 이벤트 등록*/
		$mHead.querySelector('[data-btn="close"]').on('click',function(){
			mDatas.messageMode='close';
			UTIL.message.parent(mDatas);
		});
	};
	/**
	 * 프린터 설정 기능 만들기 
	 */
	function initSide(){
		
		initChoose();
		initDropdown();
		changePrintView();
		
		$mSide.querySelector('[data-btn="print"]').on('click',function(){
			var $iFra=document.querySelector('.print-iframe');
			if($iFra){
				UTIL.message.iframe(
					$iFra, 
					{
						messageTyep:'print',
						messageMode:'print'
					}/*end*/
				);
			};
		});
	};
	/**
	 * 페이지 선택 단위 기능 
	 */
	function initChoose(){
		var $chos=$mSide.querySelectorAll('[data-choose]');
		UTIL.forIn($chos, function($e,idx){
			$e.on('click',function(){
				var $mode=document.querySelector('[data-mode].on');
				if($mode) $mode.removeClass('on');
				
				$mode=document.querySelector('[data-mode="'+this.attr('data-choose')+'"]');
				$mode.addClass('on');
				
				changePrintView();
			});
		});
	};
	/**
	 * 페이지 선택 기능 
	 */
	function initDropdown(){
		var $drops=$mSide.querySelectorAll('[data-dropdown]');
		UTIL.forIn($drops, function($e,idx){
			makeDropdown($e);
		});
	};
		/**
		 * 페이지 선택 기능 만들기
		 */
		function makeDropdown($drop){
			
			var type=$drop.attr('data-dropdown');
			var $select=$drop.querySelector('[data-select]');
			var $list=$drop.querySelector('[data-list]');
			
			//mPage
			var p, i=0, lens=mPageList.length;
			var last=mPageList[lens-1];
			var $val;
			
			for(i; i<lens; i++){
				
				p=mPageList[i];
				
				$val=document.createElement('div');
				$val.attr('data-val',p);
				$val.attr('data-idx',i);
				$val.text(p);
				$val.on('click',onClickVal);
				
				$list.append($val);
				
				if(type!='end'){
					if(p==mPage){
						$select.empty();
						$select.append($val.cloneNode(true));
					};
				}else{
					var end=mPage+1;
					if(end>last) end=last;
					
					if(p==end){
						$select.empty();
						$select.append($val.cloneNode(true));
					};
				};
			};
			/*페이지 선택 리스트 오픈 기능*/
			$select.on('click',function(){
				var $mode=this.parentNode.parentNode.parentNode;
				
				if($mode.hasClass('on')){
					if($list.css('display')=='none'){
						$select.addClass('on');
						$list.show();
					}else{
						$select.removeClass('on');
						$list.hide();
					};
				};
			});
			
			/*페이지 선택 이벤트*/
			function onClickVal(){
				
				var page=parseInt(this.attr('data-val'));
				
				$select.empty();
				$select.append(this.cloneNode(true));
				
				$select.removeClass('on');
				$list.hide();
				
				if(type=='start'){
					var $eDrop=$mSide.querySelector('[data-dropdown="end"]');
					var $eSelect=$eDrop.querySelector('[data-select]');
					var eVal=parseInt($eSelect.querySelector('[data-val]').attr('data-val'));
					if(page>eVal){
						$eSelect.empty();
						$eSelect.append(this.cloneNode(true));
					};
				}else if(type=='end'){
					var $sDrop=$mSide.querySelector('[data-dropdown="start"]');
					var $sSelect=$sDrop.querySelector('[data-select]');
					var sVal=parseInt($sSelect.querySelector('[data-val]').attr('data-val'));
					if(page<sVal){
						$sSelect.empty();
						$sSelect.append(this.cloneNode(true));
					};
				};
				
				changePrintView();
			};
		};
		
	/**
	 * 선택된 페이지 리스트 보여주기 
	 */
	function changePrintView(){
		
		var $mode=document.querySelector('[data-mode].on');
		if($mode){
			var $selects=$mode.querySelectorAll('[data-select] [data-val]');
			if($selects.length==1){
				/*한 페이지*/
				var page=$selects[0].attr('data-val');
				changeBody([page]);
			}else if($selects.length==2){
				/*선택 페이지*/
				var sIdx=parseInt($selects[0].attr('data-idx'));
				var eIdx=parseInt($selects[1].attr('data-idx'));
				
				var arr=mPageList.slice(sIdx,eIdx+1);
				changeBody(arr);
			}else{
				/*전체*/
				changeBody(mPageList);
			};
		};
	};
		/**
		 * 페이지 리스트 만들기
		 */
		function changeBody(arr){
			$mBody.empty();
			
			/*프린터 스크롤 뷰*/
			var $view=document.createElement('div');
			$view.addClass('print-view');
			$view.css({width:mA4.w+'px',height:mA4.h+'px'});
			
			var sX=$mBody.offsetWidth/mA4.w;
			var sY=$mBody.offsetHeight/mA4.h;
			
			var scaleString="scale("+sX+", "+sY+")";
			$view.style.transformOrigin="top left";
			$view.style.WebkitTransform=scaleString; 
			$view.style.msTransform=scaleString; 
			$view.style.transform=scaleString;
			
			$mBody.append($view);
			
			/*페이지 이미지 만들기*/
			var $iFra=document.createElement('iframe');
			$iFra.addClass('print-iframe');
			$iFra.css({width:mA4.w+'px',height:(mA4.h*arr.length)+'px'});
			$iFra.attr('scrolling','no');
			$view.append($iFra);
			
			$iFra.on('load', function(){
				UTIL.message.iframe(
					$iFra, 
					{
						messageTyep:'print',
						messageMode:'change',
						pages:arr
					}/*end*/
				);
			});
			$iFra.src='print.view.html';
		};
	
}());

