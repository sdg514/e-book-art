if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-2-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:60, target:gPath+'/'+gId, icon:'동기 유발', title:'우리 몸에서 구부릴 수 있는 곳을 찾아 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:60, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:60, target:gPath+'/'+gId, icon:'활동 1', title:'구부리기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:61, target:gPath+'/'+gId, icon:'활동 2', title:'‘손잡고 훌라후프 옮기기’를 해 보기'});
	step.push({info:iId, id:++gId, page:61, target:gPath+'/'+gId, icon:'활동 3', title:'’움직이는 줄 통과하기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:61, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'인공지능 동작 인식 프로그램을 이용하여 몸을 구부리는 동작을 관찰해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:61, target:gPath+'/'+gId, icon:'정리', title:'구부리기를 잘 하는 방법을 이야기해 보기'});
