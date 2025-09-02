/*<홈 화면>*/
DEV=(function(){
	
	var mPath='../../com/datas/groups/';
	
	var mIsContent=false;
	
	var mOriginInfo, mOriginStep, mOriginRoom;
	var mStepList;
	var mStepIdx;
	
	
	/*======================*/
	/* 데이터 로드 */
	/*======================*/
	
	/**
	 *저장 데이터 불러오기 
	 */
	function startPopup(depths, page){
		USER.depths=depths;
		USER.page=page;
		
		console.log(depths, page);
		
		/*불러올 파일 위치 설정*/				
		var src=mPath+(depths[0]+1)+'-'+(depths[1]+1)+'-'+(depths[2]+1)+'.js';
		
		/*파일 불러오기*/
		UTIL.load.js(src,function(){
			
			if(DATAS.group){
				
				/*기존 리스트 데이터*/
				mOriginInfo=DATAS.group.info;
				mOriginStep=DATAS.group.step;
				
				/*불러온 리스트 데이터*/
				if(USER.from==USER.id.step){
					mStepList=loadDatas();	
					if(!mStepList) mStepList=mOriginStep;
				}else{
					mStepList=mOriginStep;
				};
				
				/*화면 불러오기*/
				makePopupView();
			};
		});
		/**
		 * 저장된 데이터 로드 
		 */
		function loadDatas(){
			/*저장된 ID*/
			var regist=USER.project+'.'+USER.id.step;
			regist+='.'+(USER.depths[0]+1)+'-'+(USER.depths[1]+1)+'-'+(USER.depths[2]+1)+'.step';
			
			/*저장 데이터 스트링*/
			var loadTxt=EXE.loadValue(regist);
			/*리턴 배열*/
			var returnArr;
			
			if(loadTxt){
			
				returnArr=[];
				
				/*데이터 오브젝트로 가공*/
				var groupArr=loadTxt.split('⊙');
				UTIL.forIn(groupArr,function(gTxt,idx){
						
					/*데이터 가공*/
					var obj={},infoID,infoState;
					var dataArr=gTxt.split('▣');
					UTIL.forIn(dataArr,function(data,idx){
						var v=data.split('◈');
						obj[v[0]]=v[1];
					});
					
					/*기존 데이터에서 찾기*/
					if(obj.mode=='step'){
						
						infoID=obj.info;
						infoState=obj.state;
					
						obj=UTIL.find.arrayToID(mOriginStep, obj.id);
						/*타이틀 정보 ID 설정*/
						if(infoID) obj.info=infoID;
						obj.state=infoState;
					};
					if(obj&&obj.state!='disabled'){
						/*데이터 저장*/
						returnArr.push(obj);
					};
				});	
			};
			
			return returnArr;
		};
	};
	
	/**
	 * 팝업화면 만들기
	 */
	function makePopupView(){
		clearPlugins();
		/*화면 불러오기*/
		changeContent();
		/*목차 만들기*/
		makeIndex();
		/*이벤트 시작하기*/
		startTools();
	};
	
	/*======================*/
	/* 화면 변경하기 */
	/*======================*/
	/**
	 * 화면 변경하기 
	 */
	function changeContent(){
		if(mIsContent) return;
		mIsContent=true;
		
		if(!USER.group) USER.group = 1;
		
		var datas=getIndexObjectID(USER.group);
		if(!datas) return;
		
		var _sc=document.querySelector('#screen');
		_sc.attr('data-lesson',USER.depths[0]+1);
		
		/*컨텐츠 정보*/
		var lessonObj=DATAS.index[USER.depths[0]];
		if(lessonObj){
			var chapterObj=lessonObj.list[USER.depths[1]];
			if(chapterObj){
				var stepObj=chapterObj.list[USER.depths[2]];
				if(stepObj){
					document.querySelector('#subject').innerHTML='<p class="title"><span class="step">'+stepObj.icon+'</span> <span class="title">'+stepObj.title+'</span></p>'
					+'<p data-type="'+datas.icon+'"><span>'+datas.icon+'</span></p>';
				};
			};
		};
		
		/*페이지*/
		var $page=document.querySelector('#ebook');
		$page.attr('data-page', datas.page);
		$page.query('.page').text(datas.page);
		
		
		var src='../popup-view/'+datas.target+'/index.html';
		/*객체*/
		var $body=document.querySelector('#body');
		
		/*iframe 추가하기 */
		var $ifr=document.createElement("iframe");
		$ifr.css('opacity',0);
		
		unload();
		
		/*iframe 로드 완료 확인*/
		UTIL.iframe.load($ifr, src, function($ifr){
			UTIL.iframe.unselectRemove($body, $ifr.attr('name'));
			
			UTIL.message.iframe($ifr,{
				messageMode:'popup',
				messageType:'init',
				datas:datas/*end*/
			});
			$ifr.css('opacity',1);
			/*플러그인 정보 교체*/
			changePlugins();
			
			mIsContent=false;
		});
		
		$body.append($ifr);
	};
	
	function unload(){
		var $re=UTIL.query('iframe',true);
		if($re){
			UTIL.forIn($re,function(c1){
				UTIL.message.iframe(c1,{
					messageMode:'popup',
					messageType:'unload'/*end*/
				});
			});
		};
	};
	
	function changeContentTooltip(type){
		if(type){
			
		};
	};
	
	/*======================*/
	/* 목차 리스트 만들기 */
	/*======================*/
	
	/**
	 * 메뉴 설정하기 
	 */
	function makeIndex(){
		/*
		mOriginInfo
		mOriginStep
		mStepList
		*/
		var $IQ=document.querySelector('#quick-list');
		var $IL=document.querySelector('#index-list');
		
		$IQ.empty();
		$IL.empty();
		
		var i=0, lens=mStepList.length, obj;
		var id, $d_1, $list;
		
		for(i; i<lens; i++){
			
			obj=mStepList[i];
			
			if(id!==obj.info){
				addQuickMenu(obj.info);
				$d_1=addDepth1(obj.info);
				$IL.append($d_1);
				$list=$d_1.queryDirect('.list');
			};
			
			addDepth2($list, obj);
			
			id=obj.info;
		};
		
		changeIndexSelect();
		
		function addQuickMenu(id){
			
			var obj=mOriginInfo[id];
			if(obj){
				var $div=document.createElement('div');
					$div.attr('data-id', id);
				var $p=document.createElement('p');
					$p.text(obj.title);
					
				$div.append($p);
				$IQ.append($div);
				
				$div.on('click',function(){
					
					var obj=getIndexObjectInfo(this.attr('data-id'));
					if(obj){
						USER.group=obj.id;
					
						changeIndexSelect();
						changeContent();
					};
				});
			};
		};
		
		function addDepth1(id){
			
			var obj=mOriginInfo[id];
			
			var $div=document.createElement('div');
				$div.addClass('d-1');
			if(obj){
				$div.attr('data-id',obj.id);
				
				var $p=document.createElement('p');
				$p.addClass('title');
				$div.append($p);
				
				if(obj.title){
					$p.attr('data-type',obj.title);
					var $title=document.createElement('span');
					$title.text(obj.title);
					$p.append($title);
				};
			};
			
			var $list=document.createElement('div');
				$list.addClass('list');
			$div.append($list);
			
			return $div;
		};
		
		function addDepth2($list, obj){
			
			var $div=document.createElement('div');
				$div.addClass('d-2');
				
			if(obj){
				$div.attr('data-id',obj.id);
				
				var $p=document.createElement('div');
				$p.addClass('title');
				$div.append($p);
				
				if(obj.icon){
					var $icon=document.createElement('p');
					$icon.attr('data-icon',obj.icon);
					$icon.text('['+obj.icon+']');
					$p.append($icon);
				};
				
				if(obj.title){
					var $title=document.createElement('p');
					$title.addClass('note');
					$title.text(obj.title);
					$p.append($title);
				};
			};
			
			$div.on('click', function(){
				UTIL.change.showHide(document.querySelector('#index-view'), false);
				
				USER.group=this.attr('data-id');
				changeIndexSelect();
				changeContent();
			});
			
			$list.append($div);
		};
	};
	
	function changeIndexSelect(){
		
		var $IL=document.querySelector('#index-list');
		var $IQ=document.querySelector('#quick-list');
		var $re,$se;
		
		$re=$IL.querySelector('.d-2[data-id].on');
		if($re){
			$re.removeClass('on');
		};
		$se=$IL.querySelector('.d-2[data-id="'+USER.group+'"]');
		if($se){
			$se.addClass('on');
		};
		
		var obj=getIndexObjectID(USER.group);
		if(obj){
			var info=obj.info;
			$re=$IQ.querySelector('[data-id].on');
			if($re){
				$re.removeClass('on');
			};
			$se=$IQ.querySelector('[data-id="'+info+'"]');
			if($se){
				$se.addClass('on');
			};
		};
		
		if(mStepIdx<=0){
			mStepIdx=0;
			document.querySelector('[data-btn="prev"]').addClass('disabled');
			document.querySelector('[data-btn="next"]').removeClass('disabled');
		}else if(mStepIdx>=mStepList.length-1){
			mStepIdx=mStepList.length-1;
			document.querySelector('[data-btn="prev"]').removeClass('disabled');
			document.querySelector('[data-btn="next"]').addClass('disabled');
		}else{
			document.querySelector('[data-btn="prev"]').removeClass('disabled');
			document.querySelector('[data-btn="next"]').removeClass('disabled');
		};
		
		document.querySelector('#content-info>.current').text(mStepIdx+1);
		document.querySelector('#content-info>.total').text(mStepList.length);
		
		UTIL.change.showHide(document.querySelector('#index-view'), false);
	};
	
	function getIndexObjectID(id){
		
		var i=0, lens=mStepList.length, obj;
		for(i; i<lens; i++){
			obj=mStepList[i];
			if(id==obj.id){
				mStepIdx=i;
				return obj;
			};
		};
		return null;
	};
	function getIndexObjectInfo(info){
		
		var i=0, lens=mStepList.length, obj;
		for(i; i<lens; i++){
			obj=mStepList[i];
			if(info==obj.info){
				return obj;
			};
		};
		return null;
	};
	
	/*======================*/
	/* 툴 기능 */
	/*======================*/
	/**
	 * 툴 기능 활성화 
	 */
	function startTools(){
		
		/*버튼 이벤트 주기*/
		document.querySelectorAll('[data-btn]').on('click',function(){
			
			switch(this.attr('data-btn')){
				
				case 'fileroom':
					unload();
					USER.sandParent(USER.id.fileroom);
				break;
				case 'home':
					unload();
					USER.sandParent(USER.id.home);
				break;
				case 'close':
					unload();
					var $page=document.querySelector('#ebook');
					var page=$page.attr('data-page');
					if(page) USER.page=parseInt(page);
					USER.sandParent(USER.from);
				break;
				case 'step':
					unload();
					USER.sandParent(USER.id.step);
				break;
				case 'save':
					saveMyClass();
					/**PLUGINS.open('save');*/
				break;
				
				case 'index':
				case 'index-close':
					UTIL.change.showHide(document.querySelector('#index-view'));
				break;
				
				case 'study':
				case 'study-close':
					UTIL.change.showHide(document.querySelector('#study-tools'));
				break;
				
				case 'prev':
					prevNext(-1);
				break;
				case 'next':
					prevNext(1);
				break;
				/*
				case 'close':
					USER.sandParent(USER.from);
				break;
				*/
			};
		});
		
		document.querySelector('#index-view').on('click',function(){
			UTIL.change.showHide(document.querySelector('#index-view'));
		});
		
		document.querySelector('#index-list').on('click',function(){
			event.preventDefault();
			event.stopPropagation();
			return false;
		});
	};
	
	function prevNext(add){
		
		mStepIdx+=add;
		
		if(mStepIdx<0){
			mStepIdx=0;
			return;
		}else if(mStepIdx>mStepList.length-1){
			mStepIdx=mStepList.length-1;
			return;
		};
		
		USER.group=mStepList[mStepIdx].id;
		
		changeIndexSelect();
		changeContent();
	};
	
	function saveMyClass(){
		var depths=(USER.depths[0])+'-'+(USER.depths[1])+'-'+(USER.depths[2])+'◈'+USER.group;
		/*저장된 ID*/
		var regist=USER.project+'.'+USER.class+'.study-progress';
		EXE.saveValue(regist, depths);
		
		alert('진도가 저장되었습니다.');
	};
	
	/*======================*/
	/* 플러그 인*/
	/*======================*/
	
	function changePlugins(){
		
		PLUGINS.change('content',{
			type:USER.mode,
			depths:USER.depths,
			group:USER.group/*end*/
		});
		
	};
	function clearPlugins(){
		
		PLUGINS.change('clear');
		
	};
	function startPlugins(){
		
		/*플러그인 기능 시작하기*/
		PLUGINS.start(
			document.querySelector('#screen'),
			function(type,datas){
				switch(type){
					case 'btns':
					break;
					case 'plugin':
						pluginEvents(datas);
					break;
				};
			}/*end*/
		);
		function pluginEvents(datas){
			switch(datas.messageMode){
				case 'gotoContent':
					TURN.gotoPage(datas);
				break;
			};
		};
	};
return{
	ready:function(){
		/*파일 초기 위치 조정*/
		EXE.root('../../', 'contents');
		EXE.appType(USER.appType,'');
		/*사용자 데이터 초기화*/
		USER.init(USER.id.popup);
		
		/*데이터 전달 받기*/
		UTIL.message.listener(function(event){
			var obj=event.data;
			if(obj){
				switch(obj.messageType){
					
				};
			};
		});
	},
	load:function(){
		/*플러그인*/
		startPlugins();
		/*상단 인덱스 네비 설정*/
		startPopup(USER.depths, USER.page);
	},
	unload:function(){}
};
}()); UTIL.init(DEV);
