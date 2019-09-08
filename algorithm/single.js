const LazySingle = (function(){
  let _instance = null;
  function Single() {
    return {
      publicMethod: function(){
        console.log('Hello, Jartto!');
      },
      publicProperty: '1.0'
    }
  }
  return function() {
    if(!_instance) {
      _instance = Single();
    }
    return _instance;
  }
})();

LazySingle().publicMethod(); // Hello, Jartto!