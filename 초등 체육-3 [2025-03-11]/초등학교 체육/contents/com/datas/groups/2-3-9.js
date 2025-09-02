if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-9', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:84, target:gPath+'/'+gId, icon:'동기 유발', title:'가까운 곳으로 이동하거나 여가를 보내기 위해 자신이 이용하는 도구는 무엇인지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:84, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:84, target:gPath+'/'+gId, icon:'활동 1', title:'타기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:85, target:gPath+'/'+gId, icon:'활동 2', title:'‘지그재그 킥보드 타기’ 해 보기'});
	step.push({info:iId, id:++gId, page:85, target:gPath+'/'+gId, icon:'활동 3', title:'’바운스 볼 가위바위보’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:85, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'도구 또는 동물을 타고 경쟁하는 스포츠 활동 사진을 모아 학급 전시회를 열어 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:85, target:gPath+'/'+gId, icon:'정리', title:'도구를 사용하여 타기를 할 때 주의해야 할 점을 이야기해 보기'});
