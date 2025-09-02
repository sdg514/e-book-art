/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				LOAD.start(ms);
			break;
			case 'unload':
				LOAD.destroy();
			break;
		};
	};
});
/*=========
 LOAD
===========*/
LOAD=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*객체 정보*/
	var $mPlugin;
	
	var mLoadDatas='';
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.project+'.plugin.study.info';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		
		startLoad();
		
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		document.querySelectorAll('[data-btn]').off();
		
		mLoadDatas=null;
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
	
	function sandDatas(idx){
		
		if(mLoadDatas && idx){
			
			idx=parseInt(idx);
			var obj=mLoadDatas[idx];
			
			obj.messageType='plugin';
			obj.messageMode='gotoContent';
			UTIL.message.parent(obj);
		};
	};
	
	function startLoad(){
		
		getLoadDatas();
		
		document.querySelectorAll('[data-btn]').on('click',function(){
			switch(this.attr('data-btn')){
				case 'close':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
				case 'save':
					saveDatas();
					
				break;
			};
		});
	};
	
	
	function saveDatas(){
		if(!mDatas) return;
		
		var $input=document.querySelector('.body>input');
		var note=$input.value;
		
		if(!note){
			alert('저장할 진도 내용을 입력하세요.');
			return;
		};
		
		var addStr=getObjStr({
			note:note,
			mode:mDatas.from,
			depths:mDatas.depths,
			group:mDatas.group,
			page:mDatas.page/*end*/
		});
		
		if(addStr){
			if(mLoadDatas!=''){
				mLoadDatas+='▣';
			};
			mLoadDatas+=addStr;
		};
		
		EXE.saveValue(mRegist, mLoadDatas);
		
		mDatas.messageMode='close';
		UTIL.message.parent(mDatas);
		
		function getObjStr(obj){
			var str='';
			if(obj){
				for(var v in obj){
					if(str!='') str+='◈';
					str+=v+':'+obj[v];
				};
			};
			return str;
		};
	};
	
	function getLoadDatas(){
		
		var loadStr=EXE.loadValue(mRegist);
		
		if(loadStr){
			mLoadDatas=loadStr;
		}else{
			mLoadDatas='';
		};
	};
}());


