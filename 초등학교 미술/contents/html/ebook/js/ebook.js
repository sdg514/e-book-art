
/*<작업장>*/
DEV=(function(){
	
	function startEbook(){
		
		document.querySelectorAll('[data-btn]').on('click',function(){
			
			var type=this.attr('data-btn');
			
			switch(type){
				case 'home':
					USER.sandParent(USER.id.home);
				break;
				case 'fileroom':
					USER.sandParent(USER.id.fileroom);
				break;
				case 'openNavi':
					naviShowHide(this);
				break;
				case 'myTools':
				case 'myTools-close':
					UTIL.change.showHide(document.querySelector('#study-tools'));
				break;
				
				case 'prev':
					TURN.prev();
				break;
				case 'next':
					TURN.next();
				break;
				
				case 'pointer':
					var _b=document.querySelector('body');
					if(!_b.hasClass('pointer')){
						this.addClass('on');
						pointer(_b,true);
					}else{
						this.removeClass('on');
						pointer(_b,false);
					};
				break;
			};	
		});
	};
	
	function cursorMove(e){
		var pos=UTIL.get.mouse(e);
		_c=document.querySelector('.mouse-cursor');
		_c.css({
			left:pos.x+'px',
			top:pos.y+'px'/*end*/
		});
	};
	function pointer(_t,is){
		var _c;
		if(is){
			document.documentElement.style.cursor = 'none';
			_c=document.createElement('div');
			_c.addClass('mouse-cursor');
			_t.append(_c);
			_t.addClass('pointer');
			
			window.addEventListener('mousemove', cursorMove);
		}else{
			document.documentElement.style.cursor = 'auto';
			_c=document.querySelector('.mouse-cursor');
			if(_c) _c.remove();
			_t.removeClass('pointer');
			
			window.removeEventListener('mousemove', cursorMove);
		};
	};
	
	function startTurn(){
		
		/*시작 페이지 확인하기*/
		var firstPage=DATAS.ebook.page[0][0];
		if(USER.page<firstPage) USER.page=firstPage;
		/*북 페이지 만들기*/
		TURN.start(document.querySelector('#ebook'),
		{
			display:'double',
			firstDisplay:'double',
			format:'jpg',
			pageInput:document.querySelector('.page-input>input'),
			pageGoto:document.querySelector('.page-input>[data-btn="go"]'),
			pageType:{cut:', ',bar:' / ',adder:''},
			pageList:DATAS.ebook.page,
			page:USER.page,
			eventList:DATAS.ebook.events,
			when:{
				zoom:function(event,is){
					if(typeof PLUGINS!=undefined){
						if(is){
							PLUGINS.change('hide');
						}else{
							PLUGINS.change('show');
						};
					};
				},
				flip:function(event){
					EFFECT.play('flip');
					
					if(typeof PLUGINS!=undefined){
						PLUGINS.change('flip');
					};
				},
				change:function(event, pages){
					
					USER.page=TURN.getPage();
					
					if(typeof PLUGINS!=undefined){
						PLUGINS.change('pages',{
							pages:pages,
							type:'ebook'/*end*/
						});
					};
				},
				page:function(event, datas){
					if(!datas) return;
					TURN.gotoPage(datas.page);
				},
				link:function(event, datas){
					switch(datas.mode){
						case 'folder':
							EXE.openFolder(datas.link);
						break;
						case 'video':
						case 'audio':
						case 'file':
							EXE.openFile('../../files/자료실/'+datas.link);
						break;
						case 'url':
						default:
							EXE.openWeb(datas.link);
						break;
					};
				},
				popup:function(event, datas){
					if(!datas) return;
					
					/*해당 챕터 설정*/
					if(datas.popup){
						var depths=datas.popup.split('-');
						var d;
						for(var i=0; i<depths.length; i++){
							d=parseInt(depths[i]);
							if(!isNaN(d)) depths[i]=d-1;
							else depths[i]=0;
						};
					};
					/*데이터 설정하기*/
					USER.set.depths(depths);
					USER.set.group(datas.group);
					USER.set.page(datas.page);
					/*데이터 보내기*/
					USER.sandParent(USER.id.popup);
				},
			}/*end*/
		});
	};
	
	/*============================================*/
	
	function startPlugins(){
		/*플러그인 기능 시작하기*/
		PLUGINS.start(
			document.querySelector('#screen'),
			function(type,datas){
				switch(type){
					case 'plugin':
						pluginEvents(datas);
					break;
				};
			}/*end*/
		);
		function pluginEvents(datas){
			switch(datas.messageMode){
				case 'gotoPage':
					TURN.gotoPage(datas.page);
				break;
			};
		};
	};
	
	/*============================================*/
	
	function loadMyClass(){
		var regist=USER.project+'.plugin.study.info';
		var value=EXE.loadValue(regist);
		if(value){
			var arr=value.split('◈');
			var depths=arr[0];
			var group=arr[1];
			if(depths){
				var depthArr=depths.split('-');
				if(depthArr&&depthArr.length==3){
					USER.depths=depthArr;
				};
			};
			if(group){
				USER.group=group;
			};
		};
	};
	
	function naviShowHide($btn){
		
		var $navi=$btn.parentNode;
		
		if(!$navi.hasClass('on')){
			$navi.addClass('on');
		}else{
			$navi.removeClass('on');
		};
	};
	
return{
	ready:function(){
		/*파일 초기 위치 조정*/
		EXE.root('./', 'contents\\html\\ebook\\');
		EXE.appType(USER.appType,'');
		/*사용자 데이터 초기화*/
		USER.init(USER.id.ebook);
	},
	load:function(){
		/*플러그인*/
		startPlugins();
		/*이북 페이지 기능*/
		startTurn();
		/*이북 시작하기*/
		startEbook();
	},
	unload:function(){
		
	},
};
}()); UTIL.init(DEV);
