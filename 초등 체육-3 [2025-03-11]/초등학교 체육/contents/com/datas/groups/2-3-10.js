if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-10', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:86, target:gPath+'/'+gId, icon:'동기 유발', title:'지금까지 배웠던 기본 움직임 기술의 종류를 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:86, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:86, target:gPath+'/'+gId, icon:'활동 1', title:'‘별 모으기’ 게임을 해 보기'});
	step.push({info:iId, id:++gId, page:87, target:gPath+'/'+gId, icon:'활동 2', title:'‘별 만들기’ 게임을 해 보기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:87, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'공 몰기와 던지기가 연결된 스포츠 활동을 찾아 게임 방법을 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:87, target:gPath+'/'+gId, icon:'정리', title:'기본 움직임을 연결한 조금 더 복잡한 움직임 기술을 이야기해 보기'});
