if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:72, target:gPath+'/'+gId, icon:'동기 유발', title:'공을 굴리는 움직임을 볼 수 있는 스포츠에는 무엇이 있는지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:72, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:72, target:gPath+'/'+gId, icon:'활동 1', title:'굴리기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:73, target:gPath+'/'+gId, icon:'활동 2', title:'‘공 굴려 골이시키기’ 해 보기'});
	step.push({info:iId, id:++gId, page:73, target:gPath+'/'+gId, icon:'활동 3', title:'’볼링 핀 쓰러뜨리기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:73, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'가족과 함께 공 굴리기 게임을 해 보고, 느낌 점을 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:73, target:gPath+'/'+gId, icon:'정리', title:'도구를 사용하여 다양하게 굴리는 방법을 이야기해 보기'});
