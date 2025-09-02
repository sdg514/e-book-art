if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-2-2', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:48, target:gPath+'/'+gId, icon:'동기 유발', title:'내가 디자인 하고 싶은 물건 떠올리기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:48, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:48, target:gPath+'/'+gId, icon:'활동하기 2', title:'다양한 방법으로 캐릭터 표현하기'});
	step.push({info:iId, id:++gId, page:48, target:gPath+'/'+gId, icon:'활동하기 2', title:'나와 친구들의 캐릭터를 활용해 재미있는 이야기 만들기'});
	step.push({info:iId, id:++gId, page:49, target:gPath+'/'+gId, icon:'마무리하기', title:'독창적인 캐릭터로 그림책과 애니메이션을 만드는 미술가의 이야기 듣기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:49, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
