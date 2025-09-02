if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-7', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:36, target:gPath+'/'+gId, icon:'동기 유발', title:'일상생활에서 운동을 홍보하는 광고나 포스터 본 경험 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:36, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:36, target:gPath+'/'+gId, icon:'활동 1', title:'운동 홍보 계획 세우기'});
	step.push({info:iId, id:++gId, page:36, target:gPath+'/'+gId, icon:'활동 2', title:'운동 홍보 포스터 그리기'});
	step.push({info:iId, id:++gId, page:37, target:gPath+'/'+gId, icon:'활동 3', title:'운동 실천하기'});
	step.push({info:iId, id:++gId, page:37, target:gPath+'/'+gId, icon:'활동 4', title:'활동 모습 공유하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:37, target:gPath+'/'+gId, icon:'정리', title:'운동 홍보 포스터를 만들면서 생각하거나 느낀 점 이야기하기'});
