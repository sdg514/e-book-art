if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-6', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:34, target:gPath+'/'+gId, icon:'동기 유발', title:'지금까지 배운 체력 운동 중 나에게 필요한 운동 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:34, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:34, target:gPath+'/'+gId, icon:'활동 1', title:'나에게 부족한 운동을 찾고 그 까닭 쓰기'});
	step.push({info:iId, id:++gId, page:35, target:gPath+'/'+gId, icon:'활동 2', title:'나에게 알맞은 운동 계획을 세워 실천하기'});
	step.push({info:iId, id:++gId, page:35, target:gPath+'/'+gId, icon:'활동 3', title:'스마트 기기 응용 프로그램을 활용하여 건강 관리하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:35, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'체력 운동 계획을 세울 때 주의해야 할 점 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:35, target:gPath+'/'+gId, icon:'정리', title:'운동 계획표 작성하는 방법 알아보기'});
