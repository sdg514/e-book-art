/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				INDEX.start(ms);
			break;
			case 'position':
				INDEX.position(ms);
			break;
			case 'unload':
				INDEX.destroy();
			break;
		};
	};
});

/*=========
 INDEX
===========*/
INDEX=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/**/
	var mLoadDatas=[-1,-1,-1];
	/*객체 정보*/
	var $mPlugin;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.index';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		/*저장된 데이터 불러오기*/
		loadDatas();
		/*목차 리스트 만들기*/
		makeList();
		/*목차 업데이트 하기*/
		updateSize();
	},
	position:function(ms){
		mDatas.x=ms.x;
		mDatas.y=ms.y;
		mDatas.z=ms.z;
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		if($mPlugin){
			$mPlugin.querySelectorAll('[data-lesson]>.title').off();
			$mPlugin.querySelectorAll('[data-chapter]>.title').off();
			$mPlugin=null;
		};
		mLoadDatas=null;
		mDatas=mRegist=null;
	}/*end*/
};
	/*=========
	 업데이트 
	===========*/
	/*업데이트 플러그인 사이즈*/
	function updateSize(){
		mDatas.messageMode='resize';
		mDatas.w=$mPlugin.offsetWidth;
		mDatas.h=$mPlugin.offsetHeight;
		UTIL.message.parent(mDatas);
	};
	/*=========
	 플러그인 함수 
	===========*/
	/*리스트 만들기*/
	function makeList(){
		if(typeof DATAS != undefined){
			if(DATAS.index){
				/*리스트 초기화*/
				$mPlugin.empty();
				/*레슨 리스트 만들기*/
				makeLesson(DATAS.index);
			};
		};
	};
	/*레슨 리스트 만들기*/
	function makeLesson(list){
		
		var obj;
		var $lesson, $title, $ul;
		var is;
		for(var i=0; i<list.length; i++){
			obj=list[i];
			if(obj){
				$lesson=document.createElement('li');
				$mPlugin.append($lesson);
				
				$lesson.attr('data-lesson',i);
				
				if(mLoadDatas[0]==i){
					$lesson.addClass('on');
					is=true;
				}else is=false;
				
				$title=document.createElement('div');
				$lesson.append($title);
				
				$title.addClass('title');
				$title.attr('data-page',obj.page);
				$title.text((i+1)+'. '+obj.title);
				$title.on('click', onClickLessonOpen);
				
				if(obj.list){
					$ul=document.createElement('ul');
					$lesson.append($ul);
					makeChapter($ul, obj.list, is);
				};
			};
		};
	};
	/*챕터 리스트 만들기*/
	function makeChapter($ul, list, is){
		
		var i=0;
		var obj;
		var $chapter, $title, $add;
		
		var noArr=['①','②','③','④','⑤'];
		
		for(i=0; i<list.length; i++){
			obj=list[i];
			if(obj){
				
				$chapter=document.createElement('li');
				$chapter.attr('data-chapter',i);
				
				if(is&&mLoadDatas[1]==i){
					$chapter.addClass('on');
				};
				
				$title=document.createElement('div');
				$title.addClass('title');
				$title.attr('data-page',obj.page);
				$title.text(obj.icon+' '+obj.title);
				
				
				$chapter.append($title);
				$ul.append($chapter);
				
				$title.on('click', onClickUpdate);
				/*
				if(obj.list){
					$add=document.createElement('ul');
					$chapter.append($add);
					makeCorner($add, obj.list);
					
					$title.on('click', onClickChapterOpen);
				}else{
					
					$title.on('click', onClickUpdate);
				};
				*/
			};
		};
	};
	
	function makeCorner($ul, list){
		
		var i=0;
		var obj;
		var $corner, $title;
		
		for(i=0; i<list.length; i++){
			obj=list[i];
			if(obj){
				$corner=document.createElement('li');
				$corner.attr('data-corner',i);
				
				$title=document.createElement('div');
				$title.addClass('title');
				$title.attr('data-page',obj.page[0]);
				$title.text('['+obj.icon+'] '+obj.title);
				$title.on('click', onClickUpdate);
				
				$corner.append($title);
				$ul.append($corner);
			};
		};
	};
	
	
	/**
	 * 리스트 확장하기 
	 */
	function onClickLessonOpen(){
		EFFECT.play('open');
		
		var $parent=this.parentElement;
		
		if(!$parent.hasClass('on')){
			
			var idx=$parent.attr('data-lesson');
			mLoadDatas=[parseInt(idx),-1,-1];
		}else{
			$parent.removeClass('on');
			mLoadDatas=[-1,-1,-1];
		};
		
		showList();
		
		saveDatas();
		updateSize();
	};
	
	function onClickChapterOpen(){
		EFFECT.play('open');
		
		var $parent=this.parentNode;
		
		if(!$parent.hasClass('on')){
			
			var idx=$parent.attr('data-chapter');
			mLoadDatas[1]=parseInt(idx);
			mLoadDatas[2]=-1;
		}else{
			$parent.removeClass('on');
			mLoadDatas[1]=-1;
			mLoadDatas[2]=-1;
		};
		
		showList();
		
		saveDatas();
		updateSize();
	};
	
	function showList(){
		
		var $lesson=$mPlugin.querySelector('[data-lesson].on');
		if($lesson) $lesson.removeClass('on');
		
		var $chapter=$mPlugin.querySelector('[data-chapter].on');
		if($chapter) $chapter.removeClass('on');
		
		$lesson=$mPlugin.querySelector('[data-lesson="'+mLoadDatas[0]+'"]');
		if($lesson) $lesson.addClass('on');
		
		$chapter=$lesson.querySelector('[data-chapter="'+mLoadDatas[1]+'"]');
		if($chapter) $chapter.addClass('on');	
	};
	
	/**
	 * 리스트 선택 전송하기 
	 */
	function onClickUpdate(){
		mDatas.messageMode='gotoPage';
		mDatas.page=parseInt(this.attr('data-page'));
		UTIL.message.parent(mDatas);
	};
	/*열린 리스트 닫기*/
	function closeOpenList(){
		var $lesson=$mPlugin.querySelector('[data-lesson].on');
		if($lesson) $lesson.removeClass('on');
	};
	
	/*====================
	 LOAD & SAVE & UPDATE
	=====================*/
	/*데이터 불러오기*/
	function loadDatas(){
		var str=EXE.loadValue(mRegist);
		if(!str) mLoadDatas=[-1,-1,-1];
		else{
			mLoadDatas=UTIL.change.arrayToInt(str.split('-'));
		};
	};
	/*데이터 저장하기*/
	function saveDatas(){
		EXE.saveValue(mRegist, mLoadDatas.join('-'));
	};
}());
