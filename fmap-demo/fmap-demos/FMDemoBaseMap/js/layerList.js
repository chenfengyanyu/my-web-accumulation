//图层控制楼层列表
$(function() {
    $(".layer-list").niceScroll({
        styler: "fb",
        cursorcolor: "",
        cursorwidth: '3',
        cursorborderradius: '0px',
        background: '',
        spacebarenabled: false,
        cursorborder: '0'
    });

    /*重置浏览器大小*/
    /* $(window).resize(function() {
         resize();
     });*/

    //滚动条事件
    $('.layer-list').scroll(function() {
        var scrollTop = $(this).scrollTop();

        //当滚动条是最顶端
        if (scrollTop == 0) {
            $('#top').css({
                color: '#BBB',
                backgroundColor: '#E6E5E5'
            });
        } else {
            $('#top').css({
                color: "#888",
                backgroundColor: '#FFF'
            });
        }

        //当滚动条是最底端
        var btnHeight = $(".layer-list > label").outerHeight();
        var count = $(".layer-list > label").size();
        var hideBtnCount = count - showBtnCount;
        var scrollDown = hideBtnCount * btnHeight - hideBtnCount;

        if (scrollTop == scrollDown) {
            $('#down').css({
                color: '#BBB',
                backgroundColor: '#E6E5E5'
            });
        } else {
            $('#down').css({
                color: "#888",
                backgroundColor: '#FFF'
            });
        }
    });

    //图层控制控件上移
    $("#top").on('click', function() {
        up();
    });

    //图层控制控件下滑
    $("#down").on('click', function() {
        down();
    });
});

//上一个的按钮状态
function up(){
    var index = $(".layer-list>label[class*='active']").index();
    if (index != 0) {
        var nextIndex = index - 1;
        $(".layer-list > label").eq(nextIndex).trigger('click');
        changeScrollState(nextIndex);
    }
}

//下一个的按钮状态
function down() {
    var index = $(".layer-list>label[class*='active']").index();
    var btnHeight = $(".layer-list > label").outerHeight();
    var count = $(".layer-list > label").size();
    if (index + 1 != count) {
        var nextIndex = index + 1;
        $(".layer-list > label").eq(nextIndex).trigger('click');
        changeScrollState(nextIndex);
    }
}

//根据当前选择的按钮位置动态改变scroll的样式
function changeScrollState(nextIndex) {
    var btnHeight = $(".layer-list > label").outerHeight();
    var count = $(".layer-list > label").size();
    if (count - showBtnCount > nextIndex) {
        var top = nextIndex * btnHeight;
        var scrollTop = $(".layer-list").scrollTop();
        if (top < scrollTop) {
            $(".layer-list").scrollTop(top);
        }
    }

    if (showBtnCount <= nextIndex) {
        var top = (nextIndex - showBtnCount + 1) * btnHeight;
        var scrollTop = $(".layer-list").scrollTop();
        if (top > scrollTop) {
            $(".layer-list").scrollTop(top);
        }
    }

    checkBtn();
}