if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-2-4', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:62, target:gPath+'/'+gId, icon:'동기 유발', title:'주변에서 회전하는 물체 찾아보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:62, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:62, target:gPath+'/'+gId, icon:'활동 1', title:'회전하기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:63, target:gPath+'/'+gId, icon:'활동 2', title:'‘뒤돌아 박수 치기’ 해 보기'});
	step.push({info:iId, id:++gId, page:63, target:gPath+'/'+gId, icon:'활동 3', title:'’팽이처럼 회전하기’ 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:63, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'천천히 회전할 때와 빠르게 회전할 때 중에서 어느 때 잘 회전할 수 있을지 친구들과 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:63, target:gPath+'/'+gId, icon:'정리', title:'회전하기를 잘하는 방법을 이야기해 보기'});
