
var USER_PROJECT='(2025)ix-el-physical_3';
var USER_GRADE='3';
var USER_NAME='초등학교 체육 3(2025)';

/*<사용자 설정>*/
USER=(function(){
return{
	/*프로젝트 제목 */
	project:USER_PROJECT,
	/*프로젝트 파일명 */
	name:USER_NAME,
	/*학년 학기*/
	grade:USER_GRADE,
	/*파일 위치*/
	path:{
		root:'',
		html:'contents/html/',
		group:'contents/com/datas/group/',
		fileroom:'contents/files/자료실/',
		effect:'contents/files/effect/'
	},
	/*파일 초기 위치 설정*/
	appType:'app',
	/*현재 화면 id*/
	mode:null,
	/*화면 타입*/
	type:null,
	/*프로젝트 반 번호 */
	class:1,
	/*현재 책 페이지*/
	page:1,
	/*이전 화면 */ 
	from:null,
	/*프로젝트 목차 DEPTHS */
	depths:[0,0,0],
	/*그룹 idx */
	group:1,
	/*싱글 id */
	single:null,
	/*팝업 컨트롤러 숨기기 */
	controls:false,
	/*사용자 모드*/
	id:{
		intro:'intro',
		home:'home',
		ebook:'ebook',
		step:'step',
		popup:'popup',
		music:'music',
		fileroom:'fileroom',
		plugin:'plugin',
		link:'link',
		effect:'effect'
	},
	sandParent:function(type,obj){
		
		if(type!='exe'){
			var datas=USER.get.datas(type);
			if(obj) datas=UTIL.get.extend(datas,obj);
			UTIL.message.parent(datas);
		}else{
			obj.messageType=type;
			UTIL.message.parent(obj);
		};
		
	},
	/*가져오기*/
	get:{
		datas:function(mode){
			return{
				mode:mode,
				type:USER.type,
				class:USER.class,
				depths:USER.depths.join('-'),
				page:USER.page,
				single:USER.single,
				group:USER.group,
				from:USER.mode
			};
		},
		class:function(){
			return USER.class;
		},
		depths:function(){
			return USER.depths;
		},
		page:function(){
			return USER.page;
		},
		group:function(){
			return USER.group;
		},
		single:function(){
			return USER.single;
		},
		type:function(){
			return USER.type;
		},
		from:function(){
			return USER.from;
		},
		controls:function(){
			return USER.controls;
		},
		groupJS:function(cb){
			var fileName;
			if(USER.project.level==3){
				fileName=(parseInt(USER.val.depths[0])+1)+'-'+(parseInt(USER.val.depths[1])+1)+'-'+(parseInt(USER.val.depths[2])+1);
			}else if(USER.project.level==2){
				fileName=(parseInt(USER.val.depths[0])+1)+'-'+(parseInt(USER.val.depths[1])+1);
			}else{
				fileName=(parseInt(USER.val.depths[0])+1);
			};
			UTIL.load.script(USER.path.group+fileName+'.js', cb);
		}/*end*/
	},
	/*설정하기*/
	set:{
		mode:function(arg){
			if(arg!=null&&arg!='') USER.mode=arg;
		},
		class:function(arg){
			arg=parseInt(arg);
			if(!isNaN(arg)){
				USER.class=arg;
			};
		},
		page:function(arg){
			arg=parseInt(arg);
			if(!isNaN(arg)){
				USER.page=arg;
			};
		},
		type:function(arg){
			if(arg!=null&&arg!=''){
				USER.type=arg;
			};
		},
		depths:function(arg){
			if(arg!=null&&arg!=''){
				if(typeof arg=='string'){
					arg=arg.split('-');
				};
				var d;
				for(var i=0;i<USER.depths.length;i++){
					d=arg[i];
					if(d==null) d=0;
					USER.depths[i]=parseInt(d);
				};
			};
		},
		group:function(arg){
			USER.group=arg;
		},
		single:function(arg){
			if(arg!=null&&arg!='') USER.single=arg;
		},
		from:function(arg){
			if(arg!=null&&arg!='') USER.from=arg;
		},
		controls:function(arg){
			if(arg!=null&&arg!='') USER.controls=arg;
		}/*end*/
	},
	init:function(mode){
		USER.mode=mode;
		/*셋팅 변수*/
		USER.set.class(UTIL.get.parameter('class'));
		USER.set.page(UTIL.get.parameter('page'));
		USER.set.depths(UTIL.get.parameter('depths'));
		USER.set.group(UTIL.get.parameter('group'));
		USER.set.single(UTIL.get.parameter('single'));
		USER.set.from(UTIL.get.parameter('from'));
		USER.set.type(UTIL.get.parameter('type'));
		USER.set.controls(UTIL.get.parameter('controls'));
		
		/*셋팅 속성*/
		var $body=document.querySelector('body');
		$body.attr('data-grade', USER.grade);
		if(!EXE.is()) $body.addClass('web');
		if(USER.controls) $body.addClass('hide-controls');
		/*LOG*/
	}/*end*/
};
}());
