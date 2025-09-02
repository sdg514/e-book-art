if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-1-7', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:106, target:gPath+'/'+gId, icon:'동기 유발', title:'「나비야 날아」 노래 가사에 맞춰 이동 움직임 표현하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:106, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:106, target:gPath+'/'+gId, icon:'활동 1', title:'공원의 풍경을 상상하며 빈칸에 들어갈 이동 움직임 표현을 붙임딱지로 붙이고, 표현하기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:107, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'인상 깊은 이동 움직임을 표현한 친구 칭찬하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:107, target:gPath+'/'+gId, icon:'정리', title:'이동 움직임 표현 정리하기'});
