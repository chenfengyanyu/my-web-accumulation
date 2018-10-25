/* ============================================================
 * Widgets
 * Showcase of widgets created using Pages Framework
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */

$(function() {

    'use strict';

    /* Load widget data */
    var limit = 10;
    var skip = 0;
    var widgetAPI = 'http://widgets.revox.io:8080/widget?limit=' + limit + '&skip=' + skip;
    var $widgetsContainer = $('.widgets-container');
    // quick search regex
    var qsRegex;

    $widgetsContainer.css('visibility', 'hidden');

    $.getJSON(widgetAPI, function(data) {

        var widgets = data.widgets;
        var categories = data.categories;

        if (!widgets.length) return;

        var widgetElements = '';

        for (var i in widgets) {
            var widget = widgets[i];
            var category = widget['category'];
            var tagClasses = widget['tags'][0].split(',').join(' ');

            var newItem = '<!-- START WIDGET ITEM --> \
                <div class="widget-item '+ ['category-',category].join('') + ' b-a b-grey bg-master-lightest" data-width="1" data-height="1" \
                data-createdat="' + widget['createdAt'] + '" \
                data-description="' + widget['description'] + '" \
                data-category="' + widget['category'] + '" \
                data-wheight="' + widget['height'] + '" \
                data-wwidth="' + widget['width'] + '" \
                data-id="' + widget['id'] + '" \
                data-path="' + widget['path'] + '" \
                data-tags="' + widget['tags'].toString() + '" \
                data-thumbnail="' + widget['thumbnail'] + '" \
                data-title="' + widget['title'] + '" \
                style="background-image:url('+ widget['thumbnail'] + ')"> \
                    <!-- START ITEM OVERLAY DESCRIPTION --> \
                    <div class="overlayer widget-detail bottom-left full-width"> \
                        <img src="assets/img/wm-logo.svg" class="wm-logo"> \
                        <div class="overlayer-wrapper item-info"> \
                            <div class="p-l-20 p-r-20 p-t-20 p-b-5"> \
                                <div class="item-footer"> \
                                    <h5 class="text-center text-white semi-bold m-b-0">' + widget['title'] + '</h5> \
                                    <p class="fs-12 text-white text-center"><span class="hint-text">Added on </span>'+ moment(widget['createdAt']).format("D MMM YYYY") + '</p> \
                                    <div class="clearfix"></div> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                    <!-- END PRODUCT OVERLAY DESCRIPTION --> \
                    <p style="font-size:0">'+category+' '+tagClasses+'</p> \
                </div> \
                <!-- END WIDGET ITEM -->';
            widgetElements += newItem;
        }

        var allItems = $(widgetElements).appendTo('.widgets-container');

        // Filtering categories
        while (categories.length) {
            var category = categories.pop();
            var html = ' <li><a href="#" class="all-caps font-montserrat fs-11" data-filter="category-' + category + '">' + category + '</a></li>';
            $('[data-filters="widgets"]').append(html);
        }

        applyIsotope();
        $widgetsContainer.css('visibility', 'visible');


    });

    /*  Apply Isotope plugin 
        isotope.metafizzy.co
    */
    var applyIsotope = function() {

        $widgetsContainer.isotope({
            itemSelector: '.widget-item',
            masonry: {
                columnWidth: 270,
                gutter: 10,
                isFitWidth: true
            },
            filter: function() {
                return qsRegex ? $(this).text().match(qsRegex) : true;
            }
        });
    }

    $('body').on('click', '[data-filter]', function(e) {
        e.preventDefault();

        var filter = $(this).data('filter');
        if (filter == 'all') {
            $widgetsContainer.isotope({
                filter: '*'
            });
            return;
        }
        $widgetsContainer.isotope({
            filter: '.' + filter
        });
    });

    /* DETAIL VIEW
    -------------------------------------------------------------*/

    /*
        Toggle detail view using DialogFx
        http://tympanus.net/Development/DialogEffects/
    */
    $('body').on('click', '.widget-item', function() {
        var dlg = new DialogFx($('#widgetDetails').get(0));

        var container = $('#widgetDetails');
        var loader = container.find('.progress-circle-indeterminate');
        var preview = container.find('#widget-preview');
        var tagsElem = container.find('#widget-tags');
        var descriptionElem = container.find('#widget-description');
        var titleElem = container.find('#widget-title');
        var dateElem = container.find('#widget-date');
        var btn = container.find('#btn-download');

        var createdAt = $(this).data('createdat');
        var description = $(this).data('description');
        var height = $(this).data('wheight');
        var width = $(this).data('wwidth');
        var id = $(this).data('id');
        var path = $(this).data('path');
        var tags = $(this).data('tags');
        var thumbnail = $(this).data('thumbnail');
        var title = $(this).data('title');

        loader.show();
        preview.hide();

        preview.attr('src', path);
        preview.load(function(){
            loader.fadeOut(function(){
                preview.show();
            });
        });

        if (height) {
            var contHeight = container.find('.item-slideshow').height();

            preview.css({
                marginTop: contHeight / 2 - height / 2,
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                height: height
            })
        }
        preview.attr("class","");
        preview.addClass("no-border");
        
        if (width) {
            preview.addClass(width);
        }
        if (tags) {
            var tagsArray = tags.split(',');
            var tagsHtml = '';

            while (tagsArray.length) {
                var tag = tagsArray.pop();
                tagsHtml += '<a href="#" class="m-l-5"><span class="label label-success">' + tag + '</span></a>';
            }
            tagsElem.html(tagsHtml);
        }
        if (description) {
            descriptionElem.text(description)
        }
        if (title) {
            titleElem.text(title);
        }
        if (createdAt) {
            var dateobj = new Date(createdAt);
            var month = dateobj.getUTCMonth() + 1; //months from 1-12
            var day = dateobj.getUTCDate();
            var year = dateobj.getUTCFullYear();
            dateElem.text(day + '-' + month + '-' + year);
        }
        if (id) {
            container.data('widget-id', id);
        }


        dlg.toggle();
    });

    /* Filters isotope by keywords enterd */
    var $widgetFilter = $('#widget-filter');
    $widgetFilter.keyup(debounce(function() {
        qsRegex = new RegExp($widgetFilter.val(), 'gi');
        $widgetsContainer.isotope({
            filter: function() {
                return qsRegex ? $(this).text().match(qsRegex) : true;
            }
        });
        if ($widgetFilter.val()) {
            $("html, body").stop().animate({
                scrollTop: "320px"
            });
        } else {

            $("html, body").stop().animate({
                scrollTop: "0px"
            });
        }
    }, 200));

    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        var timeout;
        return function debounced() {
            if (timeout) {
                clearTimeout(timeout);
            }

            function delayed() {
                fn();
                timeout = null;
            }
            timeout = setTimeout(delayed, threshold || 100);
        }
    }

});