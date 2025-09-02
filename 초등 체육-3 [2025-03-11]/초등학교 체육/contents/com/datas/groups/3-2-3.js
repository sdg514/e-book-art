if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-2-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:112, target:gPath+'/'+gId, icon:'동기 유발', title:'매듭 풀기 놀이하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:112, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:112, target:gPath+'/'+gId, icon:'활동 1', title:'나의 몸에서 비틀 수 있는 부분은 어디인지 알아보기'});
	step.push({info:iId, id:++gId, page:113, target:gPath+'/'+gId, icon:'활동 2', title:'제자리에서 돌 수 있는 방법 알아보기'});
	step.push({info:iId, id:++gId, page:113, target:gPath+'/'+gId, icon:'활동 3', title:'선풍기와 팽이가 된 나의 모습을 상상하며 표현하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:113, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'비틀기와 제자리 돌기를 동시에 해 보고 어떤 점이 어려웠는지 발표하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:113, target:gPath+'/'+gId, icon:'정리', title:'비틀기와 제자리 돌기 표현 방법'});
