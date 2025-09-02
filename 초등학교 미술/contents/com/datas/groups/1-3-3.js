if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-3-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:19, target:gPath+'/'+gId, icon:'동기 유발', title:'활동 중 다른 모둠의 활동에서 기대되는 점 이야기하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:19, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:19, target:gPath+'/'+gId, icon:'마무리하기', title:'우리 마을에서 경험하고 기록한 것을 모아 이야기 나누기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:19, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
