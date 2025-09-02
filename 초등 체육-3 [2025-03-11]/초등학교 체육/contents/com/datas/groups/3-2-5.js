if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-2-5', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:116, target:gPath+'/'+gId, icon:'동기 유발', title:'다음 그림에 어울리는 비이동 움직임 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:116, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:116, target:gPath+'/'+gId, icon:'활동 1', title:'여러 가지 비이동 움직임을 활용하여 모둠별로 움직임 꽃바구니를 만들어 발표하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:117, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'친구들과 어울려 할 수 있는 비이동 움직임 표현 활동에는 어떤 것들이 있을지 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:117, target:gPath+'/'+gId, icon:'정리', title:'비이동 움직임 표현 정리하기'});
