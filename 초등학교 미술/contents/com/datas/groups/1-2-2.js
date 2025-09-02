if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:14, target:gPath+'/'+gId, icon:'동기 유발', title:'상상 속 동물 구상하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:14, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:14, target:gPath+'/'+gId, icon:'활동하기 2', title:'상상 동물 책 만들기'});
	step.push({info:iId, id:++gId, page:14, target:gPath+'/'+gId, icon:'활동하기 2', title:'상상 동물 입체 작품 만들기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:14, target:gPath+'/'+gId, icon:'돌아보기', title:'활동 돌아보고 이야기 나누기'});
