if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-2-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:58, target:gPath+'/'+gId, icon:'동기 유발', title:'눈 감고 한 발로 섰을 때 몸의 어느 부분에 힘이 들어가는지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:58, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:58, target:gPath+'/'+gId, icon:'활동 1', title:'균형 잡기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:59, target:gPath+'/'+gId, icon:'활동 2', title:'‘동서남북 알밤 줍기’ 해 보기'});
	step.push({info:iId, id:++gId, page:59, target:gPath+'/'+gId, icon:'활동 3', title:'’한 발로 균형 잡기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:59, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'몸의 균형을 잃었을 때 다시 균형을 잡는 방법을 생각해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:59, target:gPath+'/'+gId, icon:'정리', title:'균형 잡기를 잘하는 방법을 이야기해 보기'});
