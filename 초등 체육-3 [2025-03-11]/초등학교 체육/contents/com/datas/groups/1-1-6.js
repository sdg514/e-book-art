if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-1-6', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:20, target:gPath+'/'+gId, icon:'동기 유발', title:'버티기나 굽히기를 해 본 경험 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:20, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:20, target:gPath+'/'+gId, icon:'활동 1', title:'버티기나 굽히는 움직임 하기'});
	step.push({info:iId, id:++gId, page:21, target:gPath+'/'+gId, icon:'활동 2', title:'‘앉아서 허리 굽혀 공 전달하기‘ 하기'});
	step.push({info:iId, id:++gId, page:21, target:gPath+'/'+gId, icon:'활동 3', title:'‘멈춰 버린 친구를 구해라’ 하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:21, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'버티기나 굽히는 활동을 할 때 몸의 어느 부분에 힘이 들어갔는지 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:21, target:gPath+'/'+gId, icon:'정리', title:'버티기나 굽히기의 효과 알아보기'});
