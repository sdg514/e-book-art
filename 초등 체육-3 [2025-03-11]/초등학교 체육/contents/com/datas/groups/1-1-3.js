if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-1-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:14, target:gPath+'/'+gId, icon:'동기 유발', title:'순서대로 운동한 경험 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:14, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:14, target:gPath+'/'+gId, icon:'활동 1', title:'우리 반 준비 운동을 만들고 순서와 방법을 지켜 운동하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:15, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'준비 운동과 정리 운동을 잘 실천했는지 평가하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:15, target:gPath+'/'+gId, icon:'정리', title:'운동의 단계에 따라 운동하는 방법 확인하기'});
