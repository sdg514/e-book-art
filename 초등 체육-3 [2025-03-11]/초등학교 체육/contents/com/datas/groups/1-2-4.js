if(typeof DATAS == 'undefined') DATAS={}; 
DATAS.group={path:'1-2-4', info:[], step:[]}; 

var info=DATAS.group.info;
var step=DATAS.group.step; 
var gPath=DATAS.group.path;
 
var iId=0,gId=0;

/*===============
 * 단원 리스트
 ================*/
info[++iId]={title:'도입'};
	step.push({info:iId, id:++gId, page:30, target:gPath+'/'+gId, icon:'동기 유발', title:'윗몸 말아 올리기 동영상을 시청하고 어떤 효과가 있을지 이야기하기'});

info[++iId]={title:'학습 목표'};
	step.push({info:iId, id:++gId, page:30, target:gPath+'/'+gId, icon:'학습 목표', title:'학습 목표 확인하기'});

info[++iId]={title:'전개'};
	step.push({info:iId, id:++gId, page:30, target:gPath+'/'+gId, icon:'활동 1', title:'윗몸 말아 올리기 하기'});
	step.push({info:iId, id:++gId, page:31, target:gPath+'/'+gId, icon:'활동 2', title:'‘윗몸을 말아 올려 공 전달하기‘ 하기'});
	step.push({info:iId, id:++gId, page:31, target:gPath+'/'+gId, icon:'활동 3', title:'‘우리 반 기네스북‘에 도전하기'});

info[++iId]={title:'생각 쑥쑥'};
	step.push({info:iId, id:++gId, page:31, target:gPath+'/'+gId, icon:'생각 쑥쑥', title:'가족과 함께 윗몸 말아 올리기 하기'});

info[++iId]={title:'정리'};
	step.push({info:iId, id:++gId, page:31, target:gPath+'/'+gId, icon:'정리', title:'윗몸 말아 올리기의 바른 자세 이야기하기'});
