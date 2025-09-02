/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				BOOKMARK.start(ms);
			break;
			case 'unload':
				BOOKMARK.destroy();
			break;
			case 'change':
				BOOKMARK.change(ms.pages);
			break;
		};
	};
});

/*=========
 BOOKMARK
===========*/
BOOKMARK=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	var $mPlugin;
	/*북마크 리스트*/
	var mList=[];
	
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.bookmark';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mMarkBody=$mPlugin.querySelector('#mark-body');
		/*기본 설정하기*/
		initBookmark();
		
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		UTIL.forIn(
			$mPlugin.querySelectorAll('[data-btn]'),
			function($e,idx){
				$e.off();
			}/*end*/
		);
		UTIL.forIn(
			$mPlugin.querySelectorAll('[data-item]>.checkbox'),
			function($e,idx){
				$e.off();
			}/*end*/
		);
		UTIL.forIn(
			$mPlugin.querySelectorAll('[data-btn]>p'),
			function($e,idx){
				$e.off();
			}/*end*/
		);
		UTIL.forIn(
			$mPlugin.querySelectorAll('[data-btn]>input'),
			function($e,idx){
				$e.off();
			}/*end*/
		);
		mDatas=null;
		mRegist=null;
		$mPlugin=null;
	},
	change:function(pages){
		if(pages) mDatas.pages=pages;
	},
	addData:addData,
	addBookmark:addBookmark
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
	 INIT
	===========*/
	/*초기 북마크 설정*/	
	function initBookmark(){
		/*저장된 데이터 불어오기*/
		loadDatas();
		/*저장된 북마크 추가하기*/
		for(var i=0; i<mList.length; i++){
			addBookmark(mList[i]);
		};
		/*북마크 기능 생성*/
		$mPlugin.querySelectorAll('[data-btn]').on(
			'click',
			function(){
				
				EFFECT.play('click');
				
				var type=this.attr('data-btn');
				switch(type){
					case 'add':
						addBookmark();
					break;
					case 'delete':
						deleteBookmark();
					break;
					case 'check':
						changeCheckAll();
					break;
				};
			}/*end*/
		);
	};
	/*북마크 추가*/
	function addBookmark(obj){
		/*데이터 추가하기*/
		if(!obj) obj=addData();
		
		/*아이템 생성하기*/
		var $item=document.createElement('li');
			$item.attr('data-item',obj.id);
			
		var $check=document.createElement('div');
			$check.addClass('checkbox');
			
		var $pages=document.createElement('p');
		var pagesStr='';
			if(obj.pages){
				pagesStr=obj.pages[0]==0?'':obj.pages[0];
				if(pagesStr!='') pagesStr+=', ';
				pagesStr+=obj.pages[1]==0?'':obj.pages[1];
			};
			$pages.attr('data-pages',pagesStr);
			$pages.text(pagesStr+' page');
			
		var $note=document.createElement('input');
			$note.attr('placeHolder','내용 입력');
			$note.addClass('note');
			$note.type='text';
			$note.value=obj.note;
		/*아이템 추가하기*/
		$item.append($check);
		$item.append($pages);
		$item.append($note);
		$mMarkBody.append($item);
		
		$check.on('click',function(){
			
			EFFECT.play('open');
				
			if(!$item.hasClass('on')){
				$item.addClass('on');
			}else{
				$item.removeClass('on');
			};
		});
		$pages.on('click',function(){
			
			var pages=this.attr('data-pages');
				pages=pages.split(',');
			
			var lPage=pages[0];
			var rPage=pages[1];
			var page=1;
			if(lPage){
				page=lPage=parseInt(lPage);
				pages[0]=lPage;
			};
			if(rPage){
				rPage=parseInt(rPage);
				pages[1]=rPage;
				if(!page) page=rPage;
			};
			
			mDatas.messageMode='gotoPage';
			mDatas.page=page;
			mDatas.pages=pages;
			UTIL.message.parent(mDatas);
		});
		$note.on('blur',function(){
			updateData({
				id:$item.attr('data-item'),
				note:this.value
			});
		});
	};
	/*선택된 북마크 삭제*/
	function deleteBookmark(){
		
		var $items=$mPlugin.querySelectorAll('[data-item].on');
		UTIL.forIn($items,function($item,idx){
			removeIdData($item.attr('data-item'));
			$item.remove();
		});
	};
	/*채그 상태 변경*/
	function changeCheckAll(){
		
		var $items=$mPlugin.querySelectorAll('[data-item].on');
		if($items.length>0){
			UTIL.forIn($items,function($item,idx){
				$item.removeClass('on');
			});
		}else{
			$items=$mPlugin.querySelectorAll('[data-item]');
			UTIL.forIn($items,function($item,idx){
				$item.addClass('on');
			});
		};
	};
	/*====================
	 LOAD & SAVE & UPDATE
	=====================*/
	/*데이터 불러오기*/
	function loadDatas(){
		var str=EXE.loadValue(mRegist);
		
		if(str){
			var arr=str.split('▣');
			var datas;
			for(var i=0; i<arr.length; i++){
				datas=arr[i].split('◈');
				if(datas.length==3){
					mList.push({id:datas[0], pages:datas[1].split(','), note:datas[2]});
				};
			};
		};
	};
	/*데이터 저장하기*/
	function saveDatas(){
		var str='';
		var datas;
		for(var i=0; i<mList.length; i++){
			datas=mList[i];
			if(str!=='') str+='▣'+datas.id+'◈'+datas.pages+'◈'+datas.note;
			else str=datas.id+'◈'+datas.pages+'◈'+datas.note;
		};
		
		EXE.saveValue(mRegist,str);
	};
	/*데이터 추가하기*/
	function addData(){
		if(!mDatas) return;
		
		var obj={id:UTIL.get.time(), pages:mDatas.pages, note:''};
		mList.push(obj);
		saveDatas();
		return obj;
	};
	/*데이터 삭제하기*/
	function removeIdData(id){
		for(var i=0; i<mList.length; i++){
			if(mList[i].id==id){
				mList.splice(i,1);
				break;
			};
		};
		saveDatas();
	};
	/*데이터 업데이트 하기*/
	function updateData(obj){
		var d;
		for(var i=0; i<mList.length; i++){
			d=mList[i];
			if(d.id==obj.id){
				if(obj.note) d.note=obj.note;
				break;
			};
		};
		saveDatas();
	};
}());