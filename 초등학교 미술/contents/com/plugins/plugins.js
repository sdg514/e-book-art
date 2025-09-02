
PLUGINS=(function(){
	
	var mList={
		attention:	{type:'attention', 	mode:"", 	title:'주의 집중', 	display:'full',   x: 'c', y:'c'},
		blackboard:	{type:'blackboard', mode:"", 	title:'칠판', 	display:'full',   x: 'c', y:'c'},
		blind:		{type:'blind', 		mode:"", 	title:'가림막', 	display:'full',   x: 'c', y:'c'},
		bookmark:	{type:'bookmark', 	mode:"", 	title:'북마크', 	display:'normal', x: 'c', y:'c'},
		drawing:	{type:'drawing', 	mode:"", 	title:'그리기', 	display:'custom', x: 'c', y:'c'},
		glass:		{type:'glass', 		mode:"", 	title:'돋보기', 	display:'js', 	  x: 195, y:0},
		groups:		{type:'groups', 	mode:"", 	title:'모둠 활동판',	display:'full',   x: 'c', y:'c'},
		help:		{type:'help', 		mode:"", 	title:'도움말', 	display:'full',   x: 'c', y:'c'},
		helpHome:	{type:'helpHome', 	mode:"", 	title:'도움말', 	display:'full',   x: 'c', y:'c'},
		index:		{type:'index', 		mode:"", 	title:'목차', 	display:'normal', x: 423, y:120},
		link:		{type:'link', 		mode:"zoom",title:'링크', 	display:'normal', x: 'c', y:'c'},
		memo:		{type:'memo', 		mode:"zoom",title:'메모', 	display:'normal', x: 'c', y:'c'},
		mic:		{type:'mic', 		mode:"zoom",title:'녹음', 	display:'normal', x: 'c', y:'c'},
		pick:		{type:'pick', 		mode:"", 	title:'뽑기', 	display:'full',   x: 'c', y:'c'},
		print:		{type:'print', 		mode:"", 	title:'프린트', 	display:'normal', x: 'c', y:'c'},
		search:		{type:'search', 	mode:"", 	title:'검색', 	display:'normal', x: 'c', y:'c'},
		screenshot:	{type:'screenshot', mode:"", 	title:'화면 캡쳐', 	display:'custom', x: 'c', y:'c'},
		timer:		{type:'timer', 		mode:"", 	title:'타이머', 	display:'full',   x: 'c', y:'c'},
		thumbs:		{type:'thumbs', 	mode:"hori",title:'썸네일', 	display:'custom', x: 284, y:693},
		step:		{type:'step', 		mode:"", 	title:'학습 목차', 	display:'normal', x: 195, y:40},
		save:		{type:'save', 		mode:"", 	title:'저장하기', 	display:'full',   x: 'c', y:'c'},
		load:		{type:'load', 		mode:"", 	title:'불러오기', 	display:'full',   x: 'c', y:'c'}
	};
	
	var mRegistID;
	var mSize={w:1920,h:1080};
	var mCallback;
	var $mPluginView;
	var mIsHide=false;
	/**==================
	 * 플러그인 추가하기
	 ====================*/
	function addPlugin(type, id){
		
		switch(type){
			case 'zoom':
				if(typeof TURN!='undefined'){
					TURN.zoomSwitch();
				};
			break;
			case 'zoom-in':
				if(typeof TURN!='undefined'){
					TURN.zoomIn();
				};
			break;
			case 'zoom-out':
				if(typeof TURN!='undefined'){
					TURN.zoomOut();
				};
			break;
			case 'link':
			case 'memo':
			case 'mic':
				if(!mIsHide){
					PLUGIN.getItem(mList[type], id, $mPluginView);
				};
			break;
			case 'glass':
				if(!mIsHide){
					/*미리 불러온 플러그인이 있을 경우 실행 취소*/
					if(!document.querySelector('[data-plugin="'+type+'"]')){
						PLUGIN.getItem(mList[type], id, $mPluginView);
					}else{
						PLUGIN.remove(type);
					};
				};
			break;
			case 'blackboard':
			case 'pick':
			case 'timer':
			case 'attention':
			default:
				/*미리 불러온 플러그인이 있을 경우 실행 취소*/
				if(!document.querySelector('[data-plugin="'+type+'"]')){
					PLUGIN.getItem(mList[type], id, $mPluginView);
				}else{
					PLUGIN.remove(type);
				};
			break;
		};
	};
	
	/**==================
	 * 플러그인 설정하기
	 ====================*/
	function pluginsInit($target, cb){
		if(!$target) return;
		mCallback=cb;
		
		mRegistID=USER.project+'.'+USER.mode+'.'+USER.class;
		/*플러그인 뷰 등록*/
		$mPluginView=document.querySelector('#plugins');
		if(!$mPluginView){
			$mPluginView=document.createElement('div');
			$mPluginView.id='plugins';
			$target.append($mPluginView);
		};
		/*플러그인 화면 크기*/
		mSize.w=$target.offsetWidth;
		mSize.h=$target.offsetHeight;
	};
	
	/**
	 * 플러그인 시작하기 
	 */
	function pluginsStart(){
		
		/*플러그인 기본 셋팅*/
		PLUGIN.init(mRegistID, mSize, function(datas){
			if(mCallback) mCallback('plugin',datas);
		});
		
		/*돋보기 기능 활성화*/
		if(typeof P_GLASS!='undefined'){
			P_GLASS.init(document.querySelector('#ebook'),mSize);
		};
		
		/*이벤트 등록*/
		document.querySelectorAll('[data-btn-plugin]').on(
			'click', 
			function($e, idx){
				/*플러그인 타입*/
				var type=this.attr('data-btn-plugin');
				/*플러그인 추가하기*/
				addPlugin(type);
				/*플러그인 이벤트 전달*/
				if(mCallback) mCallback('btns',type);
			}/*end*/
		);
	};
	/**
	 * 플러그인 화면에서 지우기 
	 */
	function pluginsClear(){
		
		PLUGIN_LIST.clear();
		
		/*돋보기 기능 닫기*/
		if(typeof P_GLASS!='undefined'){
			P_GLASS.hide();
		};
	};
	/**
	 * 플러그인 변경 적용하기 
	 */
	function pluginsChange(datas){
		if(!datas) return;
		
		var sandDatas={
			messageType:'plugin',
			messageMode:'change',
			messageState:'pages'/*end*/
		};
		/*페이지 정보*/
		var pages=datas.pages;
		if(pages) sandDatas.pages=pages;
		var depths=datas.depths;
		if(depths) sandDatas.depths=depths;
		var group=datas.group;
		if(group) sandDatas.group=group;
		
		/*변경된 페이지 정보 보내기*/
		var $pluginItems=document.querySelectorAll('[data-plugin] iframe');
		UTIL.forIn($pluginItems,function($ifr,idx){
			UTIL.message.iframe($ifr, sandDatas);
		});
		
		/*변경할 대상 ID값 설정*/
		var pID='';
		switch(datas.type){
			case 'ebook':
				if(pages){
					if(pages[0]) pID=pages[0];
					if(pID!='') pID+='-';
					if(pages[1]) pID+=pages[1];
				};
			break;
			case 'step':
				pID=depths.join('-');
			break;
			case 'popup':
				pID=depths.join('-')+'.'+group;
			break;
		};
		
		PLUGIN_LIST.load(
			mRegistID+'.'+pID,
			function(pDatas){
				if(pDatas){
					switch(pDatas.mode){
						case 'load':
							UTIL.forIn(pDatas.list, function(id,idx){
								PLUGIN.getItem(mList[pDatas.type], id, $mPluginView);
							});
						break;
					};
				};
			}/*end*/
		);
		
		/*돋보기 기능 열기*/
		if(typeof P_GLASS!='undefined'){
			P_GLASS.change(pages).show();
		};
	};
	
	/**
	 * 플러그인 화면에서 지우기 
	 */
	function pluginsShow(){
		
		PLUGIN_LIST.show();
		
		/*돋보기 기능 닫기*/
		if(typeof P_GLASS!='undefined'){
			P_GLASS.show();
		};
	};
	/**
	 * 플러그인 화면에서 지우기 
	 */
	function pluginsHide(){
		
		PLUGIN_LIST.hide();
		
		/*돋보기 기능 닫기*/
		if(typeof P_GLASS!='undefined'){
			P_GLASS.hide();
		};
	};
	
return{
	list:mList,
	start:function($target, callback){
		if(!$target) return;
		/*효과음 주소 위치 변경*/
		EFFECT.path('../../files/effects/');
		/*플러그인 초기설정*/
		pluginsInit($target, callback);
		/*플러그인 시작하기*/
		pluginsStart();
	},
	open:function(type){
		/*플러그인 추가하기*/
		addPlugin(type);
	},
	close:function(type){
		/*플러그인 삭제하기*/
		PLUGIN.remove(type);
	},
	change:function(type, obj){
		switch(type){
			case 'clear':
			case 'flip':
				pluginsClear();
			break;
			case 'content':
			case 'pages':
				pluginsChange(obj);
			break;
			case 'show':
				mIsHide=false;
				pluginsShow();
			break;
			case 'hide':
				mIsHide=true;
				pluginsHide();
			break;
		};
	}/*end*/
};
}());

