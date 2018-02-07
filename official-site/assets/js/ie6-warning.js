// $(document).ready(function() {
//     $("#back-to-top").hide();
//     //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
//     $(function() {
//         $(window).scroll(function() {
//             if ($(window).scrollTop() > 100) {
//                 $("#back-to-top").fadeIn(1500);
//             } else {
//                 $("#back-to-top").fadeOut(1500);
//             }
//         });
//         //当点击跳转链接后，回到页面顶部位置
//         $("#back-to-top").click(function() {
//             $('body,html').animate({ scrollTop: 0 }, 1000);
//             return false;
//         });
//     });
// });
function setCookie(name, value) {
  if (name != '')
    today = new Date();
  expires = new Date(today.getTime() + (8 * 7 * 86400000));
  document.cookie = name + '=' + value + '; expires=' + expires;
}

function getCookie(name) {
  if (name == '')
    return ('');

  name_index = document.cookie.indexOf(name + '=');

  if (name_index == -1)
    return ('');

  cookie_value = document.cookie.substr(name_index + name.length + 1, document.cookie.length);

  end_of_cookie = cookie_value.indexOf(';');
  if (end_of_cookie != -1)
    cookie_value = cookie_value.substr(0, end_of_cookie);

  space = cookie_value.indexOf('+');
  while (space != -1) {
    cookie_value = cookie_value.substr(0, space) + ' ' +
      cookie_value.substr(space + 1, cookie_value.length);
    space = cookie_value.indexOf('+');
  }

  return (cookie_value);
}

if (getCookie('warning_has_shown') != 'yes') {
  // your warning html url
  var warning_url = 'http://www.sensoro.com/ie6-warning.html';
  location.href = warning_url + '?return=' + location.href;
}
