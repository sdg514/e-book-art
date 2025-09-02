if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-1-5', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:102, target:gPath+'/'+gId, icon:'동기 유발', title:'말이 달리는 영상 자료를 함께 보고 말의 다리가 어떻게 움직이는지 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:102, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:102, target:gPath+'/'+gId, icon:'활동 1', title:'이동하면서 스키핑과 갤러핑하기'});
	step.push({info:iId, id:++gId, page:103, target:gPath+'/'+gId, icon:'활동 2', title:'스키핑과 갤러핑으로 ‘숲속을 탐험해요’를 하며 표현하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:103, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'친구들과 함께 스키핑과 갤러핑을 할 때 좋았던 점과 어려웠던 점 써 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:103, target:gPath+'/'+gId, icon:'정리', title:'스키핑과 갤러핑 표현 방법'});
