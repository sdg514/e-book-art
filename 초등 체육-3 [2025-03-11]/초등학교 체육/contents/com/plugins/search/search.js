/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				SEARCH.start(ms);
			break;
			case 'unload':
				SEARCH.destroy();
			break;
		};
	};
});

/*=========
 SEARCH
===========*/
SEARCH=(function(){
	/*이미지 위치*/
	var mPath='../../../html/ebook/turn/thumbs/';
	var mFormat='.jpg';	
	/*기본 정보*/
	var mDatas,mRegist;
	/*객체 정보*/
	var $mPlugin;
	var $mInput,$mBtnSearch,$mView;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(datas){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=datas;
		mRegist=mDatas.regist+'.plugin.search';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		/*객체 변수*/
		$mInput=$mPlugin.querySelector('#controls>input');
		$mView=$mPlugin.querySelector('#view');
		$mBtnSearch=$mPlugin.querySelector('[data-btn="search"]');
		/*초기 검색어 입력*/
		if(mDatas.search!=null) $mInput.value=mDatas.search;
		/*초기 검색하기*/
		startSearch();
		/*이벤트 추가*/
		addEvents();
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		if($mInput){
			$mInput.off();
			$mInput=null;
		};
		if($mBtnSearch){
			$mBtnSearch.off();
			$mBtnSearch=null;
		};
		if($mPlugin){
			$mPlugin.querySelectorAll('[data-page]').off();
			$mPlugin=null;
		};
		$mView=null;
		mPath=null;
		mFormat=null;	
		mDatas=mRegist=null;
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
		/*검색 버튼*/
		$mBtnSearch.on('click',function(){
			EFFECT.play('click');
			startSearch();
		});
		/*검색 키보든 기능*/
		$mInput.on('keydown', function(e){
			if(e.keyCode==13){
				EFFECT.play('click');
				startSearch();
			};
		});
	};
	/**
	 * 페이지 이동 전달
	 */
	function gotoPage(){
		mDatas.messageMode='gotoPage';
		mDatas.page=parseInt(this.attr('data-page'));
		UTIL.message.parent(mDatas);
	};
	/**
	 * 검색 리스트 만들기
	 */
	function startSearch(){
		if(typeof DATAS==undefined) return;
		if(!DATAS.search) return;
		
		/*검색리스트 비우기*/
		$mView.empty();
		/*검색 데이터*/
		var listDatas=DATAS.search;
		
		var search=$mInput.value;
		if(search!=''&&search!=' '){
			makeList(search);
		};
		/**
		 * 리스트 만들기
		 */
		function makeList(search){
			
			var lens=listDatas.length;
			var obj, src;
			var $li, $img, $p, $thumb, $note;
			var $wordList;
			
			for(var i=0; i<lens; i++){
				obj=listDatas[i];
				page=obj.page;
				
				$wordList=addWords(search, obj.words);
				
				if($wordList.length>0){
					
					$li=document.createElement('li');
					$li.attr('data-page', page);	
					$mView.append($li);
					
					$thumb=document.createElement('div');
					$thumb.addClass('thumb');
					$li.append($thumb);
					
					$img=document.createElement('img');
					$img.src=mPath+page+mFormat;
					$thumb.append($img);
					
					$p=document.createElement('p');
					$p.addClass('page');
					$p.text(page);
					$thumb.append($p);
					
					$note=document.createElement('div');
					$note.addClass('note');
					$li.append($note);
					
					UTIL.forIn($wordList,function($w,idx){
						$note.append($w);
					});
					
					$li.on('click', gotoPage);
				};
			};
		};
		/**
		 * 검색어 찾기
		 */
		function addWords(search,words){
			
			var lens=words.length;
			var wordList=[];
			var w,$p;
			for(var i=0; i<lens; i++){
				w=words[i];
				if(w&&w.indexOf(search)>-1){
					$p=document.createElement('p');
					$p.text(w);
					wordList.push($p);
				};
			};
			return wordList;
		};
	};
	
}());
