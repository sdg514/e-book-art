if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-1-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:46, target:gPath+'/'+gId, icon:'동기 유발', title:'방향 바꿔 달리기를 했던 경험을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:46, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:46, target:gPath+'/'+gId, icon:'활동 1', title:'방향 바꿔 달리기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:47, target:gPath+'/'+gId, icon:'활동 2', title:'‘신호에 맞추어 방향 바꿔 달리기’ 해 보기'});
	step.push({info:iId, id:++gId, page:47, target:gPath+'/'+gId, icon:'활동 3', title:'’지그재그 달리기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:47, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'자연 속에서 방향을 빠르게 바꾸어 달리는 동물을 찾아보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:47, target:gPath+'/'+gId, icon:'정리', title:'방향 바꿔 달리기를 잘하는 방법을 이야기해 보기'});
