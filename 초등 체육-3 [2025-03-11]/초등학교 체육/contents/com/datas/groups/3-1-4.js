if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-1-4', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:100, target:gPath+'/'+gId, icon:'동기 유발', title:'일상생활에서 점핑과 호핑을 한 경험이 있는지 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:100, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:100, target:gPath+'/'+gId, icon:'활동 1', title:'트램펄린 위에 있다고 상상하면서 점핑과 호핑하기'});
	step.push({info:iId, id:++gId, page:101, target:gPath+'/'+gId, icon:'활동 2', title:'소리의 크기에 맞춰 점핑과 호핑으로 표현하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:101, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'점핑과 비슷한 움직임을 하는 동물 영상을 찾아보고 직접 표현하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:101, target:gPath+'/'+gId, icon:'정리', title:'점핑과 호핑 표현 방법'});
