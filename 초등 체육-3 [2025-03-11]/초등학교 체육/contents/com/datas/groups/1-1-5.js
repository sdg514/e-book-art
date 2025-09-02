if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-1-5', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:18, target:gPath+'/'+gId, icon:'동기 유발', title:'매달리기를 잘하는 사람을 보면 어떤 생각이 드는지 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:18, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:18, target:gPath+'/'+gId, icon:'활동 1', title:'매달리는 움직임 하기'});
	step.push({info:iId, id:++gId, page:19, target:gPath+'/'+gId, icon:'활동 2', title:'오래 매달리기'});
	step.push({info:iId, id:++gId, page:19, target:gPath+'/'+gId, icon:'활동 3', title:'‘매달려서 가위바위보’ 하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:19, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'어떤 자세로 매달릴 때 가장 안정적으로 오래 매달릴 수 있는지 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:19, target:gPath+'/'+gId, icon:'정리', title:'매달리는 움직임을 하는 방법 알아보기'});
