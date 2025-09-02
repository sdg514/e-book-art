if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-1-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:98, target:gPath+'/'+gId, icon:'동기 유발', title:'다음 표를 보고 여러 가지 걷는 방법 찾아보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:98, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:98, target:gPath+'/'+gId, icon:'활동 1', title:'다양한 방법으로 워킹하기'});
	step.push({info:iId, id:++gId, page:99, target:gPath+'/'+gId, icon:'활동 2', title:'친구들과 워킹으로 놀이 기차 표현하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:99, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'친구들과 함께 놀이 기차 워킹을 하면서 어려웠던 점 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:99, target:gPath+'/'+gId, icon:'정리', title:'친구와 함께 워킹하기'});
