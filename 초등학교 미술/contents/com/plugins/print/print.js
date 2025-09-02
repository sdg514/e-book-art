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
	var $mSelects ,$mBtns;
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
		
		/*프리트 초기화*/
		if(mDatas.pageList){
			mPage=parseInt(mDatas.page);
			if(isNaN(mPage)) mPage=1;
			mPageList=mDatas.pageList;
			
			startEvent();
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
			
		};
		
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
	
	function startEvent(){
		
		changeView();
		
		$mSelects=document.querySelectorAll('#select [data-btn]');
		$mSelects.on('click',function(){
			$mSelects.removeClass('on');
			this.addClass('on');
			changeView();
		});
		
		$mBtns=document.querySelectorAll('#btns [data-btn]');
		$mBtns.on('click',function(){
			switch(this.attr('data-btn')){
				case 'print':
					
					print();
					
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
				case 'cancel':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
			};
		});
	};
	
	function changeView(){
		
		var pages=getPages();
		
		var $body=document.querySelector('#print-view');
		$body.empty();
		/*페이지 이미지 만들기*/
		var $iFra=document.createElement('iframe');
		$iFra.attr('scrolling','no');
		$body.append($iFra);
		
		$iFra.on('load', function(){
			UTIL.message.iframe(
				$iFra, 
				{
					messageTyep:'print',
					messageMode:'change',
					pages:pages/*end*/
				}/*end*/
			);
		});
		$iFra.src='print.view.html';
		
		function getPages(){
			
			var $select=document.querySelector('#select [data-btn].on');
			if(mPageList && $select){
				var type=$select.attr('data-btn');
				
				if(type=='both'){
					return mPageList;
				}else{
					var arr=[];	
					var i=0,lens=mPageList.length;
					var p, pType;
					for(i; i<lens; i++){
						p=mPageList[i];
						if(p%2==0) pType='left';
						else pType='right';
						
						if(type==pType){
							arr.push(p);
						};
					};
					return arr;
				};
			};
		};
	};
	
	function print(){
		UTIL.message.iframe(
			document.querySelector('#print-view iframe'), 
			{
				messageTyep:'print',
				messageMode:'print'/*end*/
			}/*end*/
		);
	};
}());

