$.fn.ProvinceSelector = function(lang) {
  var _self = this;
  var _province = _self.find("select.province")[0];
  var _provincelist = [];
  var base_url = window.config.order.host + ":" + window.config.order.port;
  function addProvincesOption() {
    $.get(base_url + '/api/americanStates', function(Provinces) {
      _provincelist = Provinces;
      // console.info(Provinces);
      if(lang == "en"){
        $(_province).html("<option value=''>Please select</option>");
      } else {
        $(_province).html("<option value=''>请选择</option>");
      }
      $.each(_provincelist, function(n) {
        $("<option value='" + _provincelist[n] + "'>" + _provincelist[n] + "</option>").appendTo($(_province));
      });
    });
  }
  if (_province) {
    addProvincesOption();
  } else {
    // alert('Please specify a province selector.');
  }
};