/**
 * 플래그인 
 */
PLUGIN=(function(){
	/*저장 위치*/
	var mRegistID;
	var mCallBack, mSize;
	var mExeObj;
	/*플러그인 메시지 전달 함수*/
	UTIL.message.listener(function(e){
		var ms=e.data;
		if(!ms) return;
		if(ms.messageType=='plugin'){
			
			switch(ms.messageMode){
				case 'resize':
					var $plugin=document.querySelector('[data-plugin][data-id="'+ms.id+'"]');
					var $iframe=$plugin.querySelector('iframe');
					
					if($iframe){
						
						if(ms.x=='c') ms.x=(mSize.w-ms.w)/2;
						if(ms.y=='c') ms.y=(mSize.h-ms.h)/2;
						
						if(ms.display=='normal'){
							$plugin.css({left:ms.x+'px',top:ms.y+'px'});
							$iframe.css({width:ms.w+'px',height:ms.h+'px'});
						}else if(ms.display=='custom'){
							$plugin.css({left:ms.x+'px',top:ms.y+'px'});
							$iframe.css({width:ms.w+'px',height:ms.h+'px'});
						}else{
							$iframe.css({width:ms.w+'px',height:ms.h+'px',left:ms.x+'px',top:ms.y+'px'});
						};
					};
					$plugin.css('opacity',1);
				break;
				case 'event':
					if(ms.type=='link'){
						addLink(ms);
					};
				break;
				case 'close':
					PLUGIN.remove(ms.id);
				break;
				case 'gotoPage':
				case 'effect':
				default:
					if(mCallBack) mCallBack(ms);
				break;
			};
		}else if(ms.messageType=='exe'&&ms.messageMode=='plugin'){
			
			switch(ms.type){
				case 'link':
					if(mExeObj){
						if(mExeObj.iframe){
							
							UTIL.message.iframe(mExeObj.iframe,{
								messageType:'plugin', 
								messageMode:'url', 
								url:ms.result/*end*/ 
							});
						};
						mExeObj=null;
					};
				break;
				case 'fileSearch':
					var $iframe=document.querySelector('[data-plugin][data-id="'+ms.id+'"] iframe');
					if($iframe) mExeObj={iframe:$iframe};
					EXE.searchFile('onExeStepPluginLink');
				break;
			};
		};
	});
	
	function addLink(ms){
		
		var $plugin=document.querySelector('[data-plugin][data-id="'+ms.id+'"]');
		if(ms.url){
			$plugin.attr('data-mode', ms.mode).attr('data-src', ms.url);
			
			var $title=$plugin.querySelector('.head>.title');
			
			var $link=$title.querySelector('.icon');
			if(!$link){
				$link=document.createElement('span');
				$link.addClass('icon');
				$title.append($link);
			};
			
			if(ms.thumb){
				$link.css('background-image','url("'+ms.thumb+'")');
			};
			
			if(ms.title){
				var $tooltip=$title.querySelector('.tooltip');
				if(!$tooltip){
					$tooltip=document.createElement('span');
					$tooltip.addClass('tooltip');
					$title.append($tooltip);
				};
				$tooltip.text(ms.title);
			};
		};
		
		PLUGIN.zoom(ms.id, true);
	};
	function removeLink($plugin){
		$plugin.removeAttr('data-mode').removeAttr('data-src');
		$plugin.querySelectorAll('.head>.title>*').remove();
	};
	
return{
	/**
	 * 초기 데이터 설정하기 
	 */
	init:function(regist,size,cb){
		mRegistID=regist;
		mSize=size;
		mCallBack=cb;
	},
	/**
	 * 아이템 삭제하기 
	 */
	remove:function(tgt,isRemove){
		EFFECT.play('click');
		
		var $plugin,id;
		if(typeof tgt=='string'){
			$plugin=document.querySelector('[data-plugin][data-id="'+tgt+'"]');
			id=tgt;
		}else{
			$plugin=tgt;
			id=$plugin.attr('data-id');
		};
		/*전체 화면 상태 제거하기*/
		if($plugin.hasClass('full')){
			$plugin.parentNode.removeClass('full');
		};
		/*플러그인 지우기*/
		if($plugin) $plugin.remove();
		/*데이터 지우기*/
		if(isRemove) removePluginInfo(id);
	},
	/**
	 * 보이게 하기 
	 */
	show:function(tgt){
		if(typeof tgt=='string'){
			var $plugin=document.querySelector('[data-plugin][data-id="'+tgt+'"]');
			if($plugin) $plugin.show();
		}else{
			if(tgt) tgt.show();
		};
	},
	/**
	 * 숨기기
	 */
	hide:function(tgt){
		if(typeof tgt=='string'){
			var $plugin=document.querySelector('[data-plugin][data-id="'+tgt+'"]');
			if($plugin) $plugin.hide();
		}else{
			if(tgt) tgt.hide();
		};
	},
	/**
	 * 확대 축소하기 
	 */
	zoom:function(id, is, pass){
		
		var $plugin=document.querySelector('[data-plugin][data-id="'+id+'"]');
		if(!$plugin) return;
		
		var $iframe=$plugin.querySelector('iframe');
		var $zoom=$plugin.querySelector('.btn-zoom');
		var info=$plugin.pluginInfo;
		
		if(is){
			$plugin.addClass('zoom');
			info.state='hide';
			
			switch(info.type){
				case 'link':
					$iframe.hide();
					$plugin.css({width:110+'px'});
				break;
				case 'memo':
				case 'mic':
				default:
					$iframe.hide();
					$plugin.css({width:110+'px'});
				break;
			};
		}else{
			$plugin.removeClass('zoom');
			info.state='show';
			
			switch(info.type){
				case 'link':
					$iframe.show();
					$plugin.css({width:'auto',height:'auto'});
					removeLink($plugin);
				break;
				case 'memo':
				case 'mic':
				default:
					$iframe.show();
					$plugin.css({width:'auto',height:'auto'});
				break;
			};
		};
		
		if(!pass&&info) savePluginInfo(info.id,info);
	},
	/**
	 * 데이터 보내기 
	 */
	sandDatas:function(tgt, datas){
		if(typeof tgt=='string'){
			var $ifr=document.querySelector('[data-plugin][data-id="'+tgt+'"] iframe');
			if($ifr) UTIL.message.iframe($ifr, datas);
		}else{
			if(tgt) UTIL.message.iframe(tgt, datas);
		};
	},
	/**
	 * 플러그인 아이템 가져오기 
	 */
	getItem:function(datas, id, $tgt){
		if(!datas) return;
		
		/*플러그인 모든 정보 데이터*/
		var info=getInfo(datas, id);
		/*같은 플러그인이 있을 경우 종료*/
		if(document.querySelector('[data-plugin][data-id="'+info.id+'"]')){
			return;
		};
		/*플러그인 생성*/
		var $plugin=document.createElement('div');
		$plugin.pluginInfo=info;
		if($tgt) $tgt.append($plugin);
		$plugin.attr('data-plugin',info.type)
			   .attr('data-id',info.id)
			   .addClass(info.display)
			   .css({position:'absolute','opacity':0,'z-index':info.z});
		
		/*자바스크립트로 만들기*/
		if(info.display=='js'){
			
			var fnStr=info.type.toUpperCase();
			var $fn=eval('P_'+fnStr);
			$fn.start($plugin, info);
			
			if(info.x=='c') info.x=(mSize.w-$plugin.offsetWidth)/2;
			if(info.y=='c') info.y=(mSize.h-$plugin.offsetHeight)/2;
			
			$plugin.css({
				left:info.x+'px',
				top:info.y+'px',
				opacity:1
			});
			
			return $plugin;
		}; 
		
		/*불어올 대상 iframe 만들기*/
		var $iframe=document.createElement('iframe');
		$plugin.append($iframe);
		
		/*이동 가능 플러그인 초기 셋팅*/
		if(info.display=='full'){
			$tgt.addClass('full');
		}else if(info.display=='normal'){/*이동 가능 플러그인 초기 셋팅*/
			
			/*이동제한 변수*/
			var minY,maxY;
			
			/*상단 해더*/
			var $head=document.createElement('div');
			$head.addClass('head');
			$plugin.prepend($head);
			/*제목*/
			var $title=document.createElement('p');
			$title.addClass('title');
			$title.text(info.title);
			$head.append($title);
			/*플러그인 이동 기능 추가*/
			var $fnDrag=$FN.Drag($title,{target:$plugin, zIndex:true});
			$fnDrag.start(function(e){
				var $drag=e.target;
				switch(e.type){
					case 'down':
						$plugin.addClass('drag-down');
						/*이동 제한*/
						minY=0;
						maxY=mSize.h-parseInt($head.offsetHeight);
					break;
					case 'move':
						var dX=parseInt($drag.css('left'));
						var dY=parseInt($drag.css('top'));
						if(dY<minY){
							dY=minY;
							$drag.css('top',minY+'px');
						}else if(dY>maxY){
							dY=maxY;
							$drag.css('top',maxY+'px');
						};
						info.x=dX;
						info.y=dY;
					break;
					case 'up':
						info.x=parseInt($drag.css('left'));
						info.y=parseInt($drag.css('top'));
						info.z=$drag.css('z-index');
						
						UTIL.message.iframe($iframe,{
							messageType:'plugin',
							messageMode:'position',
							x:info.x,
							y:info.y,
							z:info.z/*end*/
						});
						
						savePluginInfo(info.id, info);
						
						$plugin.removeClass('drag-down');
					break;
					case 'click':
						if(info.type=='link'){
							var mode=$plugin.attr('data-mode');
							var src=$plugin.attr('data-src');
							if(mode&&src){
								switch(mode){
									case 'url':
										EXE.openWeb(src);
									break;
									case 'file':
										EXE.openFile(src,true);
									break;
								};
							};
						};
					break;
				};
			});
			
			/*줌 버튼*/
			if(info.mode=='zoom'){
				/*줌 버튼*/
				var $zoom=document.createElement('div');
				$zoom.addClass('btn-zoom');
				$zoom.on('click',function(){
					EFFECT.play('open');
					
					/*줌 변경하기*/
					var is=!$plugin.hasClass('zoom');
					/*플러그인 데이터 전달*/
					info.messageMode='zoom';
					info.zoom=is;
					UTIL.message.iframe($iframe, info);
					PLUGIN.zoom(info.id, is);
					
					return false;
				});
				$head.append($zoom);
			};
			/*닫기 버튼*/
			var $close=document.createElement('div');
			$close.addClass('btn-close');
			$close.on('click',function(){
				
				switch(info.type){
					case 'link':
					case 'memo':
					case 'mic':
						PLUGIN.remove(info.id);
						PLUGIN_LIST.remove(info.type, info.id);
					break;
					default:
						PLUGIN.remove(info.id);
					break;
				};
				
				return false;
			});
			$head.append($close);
			
			if($zoom&&info.state=='hide'){
				PLUGIN.zoom(info.id, true, true);
			};
		};
		/*플러그인 불러오기*/
		$iframe.on('load',function(){
			/*플러그인 데이터 전달*/
			UTIL.message.iframe($iframe, info);
		});
		/*불러오기*/
		$iframe.attr({
			mozallowfullscreen:'allowfullscreen',
			webkitallowfullscreen:'allowfullscreen',
			allowtransparency:'allowfullscreen',
			allowfullscreen:'allowfullscreen',
			src:'../../com/plugins/'+info.type+'/'+info.type+'.html'
		});
		
		return $plugin;
	},
	saveInfo:savePluginInfo/*end*/
};
	/*저장된 위치 불러오기*/
	function getInfo(datas, id){
		/*프로젝트 데이터*/
		var info={
			messageType:'plugin',
			messageMode:'load',
			project:USER.project,
			from:USER.mode,
			class:USER.class,
			page:USER.page,
			depths:USER.depths,
			group:USER.group/*end*/
		};
		
		/*기본 데이터*/
		if(id) info.id=id;
		else info.id=datas.type;
		info.type=datas.type;
		info.mode=datas.mode;
		info.regist=mRegistID;
		info.x=datas.x;
		info.y=datas.y;
		info.z=0;
		info.type=datas.type;
		info.display=datas.display;
		info.title=datas.title;
		info.state='';
		
		/*저장된 데이터 불러오기*/
		var r=EXE.loadValue(mRegistID+'.plugins.'+info.id);
		if(r){
			var arr=r.split('◈');
			if(arr.length==5){
				info.id=arr[0];
				info.x=arr[1];
				info.y=arr[2];
				info.z=parseInt(arr[3]);
				info.state=arr[4];
				/*위치 상수로 변경*/
				if(info.x!='c'){
					info.x=parseInt(info.x);
				};
				if(info.y!='c'){
					info.y=parseInt(info.y);
					/*위치 제한 걸기*/
					if(info.y<0) info.y=0;
					else if(info.y>mSize.h-30) info.y=mSize.h-30;
				};
			};
			info.z=parseInt(info.z);
			if(info.z>200){
				info.z-=100;
			};
		};
		
		/*zindex 설정이 없을 경우 최상위로 */
		if(!id||info.z==0){
			info.z=UTIL.get.highDepths(document.querySelector('#plugins'));
		};
		
		/*외부 데이터*/
		if(typeof TURN!='undefined'){
			info.pages=TURN.getPages();
		};
		switch(info.type){
			case 'link':
			case 'memo':
			case 'mic':
				if(!id){
					info.id+='_'+UTIL.get.time();
					PLUGIN_LIST.add(info.type, info.id);
				};
			break;
			case 'thumbs':
			case 'print':
				if(typeof TURN!='undefined'){
					info.pageList=TURN.getList();
				};
			break;
			case 'search':
				var $search=document.querySelector('#plugin-search-text');
				if($search) info.search=$search.value;
			break;
		};
		
		/*초기 데이터 저장하기*/
		savePluginInfo(info.id, info);
		
		return info;
	};
	/*플러그인 기본 정보 저장하기*/
	function savePluginInfo(id, info){
		var str='';
		if(info) str=info.id+'◈'+info.x+'◈'+info.y+'◈'+info.z+'◈'+info.state;
		EXE.saveValue(mRegistID+'.plugins.'+id, str);
	};
	/*플러그인 기본 정보 삭제하기*/
	function removePluginInfo(id){
		EXE.saveValue(mRegistID+'.plugins.'+id, '');
	};
}());


