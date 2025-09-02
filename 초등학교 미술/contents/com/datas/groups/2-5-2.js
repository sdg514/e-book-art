if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-5-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:62, target:gPath+'/'+gId, icon:'동기 유발', title:'내가 가지고 있는 장식품 이야기하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:62, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:62, target:gPath+'/'+gId, icon:'활동하기 2', title:'다양한 장식품 만들기'});
	step.push({info:iId, id:++gId, page:63, target:gPath+'/'+gId, icon:'마무리하기', title:'다른 나라의 여러 가지 장신구 감상하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:63, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
