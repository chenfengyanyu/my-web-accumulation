/////////////////////////////////////////////////////////
/////////////创建气泡/////////////
/////////////////////////////////////////////////////////
var createBubble = function(map) {
    this.map = map;
    if (!this.map) return;
}
createBubble.prototype = {
    bubbledomEvent: function(screencoord) {
        var map_ = this.map;
        var this_ = this;
        var div = document.createElement('div');
        var arrow = document.createElement('div');
        var center = document.createElement('div');
        div.setAttribute('class', 'popover top');
        div.style.display = 'block';
        arrow.setAttribute('class', 'arrow');
        arrow.style.left = '50%';
        center.setAttribute('class', 'popover-content');
        center.innerHTML = screencoord.name;
        div.appendChild(arrow);
        div.appendChild(center);
        document.body.appendChild(div);
        map_.on('update', function() {
            this_.setPosition(div, map_.coordMapToScreen(screencoord.x, screencoord.y, screencoord.z))
        });
    },
    setPosition: function(ele, screencoord) {
        if (!ele || !screencoord || typeof(screencoord) != 'object' || !screencoord.x || !screencoord.y) return;
        var h = ele.offsetHeight;
        var w = ele.offsetWidth / 2;
        ele.style.top = screencoord.y - h - 30 + 'px'; //弹出框上移整个弹出框高度+三角高度 + 用户自定义的距离地图的高度
        ele.style.left = screencoord.x - w + 'px'; //弹出框左移半个弹出框宽度
    },
    closeBubble: function() {
        var oBubbles = document.querySelectorAll('.popover');
        if (oBubbles) {
            for (var i = 0; i < oBubbles.length; i++) {
                document.body.removeChild(oBubbles[i]);
            }
        }
    }
}