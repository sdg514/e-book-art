if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-3-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:18, target:gPath+'/'+gId, icon:'동기 유발', title:'마을을 체험한 활동에 대해 이야기하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:18, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:18, target:gPath+'/'+gId, icon:'활동하기 2', title:'마을을 탐색하고 표현하는 다양한 방법 알아보기'});
	step.push({info:iId, id:++gId, page:18, target:gPath+'/'+gId, icon:'활동하기 2', title:'우리가 수집하고 싶은 마을의 모습을 찾아 기록하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:18, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
