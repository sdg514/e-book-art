if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-1-7', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:22, target:gPath+'/'+gId, icon:'동기 유발', title:'친구들과 줄다리기를 해 본 경험 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:22, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:22, target:gPath+'/'+gId, icon:'활동 1', title:'밀고 당기는 움직임 하기'});
	step.push({info:iId, id:++gId, page:23, target:gPath+'/'+gId, icon:'활동 2', title:'친구와 함께 밀고 당기기'});
	step.push({info:iId, id:++gId, page:23, target:gPath+'/'+gId, icon:'활동 3', title:'‘수건 당기기‘ 게임 하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:23, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'밀기와 당기기 동작 만들어서 동영상 촬영하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:23, target:gPath+'/'+gId, icon:'정리', title:'다양한 밀고 당기기 움직임 하기'});
