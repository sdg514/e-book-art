if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-1-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:12, target:gPath+'/'+gId, icon:'동기 유발', title:'체력에 대한 경험 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:12, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:12, target:gPath+'/'+gId, icon:'활동 1', title:'꾸준한 체력 운동이 우리 몸에 미치는 영향 알아보기'});
	step.push({info:iId, id:++gId, page:13, target:gPath+'/'+gId, icon:'활동 2', title:'친구들과 함께 체력 운동을 해 보고 몸의 변화 기록하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:13, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'가족과 함께 운동하며 몸의 변화 느껴보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:13, target:gPath+'/'+gId, icon:'정리', title:'꾸준한 체력 운동이 우리 몸에 미치는 영향 이야기하기'});
