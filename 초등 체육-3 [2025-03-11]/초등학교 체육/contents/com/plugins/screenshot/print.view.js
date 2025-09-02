
var mA4={w:763, h:1113};
var mPath='../../../html/ebook/turn/pages/';
var mFormat='.jpg';

UTIL.message.listener(function(e){
	var ms=e.data;
	if(ms!=null){
		switch(ms.messageMode){
			case 'change':
				initPrint(ms.url);
			break;
			case 'print':
				startPrintView();
			break;
		};
	};
});
/**
 * 인쇄 초기화 
 */
function initPrint(url){
	
	var $body=document.querySelector('body');
		$body.css({width:mA4.w+'px', height:mA4.h+'px'});
	/*페이지 리스트 만들기*/
	var $page=document.createElement('img');
	$page.src=url;
	$page.css({width:mA4.w+'px'});
	$body.append($page);
};
/**
 * 인쇄하기 
 */
function startPrintView(){
	document.execCommand('print', false, null) || window.print();
};