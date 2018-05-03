export function getCookie(name) {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

export function delCookie(name) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie = `${name}=xxx;expires=${exp.toGMTString()}`;
}

export default {
  getCookie,
  delCookie,
};
