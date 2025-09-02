if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-1-4', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:16, target:gPath+'/'+gId, icon:'동기 유발', title:'체육 활동 시 많이 하는 동작 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:16, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:16, target:gPath+'/'+gId, icon:'활동 1', title:'걷고 달리는 움직임 하기'});
	step.push({info:iId, id:++gId, page:17, target:gPath+'/'+gId, icon:'활동 2', title:'‘빠르게 이어 걷기‘ 게임 하기'});
	step.push({info:iId, id:++gId, page:17, target:gPath+'/'+gId, icon:'활동 3', title:'‘세계로 달리기‘ 하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:17, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'걷고 달리기를 한 후 심박수 세어 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:17, target:gPath+'/'+gId, icon:'정리', title:'걷고 달리는 자세 알아보기'});
