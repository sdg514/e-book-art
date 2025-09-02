if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-5-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:60, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});
	step.push({info:iId, id:++gId, page:60, target:gPath+'/'+gId, icon:'살펴보기', title:'우리 조상들의 솜씨와 멋'});
	step.push({info:iId, id:++gId, page:60, target:gPath+'/'+gId, icon:'학습할 용어', title:'학습할 용어 알아보기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:61, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:61, target:gPath+'/'+gId, icon:'활동하기 1', title:'조상들의 장신구 따라 만들기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:61, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
