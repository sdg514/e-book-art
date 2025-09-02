
/*=========
 GLASS
===========*/
P_GLASS=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	var mPath='../../html/ebook/turn/pages/';
	var mFormat='.jpg';
	
	/*화면 사이즈*/
	var mSize={w:1920,h:1080};
	var mLimit={min:0,max:1080};
	
	/*아이템 정보*/
	var mContentSize={w:0,h:0};
	var mToolSize={w:0,h:0};
	var mViewSize={w:0,h:0};
	
	var mZoomLimit={min:1,max:3};
	var mPos={x:0,y:0};
	var mPercent={x:0,y:0};
	var mZoom=2;
	var mCnt;
	var mMax;
	/*객체 정보*/
	var $mBook;
	var $mPlugin;
	var $mTools, $mTitle, $mView, $mContent, $mProgress, $mBtnClose;
	var $mFnDragView, $mFnDragTitle, $mFnPgs;
	
return{
	/**
	 * 초기 설정 
	 */
	init:function($book,size){
		$mBook=$book;
		mSize=size;
		return this;
	},
	/**
	 * 시작하기 
	 */
	start:function($plugin, datas){
		/*셋팅 데이터*/
		mDatas=datas;
		mRegist=mDatas.regist+'.plugin.glass';
		
		/*데이터 불러오기*/
		loadGlassInfo();
		
		makeGlassElement($plugin);
		
		/*기능 실행*/
		changeZoom();
		setContentImg();
		addEvents();
		
		return this;
	},
	/**
	 * 숨기기 
	 */
	hide:function(){
		if($mPlugin) $mPlugin.hide();
		return this;
	},
	/**
	 * 보이기
	 */
	show:function(){
		if($mPlugin) $mPlugin.show();
		return this;
	},
	/**
	 * 이미지 변경하기 
	 */
	change:function(pages){
		if(mDatas&&pages){
			mDatas.pages=pages;
			setContentImg();
		};
		return this;
	},
	/**
	 * 닫기 
	 */
	close:function(){
		
		if($mBtnClose){
			$mBtnClose.off();
			$mBtnClose=null;
		};
		if($mFnDragView){
			$mFnDragView.destroy();
			$mFnDragView=null;
		};
		if($mFnDragTitle){
			$mFnDragTitle.destroy();
			$mFnDragTitle=null;
		};
		if($mFnPgs){
			$mFnPgs.destroy();
			$mFnPgs=null;
		};
		$mPlugin=$mTools=$mTitle=$mView=$mContent=$mProgress=null;
		
		if(mDatas){
			PLUGIN.remove(mDatas.id);
			mDatas=null;
		};
		mRegist=null;
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		
		P_GLASS.close();
		mPath=mFormat=mZoomLimit=mContentSize=mViewSize=mPos=mZoom=mCnt=mMax=null;
	}/*end*/
};
	/*=========
	 플러그인 함수 
	===========*/
	function makeGlassElement($plugin){
		if(!$plugin) return;
		
		/*메모 객체*/
		$mPlugin=$plugin;
		
		var html='<div class="plugin-glass">';
			    html+='<div class="tools">';
			        html+='<p class="title">돋보기</p>';
	                html+='<div class="progress"></div>';
	                html+='<div class="btn-close"></div>';
	            html+='</div>';
				html+='<div class="view">';
				    html+='<div class="content">';
	                    html+='<div class="img l"></div>';
	                    html+='<div class="img r"></div>';
	               html+=' </div>';
				html+='</div>';
			html+='</div>';
		$mPlugin.innerHTML=html;
		
		/*툴 객체*/
		$mTools=$mPlugin.querySelector('.tools');
		$mTitle=$mTools.querySelector('.title');
		$mProgress=$mTools.querySelector('.progress');
		$mBtnClose=$mTools.querySelector('.btn-close');
		/*뷰 객체*/
		$mView=$mPlugin.querySelector('.view');
		$mContent=$mView.querySelector('.content');
		
		mToolSize.w=parseInt($mTools.css('width'));
		mToolSize.h=parseInt($mTools.css('height'));
		mViewSize.w=parseInt($mView.css('width'));
		mViewSize.h=parseInt($mView.css('height'));
		mContentSize.w=parseInt($mContent.css('width'));
		mContentSize.h=parseInt($mContent.css('height'));
		
		mLimit.min=-mToolSize.h;
		mLimit.max=mSize.h-mToolSize.h-mViewSize.h;
	};
	/**
	 * 버튼 이벤트 등록하기 
	 */
	function addEvents(){
		
		/*초기 설정*/
		mCnt=mZoom-mZoomLimit.min;
		mMax=mZoomLimit.max-mZoomLimit.min;
		
		$mFnPgs=$FN.Progress($mProgress,{
			mode:'ball'/*end*/
		}).change(mCnt/mMax).start(function(datas){
			mCnt=mMax*datas.percent;
			mZoom=mCnt+mZoomLimit.min;
			/*이미지 줌하기*/
			changeZoom();
			/*이미지 위치 변경*/
			moveContentImg();
		});
		
		/*드래그 객체 만들기*/
		$mFnDragView=$FN.Drag($mView,{
			target:$mPlugin,
			zIndex:true/*end*/
		}).start(function(datas){
			switch(datas.type){
				case 'move':
					onPluginDrag();
				break;
			};
		});
		$mFnDragTitle=$FN.Drag($mTitle,{
			target:$mPlugin,
			zIndex:true/*end*/
		}).start(function(datas){
			switch(datas.type){
				case 'move':
					onPluginDrag();
				break;
			};
		});
		
		/*버튼 이벤트 등록*/
		$mBtnClose.on('click',function(){
			P_GLASS.close();
		});
	};
	function onPluginDrag(){
		/*화면 이동 제한*/
		var x=parseInt($mPlugin.css('left'));
		var y=parseInt($mPlugin.css('top'));
		if(y<mLimit.min){
			y=mLimit.min;
			$mPlugin.css('top', y+'px');
		}else if(y>mLimit.max){
			y=mLimit.max;
			$mPlugin.css('top', y+'px');
		}; 
		/*데이터 등록*/
		mDatas.x=x;
		mDatas.y=y;
		/*화면 이미지 이동하기*/
		moveContentImg();
		/*변경된 정보 저장하기*/
		PLUGIN.saveInfo(mDatas.id, mDatas);
	};
	/**
	 * 화면 이미지 설정 
	 */
	function setContentImg(){
		/*이미지 좌우 가져오기*/
		var $imgL=$mContent.querySelector('.img.l');
		var $imgR=$mContent.querySelector('.img.r');
		/*페이지 정보 가져오기*/
		if(mDatas.pages){
			var srcL=mDatas.pages[0];
			var srcR=mDatas.pages[1];
			if(srcL){
				$imgL.css('background-image','url("'+mPath+srcL+mFormat+'")');
			}else{
				$imgL.hide();
			};
			if(srcR){
				$imgR.css('background-image','url("'+mPath+srcR+mFormat+'")');
			}else{
				$imgR.hide();
			};
		};
		/*저장된 페이지 위치 시키기*/
		$mContent.css({left:mPos.x+'px',top:mPos.y+'px'});
	};
	/**
	 * 화면 이미지 위치 변경 
	 */
	function moveContentImg(){
		/*각 객체의 정보 가져오기*/
		var rectBook=$mBook.getBoundingClientRect();
		var rectGlass=$mView.getBoundingClientRect();
		/*이동 제한 크기*/
		var minX=0;
		var maxX=rectBook.width-rectGlass.width;
		var minY=0;
		var maxY=rectBook.height-rectGlass.height;
		/*이동 퍼센트 정보*/
		mPercent.x=(rectGlass.left-rectBook.left)/maxX;
		mPercent.y=(rectGlass.top-rectBook.top)/maxY;
		/*화면 위치 설정*/
		var cMaxX=(mContentSize.w*mZoom)-mViewSize.w;
		var cMaxY=(mContentSize.h*mZoom)-mViewSize.h;
		
		mPos.x=cMaxX*-mPercent.x;
		mPos.y=cMaxY*-mPercent.y;
		
		$mContent.css({left:mPos.x+'px',top:mPos.y+'px'});
		/*설정 저장하기*/
		saveGlassInfo();
	};
	/**
	 * 이미지 확대하기 
	 */
	function changeZoom(){
		/*이미지 확대하기*/
		UTIL.change.scale($mContent,mZoom,mZoom);
		/*데이터 저장하기*/
		saveGlassInfo();
	};
	/**
	 * 데이터 저장하기 
	 */
	function saveGlassInfo(){
		EXE.saveValue(mRegist, mZoom+'◈'+mPos.x+'◈'+mPos.y);
	};
	/**
	 * 데이터 불러오기 
	 */
	function loadGlassInfo(){
		var r=EXE.loadValue(mRegist);
		if(r){
			var arr=r.split('◈');
			if(arr.length==3){
				mZoom=parseFloat(arr[0]);
				mPos.x=parseInt(arr[1]);
				mPos.y=parseInt(arr[2]);
			};
		};
	};
}());

