if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-2-6', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:66, target:gPath+'/'+gId, icon:'동기 유발', title:'이 단원에서 배운 움직임을 떠올려 보고, 어떤 움직임 기술을 배웠는지 생각해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:66, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:66, target:gPath+'/'+gId, icon:'활동 1', title:'‘협동 바람의 숲 건너기’ 하기'});
	step.push({info:iId, id:++gId, page:67, target:gPath+'/'+gId, icon:'활동 2', title:'‘회오리바람 속 그대로 멈춰라’ 하기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:67, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'친구들과 비이동 움직임을 연결하는 활동을 하면서 느낀 점을 발표해 보기'});
