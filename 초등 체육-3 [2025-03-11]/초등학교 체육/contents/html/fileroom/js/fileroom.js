
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
		document.querySelector('[data-btn="home"]').on('click',function(){
			USER.sandParent(USER.id.home);
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

	

/** chap별 공통파일 (단원평가자료/지도평가자료) */
function commonFile(c) {
 	/* 공통파일 영역 */
 	var comF = document.querySelector('.common_file'); 
	/* 이 전 챕터 공통자료 초기화 */
 	comF.empty();
 	var chap = Number(c) + 1;
	
 	for (var idx in FILES) { 
		  if (idx == 'chap' + chap) {
			var com1 = FILES[idx].common[0];
			var com2 = FILES[idx].common[1];  

			/* 단원 평가 자료*/ 
			var com1_div = document.createElement('div');
			comF.append(com1_div);
			var file = document.createElement('a').attr({ 'src': FILES.path + idx +'/'+ com1.src , 'data-icon': com1.icon, target: '_black' });
			file.innerHTML = com1.name;
			com1_div.append(file); 
			  
			// 	/* 지도 평가 자료 */
			var com2_div = document.createElement('div');
				comF.append(com2_div);
			for (var i = 0; i < com2.length; i++) { 
				var c2 = com2[i];
				var file = document.createElement('a').attr({ 'src': FILES.path + idx +'/'+ c2.src, 'data-icon': c2.icon, target: '_black' });
				file.innerHTML = c2.name;
				com2_div.append(file);  
			}; 
		}; 
	};	 
};

/** chap  */
function chapChoice(chap) {
		/* 차시 & 학습 내용 세팅*/
		classSet(IL[chap].list[0].list);
		/* 차시별 수업 자료 세팅 */
		fileSet(chap, 0);
		/* 우측 챕터별 공통자료  */
		commonFile(chap);	
	
		/* 중단원 선택 탭*/
		document.querySelector('.lesson p').removeClass('on');  
		var lesson = document.querySelector('.lesson');
	
		/* 선택단원의 중단원 리스트 생성 */
		var u = document.createElement('ul');
		lesson.append(u);
		
		for (var idx in IL[chap].list) { 
			var l = document.createElement('li').attr('idx', idx);
			l.innerHTML = (Number(idx)+1)+" "+IL[chap].list[idx].title;
			u.append(l);
			/* 대단원 클릭 시 초기 세팅 */
			if (idx == 0) {
				lesson.querySelector('p').innerHTML = (Number(idx)+1)+" "+IL[chap].list[idx].title;	
			}; 
		
			/* 단원 바꾸기 */
			l.off().on('click', function (e) {
				var l_idx = e.target.attr('idx');
				
				lesson.querySelector('p').innerHTML = (Number(l_idx) + 1) + " " + IL[chap].list[l_idx].title;
				lesson.querySelector('p').removeClass('on');
				lesson.querySelector('ul').css('display', 'none');
				
				/* lesson 변경 */
				classSet(IL[chap].list[l_idx].list);
				fileSet(chap, l_idx)
			});
		};		
	

		
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
	var c_num = document.querySelector('.class_num');
	var c_name = document.querySelector('.class_name');
	/* 차시 & 학습내용 초기화 */
	c_num.empty();
	c_name.empty();

	/* 차시와 학습 내용 추가 */
	for (var idx in C) {
		var c_icon = document.createElement('p');
		c_icon.innerHTML = C[idx].icon;
		c_num.append(c_icon); 
		var c_title = document.createElement('p');
		c_title.innerHTML = C[idx].title;
		c_name.append(c_title);  
	};  
	/* 차시별 수업 자료 높이 구한 뒤 적용 */
	document.querySelector('.file_wrap').css('height', C.length * 56 + "px");
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
	var lesson = FILES[c][l];  
	
	/* 수업자료 카테고리(ex. 교과서, 지도서 ... ) */
	for (var idx in lesson) {  
		var ctg = document.createElement('div');
		document.querySelector('.file_wrap').append(ctg);  
	
		var f_path = FILES.path + c + "/" + l + "/";
		/* 카테고리 별 파일 추가 */
		categoryFile(ctg, lesson[idx], f_path); 
	};
};

/** 차시별 수업 자료 카테고리별 차시 파일 추가 */
function categoryFile(ctg, ctgD, path) {  
	
	if (ctgD.length > 1) {
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
		/* 공통파일(교과서, 지도서) */
		for (var idx in ctgD) { 
			if(ctgD[idx].icon!=''){
			var file = document.createElement('a').attr({ 'src': path + ctgD[idx].src, 'data-icon': ctgD[idx].icon , target:'_black'});
				ctg.append(file);
			};
		};	 
	};
}; 