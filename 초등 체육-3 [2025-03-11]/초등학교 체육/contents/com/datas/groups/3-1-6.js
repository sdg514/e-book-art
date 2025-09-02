if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-1-6', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:104, target:gPath+'/'+gId, icon:'동기 유발', title:'‘몇 번에 건널까’ 놀이하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:104, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:104, target:gPath+'/'+gId, icon:'활동 1', title:'스케이트장에 간다고 상상하며 리핑과 슬라이딩하기'});
	step.push({info:iId, id:++gId, page:105, target:gPath+'/'+gId, icon:'활동 2', title:'리핑과 슬라이딩으로 스케이트장 풍경 표현하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:105, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'리핑과 슬라이딩을 하면서 주의해야 할 점은 무엇인지 설명하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:105, target:gPath+'/'+gId, icon:'정리', title:'리핑과 슬라이딩 표현 방법'});
