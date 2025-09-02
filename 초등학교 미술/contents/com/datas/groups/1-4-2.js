if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-4-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:22, target:gPath+'/'+gId, icon:'동기 유발', title:'어떤 사진을 찍을지 구상하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:22, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:22, target:gPath+'/'+gId, icon:'활동하기 2', title:'현장 체험 학습의 즐거운 순간을 사진으로 남기기'});
	step.push({info:iId, id:++gId, page:22, target:gPath+'/'+gId, icon:'활동하기 2', title:'현장 체험 학습에서 본 문화유산을 사진에 멋지게 담는 방법 알아보기'});
	step.push({info:iId, id:++gId, page:23, target:gPath+'/'+gId, icon:'마무리하기', title:'찍은 사진을 한데 모아 사진집을 만들고 친구들에게 소개하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:23, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
