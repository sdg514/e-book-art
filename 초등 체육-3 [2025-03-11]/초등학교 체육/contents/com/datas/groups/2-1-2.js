if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-1-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:44, target:gPath+'/'+gId, icon:'동기 유발', title:'평소에 몸을 움직였던 경험을 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:44, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:44, target:gPath+'/'+gId, icon:'활동 1', title:'‘만나서 가위바위보’ 게임을 하며 이동 움직임을 하기'});
	step.push({info:iId, id:++gId, page:45, target:gPath+'/'+gId, icon:'활동 2', title:'이동 움직임 종류를 알아보기'});
	step.push({info:iId, id:++gId, page:45, target:gPath+'/'+gId, icon:'활동 3', title:'운동선수의 이동 움직임을 살펴보고 빈칸의 말을 따라 써 보기 '});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:45, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'이동 움직임을 활용한 스포츠 활동 경험을 발표해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:45, target:gPath+'/'+gId, icon:'정리', title:'이동 움직임의 의미와 종류 확인하기'});
