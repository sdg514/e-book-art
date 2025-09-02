if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-6-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:64, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});
	step.push({info:iId, id:++gId, page:64, target:gPath+'/'+gId, icon:'살펴보기', title:'자기 느낌과 생각에 귀 기울이기'});
	step.push({info:iId, id:++gId, page:64, target:gPath+'/'+gId, icon:'학습할 용어', title:'학습할 용어 알아보기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:65, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:65, target:gPath+'/'+gId, icon:'활동하기 1', title:'미술 작품에 대한 느낌과 생각 말하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:65, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
