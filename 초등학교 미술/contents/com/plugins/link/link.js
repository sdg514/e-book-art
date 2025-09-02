/*=========
 listener
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				LINK.start(ms);
			break;
			case 'unload':
				LINK.destroy();
			break;
			case 'url':
				LINK.url(ms.url);
			break;
		};
	};
});


/*=========
 LINK
===========*/
LINK=(function(){
	/*기본 정보*/
	var mDatas;
	var mRegist,mRegistUrl,mRegistFile;
	/*링크 정보*/
	var mOpt={
		mode:'url',
		title:'',
		thumb:'',
		url:'',
		zoom:false,
	};
	/*웹 주소 정보*/
	var mURL={
		title:'',
		url:''
	};
	/*파일 주소 정보*/
	var mFile={
		title:'',
		url:''
	};
	/*객체 정보*/
	var $mPlugin;
	var $mUrlTitle,$mUrl,$mFileTitle,$mFile,$mBtns;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.link.info.'+mDatas.id;
		mRegistUrl=mDatas.regist+'.plugin.link.url.'+mDatas.id;
		mRegistFile=mDatas.regist+'.plugin.link.file.'+mDatas.id;
		/*플러그인 객체*/
		$mPlugin=document.querySelector('#plugin');
		
		$mUrlTitle=$mPlugin.querySelector('.url-title');
		$mUrl=$mPlugin.querySelector('.url-txt');
		
		$mFileTitle=$mPlugin.querySelector('.file-title');
		$mFile=$mPlugin.querySelector('.file-txt');
		
		$mBtns=$mPlugin.querySelectorAll('[data-btn]');
		
		/*메모 객체*/
		setLinkInfo();
		/*이벤트 추가*/
		addEvents();
		
		/*업데이트 플러그인 사이즈*/
		updateSize();
	},
	/**
	 * url 변경 
	 */
	url:function(url){
		if(!url) return;
		
		var fileName=url;
		var arr=fileName.split('\\');
		fileName=arr[arr.length-1];
		var idx=fileName.lastIndexOf('.');
		fileName=fileName.slice(0,idx);
		mFile.title=fileName;
		mFile.url=url;
		$mFileTitle.value=mFile.title;
		$mFile.value=mFile.url;
		
		saveDataFile();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		if($mBtns){
			$mBtns.off();
			$mBtns=null;
		};
		if($mUrlTitle){
			$mUrlTitle.off();
			$mUrlTitle=null;
		};
		if($mUrl){
			$mUrl.off();
			$mUrl=null;
		};
		if($mFileTitle){
			$mFileTitle.off();
			$mFileTitle=null;
		};
		if($mFile){
			$mFile.off();
			$mFile=null;
		};
		
		$mPlugin=null;
		mDatas=null;
		mRegist=mRegistUrl=mRegistFile=null;
		mOpt=null;
		mURL=null;
		mFile=null;
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
	 * 기능 추가하기 
	 */
	function addEvents(){
		
		$mBtns.off().on('click',function(){
			var mode=this.attr('data-btn');
			switch(mode){
				case 'url':
				case 'file':
					changeMode(mode);
				break;
				case 'search':
					UTIL.message.parent({
						messageType:'exe',
						messageMode:'plugin',
						type:'fileSearch',
						id:mDatas.id
					});
				break;
				case 'add':
					if(saveDatas()){
						sandDatas();
					}else{
						alert('링크 설정을 확인해 주세요.');
					};
				break;
			};
		});
		/*URL 저장하기*/
		$mUrlTitle.on('blur',function(){
			mURL.title=this.value;
			saveDataUrl();
		});
		$mUrl.on('blur',function(){
			mURL.url=this.value;
			saveDataUrl();
		});
		/*파일 저장하기*/
		$mFileTitle.on('blur',function(){
			mFile.title=this.value;
			saveDataFile();
		});
		/*
		$mFile.on('blur',function(){
			mFile.url=this.value;
			saveDataFile();
		});
		*/
	};
	/**
	 * 모드 변경 
	 */
	function changeMode(mode){
		mOpt.mode=mode;
		
		$mPlugin.querySelectorAll('.body>div').hide();
		$mPlugin.querySelectorAll('.head [data-btn]').removeClass('on');
		$mPlugin.querySelector('.head [data-btn="'+mOpt.mode+'"]').addClass('on');
		
		$mPlugin.querySelector('.'+mOpt.mode+'-body').show();
		
		saveDatas();
	};
	/**
	 * 링크 정보 불러오고 셋팅하기 
	 */
	function setLinkInfo(){
		
		loadDatas();
		loadDataUrl();
		loadDataFile();
		
		/*URL*/
		if(mURL.title){
			$mUrlTitle.value=mURL.title;
		};
		if(mURL.url){
			$mUrl.value=mURL.url;
		};
		/*YOUTUBE*/
		if(mFile.title){
			$mFileTitle.value=mFile.title;
		};
		if(mFile.url){
			$mFile.value=mFile.url;
		};
		/*모드 변경*/
		changeMode(mOpt.mode);
		/*데이터 보내기*/
		if(mOpt.url&&mOpt.url!='') sandDatas();
	};
	/**
	 * 링크 정보 보내기 
	 */
	function sandDatas(){
		if(mOpt.url){
			mDatas.messageType='plugin';
			mDatas.messageMode='event';
			UTIL.message.parent({
				messageType:'plugin',
				messageMode:'event',
				id:mDatas.id,
				type:mDatas.type,
				mode:mOpt.mode,
				title:mOpt.title,
				thumb:mOpt.thumb,
				url:mOpt.url/*end*/
			});
		};
	};
	/**
	 * 링크 정보 불러오기 
	 */
	function loadDatas(){
		var r,arr;
		r=EXE.loadValue(mRegist);
		if(r){
			arr=r.split('◈');
			if(arr.length==4){
				mOpt.mode=arr[0];
				mOpt.title=arr[1];
				mOpt.thumb=arr[2];
				mOpt.url=arr[3];
			};
		};
	};
	/**
	 * 웹 정보 불러오기 
	 */
	function loadDataUrl(){
		var r,arr;
		r=EXE.loadValue(mRegistUrl);
		if(r){
			arr=r.split('◈');
			if(arr.length==2){
				mURL.title=arr[0];
				mURL.url=arr[1];
			};
		};
	};
	/**
	 * 파일 정보 불러오기 
	 */
	function loadDataFile(){
		var r,arr;
		r=EXE.loadValue(mRegistFile);
		if(r){
			arr=r.split('◈');
			if(arr.length==2){
				mFile.title=arr[0];
				mFile.url=arr[1];
			};
		};
	};
	/**
	 * 링크 정보 저장하기 
	 */
	function saveDatas(){
		
		if(mOpt.mode=='url'){
			mOpt.title=mURL.title;
			mOpt.thumb='';
			mOpt.url=mURL.url;
			
			if(mOpt.url!=''&&mOpt.url.indexOf('http://')<0&&mOpt.url.indexOf('https://')<0){
				mOpt.url='https://'+mOpt.url;
			};
			
		}else{
			mOpt.title=mFile.title;
			mOpt.thumb='';
			mOpt.url=mFile.url;
		};
		
		/*선택 정보*/
		var s=mOpt.mode+'◈'+mOpt.title+'◈'+mOpt.thumb+'◈'+mOpt.url;
		EXE.saveValue(mRegist,s);
		
		if(mOpt.url&&mOpt.url!=''){
			/*데이터 보내기*/
			return true;
		}else{
			return false;
		};
	};
	/**
	 * 웹 정보 저장하기 
	 */
	function saveDataUrl(){
		/*선택 정보*/
		var s=mURL.title+'◈'+mURL.url;
		EXE.saveValue(mRegistUrl,s);
	};
	/**
	 * 파일 정보 저장하기 
	 */
	function saveDataFile(){
		/*파일 정보*/
		var s=mFile.title+'◈'+mFile.url;
		EXE.saveValue(mRegistFile,s);
	};
}());

/*
setTimeout(function(){
	LINK.start({
		regist:'ee'
	});
},100);
*/