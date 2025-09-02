if(typeof NAVI=='undefined') NAVI={};
/*<홈 화면>*/
NAVI.dropdown=function($navi,datas){
	if(!$navi||!datas) return;
	/*전달 받은 데이터*/
	/*datas.isFrist || false(콜백 건너띄기)/true(콜백 먼저 실행하기)*/
	var mDepths=datas.depths;
	var mDatas=datas.datas;
	var mCB=datas.callback;
	
	/*엘리멘트 변수*/
	var $mNavi=$navi;
	var $mDepths=$mNavi.querySelectorAll('[data-depth]');
	
	/*기본 설정 데이터*/
	var mPage=1;
	var mDepthMax=$mDepths.length;
	
	/*실행 메소드*/
	changeDepths(0,!datas.isFrist);
	makeDepth(0);
	
	/*
	 * 모든 목차 리스트 숨기기
	 */
	function hideDepthAll(){
		$mNavi.querySelectorAll('[data-depth]').removeClass('on');
		$mNavi.querySelectorAll('[data-depth] .list').hide();
	};
	/**
	 *목차 드롭다운 리스트 만들기 
	 */
	function makeDepth(add){
		
		var datas=mDatas;
		var i=0;
		for(i;i<mDepthMax;i++){
			if(i>0) datas=datas[mDepths[i-1]].list;
			if(i>=add){
				addDepthItem($mDepths[i],datas,mDepths[i],i);
			};
		};
	};
	function addDepthItem($el,datas,sIdx,id){
		$el.empty();
		
		var disabled=$el.hasClass('disabled');
		
		var $select,$list;
		/*선택자*/
		$select=document.createElement('div');
		$select.addClass('select');
		$select.append(getListItem(sIdx));
		$el.append($select);
		
		if(!disabled){
			/*목차 리스트 만들기*/
			addList();
			/*선택자 이벤트 등록*/
			$select.off().on('click',function(){
				if($list.css('display')=='none'){
					hideDepthAll();
					$el.addClass('on');
					$list.show();
				}else{
					$el.removeClass('on');
					$list.hide();
				};
			});
		};
		
		/**
		 * 리스트 만들기 
		 */
		function addList(){
			
			$list=document.createElement('div');
			$list.addClass('list');
			$el.append($list);
			
			var $v;
			var i=0, lens=datas.length;
			for(i;i<lens;i++){
				
				if(id==2 || datas[i].list.length>0){
					$v=getListItem(i);
					
					if(i==sIdx) $v.addClass('on');
					$v.on('click',onListItemClick);
					$list.append($v);
				};
			};
		};
		/*리스트 아이템 가져오기*/
		function getListItem(idx){
			
			var obj=datas[idx];
			
			var $p=document.createElement('p');
			$p.attr('data-val',idx);
			
			if(obj.icon){
				var $icon=document.createElement('span');
				$icon.attr('data-icon',obj.icon).text(obj.icon);
				$p.append($icon);
			}else if(obj.step){
				var $step=document.createElement('span');
				$step.addClass('step').text(obj.step);
				$p.append($step);
			}else{
				var $no=document.createElement('span');
				$no.addClass('no').text((idx+1)+'. ');
				$p.append($no);
			};
			
			var $txt=document.createElement('span');
			$txt.addClass('title').text(obj.title);
			$p.append($txt);
			
			return $p;
		};
		
		function onListItemClick(){
			hideDepthAll();
			
			/*선택된 리스트 선택자에 등록*/
			$select.empty().append(this.cloneNode(true));
			
			var dId=$el.attr('data-depth');
			var val=parseInt(this.attr('data-val'));
			var _re=$el.querySelector('[data-val].on');
			if(_re) _re.removeClass('on');
			this.addClass('on');
			
			var is=false;
			switch(dId){
				case '1':
					if(mDepths[0]!=val){
						is=true;
						/*뎁스값 변경*/
						mDepths[0]=val;
						mDepths[1]=0;
						mDepths[2]=0;
						/*뎁스 리스트 만들기*/
						makeDepth(1);
					};
				break;
				case '2':
					if(mDepths[1]!=val){
						is=true;
						/*뎁스값 변경*/
						mDepths[1]=val;
						mDepths[2]=0;
						/*뎁스 리스트 만들기*/
						makeDepth(2);
					};
				break;
				case '3':
					if(mDepths[2]!=val){
						is=true;
						/*뎁스값 변경*/
						mDepths[2]=val;
					};
				break;
			};
			/*변경이 있을 경우 뎁스값 확인*/
			if(is){
				changeDepths(0);
			};
		};
	};
	
	function changeDepths(adder,isPass){
		
		/*변동될 뎁스값 셋팅*/
		mDepths[mDepthMax-1]+=adder;
		
		/*뎁스 정보 셋팅*/
		var d_1=mDepths[0],
			d_2=mDepths[1],
			d_3=mDepths[2];
			
		/*데이터 변수들*/
		var d1_arr,d2_arr;
		var d1_max,d2_max,d3_max;
		/*변경된 값 설정하기*/
		if(adder<0){
			if(d_3<0){
				if(d_2==0){
					if(d_1==0){
						/*첫번째 페이지*/
						d_1=0;
						d_2=0;
						d_3=0;
					}else{
						d_1-=1;
						/*레슨 하나 내리기*/	
						d1_arr=mDatas[d_1].list;
						d_2=d1_arr.length-1;
						d_3=d1_arr[d_2].list.length-1;
					};
				}else{
					d_2-=1;
					/*챕터 하나 내리기*/
					d2_arr=mDatas[d_1].list[d_2].list;
					d_3=d2_arr.length-1;
				};
			};
		}else if(adder>0){
			d3_max=mDatas[d_1].list[d_2].list.length;
			
			if(d_3>d3_max-1){
				
				d_2+=1;
				d2_max=mDatas[d_1].list.length;
				
				if(d_2>d2_max-1){
					
					d_1+=1;
					d1_max=mDatas.length;
					
					if(d_1>d1_max-1){
						/*마직막 페이지*/
						d_1=d1_max-1;
						d1_arr=mDatas[d_1].list;
						d_2=d1_arr.length-1;
						d_3=d1_arr[d_2].list.length-1;
					}else{
						/*레슨 하나 올리기*/
						d_3=0;
						d_2=0;
					};
				}else{
					/*챕터 하나 올리기*/
					d_3=0;
				};
			};
		};
		/*리스트 변수 셋팅*/
		d1_arr=mDatas[d_1].list;
		d2_arr=d1_arr[d_2].list;
		d1_max=mDatas.length;
		d2_max=d1_arr.length;
		d3_max=d2_arr.length;
		/*리스트 처음과 끝 설정하기*/
		var state='center';
		if(d_1==0&&d_2==0&&d_3==0){
			state='first';
		};
		if(d_1==d1_max-1&&d_2==d2_max-1&&d_3==d3_max-1){
			state='end';
		};
		
		/*현재 뎁스와 페이지 등록*/
		mPage=d2_arr[d_3].page;
		mDepths[0]=d_1;
		mDepths[1]=d_2;
		mDepths[2]=d_3;
		/*변경된 데이터 전달*/
		if(!isPass&&mCB){
			mCB({type:'change',depths:mDepths,page:mPage});
		};
	};
};
