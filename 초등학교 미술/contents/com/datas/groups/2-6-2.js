if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-6-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:66, target:gPath+'/'+gId, icon:'동기 유발', title:'교과서 66쪽 작품 살펴보기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:66, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:66, target:gPath+'/'+gId, icon:'활동하기 2', title:'작품 속 인물들이 어떤 음악에 맞추어 춤을 추고 있을지 이야기하기'});
	step.push({info:iId, id:++gId, page:66, target:gPath+'/'+gId, icon:'활동하기 2', title:'작품을 자세히 관찰하고 등장인물의 움직임 흉내 내기'});
	step.push({info:iId, id:++gId, page:67, target:gPath+'/'+gId, icon:'활동하기 3', title:'미술가에게 편지 쓰기'});
	step.push({info:iId, id:++gId, page:67, target:gPath+'/'+gId, icon:'마무리하기', title:'감상 활동에 관해 이야기 나누기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:67, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
