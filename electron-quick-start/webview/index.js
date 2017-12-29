window.onload = function() {
  var webview = document.getElementById("foo");
  var indicator = document.querySelector(".indicator");

  var loadstart = function() {
    indicator.innerText = "loading...";
  }
  var loadstop = function() {
    indicator.innerText = "";
  }

  webview.addEventListener("did-start-loading", loadstart);
  webview.addEventListener("did-stop-loading", loadstop);
  webview.addEventListener("dom-ready", function() {
    // webview.openDevTools();
    console.log(webview.getTitle());
  });
  
}
