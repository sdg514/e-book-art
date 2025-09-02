if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-4-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:58, target:gPath+'/'+gId, icon:'동기 유발', title:'나에게 소중한 물건 이야기하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:58, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:58, target:gPath+'/'+gId, icon:'활동하기 2', title:'친구의 이야기가 담긴 소중한 물건 그리기'});
	step.push({info:iId, id:++gId, page:59, target:gPath+'/'+gId, icon:'마무리하기', title:'작품 속 인물 표현에 대해 이야기 나누기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:59, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
