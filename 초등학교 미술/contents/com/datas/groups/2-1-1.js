if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-1-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:42, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});
	step.push({info:iId, id:++gId, page:42, target:gPath+'/'+gId, icon:'살펴보기', title:'흙의 쓰임 알아보기'});
	step.push({info:iId, id:++gId, page:42, target:gPath+'/'+gId, icon:'학습할 용어', title:'학습할 용어 알아보기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:43, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:43, target:gPath+'/'+gId, icon:'활동하기 1', title:'찰흙을 탐색하고 표현 방법 익히기'});
	step.push({info:iId, id:++gId, page:43, target:gPath+'/'+gId, icon:'활동하기 1', title:'찰흙 주걱의 쓰임'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:43, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
