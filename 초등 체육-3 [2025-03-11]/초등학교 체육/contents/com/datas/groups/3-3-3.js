if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'3-3-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:122, target:gPath+'/'+gId, icon:'동기 유발', title:'과학 시간에 배운 배추흰나비의 한살이를 떠올려 보고 생각나는 것 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:122, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:122, target:gPath+'/'+gId, icon:'활동 1', title:'배추흰나비의 한살이를 여러 가지 도구를 활용해 표현하기'});	

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:123, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'배추흰나비의 한살이를 인터넷으로 자세히 알아보고, 다른 도구를 활용하여 표현하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:123, target:gPath+'/'+gId, icon:'정리', title:'배추흰나비의 한살이를 여러 가지 도구를 활용해 표현한 후의 느낌 이야기하기'});
