if(typeof GROUP=='undefined') GROUP={};
/*<홈 화면>*/
GROUP.room=function($room, datas){
	if(!$room||!datas) return;
	
	/*전달 받은 데이터*/
	var mOrigin=datas.room;
	var mRoomID=datas.regist;
	var mLessonID=datas.lesson;
	
	/*저장 데이터 교차하기*/
	var mLoadRoom=loadRoom();
	if(!mLoadRoom){
		if(!mOrigin) mOrigin=[];
		mLoadRoom=mOrigin;
	};
	var mCB=datas.callback;
	/*엘리멘트 변수*/
	var $mRoom=$room;
		$mRoom.addClass('fn-group-room');
	var $mContainer;
	
	/*만들기*/
	makeRoom();
	/**
	 * 객체 전달하기
	 */
	return $mRoom.fnGroupRoom=result();
	function result(){
		return {
			add:add,
			remove:remove,
			removeSelect:removeSelect,
			reset:reset,
			change:change/*end*/
		};
	};
	
	/*==============================*/
	function change(id){
		if(mLessonID!=id){
			mLessonID=id;
			makeRoom();
		};
	};
	
	/*==============================*/
	
	/**
	 * 리스트 만들기
	 */
	function makeRoom(){
		$mRoom.empty();
		
		$mContainer=document.createElement('div');
		$mContainer.addClass('container');
		$mRoom.append($mContainer);
		
		/*아이템 추가하기*/
		UTIL.forIn(mLoadRoom,function(obj,idx){
			if(mLessonID=='all'||mLessonID==obj.lesson){
				$mContainer.append(makeItem(obj));
			};
		});
	};
	/**
	 * 리스트 아이템 만들기
	 */
	function makeItem(obj){
		
		var $div=document.createElement('div');
			$div.attr('data-room','room')
				.attr('data-id',obj.id);
		
		var $icon=document.createElement('div');
			$icon.attr('data-icon',obj.icon);
		
		var $title=document.createElement('div');
			$title.addClass('title');
		var $p=document.createElement('p');
			$p.text(obj.title);
		$title.append($p);
		
		var $check=document.createElement('div');
			$check.addClass('check');
		
		$div.append($icon);
		$div.append($title);
		$div.append($check);
		
		$check.on(UTIL.get.mouseType('down'),function(){
			/*부모에게 전달되는 이벤트 막기*/
			event.stopPropagation();
		});
		$check.on('click',function(){
			if(!$div.hasClass('on')){
				$div.addClass('on');
			}else{
				$div.removeClass('on');
			};
		});
		
		var $appendTarget=document.querySelector('#content');
		var $fnDrag=$FN.Drag($div,{
			clone:true,
			appendTarget:$appendTarget,
			cloneTarget:$appendTarget,
			type:''
		});
		$fnDrag.start(onDragEvents);
		
		return $div;
	};
	/**
	 * 아이템 클릭 및 이동 변동하기 
	 */
	function onDragEvents(datas){
		switch(datas.type){
			case 'up':
				
				var obj=UTIL.find.arrayToID(mLoadRoom,datas.origin.attr('data-id'));
				
				if(!datas.isMove){
					
					sandDatas({
						eType:'click',
						icon:obj.icon,
						src:obj.src,
						title:obj.title
					});
					
					datas.fn.reset();
				}else{
					sandDatas({
						eType:'change',
						target:datas.target,
						pos:datas.pos,
						icon:obj.icon,
						id:obj.id,
						mode:obj.mode,
						src:obj.src,
						title:obj.title
					});
					
					datas.fn.reset();
				};
			break;
		};
	};
	
	/*==============================*/
	
	/**
	 * 초기화 하기 
	 */
	function reset(){
		saveRoom(true);
		makeRoom();
	};
	/**
	 * 아이템 추가하기 
	 */
	function add(type, src, title){
		if(!src) return;
		
		var icon;
		
		if(type=='file'){
				
			var pos=src.lastIndexOf('.');
			/*포멧*/
			var format=src.slice(pos+1);
			/*포멧 삭제*/
			title=src.slice(0,pos);
			/*경로 끝 부분 찾기*/
			pos=title.lastIndexOf('\\');
			/*파일 이름만 남기기*/
			title=title.slice(pos+1);
			/*포멧 소문자로 만들기*/
			format=format.toLowerCase();
			
			switch(format){
				case 'png':
				case 'jpg':
				case 'jpeg':
				case 'gif':
				case 'bmp':
					icon='img';
				break;
				case 'mp3':
				case 'wav':
				case 'ogg':
				case 'wma':
				case 'ape':
				case 'flac':
					icon='audio';
				break;
				case 'mp4':
				case 'mov':
				case 'avi':
				case 'webm':
					icon='mov';
				break;
				default:
					icon='doc';
				break;
			};
		}else{
			icon='web';
		};
		
		var obj={
			lesson:mLessonID+'',
			id:UTIL.get.time()+'',
			mode:'load',
			title:title,
			icon:icon,
			src:src
		};
		
		mLoadRoom.unshift(obj);
		UTIL.sort.string(mLoadRoom, 'title');
		
		var idx=UTIL.find.arrayToID(mLoadRoom, obj.id, true);
		if(idx==0){
			$mContainer.prepend(makeItem(obj));
		}else{
			var tgtObj=mLoadRoom[idx-1];
			var $r=$mContainer.querySelector('[data-room][data-id="'+tgtObj.id+'"]');
			if($r) $r.after(makeItem(obj));
			else $mContainer.append(makeItem(obj));
		};
		/*저장하기*/
		saveRoom();
	};
	/**
	 * 아이템 제거하기 
	 */
	function remove(id,isPass){
		if(id){
			var idx=UTIL.find.arrayToID(mLoadRoom, id, true);
			if(idx>=0){
				mLoadRoom.splice(idx,1);
				var $r=$mContainer.querySelector('[data-room][data-id="'+id+'"]');
				if($r) $r.remove();
			};
			
			if(!isPass) saveRoom();
		};
	};
	/*선택된 아이템 제거하기*/
	function removeSelect(){
		
		var $selects=$mRoom.querySelectorAll('[data-room].on');
		if($selects && $selects.length>0){
			removePopup($selects);
		}else{
			alert('선택한 내 자료 파일이 없습니다.');
		};
	};
	
	function removePopup($selects){
		
		var $screen=document.querySelector('#screen');
		
		var $popup=document.createElement('div');
		$popup.addClass('popup-remove');
		
		var $content=document.createElement('div');
		$popup.append($content);
		
		var $head=document.createElement('div');
		$head.addClass('head');
		$content.append($head);
		
		var $title=document.createElement('p');
		$title.text('자료 삭제');
		$head.append($title);
		
		var $body=document.createElement('div');
		$body.addClass('body');
		$content.append($body);
		
		var $note=document.createElement('p');
		$note.text('자료를 삭제하시겠습니까?');
		$body.append($note);
		
		var $btnYes=document.createElement('div');
		$btnYes.attr('data-btn','yes');
		$btnYes.innerHTML='<p>예</p>';
		$body.append($btnYes);
		
		var $btnNo=document.createElement('div');
		$btnNo.attr('data-btn','no');
		$btnYes.innerHTML='<p>아니요</p>';
		$body.append($btnNo);
		
		$btnYes.on('click', function(){
			
			for(var i=0; i<$selects.length; i++){
				remove($selects[i].attr('data-id'), true);
			};
			saveRoom();
			
			close();
		});
		$btnNo.on('click', function(){
			close();
		});
		
		$screen.append($popup);
		
		function close(){
			$btnNo.off();
			$btnYes.off();
			$popup.remove();
		};
	};
	
	/*==============================*/
	
	/**
	 * 데이터 보내기
	 */
	function sandDatas(obj){
		if(mCB) mCB(obj);
	};
	/**
	 * 데이터 저장하기 
	 */
	function saveRoom(empty){
		if(!empty){
			
			var str='';
			
			if(mLoadRoom){
				
				var obj;
				
				for(var i=0; i<mLoadRoom.length; i++){
					obj=mLoadRoom[i];
					if(obj){
						if(str!='') str+='⊙';
						
						if(obj.mode=='room'){
							str+='id◈'+obj.id;
							str+='▣mode◈'+obj.mode;
						}else{
							str+='lesson◈'+obj.lesson;
							str+='▣id◈'+obj.id;
							str+='▣mode◈'+obj.mode;
							str+='▣icon◈'+obj.icon;
							str+='▣title◈'+obj.title;
							str+='▣src◈'+obj.src;
						};
					};
				};
			};
			
			/* 준비된 내 자료가 있을 경우 사용
			var arr=[],str='';
			var $items=$mRoom.querySelectorAll('[data-room]');
			UTIL.forIn($items,function($i, idx){
				
				var mode=$i.attr('data-room');
				var id=$i.attr('data-id');
				
				var obj=UTIL.find.arrayToID(mLoadRoom, id);
				if(obj){
					if(str!='') str+='⊙';
					
					if(obj.mode=='room'){
						str+='id◈'+obj.id;
						str+='▣mode◈'+obj.mode;
					}else{
						str+='chapter◈'+obj.chapter;
						str+='▣id◈'+obj.id;
						str+='▣mode◈'+obj.mode;
						str+='▣icon◈'+obj.icon;
						str+='▣title◈'+obj.title;
						str+='▣src◈'+obj.src;
					};
					arr.push(obj);
				};
			});
			mLoadRoom=arr;
			*/
			
			
			EXE.saveValue(mRoomID, str);
		}else{
			EXE.saveValue(mRoomID, '');
		};
	};
	/**
	 * 데이터 불러오기 
	 */
	function loadRoom(){
		var loadTxt=EXE.loadValue(mRoomID);
		/*
		loadTxt='mode◈room▣id◈1';
		loadTxt+='⊙mode◈room▣id◈2';
		loadTxt+='⊙mode◈load▣id◈1222▣icon◈web▣title◈네이버▣src◈https://naver.com';
		*/
		var returnArr;
		
		if(loadTxt){
			
			returnArr=[];
			
			var groupArr=loadTxt.split('⊙');
			UTIL.forIn(groupArr,function(gTxt,idx){
				/*데이터 가공*/
				var obj={};
				var dataArr=gTxt.split('▣');
				
				UTIL.forIn(dataArr,function(data,idx){
					var v=data.split('◈');
					obj[v[0]]=v[1];
				});
				/*기존 데이터에서 찾기*/
				if(obj.mode=='room'){
					obj=UTIL.find.arrayToID(mOrigin, obj.id);
				};
				if(obj){
					/*데이터 저장*/
					returnArr.push(obj);
				};
				
			});	
		};
		
		return returnArr;
	};
};