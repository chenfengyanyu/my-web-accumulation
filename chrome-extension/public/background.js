(function(){
  // console.log(1111);
  chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    alert(tab.url);
  })
})();