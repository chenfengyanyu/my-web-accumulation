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