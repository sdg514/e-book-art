if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-5', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:32, target:gPath+'/'+gId, icon:'동기 유발', title:'술래를 정해 술래잡기 놀이를 한 후 필요한 운동 능력 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:32, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:32, target:gPath+'/'+gId, icon:'활동 1', title:'왕복달리기 하기'});
	step.push({info:iId, id:++gId, page:32, target:gPath+'/'+gId, icon:'활동 2', title:'‘동서남북 달리기’ 하기'});
	step.push({info:iId, id:++gId, page:33, target:gPath+'/'+gId, icon:'활동 3', title:'‘접시콘 나르기‘ 게임 하기'});
	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:33, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'왕복달리기가 체력을 기르는 데 어떤 도움을 주는지 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:33, target:gPath+'/'+gId, icon:'정리', title:'왕복달리기 운동 방법 이야기하기'});
