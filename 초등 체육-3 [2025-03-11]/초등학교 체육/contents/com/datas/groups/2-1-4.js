if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-1-4', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:48, target:gPath+'/'+gId, icon:'동기 유발', title:'뛰기를 했던 경험을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:48, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:48, target:gPath+'/'+gId, icon:'활동 1', title:'뛰기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:49, target:gPath+'/'+gId, icon:'활동 2', title:'‘징검다리 건너기’ 해 보기'});
	step.push({info:iId, id:++gId, page:49, target:gPath+'/'+gId, icon:'활동 3', title:'’폴짝폴짝 뛰어넘어요’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:49, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'더 멀리, 더 높이 뛰기 위해 노력한 친구에게 칭찬의 말을 해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:49, target:gPath+'/'+gId, icon:'정리', title:'뛰기를 하는 여러 가지 방법을 이야기해 보기'});
