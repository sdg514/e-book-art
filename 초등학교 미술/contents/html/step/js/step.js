

/*<홈 화면>*/
DEV=(function(){
	
	var mRegist=USER.project+'.'+USER.id.step;
	var mPath='../../com/datas/groups/';
	
	var $mFnStep, $mFnRoom;
	
	/**
	 * 네비 시작하기
	 */
	function startNavi(){
		
		NAVI.dropdown(
			document.querySelector('[data-fn="step-navi"]'),
			{
				isFrist:true,
				depths:USER.depths,
				datas:DATAS.index,
				callback:function(datas){
					switch(datas.type){
						case 'change':
							loadGroupDatas(datas.depths, datas.page);
						break;
					};
				}/*end*/
			}/*end*/
		);
	};
	
	/**
	 * 이벤트 시작하기 
	 */
	function startEvents(){
		
		/*메뉴 이벤트*/
		document.querySelectorAll('#step-menu [data-btn]').on('click',function(){
			var type=this.attr('data-btn');
			switch(type){
				case 'home':
					USER.sandParent(USER.id.home);
				break;
				case 'fileroom':
					USER.sandParent(USER.id.fileroom);
				break;
				case 'ebook':
					USER.sandParent(USER.id.ebook);
				break;
			};
		});
		
	};
	
	/**
	 * 해당 데이터 불러오기
	 */
	function loadGroupDatas(depths, page){
		USER.depths=depths;
		USER.page=page;
		
		var src=mPath+(depths[0]+1)+'-'+(depths[1]+1)+'-'+(depths[2]+1)+'.js';
		/*파일 불러오기*/
		UTIL.load.js(src,function(){
			if(DATAS.group){
				/*수업 내용 만들기*/
				makeStepView();
				/*이벤트 시작하기*/
				startEvents();
			};
		});
	};
	
	/*==============================*/
	/*수업 목차 이벤트 함수 지역*/
	/*==============================*/
	
	/**
	 *수업 목차 리스트 만들기 
	 */
	function makeStepView(){
		
		var id=mRegist+'.'+(USER.depths[0]+1)+'-'+(USER.depths[1]+1)+'-'+(USER.depths[2]+1)+'.step';
		
		$mFnStep=GROUP.step(
			document.querySelector('[data-fn="group-step"]'),
			{
				regist:id,
				info:DATAS.group.info,
				step:DATAS.group.step,
				callback:onStepCallback/*end*/
			}/*end*/
		);
		/**
		 * 리스트 클릭 이벤트 
		 */
		function onStepCallback(datas){
			if(datas){
				USER.group=datas.id;
				USER.sandParent(USER.id.popup);
			};
		};
	};
	/**
	 * 수업 목차 아이템 추가하기 
	 */
	function addStepItem(datas){
		var $step=document.querySelector('[data-fn="group-step"]');
		if($step&&datas){
			var $fn=$step.fnGroupStep;
			if($fn){
				$fn.add(datas);
			};
		};
	};
	
return{
	ready:function(){
		/*파일 초기 위치 조정*/
		EXE.root('../../');
		EXE.appType(USER.appType,'');
		/*사용자 데이터 초기화*/
		USER.init(USER.id.step);
		
		/*데이터 전달 받기*/
		UTIL.message.listener(function(event){
			var obj=event.data;
			if(obj){
				switch(obj.messageType){
					case 'exe':
						addRoomItem({
							type:'file',
							src:obj.result
						});
					break;
				};
			};
		});
	},
	load:function(){
		/*상단 인덱스 네비 설정*/
		startNavi();
		/*룸 선택 만들기*/
		//initRoomChoose();
	},
	unload:function(){}
};
}()); UTIL.init(DEV);
