
/*<홈 화면>*/
DEV=(function(){
return {
	ready:function(){
		
		/*사용자 데이터 초기화*/
		EXE.root('../../../');
		EXE.appType(USER.appType,'');
		/*사용자 데이터 초기화*/
		USER.init(USER.id.fileroom);
		
		var chap_list = document.querySelectorAll('#chap_nav button');
		
		for (var i = 0; i < chap_list.length; i++){
			var c = chap_list[i].attr('idx', i);
			if (i == 0) c.addClass('on'); 
		}; 
	},
	load:function(){
		var chap = document.querySelector('#chap_nav button.on').attr('idx');	
		/* 단원 선택 */
		chapChoice(chap); 

		/* 챕터 버튼 클릭 이벤트 */
		document.querySelectorAll('#chap_nav button').on('click', function (e) { 
			document.querySelectorAll('#chap_nav button').removeClass('on');
			this.addClass('on');	  
			document.querySelectorAll('.lesson ul').remove();
			chapChoice(this.attr('idx')); 
		});  

		/* 상단 '닫기', '홈' 버튼 */
		document.querySelector('[data-btn="close"]').on('click',function(){
			USER.sandParent(USER.from, { from: USER.from }); 
		}); 


		
		/** exe 실행 파일 다운 */
		document.addEventListener('click', function (e) {
			if (e.target.hasAttribute('data-icon')) {
				var icon = e.target.attr('data-icon');
				
				switch (icon) {
					case 'media':
					case 'folder':
						EXE.openFolder(e.target.attr('src'));
						break;
					case 'img':
					case 'video':
					case 'audio':
					case 'hwp':
					case 'ppt':
					case 'pdf':
					case 'img':
					default:
						EXE.openFile(e.target.attr('src'));
						break;
				}; 
			}; 
		}); 
	},
	unload:function(){}
};
}()); UTIL.init(DEV);

	 

/** chap  */
function chapChoice(chap) {
	
	document.querySelector('[chap]').attr('chap', chap);
	
	/* 차시 & 학습 내용 세팅*/
	classSet(IL[chap].list[0].list);
	/* 차시별 수업 자료 세팅 */
	fileSet(chap, 0);
 	
	/* 중단원 선택 탭*/
	document.querySelector('.lesson p').removeClass('on');  
	var lesson = document.querySelector('.lesson');

	if(document.querySelector('lesson ul'))document.querySelector('lesson ul').remove();
	
	/* 선택단원의 중단원 리스트 생성 */
	var u = document.createElement('ul');
	lesson.append(u);
	
	console.log(IL[chap]);
	
	/** 선택 중단원 리스트 추가  */
	for (var idx in IL[chap].list) { 
			/* 마지막 정리하기 제외 */
		if (idx < (IL[chap].list.length - 1)) { 
			/*아이콘번호 */
				var l_num=(IL[chap].list[idx].icon);
				
			var l = document.createElement('li').attr('idx', idx); 
			
				/* 1단원 일 때  */
				if(chap==0){ 
					/* 대단원 클릭 시 처음 선택단원에 뜰 중단원 */
					if (idx == 0) {
						lesson.querySelector('p').innerHTML = "<span idx="+l_num+">"+l_num+"</span>"+IL[chap].list[idx].title;	
					};  
					l.innerHTML = "<span idx="+l_num+">"+l_num+"</span>"+IL[chap].list[idx].title;
					u.append(l);
				} else {
					/*2단원 일 때 */ 
					/* 대단원 클릭 시 처음 선택단원에 뜰 중단원 */ 
					if (idx == 0) {
						lesson.querySelector('p').innerHTML = "<span idx="+l_num+">"+l_num+"</span>"+IL[chap].list[idx].title;	
					};  
						l.innerHTML = "<span idx="+l_num+">"+l_num+"</span>"+IL[chap].list[idx].title;
					u.append(l);
					};
			};
		};	
	
		/* 단원 바꾸기 */
	document.querySelectorAll('.lesson li').on('click', function (e) {
			var l_num = e.target.querySelector('span').attr('idx');
			
			/* 1단원 일 때 */
			if (chap == 0) {
				var l_idx = e.target.attr('idx'); 
				lesson.querySelector('p').innerHTML = "<span idx="+l_num+">"+l_num+"</span>"+ IL[chap].list[l_idx].title;
				lesson.querySelector('p').removeClass('on');
				lesson.querySelector('ul').css('display', 'none');
				
				/* lesson 변경 */
				classSet(IL[chap].list[l_idx].list);
				fileSet(chap, l_idx)
			} else {
				/* 2단원 일 때 */
				var l_idx = e.target.attr('idx'); 
				lesson.querySelector('p').innerHTML = "<span idx="+l_num+">"+l_num+"</span>"+ IL[chap].list[l_idx].title;
				lesson.querySelector('p').removeClass('on');
				lesson.querySelector('ul').css('display', 'none');
				
				/* lesson 변경 */
				classSet(IL[chap].list[l_idx].list);
				fileSet(chap, l_idx)
			}; 
		}); 
	 
		/* 중단원 선택 창 show/hidden 이벤트 */
		lesson.querySelector('p').off().on('click', function (e) {
			/* 열려 있을 때 */
			if (this.hasClass('on')) { 
				this.removeClass('on');
				lesson.querySelector('ul').css('display', 'none');
			} else { 
			/* 닫혀 있을 때 */
				this.addClass('on');
				lesson.querySelector('ul').css('display', 'inline-block');
			};		
		});
};
	
