if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:53, target:gPath+'/'+gId, icon:'동기 유발', title:'참고 작품을 살펴보며 어떤 효과를 낼 것인지 이야기하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:53, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:53, target:gPath+'/'+gId, icon:'활동하기 3', title:'다양한 표현 방법을 사용하여 그리기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:53, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
