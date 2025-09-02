if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-5', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:76, target:gPath+'/'+gId, icon:'동기 유발', title:'손으로 공이나 도구를 잡았던 경험을 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:76, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:76, target:gPath+'/'+gId, icon:'활동 1', title:'잡기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:77, target:gPath+'/'+gId, icon:'활동 2', title:'‘콩 주머니 잡기’ 해 보기'});
	step.push({info:iId, id:++gId, page:77, target:gPath+'/'+gId, icon:'활동 3', title:'’원반 던지고 잡기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:77, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'도구의 종류에 따라 안전하게 잡을 수 있는 손 모양을 만들어 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:77, target:gPath+'/'+gId, icon:'정리', title:'도구를 다양하게 잡는 방법을 이야기해 보기'});