/** 선택 단원 차시 내용 */	  
function classSet(C) {
	/* 차시 개수 별 배경 이미지 변경 */
	var t_size = C.length;
	document.querySelector('[table]').attr('table', t_size);

	var c_num = document.querySelector('.class_num');
	var c_name = document.querySelector('.class_name');
	/* 차시 & 학습내용 초기화 */
	c_num.empty();
	c_name.empty();

	/* 차시와 학습 내용 추가 */
	for (var idx in C) {  
		var c_i_wrap = document.createElement('div');
		var c_icon = document.createElement('p');
		c_icon.innerHTML = C[idx].icon;
		c_i_wrap.append(c_icon);
		c_num.append(c_i_wrap); 
 
		var c_t_wrap = document.createElement('div');
		var c_title = document.createElement('p');
		c_title.innerHTML = C[idx].title;
		c_t_wrap.append(c_title);
		c_name.append(c_t_wrap);  
	};  
	/* 차시별 수업 자료 높이 구한 뒤 적용 */
	
	if (t_size == 2) {
		document.querySelector('.file_wrap').css('height', C.length * 162 + "px");
	} else {
		document.querySelector('.file_wrap').css('height', C.length * 105 + "px");
	}
	
	
};

/** 차시별 수업 자료 영역(파일) */
function fileSet(c, l) {
	/* c: chap1,2... l: 01,02... */
	document.querySelector('.file_wrap').empty();
	var chap = Number(c) + 1;
	var lesson = Number(l) + 1;
	if (lesson < 10) lesson = '0' + lesson;
	
	for (var idx in FILES) {
		if (idx == 'chap' + chap) {  
			/* 중단원 선택 */ 
			lessonFile(idx, lesson);
		};
	};	
};

/** 선택된 중단원 카테고리 구분 */
function lessonFile(c, l) { 
	if (c == "chap2") {
		var s = Number(l) + 7
		if (s < 10) { l = "0" + s } else { l = s };
	};
	var lesson = FILES[c][l];   
	document.querySelector('.file_wrap').empty();
	/* 수업자료 카테고리(ex. 교과서, 지도서 ... ) */
	for (var idx in lesson) {
		var ctg = document.createElement('div');
		ctg.attr('category', idx);
		document.querySelector('.file_wrap').append(ctg);  
	
		var f_path = FILES.path + c + "/" + l + "/";
		/* 카테고리 별 파일 추가 */  
		categoryFile(ctg, lesson[idx], f_path); 
	};
};

/** 차시별 수업 자료 카테고리별 차시 파일 추가 */
function categoryFile(ctg, ctgD, path) {
	var category = ctg.attr('category'); 
	if( category!='교과서' && category!='활동지'&&category!='수업 도우미' && category !='학기 지도 계획(안)'){
		/* 공통파일 아닌 차시별 다수의 파일 */
		for (var idx in ctgD) {
			var cls = document.createElement('div');
			ctg.append(cls);
			/* 이 후 다수의 파일이 될 수 있어 한번 더 반복 */
			for (var idx2 in ctgD[idx]) {
				var c = ctgD[idx][idx2];
				/* icon 값을 ''처리 시 노출되지 않도록 */
				if (c.icon != '') { 
				var file = document.createElement('a').attr({ 'src': path +  c.src,'data-icon':c.icon, target:'_black'});
					cls.append(file);
				};
			};
		};
	} else {
		/* 셀 통합 카테고리 */
		if (category == "수업 도우미") {
			var c_w = document.createElement('div');
				for (var idx in ctgD) {  
					if (ctgD[idx].icon != '') {
						var file = document.createElement('a').attr({ 'src': path + ctgD[idx].src, 'data-icon': ctgD[idx].icon, target: '_black' });
						var file_name = document.createElement('p');
						file_name.innerHTML= ctgD[idx].name;
						c_w.append(file);
						c_w.append(file_name);
					};
				};
			ctg.append(c_w);  	
		}else{
			var c_w = document.createElement('div');
			for (var idx in ctgD) {  
				if (ctgD[idx].icon != '') {
					var file = document.createElement('a').attr({ 'src': path + ctgD[idx].src, 'data-icon': ctgD[idx].icon, target: '_black' });
					c_w.append(file);
				};
				ctg.append(c_w); 
			};
		};
	};
}; 