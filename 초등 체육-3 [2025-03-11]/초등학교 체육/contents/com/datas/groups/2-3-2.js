if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:70, target:gPath+'/'+gId, icon:'동기 유발', title:'야구, 농구 등의 스포츠 경기를 함께 보고, 동영상에 등장하는 선수들 움직임의 공통점을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:70, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:70, target:gPath+'/'+gId, icon:'활동 1', title:'던지기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:71, target:gPath+'/'+gId, icon:'활동 2', title:'‘공 던지기’ 해 보기'});
	step.push({info:iId, id:++gId, page:71, target:gPath+'/'+gId, icon:'활동 3', title:'’바구니에 던져라’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:71, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'스포츠 활동에서 사용되는 던지기 도구를 더 찾아 써 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:71, target:gPath+'/'+gId, icon:'정리', title:'도구를 사용하여 다양하게 던지는 방법을 이야기해 보기'});
