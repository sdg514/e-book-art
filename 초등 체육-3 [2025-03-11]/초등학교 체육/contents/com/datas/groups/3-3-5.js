if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-3-5', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:126, target:gPath+'/'+gId, icon:'동기 유발', title:'표현 단원에서 배운 내용 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:126, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:126, target:gPath+'/'+gId, icon:'활동 1', title:'정리해요'});	
	step.push({info:iId, id:++gId, page:127, target:gPath+'/'+gId, icon:'활동 2', title:'평가해요'});	
	step.push({info:iId, id:++gId, page:127, target:gPath+'/'+gId, icon:'활동 3', title:'실천해요'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:127, target:gPath+'/'+gId, icon:'정리', title:'표현 활동의 기본 움직임 이야기하기'});
