if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:28, target:gPath+'/'+gId, icon:'동기 유발', title:'팔굽혀 펴기 활동을 해 본 경험 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:28, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:28, target:gPath+'/'+gId, icon:'활동 1', title:'팔굽혀 펴기 알아보기'});
	step.push({info:iId, id:++gId, page:28, target:gPath+'/'+gId, icon:'활동 2', title:'다양한 팔굽혀 펴기 동작 하기'});
	step.push({info:iId, id:++gId, page:29, target:gPath+'/'+gId, icon:'활동 3', title:'친구와 역할을 나누어 팔굽혀 펴기 측정하기'});
	step.push({info:iId, id:++gId, page:29, target:gPath+'/'+gId, icon:'활동 4', title:'‘팔굽혀 펴면서 땅 치기‘ 하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:29, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'팔의 간격을 넓히거나 좁히면서 팔굽혀 펴기 더 해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:29, target:gPath+'/'+gId, icon:'정리', title:'팔굽혀 펴기 운동 방법과 유의할 점 이야기하기'});
