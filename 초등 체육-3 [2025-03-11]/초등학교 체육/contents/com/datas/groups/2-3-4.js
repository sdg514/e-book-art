if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'2-3-4', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:74, target:gPath+'/'+gId, icon:'동기 유발', title:'축구, 족구 동영상을 함께 보고, 영상 속 선수들은 주로 어떤 움직임을 많이 하는지 이야기해 보기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:74, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:74, target:gPath+'/'+gId, icon:'활동 1', title:'차기를 익혀 보기'});
	step.push({info:iId, id:++gId, page:75, target:gPath+'/'+gId, icon:'활동 2', title:'‘공 멀리 차기’ 해 보기'});
	step.push({info:iId, id:++gId, page:75, target:gPath+'/'+gId, icon:'활동 3', title:'’공 차서 골인시키기’ 게임을 해 보기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:75, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'차는 발의 부위를 다르게 하여 공을 차 보면서 공의 움직임이 어떻게 달라지는지 친구들과 이야기해 보기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:75, target:gPath+'/'+gId, icon:'정리', title:'도구를 사용하여 다양하게 차는 방법을 이야기해 보기'});
