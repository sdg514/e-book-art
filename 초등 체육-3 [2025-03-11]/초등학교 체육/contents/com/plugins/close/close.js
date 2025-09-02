
/*=========
 CLOSE
===========*/
CLOSE=(function(){
	
	/*객체 정보*/
	var $mPlugin,$mBtnYes,$mBtnNo;
		
	return{
		/**
		 * 시작하기 
		 */
		ready:function(ms){
			/*효과음 초기 위치 설정*/
			EFFECT.path('../../../files/effects/');
		},
		load:function(){
			
			/*메모 객체*/
			$mPlugin=document.querySelector('#plugin');
			
			$mBtnYes=$mPlugin.querySelector('[data-btn="yes"]');
			$mBtnYes.on('click',function(){
				UTIL.message.parent({
					messageType:'plugins',
					messageMode:'close',
					messageState:'yes'
				});
			});
			$mBtnNo=$mPlugin.querySelector('[data-btn="no"]');
			$mBtnNo.on('click',function(){
				UTIL.message.parent({
					messageType:'plugins',
					messageMode:'close',
					messageState:'no'
				});
			});
		},
		/**
		 * 제거하기 
		 */
		unload:function(){
			EFFECT.destroy();
			
			if($mBtnYes){
				$mBtnYes.off();
				$mBtnYes=null;
			};
			if($mBtnNo){
				$mBtnNo.off();
				$mBtnNo=null;
			};
			
			$mPlugin=null;
		}/*end*/
	};
	
}()); UTIL.init(CLOSE);


