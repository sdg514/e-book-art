if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-1-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:44, target:gPath+'/'+gId, icon:'동기 유발', title:'동물을 본 경험 이야기하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:44, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:44, target:gPath+'/'+gId, icon:'활동하기 2', title:'찰흙의 특성을 생각하며 여러 가지 동물 만들기'});
	step.push({info:iId, id:++gId, page:45, target:gPath+'/'+gId, icon:'마무리하기', title:'흙으로 표현한 작품을 감상하고 어떤 특징이 있는지 찾아보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:45, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
