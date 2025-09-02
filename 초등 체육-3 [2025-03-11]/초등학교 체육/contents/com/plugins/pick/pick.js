/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				PICK.start(ms);
			break;
			case 'unload':
				PICK.destroy();
			break;
		};
	};
});
/*=============
 PICK
===============*/
PICK=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*뽑기 정보*/
	var mOpt={
		limit:99,
		max:30,
		count:1,
		w:80,
		h:90,
		time:1000/*end*/
	};
	/*뽑기 상태*/
	var mIsShow=false;
	var mAdder=0;
	/*객체 정보*/
	var $mPlugin;
	var $mTxtMax, $mTxtCount, $mVPaper, $mVSelect, $mVPick, $mBtns;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(datas){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=datas;
		mRegist=mDatas.regist+'.plugin.pick';
		
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mTxtMax=$mPlugin.querySelector('#pick-max');
		$mTxtCount =$mPlugin.querySelector('#pick-count');
		$mVPaper=$mPlugin.querySelector('[data-view="paper"]');
		$mVSelect=$mPlugin.querySelector('[data-view="select"]');
		$mVPick=$mPlugin.querySelector('[data-view="pick"]');
		$mBtns=$mPlugin.querySelectorAll('[data-btn]');
		
		loadDatas();
		resetPick();
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
		if($mTxtMax){
			$mTxtMax.off();
			$mTxtMax=null;
		};
		if($mTxtCount){
			$mTxtCount.off();
			$mTxtCount=null;
		};
		if($mVPaper){
			$mVPaper.querySelectorAll('[data-paper]').off();
			$mVPaper.off();
			$mVPaper=null;
		};
		$mVSelect=null;
		$mVPick=null;
		$mPlugin=null;
		mOpt=mDatas=mRegist=null;
		mIsShow=mAdder=null;
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
	 *이벤트 등록하기 
	 */
	function addEvents(){
		/*버튼 이벤트 등록*/
		$mBtns.on('click', function(){
			
			var type=this.attr('data-btn');
			switch(type){
				case 'close':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
				case 'reset':
					EFFECT.play('click');
					resetPick();
				break;
			};
		});
		/*총량 제한 이벤트 등록*/
		$mTxtMax.on('focus',function(event){
			$mTxtMax.value='';
		}).on('blur',function(){
			updateMax();
		}).on('keyup',function(){
			var key=(event.which)?event.which:event.keyCode;
			if(key==13){
				updateMax();
				this.blur();
			};
		});
		/*선택 가능한 개수 등록*/
		$mTxtCount.on('focus',function(event){
			$mTxtCount.value='';
		}).on('blur',function(){
			updateCount();
		}).on('keyup',function(){
			var key=(event.which)?event.which:event.keyCode;
			if(key==13){
				updateCount();
				this.blur();
			};
		});
		
		/*총량 적용하기*/
		function updateMax(){
			var num=parseInt($mTxtMax.value);
			
			if(isNaN(num)) num=mOpt.max;
			if(num<mOpt.count) num=mOpt.count;
			
			mOpt.max=num;
			$mTxtMax.value=num;
			
			saveDatas();
			resetPick();
		};
		
		/*선택 가능한 개수 적용하기*/
		function updateCount(){
			
			var num=parseInt($mTxtCount.value);
					
			if(isNaN(num)) num=mOpt.count;
			if(num>mOpt.max) num=mOpt.max;
			
			mOpt.count=num;
			$mTxtCount.value=num;
			
			saveDatas();
			resetPick();
		};
	};
	/**
	 * 다시하기 
	 */
	function resetPick(){
		
		mAdder=0;
		
		$mVSelect.hide();
		
		$mVPick.text('');
		$mVPaper.empty();
		
		$mTxtMax.value=mOpt.max;
		$mTxtCount.value=mOpt.count;
	
		makePaper();
		
		function makePaper(){
			
			var sW=$mVPaper.offsetWidth;
			var sH=$mVPaper.offsetHeight;
			
			var $p, x, y, z;
			for(var i=0; i<mOpt.max; i++){
				
				x=Math.random()*(sW-mOpt.w);
			 	y=Math.random()*(sH-mOpt.h);
			 	z=Math.random()*mOpt.max;
				
				$p=document.createElement('div');
				$p.attr('data-paper',i+1);
				$p.css({
					width:mOpt.w+'px',
					height:mOpt.h+'px',
					left:x+'px',
					top:y+'px',
					'z-index':z
				});
				$p.on('click',onPickClick);
				$mVPaper.append($p);
			};
			
			function onPickClick(){
				if(mIsShow) return;
				
				this.hide();
				showPickPaper(this.attr('data-paper'));
			};
		};
		function showPickPaper(num){
			
			if(mAdder<mOpt.count){
				
				var pickStr=$mVPick.text();
				if(pickStr=='') pickStr=num;
				else pickStr+=', '+num;
				$mVPick.text(pickStr);
				
				showNumber(num);
			};
			
			mAdder++;
			
			if(mAdder>=mOpt.count){
				UTIL.forIn(
					document.querySelectorAll('[data-paper]'),
					function($e, idx){
						$e.off().addClass('disabled');
					}/*end*/
				);
			};
			
			function showNumber(num){
				mIsShow=true;
				
				EFFECT.play('open');
				
				$mVSelect.text(num);
				$mVSelect.show();
				
				setTimeout(function(){
					mIsShow=false;
					$mVSelect.hide();
				}, mOpt.time);
			};
		};
	};
	/**
	 * 데이터 불러오기 
	 */
	function loadDatas(){
		var str=EXE.loadValue(mRegist);
		if(str){
			var arr=str.split('◈');
			if(arr.length==2){
				mOpt.max=parseInt(arr[0]);
				mOpt.count=parseInt(arr[1]);
			};
		};
	};
	/**
	 * 데이터 저장하기 
	 */
	function saveDatas(){
		var save=mOpt.max+'◈'+mOpt.count;
		EXE.saveValue(mRegist,save);
	};
	
}());



