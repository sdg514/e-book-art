if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-11', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:88, target:gPath+'/'+gId, icon:'동기 유발', title:'정확하게 공을 굴리려면 어떻게 해야 하는지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:88, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:88, target:gPath+'/'+gId, icon:'활동 1', title:'게임하기'});
	step.push({info:iId, id:++gId, page:89, target:gPath+'/'+gId, icon:'활동 2', title:'얻은 점수를 계산식으로 나타내기'});
	step.push({info:iId, id:++gId, page:89, target:gPath+'/'+gId, icon:'활동 3', title:'승리한 모둠 인터뷰하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:89, target:gPath+'/'+gId, icon:'정리', title:'게임에 참여한 후 느낀 점을 발표해 보기'});
