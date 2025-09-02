if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-8', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:82, target:gPath+'/'+gId, icon:'동기 유발', title:'공을 몰기 위해 사용하는 신체 부위는 어디인지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:82, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:82, target:gPath+'/'+gId, icon:'활동 1', title:'몰기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:83, target:gPath+'/'+gId, icon:'활동 2', title:'‘플로어볼 채로 공 몰기’ 게임을 해 보기'});
	step.push({info:iId, id:++gId, page:83, target:gPath+'/'+gId, icon:'활동 3', title:'’럭비공 몰기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:83, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'친구들과 함께 도구를 사용하는 공 몰기 게임을 해 보고 느낀 점을 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:83, target:gPath+'/'+gId, icon:'정리', title:'도구를 사용하게 다양하게 공을 모는 방법을 이야기해 보기'});
