if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-3-4', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:124, target:gPath+'/'+gId, icon:'동기 유발', title:'짝을 이루어 제시하는 글자 만들기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:124, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:124, target:gPath+'/'+gId, icon:'활동 1', title:'몸 글자로 표현할 말 정하기'});	
	step.push({info:iId, id:++gId, page:124, target:gPath+'/'+gId, icon:'활동 2', title:'몸 글자에 알맞은 움직임 찾아보기'});	
	step.push({info:iId, id:++gId, page:125, target:gPath+'/'+gId, icon:'활동 3', title:'몸 글자 표현하기'});	
	step.push({info:iId, id:++gId, page:125, target:gPath+'/'+gId, icon:'활동 4', title:'누리 소통망 편지 쓰기'});	

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:125, target:gPath+'/'+gId, icon:'정리', title:'친구에게 전할 말을 움직임으로 표현하며 생각하거나 느낀 점 이야기하기'});
