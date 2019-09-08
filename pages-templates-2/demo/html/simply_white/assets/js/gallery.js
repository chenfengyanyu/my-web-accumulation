/* ============================================================
 * Gallery
 * Showcase your portfolio or even use it for an online store!
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */

$(function() {

    /* GRID
    -------------------------------------------------------------*/

    /* 
        Wait for the images to be loaded before applying
        Isotope plugin. 
    */
    var $gallery = $('.gallery');
    $gallery.imagesLoaded(function() {
        applyIsotope();
    });

    /*  Apply Isotope plugin 
        isotope.metafizzy.co
    */
    var applyIsotope = function() {
        $gallery.isotope({
            itemSelector: '.gallery-item',
            masonry: {
                columnWidth: 280,
                gutter: 10,
                isFitWidth: true
            }
        });
    }
    
    /*
        Show a sliding item using MetroJS
        http://www.drewgreenwell.com/projects/metrojs
    */
    $(".live-tile,.flip-list").liveTile();


     /* DETAIL VIEW
    -------------------------------------------------------------*/

    /*
        Toggle detail view using DialogFx
        http://tympanus.net/Development/DialogEffects/
    */
    $('body').on('click', '.gallery-item', function() {
        var dlg = new DialogFx($('#itemDetails').get(0));
        dlg.toggle();
    });

    /*
        Look for data-image attribute and apply those
        images as CSS background-image 
    */
    $('.item-slideshow > div').each(function() {
        var img = $(this).data('image');
        $(this).css({
            'background-image': 'url(' + img + ')',
            'background-size': 'cover'
        })
    });

    /* 
        Touch enabled slideshow for gallery item images using owlCarousel
        www.owlcarousel.owlgraphic.com
    */
    $(".item-slideshow").owlCarousel({
        items: 1,
        nav: true,
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        dots: true
    });


     /* FILTERS OVERLAY
    -------------------------------------------------------------*/

    $('[data-toggle="filters"]').click(function() {
        $('#filters').toggleClass('open');
    });


    $("#slider-margin").noUiSlider({
        start: [20, 80],
        margin: 30,
        connect: true,
        range: {
            'min': 0,
            'max': 100
        }
    });

});