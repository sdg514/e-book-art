if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-2-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:110, target:gPath+'/'+gId, icon:'동기 유발', title:'제시하는 숫자만큼 관절을 바닥에 대는 활동하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:110, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:110, target:gPath+'/'+gId, icon:'활동 1', title:'블록의 한 조각이 되어 빈 공간 채우기'});
	step.push({info:iId, id:++gId, page:111, target:gPath+'/'+gId, icon:'활동 2', title:'‘털 철사 인형’과 함께 펴고 접는 모습 표현하기'});
	step.push({info:iId, id:++gId, page:111, target:gPath+'/'+gId, icon:'활동 3', title:'빨래가 되어 몸을 펴고 접으면서 표현하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:111, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'나의 몸을 가장 크게 표현했을 때와 가장 작게 표현했을 때의 모습을 동영상으로 촬영하여 온라인 학급 게시판에 올리기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:111, target:gPath+'/'+gId, icon:'정리', title:'‘펴기’와 ‘접기’ 표현 방법'});
