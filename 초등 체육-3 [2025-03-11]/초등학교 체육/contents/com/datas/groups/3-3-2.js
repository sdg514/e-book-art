if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-3-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:120, target:gPath+'/'+gId, icon:'동기 유발', title:'바다를 표현한 명화를 감상하고 명화 속에서 발견할 수 있는 것 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:120, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:120, target:gPath+'/'+gId, icon:'활동 1', title:'바닷가를 상상하며 도구를 들고 돌리며 표현하기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:121, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'바닷가 장면을 표현하기 위해 선택한 도구에서 잘된 점과 아쉬운 점은 무엇인지 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:121, target:gPath+'/'+gId, icon:'정리', title:'도구를 들고 돌리며 표현하는 방법'});
