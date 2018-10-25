// var navItems = $('.sidebar > .nav > li');

// var pageTitle = $('.page-title').text().trim().toLowerCase();
// var isFound = false;

// navItems.each(function() {
//     var subNavItems = $(this).find('.nav > li');
//     if (!subNavItems.length) {
//         if ($(this).find('a').text().trim().toLowerCase() == pageTitle) {
//             navItems.find('.active').removeClass('active');
//             //navItems.find('.open').removeClass('open');
//             $(this).addClass('active');
//         }
//         return;
//     }
//     subNavItems.each(function() {
//         if ($(this).find('a').text().trim().toLowerCase() == pageTitle) {
//             navItems.find('.active').removeClass('active');
//             //navItems.find('.open').removeClass('open');
//             $(this).addClass('active');
//             $(this).parent().parent().addClass('active');
//             isFound = true;
//             return;
//         }
//     });
//     if (isFound) return;
// });


// $('.sidebar').find('li > a').on('click', function(e) {

//     //slide up all the link lists
//     $(".sidebar ul ul").slideUp(200);
//     //slide down the link list below the h3 clicked - only if its closed
//     if (!$(this).next().is(":visible")) {
//         $(this).next().slideDown(200);
//     }

// });