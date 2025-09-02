/*<홈 화면>*/
DEV=(function(){
	
	var _screen;
	
	function initIndex(){
		
		var _i=UTIL.query('#index');
		
		var dp=USER.get.depths();
		
		/*레슨 추가*/
		lesson(DATAS.index);
		
		/**
		 *lesson 추가하기 
		 */
		function lesson(list){
			if(!list) return;
			
			/*레슨 컨테이너*/
			var _ul=_i.query('#lesson').empty();
		
			var sID=(dp[0]+1)+'';
			/*if(sID=='1') sID='2';*/
			
			/*엘리먼트*/
			var lID,_li;
			/*추가하기*/
			UTIL.forIn(list,function(b1,b2){
				if(b1.icon != ''){
					
					lID=(b2+1)+'';
					
					_li=document.createElement('li');
					_li.attr('data-lesson',lID);
					_li.addClass('title');
					_li.lessonObj=b1;
					_li.innerHTML='<span data-icon="'+b1.icon+'">'+b1.icon+'</span><span>'+b1.title+'</span>';
					_li.bookPage=b1.page[0];
					_ul.append(_li);
					
					/*선택된 아이템만 등록*/
					if(sID==lID){
						/*레슨 등록*/
						_screen.attr('data-lesson',lID);
						_li.addClass('on');
						
						chapter(b1.list, lID, sID+'-'+(dp[1]+1));
					};
					/*이벤트 주기*/
					_li.off().on('click',click);
				};
			});
			
			function click(){
				
				var lID=this.attr('data-lesson');
				
				/*레슨 등록*/
				_screen.attr('data-lesson',lID);
				
				dp=[parseInt(lID)-1,0,0];
				USER.set.depths(dp);
				
				USER.set.page(this.bookPage);
				
				_ul.query('li.on',true).removeClass('on');
				this.addClass('on');
				
				chapter(this.lessonObj.list, lID, lID+'-'+(dp[1]+1));
			};
		};
		
		function chapter(list, lID, sID){
			if(!list) return;
			
			/*챕터 컨테이너*/
			var _ul=_i.query('#chapter').empty();
		
			/*엘리먼트*/
			var cID,_li;
			/*추가하기*/
			UTIL.forIn(list,function(b1,b2){
				
				if(b1.icon != ''){
					
					cID=lID+'-'+(b2+1);
					
					_li=document.createElement('li');
					_li.attr('data-chapter',cID);
					_li.addClass('title');
					_li.innerHTML='<span data-icon="'+b1.icon+'">'+b1.icon+'</span><span>'+b1.title+'</span>';/*<span class="page">'+b1.page+'쪽</span>*/
					_li.chapterObj=b1;
					_li.bookPage=b1.page;
					_ul.append(_li);
					
					/*이벤트 주기*/
					_li.off().on('click',click);
					
					if(b1.list&&b1.list.length>0){
						_li.removeClass('blank');
						/*모든 코너 등록*/
						/*선택 표시*/
						if(sID==cID){
							_li.addClass('on');
							corner(b1.list, cID);
						}else{
							_li.removeClass('on');
						};
					}else{
						_li.removeClass('on');
						_li.addClass('blank');
					};
				};
			});
			
			function click(){
				
				var isBlank=this.parentNode.hasClass('blank');
				if(!isBlank){
					
					var id=this.attr('data-chapter');
					
					var lID=id.split('-');
					var dp=[parseInt(lID[0])-1,parseInt(lID[1])-1,0];
					USER.set.depths(dp);
					USER.set.page(this.bookPage);
					
					_ul.query('li.on',true).removeClass('on');
					this.addClass('on');
					
					corner(this.chapterObj.list,id);
					
				}else{
					
					var lID=this.attr('data-chapter').split('-');
					var dp=[parseInt(lID[0])-1,parseInt(lID[1])-1,0];
					USER.set.depths(dp);
					
					USER.set.page(this.bookPage);
					
					USER.sandParent(USER.id.ebook);
				};
			};
		};
		
		function corner(list, cID){
			if(!list) return;
			/*챕터 컨테이너*/
			var _ul=_i.query('#corner').empty();
			
			/*엘리먼트*/
			var nID,_li;
			/*추가하기*/
			UTIL.forIn(list,function(b1,b2){
				
				nID=cID+'-'+(b2+1);
				
				_li=document.createElement('li');
				_li.attr('data-corner',nID);
				_li.addClass('title');
				_li.innerHTML='<span data-icon="'+b1.icon+'">'+b1.icon+'</span>'
								+'<span>'+b1.title+'</span>'
								+'<span class="page">'+b1.page[1]+'</span>'
								+'<button data-type="ebook">이북 바로가기</button>'
								+'<button data-type="popup">콘텐츠 바로가기</button>';
				_li.bookPage=b1.page[0];
				_ul.append(_li);
				
				/*이벤트 주기*/
				_li.query('button[data-type]',true).on('click',onClick);
			});
			
			function onClick(){
				
				var _li=this.parentNode;
				
				var lID=_li.attr('data-corner').split('-');
				
				dp=[parseInt(lID[0])-1,parseInt(lID[1])-1,parseInt(lID[2])-1];
				
				USER.set.depths(dp);
				USER.set.page(_li.bookPage);
				
				if(this.attr('data-type')=='ebook'){
					USER.sandParent(USER.id.ebook);
				}else{
					USER.sandParent(USER.id.step);
				};
			};
		};
	};
	
	function initMenu(){
		
		document.querySelectorAll('[data-menu]').on('click', function(){
			
			EFFECT.play('click');
			
			switch(this.attr('data-menu')){
				case 'load':
					loadMyClass();
				break;
				case 'TSolution':
					window.open('https://tsol.jihak.co.kr','_blank');
				break;
				case 'help':
					PLUGINS.open('helpHome');
				break;
				case 'fileroom':
					USER.sandParent(USER.id.fileroom);
				break;
			};
		});
	};
	
	function loadMyClass(){
		
		var regist=USER.project+'.'+USER.class+'.study-progress';
		var value=EXE.loadValue(regist);
		
		if(value){
			
			var arr=value.split('◈');
			var depths=arr[0];
			var group=arr[1];
			var page=arr[2];
			/*뎁스 설정*/
			if(depths){
				var depthArr=depths.split('-');
				if(depthArr&&depthArr.length==3){
					USER.depths=depthArr;
				};
			};
			/*그룹 설정*/
			if(group){
				USER.group=group;
			};
			/*그룹 설정*/
			if(page){
				USER.page=page;
			};
			
			USER.sandParent(USER.id.popup);
		}else{
			alert('저장된 최근 수업이 없습니다.\n수업 내용을 등록해 주세요.');
		};
	};
	
	/*============================================*/
	
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
					gotoContent(datas);
				break;
			};
		};
		
		function gotoContent(datas){
			
			if(datas.depths) USER.depths=datas.depths;
			if(datas.group) USER.group=datas.group;
			if(datas.page) USER.page=datas.page;
			switch(datas.mode){
				case 'popup':
					USER.sandParent(USER.id.popup);
				break;
				case 'ebook':
					USER.sandParent(USER.id.ebook);
				break;
			};
		};
	};
	
return{
	ready:function(){
		/*사용자 데이터 초기화*/
		EXE.root('../../../');
		EXE.appType(USER.appType,'');
		/*사용자 데이터 초기화*/
		USER.init(USER.id.home);
		/*스크린*/
		_screen=UTIL.query('#screen');
		_screen.attr('data-grade',USER.grade);
	},
	load:function(){
		/*플러그인*/
		startPlugins();
		/*실행하기*/
		initIndex();
		initMenu();
	},
	unload:function(){}
};
}()); UTIL.init(DEV);
