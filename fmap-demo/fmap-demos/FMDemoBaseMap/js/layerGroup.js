/////////////////////////////////////////////////////////
/////////////封装右边图层控制控件代码----开始/////////////
/////////////////////////////////////////////////////////
var gui = {};
gui.LayerGroup = function() {
    this.allLayer = true; //控制单层显示还是所有模型展示
    this.change_ = null;
    this.inited = false; //是否已经初始化
};
gui.LayerGroup.prototype = {
    init: function(gs, focusGroupId) {
        var this_ = this;
        $('.layer-list').html('');
        for (i = gs.length - 1; i >= 0; i--) {
            var g = gs[i];
            $('.layer-list').append(
                this.createLayerButton_(g.gid, g.gname.toUpperCase(),
                    focusGroupId == g.gid
                ));
        }
        $('.group-layer .btn-primary').on(
            'click',
            function(event) {
                if (this_.allLayer) {
                    $(this).html("<i class='icon iconfont'>&#xe66c;</i>")
                    this_.allLayer = false;
                } else {
                    $(this).html("<i class='icon iconfont'>&#xe61c;</i>")
                    this_.allLayer = true;
                }
                this_.triggerChange_();
            });
        this.inited = true;
    },
    onChange: function(change) {
        this.change_ = change;
    },
    createLayerButton_: function(gid, lbl, selected) {
        var this_ = this;
        var ele = $('<label>').addClass('btn btn-lg btn-default').append($('<span>').text(lbl))
            .attr('data-gid', gid)
            .on('click', function() {
                if ($(".layer-list>label[class*='active']").text() === $(this).text()) return;
                $(".layer-list>label[class*='active']").removeClass('active');
                $(this).addClass('active');
                this_.triggerChange_();
            });
        if (selected) {
            ele.addClass('active');
        }
        return ele;
    },
    triggerChange_: function() {
        if (this.change_ !== null) {
            var groups = [];
            //var ele = $('.layer-list input[type="radio"]:checked');
            var ele = $(".layer-list>label[class*='active']");

            if (ele.length == 1) {
                groups.push(parseInt(ele.attr('data-gid')));
            }
            this.change_(groups);
            checkBtn();
        }
    }
};

/////////////////////////////////////////////////////////
/////////////封装右边图层控制控件代码----结束////////////
/////////////////////////////////////////////////////////

var layerGroup = new gui.LayerGroup(); //实例化图层控制控件
//图层控制控件的按钮点击事件，单层和多层模式设置
layerGroup.onChange(function(sg) {
    if (layerGroup.allLayer) {
        map.visibleGroupIDs = map.groupIDs;
    } else {
        map.visibleGroupIDs = sg;
    }
    map.focusGroupID = sg[0];
});

var showBtnCount = 3;

//检测按钮式是否可以使用
function checkBtn() {
    var index = $(".layer-list>label[class*='active']").index();
    var count = $(".layer-list > label").size();
    if (index == count - 1) {
        $("#down").addClass("disabled");
    } else {
        $("#down").removeClass("disabled");
    }

    if (index == 0) {
        $("#top").addClass("disabled");
    } else {
        $("#top").removeClass("disabled");
    }
}

//清除翻页按钮状态
function clearBtnClass() {
    $('#btnHand').removeClass('active');
    $('#btnInfo').removeClass('active');
    $('#btnNavigation').removeClass('active');
}

//重置显示区域大小
function resize() {
    var size = $(".layer-list > label").size();
    if (size < showBtnCount) showBtnCount = size;

    var btnHeight = $(".layer-list > label").outerHeight();
    var layerHeight = btnHeight * showBtnCount;
    $(".layer-list").height(layerHeight - showBtnCount + 1); //设置滚动条高度

    scroolTo();
}

function scroolTo() {
    var index = $(".layer-list>label[class*='active']").index();
    changeScrollState(index);
}

//定位跳转
function moveTo(coord) {
    var index = map.groupIDs.length - coord.groupID;
    $(".layer-list>label[class*='active']").removeClass('active');
    $(".layer-list > label").eq(index).addClass('active');

    scroolTo();

    if (layerGroup.allLayer) {
        map.moveTo(coord);
    } else {
        map.visibleGroupIDs = [coord.groupID];
        map.focusGroupID = coord.groupID;
        map.moveTo(coord);
    }
}