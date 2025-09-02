if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-1-3', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:11, target:gPath+'/'+gId, icon:'동기 유발', title:'우리나라 전통색 생각해 보기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:11, target:gPath+'/'+gId, icon:'학습 문제', title:'학습 문제 확인하기'});
	step.push({info:iId, id:++gId, page:11, target:gPath+'/'+gId, icon:'마무리하기', title:'우리 문화에서 나타나는 색의 아름다움 감상하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:11, target:gPath+'/'+gId, icon:'돌아보기', title:'단원에서 배운 내용 정리하기'});
