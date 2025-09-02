if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-1-7', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:54, target:gPath+'/'+gId, icon:'동기 유발', title:'이동 움직임을 연결하는 방법을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:54, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:54, target:gPath+'/'+gId, icon:'활동 1', title:'‘강 건너 보물 가져오기’ 하기'});
	step.push({info:iId, id:++gId, page:55, target:gPath+'/'+gId, icon:'활동 2', title:'‘산 넘고 데굴데굴 보물 가져오기’ 하기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:55, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'이동 움직임을 연결한 활동을 하면서 잘한 점과 더 노력해야 할 점을 말해 보기'});
