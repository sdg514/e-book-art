/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				TIMER.start(ms);
			break;
			case 'unload':
				TIMER.destroy();
			break;
		};
	};
});
/*=============
 TIMER
===============*/
TIMER=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*시간 설정 변수*/
	var timer;
	var current=0;
	var isStart=false;
	var isWatch=false;
	/*객체 정보*/
	var $mPlugin;
	var $mBtns;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.timer';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mBtns=$mPlugin.querySelectorAll('[data-btn]');
		
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
		
		if($mBtns){
			$mBtns.off();
			$mBtns=null;
		};
		if($mPlugin){
			$mPlugin=null;
		};
		if(timer!=null){
			clearTimeout(timer);
			timer=null;
		};
		isWatch=isStart=current=mDatas=mRegist=null;
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
	 * 이벤트 등록하기 
	 */
	function addEvents(){
		$mBtns.on('click',function(){
			switch(this.attr('data-btn')){
				case 'close':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
				case 'stop':
					EFFECT.play('click');
					stopTimer();
				break;
				case 'start':
					EFFECT.play('click');
					startTimer();
				break;
				case 'reset':
					EFFECT.play('click');
					stopTimer();
					setTime(0);
				break;
				case 'section':
					EFFECT.play('open');
					setTime(this.attr('data-limit'));
				break;
				default:
					EFFECT.play('open');
					setTime(current+parseInt(this.attr('data-limit')));
				break;
			};
		});
	};
	/**
	 * 시간 설정하기 
	 */
	function setTime(cnt){
		
		current=parseInt(cnt);
		if(isNaN(current)) current=0;
		if(current<0) current=0;
		
		var mins=parseInt(current/60);
		var secs=current%60;
		
		if(mins<10) mins='0'+mins;
		if(secs<10) secs='0'+secs;
		
		$mPlugin.querySelector('#min').text(mins);
		$mPlugin.querySelector('#sec').text(secs);
	};
	/**
	 * 타이머 시작하기 
	 */
	function startTimer(){
		
		isStart=true;
		if(current==0)isWatch=true;
		else isWatch=false;
		
		$mPlugin.querySelector('#time-change').addClass('dim');
		$mPlugin.querySelector('[data-btn="start"]').hide();
		$mPlugin.querySelector('[data-btn="stop"]').show();
		timer=setTimeout(startTimerEvent, 1000);
		
		function startTimerEvent(){
			
			if(isWatch){
				if(isStart){
					
					current++;
					EFFECT.play('timer');
					
					timer=setTimeout(startTimerEvent, 1000);
					setTime(current);
				};
			}else{
				current--;
				
				if(current<=0){
					current=0;
					isStart=false;
					setTime(current);
					EFFECT.play('timeout');
					stopTimer();
				}else{
					timer=setTimeout(startTimerEvent, 1000);
					setTime(current);
					EFFECT.play('timer');
				};
			};
		};
	};
	/**
	 * 타이머 종료하기 
	 */
	function stopTimer(){
		if(timer!=null){
			clearTimeout(timer);
			timer=null;
		};
		
		isStart=false;
		isWatch=false;
		
		$mPlugin.querySelector('#time-change').removeClass('dim');
		$mPlugin.querySelector('[data-btn="start"]').show();
		$mPlugin.querySelector('[data-btn="stop"]').hide();
	};
}());