/*=========
 LISTENER
===========*/
UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms&&ms.messageType=='plugin'){
		switch(ms.messageMode){
			case 'load':
				LOAD.start(ms);
			break;
			case 'unload':
				LOAD.destroy();
			break;
		};
	};
});
/*=========
 LOAD
===========*/
LOAD=(function(){
	/*기본 정보*/
	var mDatas,mRegist;
	/*객체 정보*/
	var $mPlugin,$mBtnClose;
	
	var mLoadDatas;
return{
	/**
	 * 시작하기 
	 */
	start:function(ms){
		/*효과음 초기 위치 설정*/
		EFFECT.path('../../../files/effects/');
		/*셋팅 데이터*/
		mDatas=ms;
		mRegist=mDatas.project+'.plugin.study.info';
		/*메모 객체*/
		$mPlugin=document.querySelector('#plugin');
		
		startLoad();
		
		/*플러그인 사이즈 전달*/
		updateSize();
	},
	/**
	 * 제거하기 
	 */
	destroy:function(){
		EFFECT.destroy();
		
		document.querySelectorAll('[data-btn]').off();
		
		mLoadDatas=null;
		mDatas=null;
		mRegist=null;
		$mPlugin=null;
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
	
	function sandDatas(idx){
		
		if(mLoadDatas && idx){
			
			idx=parseInt(idx);
			var obj=mLoadDatas[idx];
			
			obj.messageType='plugin';
			obj.messageMode='gotoContent';
			UTIL.message.parent(obj);
		};
	};
	
	function startLoad(){
		
		document.querySelectorAll('[data-btn]').on('click',function(){
			switch(this.attr('data-btn')){
				case 'close':
					mDatas.messageMode='close';
					UTIL.message.parent(mDatas);
				break;
				case 'remove':
					removeDatas();
				break;
			};
		});
		
		mLoadDatas=getLoadDatas();
		if(mLoadDatas.length>0){
			makeLoadList();
		};
	};
	
	function makeLoadList(){
		document.querySelector('.body>.note').remove();
		
		var $list=document.querySelector('#list');
		$list.empty();
		
		var i=0, lens=mLoadDatas.length;
		for(i; i<lens; i++){
			addItem(mLoadDatas[i],i);
		};
		
		function addItem(obj,idx){
			
			var $item=document.createElement('li');
			$item.attr('data-item', idx);
			$list.append($item);
			
			var $p=document.createElement('p');
			$item.append($p);
			
			var $check=document.createElement('span');
			$check.attr('data-btn', 'checkbox');
			$p.append($check);
			$check.on('click', onCheckClick);
			
			var $title=document.createElement('span');
			if(obj.note){
				$title.text(obj.note);
			};
			$p.append($title);
			
			$item.on('click', onClick);
		};
		
		function onCheckClick(){
			event.stopPropagation();
			event.preventDefault();
			
			if(this.hasClass('switch')){
				this.removeClass('switch');
			}else{
				this.addClass('switch');
			};
		};
		function onClick(){
			sandDatas(this.attr('data-item'));
		};
	};
	
	function removeDatas(){
		var $checks=document.querySelectorAll('[data-btn="checkbox"].switch');
		if($checks){
			var $check;
			for(var i=0; i<$checks.length; i++){
				$check=$checks[i];
				if($check) $check.parentNode.parentNode.remove();
			};
		};
		
		var $items=document.querySelectorAll('[data-item]');
		if($items){
			
			var saveStr='';
			var $i;
			var addStr;
			for(var i=0; i<$items.length; i++){
				
				var $i=$items[i];
				if($i){
					var idx=$i.attr('data-item');
					if(idx){
						idx=parseInt(idx);
						addStr=getObjStr(mLoadDatas[idx]);
						if(addStr){
							if(saveStr!='') saveStr+='▣';
							saveStr+=addStr;
						};
					};
				};
			};
			
			if(saveStr){
				EXE.saveValue(mRegist, saveStr);
			};
		};
		
		function getObjStr(obj){
			var str='';
			if(obj){
				for(var v in obj){
					if(str!='') str+='◈';
					str+=v+':'+obj[v];
				};
			};
			return str;
		};
	};
	
	function getLoadDatas(){
		
		var returnArr=[];
		var str=EXE.loadValue(mRegist);
		
		if(str){
			var arr=str.split('▣');
			if(arr){
				var datas, d, n, v, obj;
				for(var i=0; i<arr.length; i++){
					datas=arr[i];
					if(datas){
						datas=datas.split('◈');
						obj={};
						for(var k=0; k<datas.length; k++){
							d=datas[k];
							if(d){
								d=d.split(':');
								if(d.length==2){
									if(d[0]=='depths'){
										obj[d[0]]=UTIL.change.arrayToInt(d[1].split(','));
									}else{
										obj[d[0]]=d[1];
									};
								};
							};
						};
						returnArr.push(obj);
					};
				};
			};
		};
		
		return returnArr;
	};
}());


