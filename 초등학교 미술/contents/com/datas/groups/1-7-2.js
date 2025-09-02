if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-7-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:34, target:gPath+'/'+gId, icon:'동기 유발', title:'가 보고 싶은 미술관 정하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:34, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:34, target:gPath+'/'+gId, icon:'활동하기 2', title:'미술관 방문 계획 세우기'});
	step.push({info:iId, id:++gId, page:34, target:gPath+'/'+gId, icon:'활동하기 2', title:'관람 예절 지키며 즐겁게 관람하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:34, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
