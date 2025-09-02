if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:68, target:gPath+'/'+gId, icon:'동기 유발', title:'도구를 다루며 움직였던 경험을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:68, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:68, target:gPath+'/'+gId, icon:'활동 1', title:'‘풍선 튀기기’ 게임을 하며 조작 움직임을 하기'});
	step.push({info:iId, id:++gId, page:68, target:gPath+'/'+gId, icon:'활동 2', title:'조작 움직임 종류를 알아보기'});
	step.push({info:iId, id:++gId, page:69, target:gPath+'/'+gId, icon:'활동 3', title:'다음 운동선수의 조작 움직임을 살펴보고 빈칸의 말을 따라 써 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:69, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'가족이나 친구들과 함께 도구를 사용하여 게임을 했던 경험을 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:69, target:gPath+'/'+gId, icon:'정리', title:'조작 움직임의 의미와 종류 확인하기'});
