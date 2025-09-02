if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-2-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:108, target:gPath+'/'+gId, icon:'동기 유발', title:'「생각하는 사람」 조각상을 보며 각 신체 부위의 움직임에 대해 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:108, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:108, target:gPath+'/'+gId, icon:'활동 1', title:'비이동 움직임 표현 알아보기'});
	step.push({info:iId, id:++gId, page:109, target:gPath+'/'+gId, icon:'활동 2', title:'조각상이 되어 제자리에서 표현하기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:109, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'제자리에서 하는 움직임 중에서 가장 하고 싶은 움직임은 무엇인지 이야기하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:109, target:gPath+'/'+gId, icon:'정리', title:'비이동 움직임과 이동 움직임의 차이 이야기하기'});
