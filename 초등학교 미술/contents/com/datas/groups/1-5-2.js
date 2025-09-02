if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-5-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:26, target:gPath+'/'+gId, icon:'동기 유발', title:'작품에 어떤 감각을 활용하였는지 이야기하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:26, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:26, target:gPath+'/'+gId, icon:'활동하기 2', title:'자연을 다양하게 탐색하고 자연물을 이용하여 작품 만들기'});
	step.push({info:iId, id:++gId, page:26, target:gPath+'/'+gId, icon:'활동하기 2', title:'자연물 테라리엄 만들기'});
	step.push({info:iId, id:++gId, page:27, target:gPath+'/'+gId, icon:'마무리하기', title:'자연물을 이용한 미술 작품 감상하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:27, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
