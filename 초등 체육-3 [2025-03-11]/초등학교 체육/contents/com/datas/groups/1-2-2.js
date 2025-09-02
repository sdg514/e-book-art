if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:26, target:gPath+'/'+gId, icon:'동기 유발', title:'오래 달리거나 걷기를 한 경험 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:26, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:26, target:gPath+'/'+gId, icon:'활동 1', title:'오래 달리거나 걷기 하기'});
	step.push({info:iId, id:++gId, page:27, target:gPath+'/'+gId, icon:'활동 2', title:'‘손뼉맞장구 협력 달리기‘ 게임 하기'});
	step.push({info:iId, id:++gId, page:27, target:gPath+'/'+gId, icon:'활동 3', title:'‘한마음 오래달리기‘ 게임 하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:27, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'주변에서 오래 달리거나 걷기를 하기에 알맞은 장소를 찾아 소개하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:27, target:gPath+'/'+gId, icon:'정리', title:'오래 달리거나 걷기 운동 방법 이야기하기'});