/**
 * 플래그인 리스트
 */
PLUGIN_LIST=(function(){
	
	var mPluginObj={};
	
return{
	load:function(regist, cb){
		/*메모*/
		mPluginObj['memo']=makePluginList('memo', regist, cb);
		/*녹음*/
		mPluginObj['mic']=makePluginList('mic', regist, cb);
		/*녹음*/
		mPluginObj['link']=makePluginList('link', regist, cb);
	},
	add:function(type, id){
		var $fn=mPluginObj[type];
		if($fn){
			$fn.add(id);
			$fn.update();
		};
	},
	remove:function(type, id){
		var $fn=mPluginObj[type];
		if($fn){
			$fn.remove(id);
			$fn.update();
		};
	},
	show:function(type){
		for(val in mPluginObj){
			mPluginObj[val].show();
		};
	},
	hide:function(type){
		for(val in mPluginObj){
			mPluginObj[val].hide();
		};
	},
	clear:function(type){
		if(type){
			var $fn=mPluginObj[type];
			if($fn){
				$fn.clear();
			};
		}else{
			for(val in mPluginObj){
				mPluginObj[val].clear();
			};
		};
	},
	update:function(type){
		var $fn=mPluginObj[type];
		if($fn){
			$fn.update();
		};
	},/*end*/
};	
	function makePluginList(t,r,c){
		
		var regist=r+'.plugin.'+t+'.list';
		var type=t,callback=c;
		
		var list=[];
		
		var r=EXE.loadValue(regist);
		if(r){
			list=r.split('◈');
			if(callback) callback({
				type:type,
				mode:'load',
				list:list/*end*/
			});
		};
		
		return{
			add:function(id){
				if(id){
					addID(id);
					update();
				};
			},
			remove:function(id){
				if(id){
					removeID(id);
					update();
				};
			},
			clear:clear,
			show:show,
			hide:hide,
			update:update/*end*/
		};
		/**
		 * 리스트 정보 추가하기
		 */
		function addID(id){
			var is=false;
			var i=0, lens=list.length;
			for(i; i<lens; i++){
				if(list[i]==id){
					is=true;
					break;
				};
			};
			if(!is) list.push(id);
		};
		/**
		 * 리스트에서 선택 정보 제거 
		 */
		function removeID(id){
			var i=0, lens=list.length;
			for(i; i<lens; i++){
				if(list[i]==id){
					list.splice(i,1);
					break;
				};
			};
		};
		/**
		 * 리스트 등록 
		 */
		function update(){
			var s='';
			var i=0, lens=list.length;
			for(i; i<lens; i++){
				if(s!='') s+='◈';
				s+=list[i];
			};
			EXE.saveValue(regist,s);
		};
		/**
		 * 리스트 모두 제거하기 
		 */
		function clear(){
			var i=0, lens=list.length;
			for(i=0; i<lens; i++){
				PLUGIN.remove(list[i]);
			};
			list=[];
		};
		function show(){
			var i=0, lens=list.length;
			for(i=0; i<lens; i++){
				PLUGIN.show(list[i]);
			};
		};
		function hide(){
			var i=0, lens=list.length;
			for(i=0; i<lens; i++){
				PLUGIN.hide(list[i]);
			};
		};
	};
}());