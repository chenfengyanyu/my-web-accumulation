Template.builderOptions.onRendered(function () {
	    // START BUILDER


    var resetMenu = function() {
        $('body').removeClass(function(index, css) {
            return (css.match(/(^|\s)menu-\S+/g) || []).join(' ');
        });
    }
    var resetContent = function() {
        $('.page-content-wrapper').removeClass('active');
    }

    var changeTheme = function(name) {
        if (name == null) {
            $('.main-stylesheet').attr('href', 'pages/css/pages.css');
            return;
        }
        $('.main-stylesheet').attr('href', 'pages/css/themes/' + name + '.min.css');
    }
    var layoutOption='1';
    var colorOption='1';
    var contentOption='1';

    $('#btnExport').click(function() {
        $( "#layout" ).val(layoutOption);
        $( "#colors" ).val(colorOption);
        $( "#content" ).val(contentOption);
         $( "#exportForm" ).submit();
    });
    $('.btn-toggle-layout').click(function() {
        $('.btn-toggle-layout').removeClass('active');
        var action = $(this).attr('data-action');
        $(this).addClass('active');
        switch (action) {
            case 'menuDefault':
                resetMenu();
                layoutOption='1';
                break;
            case 'menuPinned':
                resetMenu();
                $('body').addClass('menu-pin');
                layoutOption='2';
                break;
            case 'menuBelow':
                resetMenu();
                $('body').addClass('menu-behind');
                layoutOption='3';
                break;
            case 'menuPinnedBelow':
                resetMenu();
                $('body').addClass('menu-pin menu-behind');
                layoutOption='4';
                break;
        }
    });

    $('.btn-toggle-theme').click(function() {
        $('.btn-toggle-theme').removeClass('active');
        var action = $(this).attr('data-action');
        $(this).addClass('active');
        switch (action) {
            case 'default':
                changeTheme();
                colorOption='1';
                break;
            case 'corporate':
                changeTheme('corporate');
                colorOption='2';
                break;
            case 'retro':
                changeTheme('retro');
                colorOption='3';
                break;
            case 'unlax':
                changeTheme('unlax');
                colorOption='4';
                break;
            case 'vibes':
                changeTheme('vibes');
                colorOption='5';
                break;
            case 'abstract':
                changeTheme('abstract');
                colorOption='6';
                break;
        }
    });

    $('.btn-toggle-content').click(function() {
        $('.btn-toggle-content').removeClass('active');
        var action = $(this).attr('data-action');
        $(this).addClass('active');
        switch (action) {
            case 'plainContent':
                resetContent();
                contentOption='1';
                $('#plainContent').addClass('active');
                break;
            case 'parallaxCoverpage':
                resetContent();
                contentOption='2';
                $('#parallaxCoverpage').addClass('active');
                break;
            case 'fullheightParallax':
                resetContent();
                contentOption='3';
                $('#fullheightParallax').addClass('active');
                $('#builder').toggleClass('open');
                break;
            case 'titleParallax':
                resetContent();
                contentOption='4';
                $('#titleParallax').addClass('active');
                break;
            case 'columns-3-9':
                resetContent();
                contentOption='5';
                $('#columns-3-9').addClass('active');
                break;
            case 'columns-9-3':
                resetContent();
                contentOption='6';
                $('#columns-9-3').addClass('active');
                $('#builder').toggleClass('open');
                break;
            case 'columns-6-6':
                resetContent();
                contentOption='7';
                $('#columns-6-6').addClass('active');
                $('#builder').toggleClass('open');
                break;
        }
    });
    // END BUILDER
})