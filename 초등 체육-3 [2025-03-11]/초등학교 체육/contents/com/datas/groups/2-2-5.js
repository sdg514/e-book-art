if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-2-5', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:64, target:gPath+'/'+gId, icon:'동기 유발', title:'물놀이 할 때 주의해야 할 점을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:64, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:64, target:gPath+'/'+gId, icon:'활동 1', title:'주변의 도움을 받아 물에 뜨기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:65, target:gPath+'/'+gId, icon:'활동 2', title:'혼자 물에 뜨기를 익혀 보기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:65, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'물에 잘 뜰 수 있는 방법을 대화형 인공지능에게 물어보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:65, target:gPath+'/'+gId, icon:'정리', title:'물에 잘 뜨는 방법을 이야기해 보기'});
