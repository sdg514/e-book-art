if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-1-6', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:52, target:gPath+'/'+gId, icon:'동기 유발', title:'물놀이 했던 경험을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:52, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:52, target:gPath+'/'+gId, icon:'활동 1', title:'수영장에서 지켜야 할 점을 살펴보고, 그림의 상황에 알맞은 붙임딱지를 붙여 보기'});
	step.push({info:iId, id:++gId, page:53, target:gPath+'/'+gId, icon:'활동 2', title:'물에서 이동하기를 익혀보기'});
	step.push({info:iId, id:++gId, page:53, target:gPath+'/'+gId, icon:'활동 3', title:'‘훌라후프 통과하기’ 하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:53, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'물속과 물 밖에서 몸의 움직임이 어떻게 다른지 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:53, target:gPath+'/'+gId, icon:'정리', title:'물에서 안전하게 움직이기 위해 지켜야 할 점을 이야기해 보기'});
