if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-5-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:24, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표  확인하기'});
	step.push({info:iId, id:++gId, page:24, target:gPath+'/'+gId, icon:'살펴보기', title:'자연을 체험한 경험 떠올리기'});
	step.push({info:iId, id:++gId, page:24, target:gPath+'/'+gId, icon:'학습할 용어', title:'학습할 용어 알아보기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:25, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:25, target:gPath+'/'+gId, icon:'활동하기 1', title:'오감을 활용하여 자연 탐색하기'});
	step.push({info:iId, id:++gId, page:25, target:gPath+'/'+gId, icon:'활동하기 1', title:'자연물 피자 만들기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:25, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
