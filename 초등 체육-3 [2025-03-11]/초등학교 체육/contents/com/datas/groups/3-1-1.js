if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-1-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:92, target:gPath+'/'+gId, icon:'동기 유발', title:'그림 속 활동 살펴보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:92, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:93, target:gPath+'/'+gId, icon:'활동 1', title:'단원의 학습 목표 살펴보기'});
	step.push({info:iId, id:++gId, page:94, target:gPath+'/'+gId, icon:'활동 2', title:'만화를 보며 표현 활동에 대해 생각하기'});
	step.push({info:iId, id:++gId, page:95, target:gPath+'/'+gId, icon:'활동 3', title:'스스로 학습 계획 세우기'});
/*
info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:11, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'생각 쑥쑥 알아보기'});
*/
info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:95, target:gPath+'/'+gId, icon:'정리', title:'이 단원에서 배울 내용 확인하기'});
