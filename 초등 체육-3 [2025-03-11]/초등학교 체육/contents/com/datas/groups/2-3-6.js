if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-6', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:78, target:gPath+'/'+gId, icon:'동기 유발', title:'테니스, 탁구, 하키 경기 영상을 함께 보고 공통적으로 볼 수 있는 선수들의 움직임에는 무엇이 있는지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:78, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:78, target:gPath+'/'+gId, icon:'활동 1', title:'치기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:79, target:gPath+'/'+gId, icon:'활동 2', title:'‘멀리 치기’ 게임을 해 보기'});
	step.push({info:iId, id:++gId, page:79, target:gPath+'/'+gId, icon:'활동 3', title:'‘도구로 슛 골인’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:79, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'도구를 사용하여 치기 활동을 할 때 주의해야 할 점을 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:79, target:gPath+'/'+gId, icon:'정리', title:'도구를 사용하여 치는 방법 이야기하기'});
