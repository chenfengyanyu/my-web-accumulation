$(function(){



	var svg = Snap('#shaft');

	var baseAttr = {
		line:{stroke:'#000',strokeWidth: 1},
	}

	var c1 = svg.paper.circle(48,60,5);

	var l1 = svg.paper.line(58,60,425,60).attr({stroke:'#000',strokeWidth: 1})



	c1.clone().attr({
		cx:435
	})

	l1.clone().attr({
		x1:445,
		x2:680

	})

	c1.clone().attr({
		cx:690
	})

	l1.clone().attr({
		x1:700,
		x2:855

	})

	c1.clone().attr({
		cx:865
	})

	l1.clone().attr({
		x1:875,
		x2:1030

	})
	c1.clone().attr({
		cx:1040
	})

	var tt = svg.paper.text(10,40,'5.25').attr({
		fontSize:18
	})

	tt.clone().attr({
		text:'内测样品申请',
		y:95,
		x:50
	})


	tt.clone().attr({
		text:'6.25',
		y:40,
		x:397
	})
	tt.clone().attr({
		text:'工程一版',
		y:95,
		x:437
	})

	tt.clone().attr({
		text:'7.15',
		y:40,
		x:652
	})
	tt.clone().attr({
		text:'工程二版',
		y:95,
		x:692
	})

	tt.clone().attr({
		text:'7.30',
		y:40,
		x:827
	})
	tt.clone().attr({
		text:'试量产',
		y:95,
		x:867
	})

	tt.clone().attr({
		text:'8.15',
		y:40,
		x:1002
	})
	tt.clone().attr({
		text:'量产',
		y:95,
		x:1042
	})





	var iotMv = {
		boardTop:$('#boardTop').offset().top,
		boardBtmTop:$('#boardBtm').offset().top,
		boardBtmCor:function(){return this.boardBtmTop-this.boardTop},
		boardHeight:$('#boardTop').height(),
		boardBtmHeight:$('#boardBtm').height(),
		card:$('#card'),
		cardOriLeft:parseFloat($('#card').css('left')),
		winHeight:$(window).height()

	}




	var boardInfo = {
		b1Top:$('#topCtn').position().top,
		b1Height:$('#boardTop').height(),
		b2Top:$('#btmCtn').position().top,
		b2Height:$('#boardBtm').height()

	}
	var paths = [
		{
			//左
			start:0,
			route:'M200,200 h115 v-50'
		},

		{
			//右上－上
			start:0,
			route:'M800,'+(boardInfo.b1Top+boardInfo.b1Height/2)+' h-50 v'+(3-boardInfo.b1Height/2)+' h-50'
		},

		{
			//右上－下
			start:0,
			route:'M800,'+(boardInfo.b1Top+boardInfo.b1Height/2)+' h-50 v'+(boardInfo.b1Height/2)+' h-50'
		},

		{
			//右下－上
			start:0,
			route:'M800,'+(boardInfo.b2Top+boardInfo.b2Height/2)+' h-50 v'+(-boardInfo.b2Height/2)+' h-50'
		},

		{
			//右下－下
			start:0,
			route:'M800,'+(boardInfo.b2Top+boardInfo.b2Height/2)+' h-50 v'+(boardInfo.b2Height/2)+' h-50'
		}
	]

	var iotcan = Snap('#iotline');



	//600  底部出现 － 开始
	//1030 停止
	//430  滑动距离




	var lastScrollTop = 0,
		begin_b1 = $('#topCtn').offset().top,
		end_b1 = begin_b1 + boardInfo.b1Height,
		oriTop_b1 = parseFloat($('#boardTop').css('bottom')),
		scrlTop = 0,
		gap,
		val_b1=oriTop_b1,
		winHt = $(window).height();



	var begin_b2 = $('#btmCtn').offset().top,
		end_b2 = begin_b2 + boardInfo.b2Height,
		oriTop_b2 = parseFloat($('#boardBtm').css('bottom')),
		val_b2 = oriTop_b2;


	var ctrline = $('#changeline').offset().top;

	setInterval(function(){


		if($(window).scrollTop()+winHt<ctrline){
			doresume()
		}else{
			detectScroll();
		}
	}, 14)

	detectScroll()


	function doresume(){
		paths.forEach(function(def,index){
			def.ended&&stopAnimate(def)
		})
		val_b1 = 262;
		val_b2  = 262;
		$('#card').css('left', -255);
		$('#boardBtm,#boardTop').css('bottom',262);
		$('#textLeft,#textRight1,#textRight2').css('opacity',0);

	}

	function detectScroll(){
		scrlTop = $(window).scrollTop();

		if(scrlTop - lastScrollTop>0){


			gap = Math.abs(scrlTop - lastScrollTop);
			val_b1=animateGo({
				obj:$('#boardTop'),
				begin:begin_b1,
				val:val_b1,
				target:oriTop_b1,
				complete:cardGo,
				resume:cardBack
			})

			val_b2=animateGo2({
				obj:$('#boardBtm'),
				begin:begin_b2,
				val:val_b2,
				target:oriTop_b2,
				complete:boardBtmShow,
				resume:boardBtmHide
			})
		}
		lastScrollTop = scrlTop
	}

	function cardGo(){

		boardTopRightShow();
		$('#card').css('left', -255);

		$('#card')[0].go = true;
		$('#card').animate({
			left: -65
			},
			1000, function() {
				boardTopShow();
		});



	}

	function cardBack(){
		$('#card')[0].go = false;
		boardTopHide()
		$('#card').css('left',-255)
	}

	function boardTopShow(){
		$('#textLeft').animate({
			opacity: 1
			},
			300, function() {
		});

		paths.forEach(function(def,index){
			if(index==0){
				!def.played&&startAnimate(def)
			}
		})
	}

	function boardTopRightShow(){
		$('#textRight1').animate({
			opacity: 1
			},
			300, function() {
			//b1done = true;
		});

		paths.forEach(function(def,index){

			if(index<3&&index>0){
				!def.played&&startAnimate(def)
			}

		})
	}

	function boardTopHide(){
		$('#textLeft,#textRight1').animate({
			opacity: 0
			},
			300, function() {
		});

		paths.forEach(function(def,index){

			if(index<3){
				def.ended&&stopAnimate(def)
			}

		})

	}



	function boardBtmShow(){
		$('#textRight2')[0].go = true;
		$('#textRight2').animate({
			opacity: 1
			},
			300, function() {
			//b1done = true;
		});

		paths.forEach(function(def,index){

			if(index>2){
				!def.played&&startAnimate(def)
			}

		})
	}

	function boardBtmHide(){
		$('#textRight2')[0].go = false;
		$('#textRight2').animate({
			opacity: 0
			},
			300, function() {
		});

		paths.forEach(function(def,index){

			if(index>2){
				def.ended&&stopAnimate(def)
			}

		})

	}




	function animateGo(argus){

		if(scrlTop+winHt >= argus.begin){
			//insight(begin_b1)&&(argus.val-=(gap));
			argus.val-=(gap);
			if(argus.val<0){
				argus.val=0
			}
			if(argus.val>=argus.target){
				argus.val = argus.target
			}

			argus.obj.css('bottom',argus.val);

			if(argus.val==0&&!$('#card')[0].go){
				argus.complete&&argus.complete();
			}

			if(argus.val&&$('#card')[0].go){
				argus.resume&&argus.resume()
			}

		}
		return 	argus.val	;
	}

	function animateGo2(argus){

		if(scrlTop+winHt >= argus.begin){
			argus.val-=(gap);
			if(argus.val<0){
				argus.val=0
			}
			if(argus.val>=argus.target){
				argus.val = argus.target
			}

			argus.obj.css('bottom',argus.val)

			if(argus.val==0&&!$('#textRight2')[0].go){
				argus.complete&&argus.complete();
			}

			if(argus.val&&$('#textRight2')[0].go){
				argus.resume&&argus.resume()
			}
		}
		return 	argus.val	;
	}


	function startAnimate(def, remainRoutes) {
		if(!def)return;
		if (!Array.isArray(remainRoutes)) {
			def.played = true;
			var paths = def.route.split(' ');

			remainRoutes = paths.slice(1);

			def.path = iotcan.paper.path(paths[0]).attr({
				stroke: '#110b0a',
				strokeWidth: 1,
				fill: 'none'
			});

		}
		if(!def.path)return;
		if (remainRoutes.length) {
			var route = remainRoutes.shift();
			def.path.animate({
				path: def.path.attr('path') + ' ' + route
			}, 200, function() {
				startAnimate(def, remainRoutes);
			});
		} else {
			if(def.path){
				var point = def.path.getPointAtLength(def.path.getTotalLength() - 1)

				def.circle = iotcan.paper.circle(point.x, point.y, 3);
				def.ended = true;
			};
		}
	}

	function stopAnimate(def) {
		if (def.circle) {
			def.circle.remove();
			def.circle = null;
			def.routeRemain = def.route.split(' ');
		}
		if (def.routeRemain.length > 1) {
			def.routeRemain.pop();
			def.path.animate({
				path: def.routeRemain.join(' ')
			}, 200, function() {
				stopAnimate(def);
			});
		} else {
			if(def.path){
				def.path.remove();
				def.path = null;
				def.played = false;
			}

		}
	}


	function insight(line){
		if( line>=$(window).scrollTop()&&line<=$(window).scrollTop()+$(window).height()){
			return true;
		}
	}

	$(".video_ctn").click(function(ev){
		$(this).addClass('video_click');
		$(this).children('video')[0].play();
		$(this).children('video').attr('controls','controls');
	});

	//高清图加载
	$('.retinaEls').each(function(i,el){
		var img = new Image(),_src;
		if($(el).is('img')){
			_src = $(el).attr('src').replace(/_small/g,'');
			img.onload = function(){
				$(el).attr('src',_src);
			}
		}else{
			_src = $(el).css('backgroundImage').replace(/url\(|\)/g,'').replace(/_small/g,'').replace(/\"/g,'');
			img.onload = function(){
				$(el).css('backgroundImage','url('+_src+')');
			}
		}
		img.src = _src;
	})

})


