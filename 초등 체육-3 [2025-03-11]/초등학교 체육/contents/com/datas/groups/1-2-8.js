if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-8', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:38, target:gPath+'/'+gId, icon:'동기 유발', title:'‘운동’ 단원에서 배운 내용 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:38, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:38, target:gPath+'/'+gId, icon:'활동 1', title:'정리해요'});
	step.push({info:iId, id:++gId, page:39, target:gPath+'/'+gId, icon:'활동 2', title:'평가해요'});
	step.push({info:iId, id:++gId, page:39, target:gPath+'/'+gId, icon:'활동 3', title:'실천해요'});
/*
info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:23, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'밀기와 당기기 동작 만들어서 동영상 촬영하기'});
*/
info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:39, target:gPath+'/'+gId, icon:'정리', title:'체력 운동 기본 움직임 기술의 종류와 체력 운동 기능의 종류 이야기하기'});
