if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-2-4', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:114, target:gPath+'/'+gId, icon:'동기 유발', title:'들려주는 소리를 듣고 무슨 소리인지 맞히기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:114, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:114, target:gPath+'/'+gId, icon:'활동 1', title:'생활 속에서 털기와 흔들기의 움직임 알아보기'});
	step.push({info:iId, id:++gId, page:115, target:gPath+'/'+gId, icon:'활동 2', title:'지진이 난 상황을 생각하며 털기와 흔들기로 표현하기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:115, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'털기와 흔들기로 또 어떤 상황을 표현할 수 있을지 조사하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:115, target:gPath+'/'+gId, icon:'정리', title:'털기와 흔들기 표현 방법'});
