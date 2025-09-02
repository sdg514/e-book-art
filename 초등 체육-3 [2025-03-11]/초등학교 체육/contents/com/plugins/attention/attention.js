/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				ATTENTION.start(ms);
			break;
			case 'unload':
				ATTENTION.destroy();
			break;
		};
	};
});
/*=============
 ATTENTION
===============*/
ATTENTION=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	var $mPlugin;

return {
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.attention';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		/*효과음 실행*/
		EFFECT.play('bell');
		/*이벤트 추가하기*/
		addEvents();
		
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		mDatas=null;
		mRegist=null;
		$mPlugin=null;
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
	/*이벤트 추가하기*/
	function addEvents(){
		
		var $ball=$mPlugin.querySelector('img');
		var $btnClose=$mPlugin.querySelector('[data-btn="close"]');
		
		/*화면 터치 시 닫기*/
		$btnClose.on('click',function(){
			mDatas.messageMode='close';
			UTIL.message.parent(mDatas);
		});
		
		$ball.on('click',function(){
			UTIL.image.reset($ball);
			/*효과음 실행*/
			EFFECT.play('bell');
		});
	};
}());


