if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-7', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:80, target:gPath+'/'+gId, icon:'동기 유발', title:'공을 튀기는 움직임을 잘하면 어떤 점이 좋을지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:80, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:80, target:gPath+'/'+gId, icon:'활동 1', title:'튀기기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:81, target:gPath+'/'+gId, icon:'활동 2', title:'‘양손으로 공 두 개 튀기기’ 해 보기'});
	step.push({info:iId, id:++gId, page:81, target:gPath+'/'+gId, icon:'활동 3', title:'’라켓으로 셔틀콕 튀기기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:81, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'튀기기 활동에 열심히 참여한 친구를 찾아 칭찬해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:81, target:gPath+'/'+gId, icon:'정리', title:'도구를 사용하여 다양하게 튀기는 방법을 이야기해 보기'});
