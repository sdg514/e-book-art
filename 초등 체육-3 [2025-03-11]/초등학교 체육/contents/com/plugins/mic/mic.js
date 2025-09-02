/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				MIC.start(ms);
			break;
			case 'unload':
				MIC.destroy();
			break;
		};
	};
});

/*=========
 MIC
===========*/
MIC=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*파일 정보*/
	var mPath="../../../files/download/";
	var mFileName='';
	var mPlayTime=0;
	/*객체 정보*/
	var $mPlugin,$mTxt;
	var $mBtnRecord,$mBtnContols,$mBtnEvents;
	/*녹음 상태*/
	var mIsLoad=false;
	var mIsRecord=false;
	var mIsSave=false;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.mic.info.'+mDatas.id;
		/*플러그인 객체*/
		$mPlugin=document.querySelector('#plugin');
		/*메모 객체*/
		$mTxt=$mPlugin.querySelector('textarea');
		$mBtnRecord=$mPlugin.querySelector('.head [data-btn="record"]');
		$mBtnContols=$mPlugin.querySelectorAll('.head [data-btn].disabled');
		$mBtnEvents=$mPlugin.querySelectorAll('.foot [data-btn].disabled');
		
		/*데이터 불러오기*/
		loadDatas();
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
		
		EXE.micStop();
		if(!mIsSave){
			EXE.deleteFile(mFileName+'.wav');
		};
		if($mTxt){
			$mTxt.off();
			$mTxt.value='';
			$mTxt=null;
		};
		if($mBtnRecord){
			$mBtnRecord.off();
			$mBtnRecord=null;
		};
		if($mBtnContols){
			$mBtnContols.off();
			$mBtnContols=null;
		};
		if($mBtnEvents){
			$mBtnEvents.off();
			$mBtnEvents=null;
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
	
	/*=========
	 플러그인 함수 
	===========*/
	/**
	 * 버튼 이벤트 등록 
	 */
	function addEvents(){
		/*메모 저장하기*/
		$mTxt.on('blur',function(){
			saveDatas();
		});
		/*녹음 기능 활성화*/
		$mBtnRecord.on('click',function(){
			if(!$mBtnRecord.hasClass('switch')){
				$mBtnRecord.addClass('switch');
				$mBtnContols.addClass('disabled');
				
				mIsRecord=false;
				
				EXE.micRecordStart();
			}else{
				$mBtnRecord.removeClass('switch');
				$mBtnContols.removeClass('disabled');
				
				EXE.micRecordSave(mFileName,'exeMicPlugin');
				EXE.micRecordStop();
				mIsRecord=true;
			};
		});
		/*플레이어 기능 활성화*/
		$mBtnContols.on('click',function(){
			var $btn=this;
			var type=$btn.attr('data-btn');
			if(mIsRecord){
				switch(type){
					case 'play':
						micPlay($btn);
					break;
					case 'pause':
						micPause();
					break;
					case 'stop':
						micStop();
					break;
				};
			};
		});
		/*버튼 기능 활성화*/
		$mBtnEvents.on('click',function(){
			var type=this.attr('data-btn');
			if(mIsRecord){
				switch(type){
					case 'save':
						saveDatas();
					break;
					case 'reset':
						EXE.deleteFile(mFileName+'.wav');
						$mTxt.text('');
					break;
				};
			};
		});
	};
	/**
	 * 녹음 재생하기 
	 */
	function micPlay($btn){
		if(EXE.is()){
			EXE.micPlay(mFileName);
		}else{
			SOUND.play(mPath+mFileName+'.wav', function(type,cnt){
				switch(type){
					case 'play':
						$btn.addClass('switch');
					break;
					case 'ended':
						$btn.removeClass('switch');
						mPlayTime=0;
					break;
					case 'stop':
						$btn.removeClass('switch');
						mPlayTime=cnt;
					break;
				};
			},mPlayTime);
		};
	};
	/**
	 * 녹음 일시 정지하기 
	 */
	function micPause(){
		if(EXE.is()){
			EXE.micPause();
		}else{
			SOUND.stop();
		};
	};
	/**
	 * 녹음 정지하기 
	 */
	function micStop(){
		if(EXE.is()){
			EXE.micStop();
		}else{
			SOUND.stop();
			mPlayTime=0;
		};
	};
	/**
	 * 녹음 데이터 저장하기 
	 */
	function saveDatas(){
		mIsSave=true;
		
		var str=mFileName+'◈'+$mTxt.text();
		EXE.saveValue(mRegist,str);
	};
	/**
	 * 녹음 데이터 불러오기 
	 */
	function loadDatas(){
		
		var str=EXE.loadValue(mRegist);
		
		if(str!=null){
			mIsRecord=true;
			$mBtnContols.removeClass('disabled');
			
			/*데이터 가공*/
			var arr=str.split('◈');
			if(arr.length==2){
				mIsLoad=true;
				mFileName=arr[0];
				$mTxt.text(arr[1]);
			}else{
				/*데이터가 없을 경우 초기화*/
				mIsRecord=false;
				mFileName='m_'+UTIL.get.time();
			};
		}else{
			/*데이터가 없을 경우 초기화*/
			mIsRecord=false;
			mFileName='m_'+UTIL.get.time();
		};
	};
}());


