if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-2-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:56, target:gPath+'/'+gId, icon:'동기 유발', title:'앉은 자세로 할 수 있는 움직임을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:56, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:56, target:gPath+'/'+gId, icon:'활동 1', title:'‘공 전달하기’를 하며 비이동 움직임을 해 보기'});
	step.push({info:iId, id:++gId, page:57, target:gPath+'/'+gId, icon:'활동 2', title:'비이동 움직임 종류를 알아보기'});
	step.push({info:iId, id:++gId, page:57, target:gPath+'/'+gId, icon:'활동 3', title:'다음 운동선수의 비이동 움직임을 살펴보고 빈칸의 말을 따라 써 보기 '});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:57, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'생활 속에서 비이동 움직임이 필요했던 경험을 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:57, target:gPath+'/'+gId, icon:'정리', title:'비이동 움직임의 의미와 종류를 확인하기'});
