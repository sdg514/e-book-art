if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-7-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:32, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});
	step.push({info:iId, id:++gId, page:32, target:gPath+'/'+gId, icon:'살펴보기', title:'미술관은 어떤 곳인지 알아보기'});
	step.push({info:iId, id:++gId, page:32, target:gPath+'/'+gId, icon:'학습할 용어', title:'학습할 용어 알아보기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:33, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:33, target:gPath+'/'+gId, icon:'활동하기 1', title:'미술관 이용 방법과 관람 예절 알아보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:33, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
