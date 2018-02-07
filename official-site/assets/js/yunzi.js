var autoLayout = function() {
  var $large_yunzi = $('section.header .large-yunzi');
  //if()
  ($large_yunzi)&&($large_yunzi.height($(window).width()/3*1.1 )); 
};

var s;

$(function() {
  autoLayout();
  $(window).resize(autoLayout);
  s = new Snap('.hardware-desc svg');



  var tp = 100;
  var paths = [{//上盖－A
    start: 375,
    route: 'M740,70 h-40 v67 h-50'
  }, {//上盖－B
    start: 375,
    route: 'M740,70 h-40 v-67 h-50'
  }, {//环
    start: 634,
    route: 'M220,418 h100'
  }, {//电池
    start: 1295,
    route: 'M700,964 h-100'
  }, {//芯片-上
    start: 965,
    route: 'M360,571 h140 v60'
  }, {//芯片-左
    start: 965,
    route: 'M260,745 h60 v-40 h40'
  }, {//芯片-右
    start: 965,
    route: 'M730,695 h-80'
  }, {//底盖－左下
    start: 1458,
    route: 'M230,1245 h80 v76 h45'
  }, {//底盖－左上
    start: 1458,
    route: 'M230,1245 h80 v-76 h45'
  }, {//底盖－右
    start: 1458,
    route: 'M736,1245 h-80'
  }];

  
  var models = [];//内容为对像，一个对象内容:结构，初始值，开始出现的位置，结束的位置;

  //数据填充;－－云子各部分结构位置信息
  $('[data-model]').each(function() {
    var $this = $(this);
    
    var animate = $this.data('animate').toString().split('|');
    //console.log(animate)
    //console.log($this)
    $this.css('top', animate[0]);
    models.push({
      e: $(this),  //结构
      initial: parseInt(animate[0], 10), //初始值
      start: parseInt(animate[1], 10),    //开始出现的位置
      target: parseInt(animate[2], 10)    //结束的位置
    });
  });

  //更新云子各部分结构位置
  function updateModel() {
    var y = $(window).scrollTop() - $('.hardware-models').offset().top + $(window).height();
    models.forEach(function(model) {
      if (model.start < y && model.target > y) {
        model.e.css('top', y - model.start + model.initial);
      } else if (model.target <= y) {
        if (parseInt(model.e.css('top'), 10) !== model.target - model.start + model.initial) {
          model.e.css('top', model.target - model.start + model.initial);
        }
      } else {
        if (parseInt(model.e.css('top'), 10) !== model.initial) {
          model.e.css('top', model.initial);
        }
      }
    });
  }

  $(window).scroll(function() {
    updateModel();
    (!$('.package'))&&updatePackage();
  });

  updateModel();
  (!$('.package'))&&updatePackage();

  setTimeout(function() {
    updateHardware('down');
  }, 100);

  //盒盖
  function updatePackage() {
    var $package = $('.package');
    var y = $(window).scrollTop() - $package.offset().top + $(window).height();
    var $img = $package.children('img');
    var played = $package.data('played');
    if (y > 400 && !played) {
      $package.data('played', true);
      $img.animate({
        left: 900
      }, 1000);
    } else if (y < 400 && played) {
      $package.data('played', false);
      $img.animate({
        left: 0
      }, 1000);
    }
  }

  var lastScrollTop = 0;

 // var initV = 0;

  $(window).scroll(function(e) {

    // var step = ev.deltaFactor*22;
    // var value = 0;

    // if(ev.deltaY>0){
    //   value = (initV-=step)
    // }else{
    //   value = (initV+=step)
    // }
    // $(window).scrollTop(value);


    var scrollType = 'down';
    var st = $(this).scrollTop();
    if (st < lastScrollTop) {
      scrollType = 'up';
    }
    lastScrollTop = st;
    updateHardware(scrollType);

    return false;
  });

  function updateHardware(scrollType) {
    // y svg元素在窗口中的位置
    // y<0: 元素没有出现在窗口中；
    // y>=0&&y<元素的高 : 元素出现在窗口中
    var y = $(window).scrollTop() - $('.hardware-desc svg').offset().top + $(window).height();

    paths.forEach(function(def) {
      if (scrollType === 'down') {
        if (def.start < y && !def.played) {//? 为什么是在小于的时候开始绘制
          
          startAnimate(def);
        }
      } else {
        if (def.start > y && def.ended) {
          stopAnimate(def);
        }
      }
    });

    $('[data-path]').each(function() {
      var $this = $(this);
      var start = paths[$this.data('path')].start;
      if (scrollType === 'down') {
        if (start < y && !$this.data('show')) {
          $this.data('show', true);
          $this.fadeIn();
        }
      } else {
        if (start > y && $this.data('show')) {
          $this.data('show', false);
          $this.fadeOut();
        }
      }
    });
  }
});

function stopAnimate(def) {
  def.ended = false;
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
    def.path.remove();
    def.path = null;
    def.played = false;
  }
}

//def {start: 375,route: 'M740,70 h-40 v67 h-50'}
function startAnimate(def, remainRoutes) {

  if (!Array.isArray(remainRoutes)) {
    def.played = true;
    var paths = def.route.split(' ');

    remainRoutes = paths.slice(1);
    def.path = s.paper.path(paths[0]).attr({
      stroke: '#110b0a',
      strokeWidth: 1,
      fill: 'none'
    });
  }
  if (remainRoutes.length) {
    var route = remainRoutes.shift();
    def.path.animate({
      path: def.path.attr('path') + ' ' + route
    }, 200, function() {
      startAnimate(def, remainRoutes);
    });
  } else {
    var point = def.path.getPointAtLength(def.path.getTotalLength() - 1);
    def.circle = s.paper.circle(point.x, point.y, 3);
    def.ended = true;
  }
}

