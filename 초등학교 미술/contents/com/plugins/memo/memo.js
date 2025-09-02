/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				MEMO.start(ms);
			break;
			case 'unload':
				MEMO.destroy();
			break;
		};
	};
});
/*=========
 MEMO
===========*/
MEMO=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*객체 정보*/
	var $mPlugin,$mTxt;

return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.memo.note.'+mDatas.id;
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mTxt=$mPlugin.querySelector('textarea');
		/*저장된 메모 등록*/
		mDatas.note=EXE.loadValue(mRegist);
		if(mDatas.note) $mTxt.value=mDatas.note;
		/*메모 저장하기*/
		$mTxt.on('blur',function(){
			EXE.saveValue(mRegist, $mTxt.value);
		});
		
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		if($mTxt){
			$mTxt.off();
			$mTxt=null;
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


