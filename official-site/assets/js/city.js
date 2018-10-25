$.fn.CitySelector = function() {
  var _self = this;
  var _province = _self.find("select.province")[0];
  var _city = _self.find("select.city")[0];
  var _citylist;
  var base_url = window.config.order.host + ":" + window.config.order.port;
  function addProvincesOption() {
    $.get(base_url + '/api/cities', function(cities) {
      _citylist = cities;
      $(_province).html("<option value=''>请选择</option>");
      $(_city).html("<option value=''>请选择</option>");

      $.each(_citylist, function(i, n) {
        $("<option value='" + n[0] + "'>" + n[0] + "</option>").appendTo($(_province));
      });
    });
  }

  function provinceChanged() {
    $.each(_citylist, function(i, n) {
      if (_province.value == n[0]) {
        //clear city options
        $(_city).html("<option value=''>请选择</option>");

        // add city options
        $.each(_citylist[i], function(j, m) {
          if (j > 0) {
            $("<option value='" + m + "'>" + m + "</option>").appendTo($(_city));
          }
        });
      }
    });
  }

  // add province list and change event.
  if (_province) {
    addProvincesOption();
  } else {
    alert('Please specify a province selector.');
  }
  if (_city) {
    $(_province).change(provinceChanged);
  }
};
