if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-3-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:118, target:gPath+'/'+gId, icon:'동기 유발', title:'여러 가지 도구를 가지고 움직였던 경험 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:118, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:118, target:gPath+'/'+gId, icon:'활동 1', title:'도구의 특성을 생각하며 다양한 움직임 알아보기'});
	step.push({info:iId, id:++gId, page:119, target:gPath+'/'+gId, icon:'활동 2', title:'움직임 요소에 따라 조작 움직임 표현하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:119, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'도구를 활용한 움직임을 인터넷에서 찾아보고 나의 움직임과 어떻게 다른지 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:119, target:gPath+'/'+gId, icon:'정리', title:'도구의 특성을 생각하며 조작 움직임을 표현한 후의 느낌 이야기하기'});
