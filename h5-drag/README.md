# dragAndDrop
html5 drag demo

### demo1.html：单向拖拽
![demo1](http://7xvi3w.com1.z0.glb.clouddn.com/demo1.gif-blog)

### demo2.html：来回拖拽
![demo2](http://7xvi3w.com1.z0.glb.clouddn.com/demo2.gif-blog)

### demo3.html：angularjs 官网文档拖拽示例

### demo3.js：angularjs 官网文档指令代码
```js
angular.module('dragModule', [])
.directive('myDraggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       border: '1px solid red',
       backgroundColor: 'lightgrey',
       cursor: 'pointer'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);
```

### demo4.html：angularjs 实现的来回拖拽
效果如上

### demo5.html：angularjs 实现的随处拖拽
效果如上

### demo6.js：angularjs 指令代码
```js
angular
.module('app')
.directive('dragdrop', [function () {
  return {
    scope: {},
    link: (scope, element, attrs) => {
      var el = element[0];
      el.draggable = true;

      el.addEventListener(
        'dragstart',
        function(e) {
          let style = window.getComputedStyle(e.target, null);
          e.dataTransfer.setData('text/plain', 
            (parseInt(style.getPropertyValue('left')) - e.clientX) + ',' + (parseInt(style.getPropertyValue('top')) - e.clientY)
          );
          // console.log(e.clientX, 'start');
        },false
      );

      document.body.addEventListener('dragover',function(e) {
        e.preventDefault(); 
        return false; 
      },false); 

      document.body.addEventListener('drop',function(e) {
        let offset = e.dataTransfer.getData('text/plain').split(',');
        // console.log(e.clientX, 'drop',offset);
        el.style.left = (e.clientX + parseInt(offset[0])) + 'px';
        el.style.top = (e.clientY + parseInt(offset[1])) + 'px';
        e.preventDefault();
        return false;
      },false);

    }
  };
}
]);
```

