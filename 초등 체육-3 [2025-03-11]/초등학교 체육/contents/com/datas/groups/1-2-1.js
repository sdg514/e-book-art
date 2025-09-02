if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:24, target:gPath+'/'+gId, icon:'동기 유발', title:'자신의 체력 수준 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:24, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:24, target:gPath+'/'+gId, icon:'활동 1', title:'자신의 체력 수준 측정하기'});
	step.push({info:iId, id:++gId, page:25, target:gPath+'/'+gId, icon:'활동 2', title:'자신의 기록을 측정하고 목표 기록 정하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:25, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'목표 기록을 달성하기 위한 다양한 운동 찾아보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:25, target:gPath+'/'+gId, icon:'정리', title:'자신의 기록을 측정하고 목표 기록 세우는 방법 알아보기'});
