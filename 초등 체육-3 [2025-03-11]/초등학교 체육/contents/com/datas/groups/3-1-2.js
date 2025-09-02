if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-1-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:96, target:gPath+'/'+gId, icon:'동기 유발', title:'일상에서 이동하는 방법 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:96, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:96, target:gPath+'/'+gId, icon:'활동 1', title:'여러 가지 상황에서 할 수 있는 이동 움직임 알아보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:97, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'이동 움직임 표현을 더 재미있게 하는 방법을 친구들과 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:97, target:gPath+'/'+gId, icon:'정리', title:'이동 움직임 표현의 종류 이야기하기'});
