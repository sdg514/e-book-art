/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				HELP.start(ms);
			break;
			case 'unload':
				HELP.destroy();
			break;
		};
	};
});
/*=========
 HELP
===========*/
HELP=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*객체 정보*/
	var $mPlugin,$mBtnClose;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.help';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mBtnClose=$mPlugin.querySelector('[data-btn="close"]');
		$mBtnClose.on('click',function(){
			mDatas.messageMode='close';
			UTIL.message.parent(mDatas);
		});
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		if($mBtnClose){
			$mBtnClose.off();
			$mBtnClose=null;
		};
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
}());


