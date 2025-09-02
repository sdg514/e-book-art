if(typeof GROUP=='undefined') GROUP={};
/*<홈 화면>*/
GROUP.step=function($step, datas){
	if(!$step||!datas) return;
	
	/*전달 받은 데이터*/
	var mRegistID=datas.regist;
	var mOriginInfo=datas.info;
	var mOriginStep=datas.step;
	var mOriginRoom=datas.room;
	/*저장 데이터 교차하기*/
	var mStepList=mOriginStep;
	
	var mCB=datas.callback;
	/*엘리멘트 변수*/
	var $mStep=$step;
		$mStep.addClass('fn-group-step');
	var $mContainer;
	/*화면에 꽉채울 아이템 개수*/
	var mEnoughMax=8;
	/*만들기*/
	makeStep();
	
	/*==============================*/
	/**
	 * 리스트 만들기
	 */
	function makeStep(){
		if(!mStepList) return;
		/*내부 컨터이너 등록*/
		$mContainer=document.createElement('div');
		$mContainer.addClass('container');
		$mStep.empty().append($mContainer);
		
		var infoID,$dp1,$dp2;
		UTIL.forIn(mStepList,function(obj,idx){
			if(obj.info&&obj.info!='null'){
				
				if(infoID!=obj.info){
					infoID=obj.info;
					
					$dp1=makeDP1(infoID);
					if($dp1){
						$mContainer.append($dp1);
						
						$dp2=$dp1.querySelector('.dp2');
					};
				};
				
				if($dp2){
					makeItem(obj, $dp2, 'append');
				};
			};
		});
	};
	
	/*==============================*/
	/**
	 * 뎁스 1 아이템 추가하기 
	 */
	function addDP1(obj){
		
		var $dp1;
		
		if(obj.info){
			$dp1=makeDP1(id);
		}else{
			$dp1=$mContainer.querySelector('.dp1');
		};
		
		if($dp1){
			
			var $dp2=$dp1.querySelector('.dp2');
			if($dp2){
				var obj={
					info:$dp1.attr('data-id'),
					mode:obj.mode,
					id:obj.id,
					icon:obj.icon,
					title:obj.title,
					src:obj.src
				};
				makeItem(obj, $dp2, 'append');
			};
		};
	};
	/**
	 * 뎁스 1 아이템  만들기
	 */
	function makeDP1(id){
		
		var obj=mOriginInfo[id];
		if(obj){
			var $div=document.createElement('div');
				$div.attr('data-id',id).addClass('dp1');
			
			var $title=document.createElement('div');
				$title.addClass('title');
			var $p=document.createElement('p');
				$p.text(obj.title);
			
			$title.append($p);
			$div.append($title);
			
			var $list=document.createElement('div');
				$list.addClass('dp2');
			$div.append($list);
			
			return $div;
		};
		return null;
	};
	
	/**
	 * 아이템 추가하기 
	 */
	function addItem($drag,obj,pos){
		
		var $tgts=$mContainer.querySelectorAll('[data-mode]');
		var $result;
		
		if(!pos){
			$result=UTIL.events.hitTest($tgts, $drag);
			if(!$result){
				$tgts=$mContainer.querySelectorAll('.dp2');
				$result=UTIL.events.hitTest($tgts, $drag);
			};
		}else{
			$result=UTIL.events.hitTest($tgts, pos.x, pos.y);
			if(!$result){
				$tgts=$mContainer.querySelectorAll('.dp2');
				$result=UTIL.events.hitTest($tgts, pos.x, pos.y);
			};
		};
		
		if($result){
			/*인포 ID값 필수*/
			var $tgt=$result.hit;
			/*오브젝트 데이터 채크*/
			if(!obj){
				obj=UTIL.find.arrayToObj(mStepList,{
					id:$drag.attr('data-id'),
					mode:$drag.attr('data-mode')
				});
			}else{
				mStepList.push(obj);
			};
			/*추가하기*/
			if($tgt.hasClass('dp2')){
				/*인포 ID값 필수*/
				obj.info=$tgt.parentNode.attr('data-id');
				/*아이템 추가하기*/
				makeItem(obj, $tgt, 'append');
			}else{
				/*인포 ID값 필수*/
				obj.info=$tgt.parentNode.parentNode.attr('data-id');
				/*아이템 추가하기*/
				if($result.v=='top'){
					makeItem(obj, $tgt, 'before');
				}else{
					makeItem(obj, $tgt, 'after');
				};
			};
			
			return true;
		}else{
			return false;
		};
	};
	/**
	 * 리스트 아이템 만들기
	 */
	function makeItem(obj, $tgt, appendType){
		if(!obj) return;
		
		var $div=document.createElement('div');
		switch(appendType){
			case 'before':
				$tgt.before($div);
			break;
			case 'after':
				$tgt.after($div);
			break;
			default:
				$tgt.append($div);
			break;
		};
		
		/*모드 아이디값 설정*/
		$div.attr('data-mode',obj.mode);
		$div.attr('data-id',obj.id);
				
		var $tBox=document.createElement('div');
		$div.append($tBox);
		
		var $pBox=document.createElement('div');
		$pBox.addClass('p-box');
		$tBox.append($pBox);
		
		var $icon, $title, $page, $close;
		var html;
		switch(obj.mode){
			case 'step':
				if(obj.icon){
					$icon=document.createElement('span');
					$icon.attr('data-icon',obj.mode);
					$icon.text(obj.icon);
					$pBox.append($icon);
					$pBox.addClass('icon-title');
				};
			break;
			case 'room':
			default :
				if(obj.icon){
					$icon=document.createElement('span');
					$icon.attr('data-icon',obj.icon);
					$icon.text(obj.icon);
					$pBox.append($icon);
					$pBox.addClass('icon-title');
				};
			break;
		};
		
		if(obj.title=='') obj.title=' ';
		$title=document.createElement('p');
		$title.addClass('title');
		$title.text(obj.title);
		$pBox.append($title);
		
		if(obj.sub){
			var $sub=document.createElement('span');
			$sub.addClass('sub');
			$sub.text(obj.sub);
			$title.append($sub);
		};
		
		if(obj.page){
			$page=document.createElement('span');
			$page.addClass('page');
			$page.text(obj.page+'쪽');
			$tBox.append($page);
		};
		
		$div.off().on('click',clickEvent);
		
		return $div;
	};
	
	function clickEvent(){
		/*클릭 이벤트*/
		var obj=UTIL.find.arrayToID(mStepList,this.attr('data-id'));
		if(mCB) mCB(obj);
	};
	
	
};