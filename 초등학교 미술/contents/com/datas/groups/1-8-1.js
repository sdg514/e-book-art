if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-8-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:36, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});
	step.push({info:iId, id:++gId, page:36, target:gPath+'/'+gId, icon:'살펴보기', title:'사람들의 욕심과 무관심으로 동물들이 멸종한대!'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:36, target:gPath+'/'+gId, icon:'계획하기', title:'멸종 위기 동물들을 보호하려면 우리는 어떤 일을 할 수 있을까?'});
	step.push({info:iId, id:++gId, page:37, target:gPath+'/'+gId, icon:'준비하기', title:'멸종 위기 동물 돕기 캠페인에 사용할 물품을 만들어 보자!'});
	step.push({info:iId, id:++gId, page:37, target:gPath+'/'+gId, icon:'실행하기', title:'멸종 위기 동물 돕기 캠페인에 참여해 봐!'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:37, target:gPath+'/'+gId, icon:'마무리하기', title:'멸종 위기 동물 돕기 캠페인 마무리하기'});
