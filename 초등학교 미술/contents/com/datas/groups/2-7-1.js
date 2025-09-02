if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-7-1', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:68, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});
	step.push({info:iId, id:++gId, page:68, target:gPath+'/'+gId, icon:'살펴보기', title:'다양한 세계의 문화를 살펴봐!'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:68, target:gPath+'/'+gId, icon:'계획하기', title:'다양한 문화를 보고 느낄 수 있으려면 무엇을 하는 것이 좋을까?'});
	step.push({info:iId, id:++gId, page:69, target:gPath+'/'+gId, icon:'준비하기', title:'세계 문화 축제를 준비하자!'});
	step.push({info:iId, id:++gId, page:69, target:gPath+'/'+gId, icon:'실행하기', title:'세계 문화 축제에 참여해 봐!'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:69, target:gPath+'/'+gId, icon:'마무리하기', title:'세계 문화 축제에 참여하며 새롭게 알게 된 점이나 느낀 점 쓰기'});
