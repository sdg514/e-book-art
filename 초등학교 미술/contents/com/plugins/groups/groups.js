/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				GROUPS.start(ms);
			break;
			case 'unload':
				GROUPS.destroy();
			break;
		};
	};
});
/*=========
 GROUPS
===========*/
GROUPS=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*그룹 생성 제한하기*/
	var mOpt={limit:10, max:5};
	/*그룹 리스트*/
	var mArrGroup;
	/*그룹 객체*/
	var $mPlugin;
	var $mContent, 
		$mContainer, 
		$mMax, 
		$mAdder, 
		$mResult,
		$mBtns;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.groups';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		/*객체 가져오기*/
		$mMax=$mPlugin.querySelector('[data-max]'); 
		$mContent=$mPlugin.querySelector('#content');
		$mContainer=$mContent.querySelector('.container');
		$mAdder=$mPlugin.querySelector('#adder');
		$mResult=$mPlugin.querySelector('#result');
		$mBtns=$mPlugin.querySelectorAll('[data-btn]');
		
		/*데이터 불러오기*/
		loadDatas();
		/*기능 실행*/
		makeGroups();
		addEvents();
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 정지하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		if($mPlugin){
			$mPlugin.querySelectorAll('[data-btn]').off();
			$mPlugin.querySelectorAll('[data-item]>.name').off();
			$mPlugin=null;
		};
		$mContent=null;
		$mContainer=null;
		$mMax=null;
		$mAdder=null;
		$mResult=null;
		$mBtns=null;
		mArrGroup=null;
		mDatas=mRegist=null;
		mOpt=null;
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
	 * 버튼 이벤트 등록하기 
	 */
	function addEvents(){
		
		$mBtns.on('click',function(){
			var type=this.attr('data-btn');
			
			switch(type){
				case 'up':
					changeMax(mOpt.max+1);
					resetGroupList();
					makeGroups();
					saveDataMax();
					saveDataList();
				break;
				case 'down':
					changeMax(mOpt.max-1);
					resetGroupList();
					makeGroups();
					saveDataMax();
					saveDataList();
				break;
				case 'make':
					resetGroupList();
					makeGroups();
					saveDataMax();
					saveDataList();
				break;
				case 'result':
					showResultPopup();
				break;
				case 'close':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
				case 'close-adder':
					$mAdder.hide();
				break;
				case 'close-result':
					$mResult.hide();
					
					resetGroupList();
					makeGroups();
					saveDataMax();
					saveDataList();
				break;
			};
		});
	};
	/**
	 * 그룹 결과 보여주기 
	 */
	function showResultPopup(){
		
		var score=0;
		var group_html='';
		
		/*모든 결과 비교하기*/
		for(var i=0; i<mArrGroup.length; i++){
			
			var pnt=mArrGroup[i];
			/*별점 개산*/
			var sc=0;
			if(pnt.ten>0) sc+=pnt.ten*10;
			if(pnt.five>0) sc+=pnt.five*5;
			if(pnt.one>0) sc+=pnt.one*1;
			
			if(score<sc){
				/*한 그룹이 이길 경우*/
				score=sc;
				group_html='<p><span>'+pnt.id+' 모둠</span>';
			}else if(score==sc){
				/*동일한 그룹이 있을 경우*/
				if(group_html==''){
					group_html='<p><span>'+pnt.id+' 모둠</span>';
				}else{
					group_html+='<span color="black">,</span> <span>'+pnt.id+' 모둠</span>';
				};
			};
		};
		group_html+= '이 <span>우승</span>하였습니다.</p>';
		/*총점 표시 내용*/
		var score_html='<p>총점 <span>'+score+'</span>점으로</p>';
		/*위너 등록*/
		$mResult.querySelector('.winner').innerHTML=group_html;
		/*총점 등록*/
		$mResult.querySelector('.score').innerHTML=score_html;
		/*결과 보여주기*/
		$mResult.show();
		
		/*위치 중앙으로 보내기*/
		var $body=$mResult.querySelector('.body');
		var h=$body.offsetHeight;
		var posY=60+((520-h)/2);
		$body.css('top', posY+'px');
	};
	/**
	 * 별 추가 팝업 보여주기
	 */
	function showAddPopup($item){
		$mAdder.querySelectorAll('[data-add]').off().on('click',function(){
			addStar($item,this.attr('data-add'));
			$mAdder.hide();
		});
		$mAdder.show();
	};
	/**
	 * 그룹 만들기 
	 */
	function makeGroups(){
		$mContainer.empty();
		if(mArrGroup){
			for(var i=0; i<mArrGroup.length; i++){
				$mContainer.append(getGroupItem(mArrGroup[i]));
			};
		};
	};
	/**
	 * 그룹 객체 만들기
	 */
	function getGroupItem(obj){
		/*그룹 아이템 생성*/
		var $item=document.createElement('div');
		$item.attr('data-item',obj.id);
		/*기본 그룹 내용 만들기*/
		var tag='<p class="name">모둠 '+obj.id+'</p>';
			tag+='<div data-point="10"><div data-btn="10">10점</div><ul data-val="0"></ul></div>';
			tag+='<div data-point="5"><div data-btn="5">5점</div><ul data-val="0"></ul></div>';
			tag+='<div data-point="1"><div data-btn="1">1점</div><ul data-val="0"></ul></div>';
		/*내용 등록*/
		$item.innerHTML=tag;
		/*별점 등록*/
		if(obj.ten>0) addStar($item, '10', obj.ten);
		if(obj.five>0) addStar($item, '5', obj.five);
		if(obj.one>0) addStar($item, '1', obj.one);
		/*별점 이벤트 만들기*/
		$item.querySelectorAll('[data-btn]').on('click',function(){
			addStar($item, this.attr('data-btn'));
		});
		/*별점 팝업 이벤트 만들기*/
		$item.querySelectorAll('.name').on('click',function(){
			showAddPopup(this.parentNode);
		});
		
		return $item;
	};
	/**
	 * 별 추가하기
	 */
	function addStar($item, id, count){
		/*해당 ID값 가져오기*/
		var itemID=$item.attr('data-item');
		/*해당 객체 가져오기*/
		var $ul=$item.querySelector('[data-point="'+id+'"] ul');
		var $li=$ul.querySelectorAll('li');
		if(!count){
			/*별 추가할 때*/
			count=parseInt($ul.attr('data-val'))+1;
			if(count<6){
				$ul.append(document.createElement('li'));
			}else{
				/*별점 6개 이상일 때 숫자로 표현*/
				$ul.empty();
				$ul.append(document.createElement('li'));
				var $span=document.createElement('span');
				$span.text(' X '+count);
				$ul.append($span);
			};
		}else{
			/*별점 초기 등록 시*/
			$ul.empty();
			if(count<6){
				for(var i=0; i<count; i++){
					$ul.append(document.createElement('li'));
				};
			}else{
				/*별점 6개 이상일 때 숫자로 표현*/
				$ul.append(document.createElement('li'));
				var $span=document.createElement('span');
				$span.text(' X '+count);
				$ul.append($span);
			};
		};
		/*별점 카운더 등록*/
		$ul.attr('data-val',count);
		/*별점 등록*/
		var obj=findDataObj(itemID);
		if(obj){
			switch(id){
				case '10': 
					obj.ten=count; 
				break;
				case '5': 
					obj.five=count; 
				break;
				case '1': 
					obj.one=count; 
				break;
			};
		};
		/*그룹 정보 저장하기*/
		saveDataList();
	};
	/**
	 * 그룹 제한 표시하기
	 */
	function changeMax(max){
		if(max<1) max=1;
		if(max>10) max=10;
		mOpt.max=max;
		$mMax.text(max);
	};
	/**
	 * 그룹 리스트 초기화 하기 
	 */
	function resetGroupList(){
		mArrGroup=[];
		for(var i=0; i<mOpt.max; i++){
			mArrGroup.push({id:i+1, ten:0, five:0, one:0});
		};
	};
	/**
	 * 선택한 그룹 데이터 가져오기 
	 */
	function findDataObj(id){
		for(var i=0; i<mArrGroup.length; i++){
			obj=mArrGroup[i];
			if(obj.id==id){
				return obj;
			};
		};
		return null;
	};
	/**
	 * 데이터 불러오기
	 */
	function loadDatas(){
		/*그룹 제학 데이터 가져오기*/
		var s=EXE.loadValue(mRegist+'.max');
		/*그룹 리스트 정보 가져오기*/
		var s=EXE.loadValue(mRegist+'.list');
		if(s){
			
			mArrGroup=[];
			/*그룹 데이터 가공*/
			var list=s.split('▣');
			var max=list.length;
			var arr;
			for(var i=0; i<max; i++){
				arr=list[i].split('◈');
				if(arr.length==4){
					mArrGroup.push({
						id:arr[0], 
						ten:parseInt(arr[1]), 
						five:parseInt(arr[2]), 
						one:parseInt(arr[3])/*end*/
					});
				};
			};
			/*생성 제한 주기*/
			changeMax(max);
		}else{
			/*저장된 데이터가 없을 경우 초기화 하기*/
			resetGroupList();
		};
	};
	/**
	 * 데이터 저장하기 
	 */
	function saveDataMax(){
		EXE.saveValue(mRegist+'.max', mOpt.max);
	};
	/**
	 * 그룹 리스트 정보 저장하기
	 */
	function saveDataList(){
		var str='',obj;
		if(mArrGroup){
			for(var i=0; i<mArrGroup.length; i++){
				obj=mArrGroup[i];
				if(str!='') str+='▣';
				str+=obj.id+'◈'+obj.ten+'◈'+obj.five+'◈'+obj.one;
			};
		}; 
		EXE.saveValue(mRegist+'.list', str);
	};
}());

