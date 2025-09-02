if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-1-5', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:50, target:gPath+'/'+gId, icon:'동기 유발', title:'우리 주위에서 찾을 수 있는 잘 굴러가는 물체에는 무엇이 있는지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:50, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:50, target:gPath+'/'+gId, icon:'활동 1', title:'구르기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:51, target:gPath+'/'+gId, icon:'활동 2', title:'‘친구와 함께 구르기’ 해 보기'});
	step.push({info:iId, id:++gId, page:51, target:gPath+'/'+gId, icon:'활동 3', title:'’주사위 구르기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:51, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'구르기가 필요한 스포츠 종목 찾아보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:51, target:gPath+'/'+gId, icon:'정리', title:'구르기를 잘 하는 방법을 이야기해 보기'});
