$.fn.CountrySelector = function(lang) {
  var _self = this;
  var _country = _self.find("select.country")[0];
  var _countrylist = [];
  var base_url = window.config.order.host + ":" + window.config.order.port;
  function addCountriesOption() {
    $.get('https://www.sensoro.com' + '/api/countries', function(countries) {
      //countries :二维数组;外层数组为各个国家;内层数组有2项，分别为英文国家名，中文国家名；
      _countrylist = countries;
      if(lang == "en"){
        $(_country).html("<option value=''>Please select</option>");
      } else {
        $('.country')[0].selectedIndex = 0;
      }
      $.each(_countrylist, function(n) {
	      if(lang == "en") {
          $("<option value='" + _countrylist[n][0] + "'>" + _countrylist[n][0] + "</option>").appendTo($(_country));
        }else {
          if(n == 0){
            $("<option value='China' selected>中国（China）</option>").appendTo($(_country));
	        }
	        $("<option value='" + _countrylist[n][0] + "'>" + _countrylist[n][1] + " (" + _countrylist[n][0] +")" + "</option>").appendTo($(_country));
	      }
      });
    });
  }
  if (_country) {
    addCountriesOption();
  } else {
    alert('Please specify a province selector.');
  }
};
