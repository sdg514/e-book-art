/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				THUMBS.start(ms);
			break;
			case 'unload':
				THUMBS.destroy();
			break;
			case 'change':
				THUMBS.change(ms.pages);
			break;
		};
	};
});
/*=========
 THUMBS
===========*/
THUMBS=(function(){
	/*이미지 정보*/
	var mPath='../../../html/ebook/turn/thumbs/';
	var mFormat='.jpg';
	/*기본 정보*/
	var mDatas,mRegist;
	/*객체 정보*/
	var $mPlugin,$mThumbs;
	var $mThumbList,$mFnScroll,
		$mBtnClose,$mBtnPrev,$mBtnNext;
	/*사이즈 정보*/
	var mItemW,mAdder,mPadding;
	/*제한 상태*/
	var mMin,mMax;
	var mPercent=0;
	var mPos=0;
	
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.regist+'.plugin.thumbs';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		$mThumbs=$mPlugin.querySelector('#thumbs');
		$mThumbList=$mPlugin.querySelector('.thumbs-list');
		$mBtnClose=$mPlugin.querySelector('[data-btn="close"]');
		$mBtnPrev=$mPlugin.querySelector('[data-btn="prev"]');
		$mBtnNext=$mPlugin.querySelector('[data-btn="next"]');
		if(mDatas.mode) $mPlugin.addClass(mDatas.mode);
		
		/*플러그인 사이즈 전달*/
		updateSize();
		/*섬네일 만들기*/
		if(mDatas.pageList){
			makeThumbs(mDatas.pageList);
		};
		/*이벤트 등록*/
		addEvents();
	},
	/**
	 * 페이지가 변경 될 때 
	 */
	change:function(pages){
		if(pages){
			var page=pages[0];
			if(!page){
				page=pages[1];
			};
			if(page){
				var $item=$mThumbs.querySelector('[data-page="'+page+'"]');
				if($item){
					moveToItemIdx($item.attr('data-idx'));
				};
			};
		};
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		if($mThumbs){
			$mThumbs.querySelectorAll('[data-page]').off();
			$mThumbs=null;
		};
		if($mFnScroll){
			$mFnScroll.destroy();
			$mFnScroll=null;
		};
		if($mBtnClose){
			$mBtnClose.off();
			$mBtnClose=null;
		};
		if($mBtnPrev){
			$mBtnPrev.off();
			$mBtnPrev=null;
		};
		if($mBtnNext){
			$mBtnNext.off();
			$mBtnNext=null;
		};
		if($mPlugin){
			$mPlugin=null;
		};
		$mThumbList=null;
		mDatas=mRegist=mFormat=mPath=null;
		mMin=mMax=mPos=null;
		
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
	function addEvents(){
		
		$mFnScroll=$FN.Progress($mPlugin.querySelector('.thumbs-scroll'),{
			id:'thumbs-scroll',
			percent:mPercent,
			callback:callbackScroll/*end*/
		});
		$mFnScroll.start();
		
		$mBtnClose.on('click',function(){
			mDatas.messageMode='close';
			UTIL.message.parent(mDatas);
		});
		
		$mBtnPrev.on('click',function(){
			movePrevNext(-1);
		});
		$mBtnNext.on('click',function(){
			movePrevNext(1);
		});
	};
	function callbackScroll(datas){
		
		switch(datas.type){
			case 'down':
			case 'move':
				$mThumbs.css('left', mMax*datas.percent+'px');
			break;
		};
	};
	/**
	 * 섬네일 리스트 만들기 
	 */
	function makeThumbs(list){
		if(!list) return;
		
		var i=0, lens=list.length;
		var $li, $div, $img, $p;
		var page, pageIdx;
		var isOdd, mr;
		var $lastLi;
		for(i; i<lens; i++){
			page=list[i];
				
			if(!$li){
				$li=document.createElement('li');
				$li.attr('data-val', page).on('click', onThumbClick);
				$mThumbs.append($li);
			};
			
			/*섬네일 박스*/
			$div=document.createElement('div');
			$div.attr('data-page', page).attr('data-idx', i);
			$li.append($div);
			/*이미지*/
			$img=document.createElement('img');
			$img.src=mPath+page+mFormat;
			$div.append($img);
			/*페이지*/
			$p=document.createElement('p');
			$p.text(page);
			$div.append($p);
			
			$lastLi=$li;
			/*섬네일 박스 초기화*/
			if(page%2==1) $li=null;
			
			if(mDatas.page==page) pageIdx=i;
		};
		/*가로 모드 적용하기*/
		if(mDatas.mode=='hori'){
			
			/*아이템 크기 설정*/
			mItemW=$div.offsetWidth;
			mAdder=parseInt($lastLi.css('margin-left'));
			mPadding=parseInt($mThumbs.css('padding-left'));
			
			/*리스트 최대 크지 설정하기*/
			var tsW=mItemW*lens;
			var gapW=mAdder*(Math.ceil(lens/2)-1)+(mPadding*2);
			$mThumbs.css('width',(tsW+gapW)+'px');
			
			/*화면 크기 설정*/
			mMin=0;
			mMax=$mThumbList.offsetWidth-$mThumbs.offsetWidth;
			/*해당 아이템 센터로 보내기*/
			moveToItemIdx(pageIdx);
			
			
			/* 일반 스크롤 사용 시
			var l=(itemW*pageIdx)+(adder*Math.ceil(pageIdx/2));
			$mPlugin.scrollLeft=l;
			*/
		};
	};
	/**
	 * 해당 아이템 센터로 보내기 
	 */
	function moveToItemIdx(idx){
		if(idx){
			idx=parseInt(idx)-4;
			
			mPos=((mItemW*idx)+(mAdder*Math.ceil(idx/2)))*-1;
			mPercent=mPos/mMax;
			
			var pos=mMax*mPercent;
			
			if(pos>0){
				pos=0;
				mPercent=0;
			}else if(pos<mMax) {
				pos=mMax;
				mPercent=1;
			};
			$mThumbs.css('left', pos+'px');
			
			if($mFnScroll){
				$mFnScroll.change(mPercent);
			};
		};
	};
	
	function movePrevNext(d){
		
		var moveGap=((mItemW*2)+mAdder)*-d;
		var pos=parseInt($mThumbs.css('left'))+moveGap;
		
		if(pos>0){
			pos=0;
			mPercent=0;
		}else if(pos<mMax) {
			pos=mMax;
			mPercent=1;
		}else{
			mPercent=pos/mMax;
		};
		
		$mThumbs.css('left', pos+'px');
		
		if($mFnScroll){
			$mFnScroll.change(mPercent);
		};
	};
	
	/**
	 * 섬네일 클릭 이벤트 
	 */
	function onThumbClick(){
		mDatas.messageMode='gotoPage';
		mDatas.page=parseInt(this.attr('data-val'));
		UTIL.message.parent(mDatas);
	};
}());


