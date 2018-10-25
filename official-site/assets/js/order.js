$(function(){

  $('.country_selector').CountrySelector();
  // 美国城市列表列表
  $('.america_selector').ProvinceSelector();
  $('.city_selector').CitySelector();

  var base_url = window.config.order.host + ":" + window.config.order.port;
  var isEn = $('body').attr("class") ?  $('body').attr("class").split(" ").indexOf("en") > -1 : false;
  var orders = {items:[]};
  var dataOrigin = [];
  var cell = 1;//步数
  var temp = {count :0, price : 0,enprice:0, item :0,name:0,sum:0,ensum:0,cgsum:0,specPrice:0,specEnprice:0,specCount:0};
  var infoInit = [];
  var initTemp = {count : 0, price : 0,item :0,name:0,sum:0,specPrice:0,specCount:0};
  var submitData = {invoice:{type:"noNeed"}};
  var mirrorData = {
    "USB_Box":"548ae7c985475d7f0b607913",
    "Yunzi"  :"54d349e4e72cf5b331791ec5",
    "4AA_Box":"548ae7e185475d7f0b607915",
    "iot":"5486c025bff8d039586ff71d",
  };

  pageInit();

  function pageInit(){
    langInit();
    itemsInit();
    shippingInit();
    $(".add-tax-invoice-show").hide();
    $(".america_selector").hide();
  }

  function langInit(){
    if(!isEn){ //中文
      $('.abroad').hide();
      $('.china').show();
      $('.lang_zh').show(); // 微信摇一摇体验包，只在中文页面显示
      $('.lang_en').hide(); // Alpha Node-4AA，只在英文页面显示
    } else { //英文
      $('.abroad').show();
      $('.china').hide();
      $('.lang_zh').hide();// 微信摇一摇体验包，只在中文页面显示
      $('.lang_en').show();// Alpha Node-4AA，只在英文页面显示
    }
  }

  // 取商品列表
  function itemsInit(){
    var str = "";
    $.each(mirrorData, function(k,v){
      str = str + "&ids=" + v;
    });
    $.get(base_url + '/items/list?' + str).success(function(data){
      for( var i =0;i<data.length;i++){
        var jsn = {};
        var jst = {};
        for( var attr in temp){
          if(attr=="item"){
            jsn[attr] = data[i].id;
            jst[attr] = data[i].id;
          }
          else if(attr=="count"){
            jsn[attr] = 0;
            jst[attr] = 0;
          }else{
            jsn[attr] = data[i][attr]||0;
            jst[attr] = data[i][attr]||0;
          }
        }
        orders.items.push(jsn);
        dataOrigin.push(jst);
      }
      dataInit();
    });
  }

  // 初始化运费数据
  function shippingInit(){
    var country = isEn ? getVal('country') : "China";
    var province = getVal('province');
    getShipping(country,province);
  }

  //数据初始化
  var countPreserve = [];
  function dataInit(){
    for(var i=0;i<infoInit.length;i++){
      countPreserve.push(infoInit[i].count);
    }

    infoInit = [];

    for( var i=0;i<orders.items.length;i++){
      var jsn = {};
      for( var attr in initTemp){
        jsn[attr] = orders.items[i][attr];
      }
      //根据  isEn 确定价格 是 price 还是 enprice
      //console.log(orders.items)
      jsn.price = !isEn ? orders.items[i].price : orders.items[i].enprice;
      jsn.specPrice = !isEn ? orders.items[i].specPrice : orders.items[i].specEnprice;
      infoInit.push(jsn);
    }

    for( var i=0;i<countPreserve.length;i++){
      infoInit[i].count = countPreserve[i];
    }

    countPreserve = [];

    //console.log(infoInit)

    init();
  }

  //表现初始化
  function init(){

    var ids = ['yunzi','box_4aa','usb','iot']
    for( var i=0;i<ids.length;i++){
      var obj = $('#'+ids[i]);

      if(!obj.attr('pty'))continue;
      var item = findItem(obj.attr('pty'));
      //数量 －  选择区的初始化
      obj.val(item.count);
      //单价 －  选择区的初始化
      $('#'+ids[i] + "_price").text(item.price.toFixed(2));
      //优惠价 －  选择区的初始化
      $('#'+ids[i] + "_sprice").text(item.specPrice.toFixed(2));
      //列表初始化
      updataCount(obj,item.count);
    }
  }
  var limit = 50;
  var limit_alpha = 20;
  // 商品数量输入相关
  $("input.count").keyup(function(event){
    // 判断 alpha4aa 是否>20
    var $target = $(event.target);
    console.info($target);
    var count_alpha4aa = parseInt($("input#alpha_4aa.count").val());
    if($target.parent().attr('id') === 'alpha-count' && count_alpha4aa > limit_alpha){
      $("input#alpha_4aa.count").val(limit_alpha);
      showalphatips();
    }

    var totolCount;
    if(!Number($(this).val())||Number($(this).val())<0){
      $(this).val(0);
    }
    $(this).val(Number($(this).val()));
    totolCount = calcount();
    if(totolCount>limit){
      $(this).val(limit-Number($(this).data('prevCount')));
      showtips();
    }
    updataCount($(this),Number($(this).val()));
    setShippingAndTotal();
  });

  $("input.count").keydown(function(ev){
    $(this).data('prevCount',calcount()-Number($(this).val()));
  });


  function limitAlphaCount(){

  }

  // 增减商品数量
  (function(){
    $("a.inc,a.dec").click(function(event){

      var countInput = $(this).siblings('input.count');
      var count = 0;
      if($(this).hasClass('inc')){
        if(calcount() > limit-1){
          count = Number(countInput.val());
          showtips();
        }else{
          count = Number(countInput.val())+cell;
        }
        //count = Number(countInput.val())+cell;
      }else{
        count = (Number(countInput.val())-cell)<0?0:Number(countInput.val())-cell;
      }
      countInput.val(count);

      updataCount(countInput,count);
      setShippingAndTotal();
    });

    $.Velocity.hook($('#tips_wrapper'),'scale','0.5');
    $.Velocity.hook($('#tips_wrapper_alpha'),'scale','0.5');
    $.Velocity.hook($('#tips_wrapper'),'lineHeight',$(window).height()+'px');


    $('#tips_wrapper').click(function(){
       $('#tips_wrapper').velocity({
        scale:0.5,
        opacity:0
      },{
        complete:function(){
          $('#tips_wrapper').css('display','none');
        },
        duration: 400
      });
    });
    $('#tips_wrapper_alpha').click(function(){
       $('#tips_wrapper_alpha').velocity({
        scale:0.5,
        opacity:0
      },{
        complete:function(){
          $('#tips_wrapper_alpha').css('display','none');
        },
        duration: 400
      });
    });
  }());

  // 显示提示(大于50显示提示)
  function showtips(){
    $('#tips_wrapper').css('display','block');
    $('#tips_wrapper').velocity({
      scale:1,
      opacity:1
    },{
      duration: 400
    });
  }

  function showalphatips(){
    $('#tips_wrapper_alpha').css('display','block');
    $('#tips_wrapper_alpha').velocity({
      scale:1,
      opacity:1
    },{
      duration: 400
    });
  }

  function calcount(){
    var total = 0;
    $('.fun input.count').each(function(index,el){
        total+=parseFloat($(el).val());
    });
    return total;
  }

  var allSum = 0;
  // 更新数量

  function updataCount(obj,count){

    var item = findItem(obj.attr('pty'));
    var id = obj.attr('id');
    var countPlus = calcount() - 50;
    var adjustItem,adjustTotl,
        privStr;

    item.elid = id;

    item.count = count;
    if(countPlus<=0){
      item.specCount = item.count;
    }else{
      adjustPrice(countPlus);
    }
    listpad();
  }

  // 订单详情
  function listpad(){
    allSum = 0;
    for(var i=0;i<infoInit.length;i++){

      $('#'+infoInit[i].elid+'_qty').text(infoInit[i].count);//数量
      $('#'+infoInit[i].elid+'_pic').children('i').text(infoInit[i].price.toFixed(2));    //单价
      $('#'+infoInit[i].elid+'_spec').children('i').text(infoInit[i].specPrice.toFixed(2)); //优惠价
      if(infoInit[i].elid=="weChat"){
        infoInit[i].specCount = 0;
      }

      var sprice = (infoInit[i].price-infoInit[i].specPrice).toFixed(2),
          spCount = infoInit[i].specCount,
          sPriv = (sprice*spCount).toFixed(2);



      $('#'+infoInit[i].elid+'_priv').children('i').text( sprice + '*' + spCount + ' = '+ sPriv );//已经优惠
      infoInit[i].sum = infoInit[i].specCount*infoInit[i].specPrice+(infoInit[i].count-infoInit[i].specCount)*infoInit[i].price;
      $('#'+infoInit[i].elid+'_tal').children('i').text(infoInit[i].sum.toFixed(2)); //小记
      allSum += infoInit[i].sum;
    }
    $("#sum").text(allSum.toFixed(2)); //总计
    switchAddedTax(Number(allSum)<2000)
  }

  function switchAddedTax (toHide) {
    if (toHide) {
      $('.add-tax-invoice-show').addClass('hide')
      $('.addedTaxSwitch').addClass('hide')
    } else {
      $('.add-tax-invoice-show').removeClass('hide')
      $('.addedTaxSwitch').removeClass('hide')
    }
  }

  //c  超出的数量
  function adjustPrice(c){
    var recalc = [],spcount=0,oricount=0;
    for(var i=0;i<infoInit.length;i++){
      if(infoInit[i].count>0){
        recalc.push(infoInit[i]);
      }
    }
    recalc.sort(function(a,b){
      if(b.specPrice-a.specPrice){
        return b.specPrice-a.specPrice;
      }else{
        return b.count-a.count;
      }

    });

    for( var i=0;i<recalc.length;i++){
      spcount = c - recalc[i].count;
      if(spcount>=0){
        recalc[i].specCount = 0;
        c = spcount;
      }else{
        recalc[i].specCount = Math.abs(spcount);
        for( var j=i+1;j<recalc.length;j++){
          recalc[j].specCount = recalc[j].count;
        }
        break;
      }
    }

    return recalc;
  }


  //传入 pty ,找到对应的数据条目
  function findItem(name){
    for( var i=0;i<infoInit.length;i++){
      if(infoInit[i].item==mirrorData[name.replace(" ","_")]){
        return infoInit[i];
      }
    }
  }

  var addressTips = $('table.order textarea[name=address]'),
      tipsOri = addressTips.attr('placeholder');

  // 切换国家时，省市的输入框和下拉框切换
  $(".country").change(function(){
    var self = $(this);
    //订单提示
    if(self.val().toLocaleLowerCase() == "china"||!$(".country").val() ){
      $('.china').show(); // 省市的下拉列表
      $('.abroad').hide();// 省市的输入框
      $('.not_america').hide();
      $('.america_selector').hide(); // 省 输入框
    }else{
      $('.china').hide(); // 省市的下拉列表
      $('.abroad').show();// 省市的输入框
    }
    if(self.val().toLocaleLowerCase() == "united states"){
      console.info(self.val().toLocaleLowerCase() === "united states");

      $('.america_selector').show(); // 省 输入框
      $('.not_america').hide();// 省 下拉框
    }else{
      $('.america_selector').hide();
      $('.not_america').show();
    }

    if(['Hong Kong','Macau','Taiwan'].indexOf(self.val())!=-1){
      addressTips.attr('placeholder','为了您的商品顺利送达，请用英文填写地址');
    }else{
      addressTips.attr('placeholder',tipsOri);
    }

    setShippingAndTotal();
    // dataInit(); 初始数据
  });

  // 获取提交数据
  function getDetails(submitData,paymentMethod){
    submitData.country = getVal('country');
    submitData.province = getVal('province');
    submitData.city = getVal('city');
    submitData.address = getVal('address');
    submitData.postcode = getVal('postcode');
    submitData.consignee = getVal('consignee');
    submitData.email = getVal('email');
    submitData.phone = getVal('phone');
    submitData.desc = getVal('desc');
    submitData.lang = isEn ? "en" : "zh";
    submitData.paymentMethod = paymentMethod;
    submitData.items = infoInit;
    submitData.invoice.company = getVal('company');
    submitData.invoice.type = $("input[name=invoiceType]:checked").val();
    if(submitData.invoice.type === "addedTax"){
      submitData.invoice.taxpayerID = getVal('taxpayerID');
      submitData.invoice.regAddr = getVal('regAddr');
      submitData.invoice.regPhoneNumber = getVal('regPhoneNumber');
      submitData.invoice.bank = getVal('bank');
      submitData.invoice.bankAccount = getVal('bankAccount');
    }
    return submitData;
  }

  /*check form value validate start*/
  var formErrList = [];
  var formErrorCount = 0;
  $('select[name=country]').blur(function() {
    checkCountry()
  });
  $('select[name=country]').change(function() {
    checkCountry()
  });

  function checkCountry(){
    if (!checkEmpty('country')) {
      $(".country-empty").show();
      formErrorCount += 1;
    }else{
      $(".country-empty").hide();
      //showSum(indent);
    }
  }

  $('select[name=province]').blur(function() {
    if ($('select[name=province]:visible') && !checkEmpty('province')) {
      $(".select-province-empty").show();
      formErrorCount += 1;
    }else{
      $(".select-province-empty").hide();
    }
  });

  $('select[name=city]').blur(function() {
    if($('select[name=city]:visible') && !checkEmpty('city')) {
      $(".select-city-empty").show();
      formErrorCount += 1;
    }else{
      $(".select-city-empty").hide();
    }
  });

  $('input[name=consignee]').blur(function() {
    if (!checkEmpty('consignee')) {
      $(".consignee-empty").show();
      formErrorCount += 1;
    } else {
      $(".consignee-empty").hide();
    }
  });

  $('input[name=city]').blur(function() {
   if($('input[name=city]:visible') && !checkEmpty('city')) {
      $(".city-empty").show();
      formErrorCount += 1;
    }else{
      $(".city-empty").hide();
    }
  });

  $('input[name=province]').blur(function() {
    if($('input[name=province]:visible') && !checkEmpty('province')) {
      $(".province-empty").show();
      formErrorCount += 1;
    }else{
      $(".province-empty").hide();
    }
  });

  $('textarea[name=address]').blur(function() {
    if (!checkEmpty('address')) {
      $(".address-error").hide();
      $(".address-empty").show();
      formErrorCount += 1;
    } else if (!checkRegexp('address', /(.){5,}/)) {
      $(".address-empty").hide();
      $(".address-error").show();
      formErrorCount += 1;
    } else{
      $(".address-empty").hide();
      $(".address-error").hide();
    }
  });

  $('input[name=postcode]').blur(function() {
    if (!checkEmpty('postcode')) {
      $(".postcode-error").hide();
      $(".postcode-empty").show();
      formErrorCount += 1;
    } else if (!checkRegexp('postcode',/[0-9a-zA-Z]{3,}/)) {
      $(".postcode-empty").hide();
      $(".postcode-error").show();
      formErrorCount += 1;
    } else{
      $(".postcode-empty").hide();
      $(".postcode-error").hide();
    }
  });

  $('input[name=phone]').blur(function() {
    if (!checkEmpty('phone')) {
      $(".phone-error").hide();
      $(".phone-empty").show();
      formErrorCount += 1;
    } else if (!checkRegexp('phone', /\d{5,}/)) {
      $(".phone-empty").hide();
      $(".phone-error").show();
      formErrorCount += 1;
    }else {
      $(".phone-empty").hide();
      $(".phone-error").hide();
    }
  });

  $('input[name=email]').blur(function() {
    if (!checkEmpty('email')) {
      $(".email-error").hide();
      $(".email-empty").show();
      formErrorCount += 1;
    } else if (!checkRegexp('email', /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/)) {
      $(".email-empty").hide();
      $(".email-error").show();
      formErrorCount += 1;
    } else {
      $(".email-empty").hide();
      $(".email-error").hide();
    }
  });

  // 增值税发票
  function isAddedTaxInvoice(){
    return $("input[name=invoiceType]:checked").val() == "addedTax";
  }

  $('input[name=company]').blur(function() {
    if($("input[name=invoiceType]:checked").val() == "noNeed"){
      $(".company-empty").hide();
      return;
    }
    if (!checkEmpty('company')) {
      $(".company-empty").show();
      formErrorCount += 1;
    } else {
      $(".company-empty").hide();
    }
  });

  $('input[name=taxpayerID]').blur(function() {
    if(!isAddedTaxInvoice()) return;
    if (!checkEmpty('taxpayerID')) {
      $(".taxpayerID-empty").show();
      formErrorCount += 1;
    } else {
      $(".taxpayerID-empty").hide();
    }
  });

  $('input[name=regAddr]').blur(function() {
    if(!isAddedTaxInvoice()) return;
    if (!checkEmpty('regAddr')) {
      $(".regAddr-empty").show();
      formErrorCount += 1;
    } else {
      $(".regAddr-empty").hide();
    }
  });

  $('input[name=regPhoneNumber]').blur(function() {
    if(!isAddedTaxInvoice()) return;
    if (!checkEmpty('regPhoneNumber')) {
      $(".regPhoneNumber-error").hide();
      $(".regPhoneNumber-empty").show();
      formErrorCount += 1;
    } else if (!checkRegexp('regPhoneNumber', /\d{5,}/)) {
      $(".regPhoneNumber-empty").hide();
      $(".regPhoneNumber-error").show();
      formErrorCount += 1;
    }else {
      $(".regPhoneNumber-empty").hide();
      $(".regPhoneNumber-error").hide();
    }
  });

  $('input[name=bankAccount]').blur(function() {
    if(!isAddedTaxInvoice()) return;
    if (!checkEmpty('bankAccount')) {
      $(".bankAccount-empty").show();
      formErrorCount += 1;
    }else {
      $(".bankAccount-empty").hide();
    }
  });

  $('input[name=bank]').blur(function() {
    if(!isAddedTaxInvoice()) return;
    if (!checkEmpty('bank')) {
      $(".bank-error").hide();
      $(".bank-empty").show();
      formErrorCount += 1;
    }else {
      $(".bank-empty").hide();
      $(".bank-error").hide();
    }
  });

  $('#terms').click(function() {
   if(!$('#terms')[0].checked){
      $(".terms-empty").show();
      formErrorCount += 1;
    }else{
      $(".terms-empty").hide();
    }
  });

  $('#terms').blur(function() {
   if(!$('#terms')[0].checked){
      $(".terms-empty").show();
      formErrorCount += 1;
    }else{
      $(".terms-empty").hide();
    }
  });

  function goToErrorPosition(ele){
    var top = getElementTop(ele);
    if(top){
      $(window).scrollTop(top-document.body.clientHeight/2);
      return true;
    }
    return false;
  }

  function getElementTop(element){
　　var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while(current !== null){
    　actualTop += current.offsetTop;
    　current = current.offsetParent;
    }
    return actualTop;
  }

  function check(name, func) {
    var value = getVal(name);
    return func(value);
  }
  function checkEmpty(name) {
    return check(name, function(v) {
      return v && v !== '请选择' && v != 'Please select';
    });
  }
  function checkRegexp(name, regexp) {
    return check(name, function(v) { return regexp.test(v); });
  }

  function checkBusinessLicense(){
    if(!isAddedTaxInvoice()) return;
    if (!$("a.image-pre").attr("href")) {
      $(".businessLicense-empty").show();
      formErrorCount += 1;
    }else {
      $(".businessLicense-empty").hide();
    }
  }

  function checkIndent(submitData) {
    formErrorCount = 0;
    $('select[name=country]').change();
    $('select[name=province]').blur();
    $('select[name=city]').blur();
    $('input[name=consignee]').blur();
    $('input[name=city]').blur();
    $('input[name=province]').blur();
    $('textarea[name=address]').blur();
    $('input[name=postcode]').blur();
    $('input[name=phone]').blur();
    $('input[name=email]').blur();
    // 发票相关校验
    $('input[name=company]').blur();
    $('input[name=taxpayerID]').blur();
    $('input[name=regAddr]').blur();
    $('input[name=regPhoneNumber]').blur();
    $('input[name=bankAccount]').blur();
    $('input[name=bank]').blur();
    checkBusinessLicense();
    $('#terms').blur();
    var count = 0;
    for(i = 0;i<submitData.items.length;i++){
      count += submitData.items[i].count;
    }
    if(formErrorCount > 0 || count <=0) return false;
    return true;
  }
  /*check end*/

  // 取表单内容
  function getVal(name){
    var $input = $('input[name=' + name + ']:visible');
    if($input && $input.val()) return $input.val();
    var $select = $('select[name=' + name + ']:visible');
    if($select && $select.val()) return $select.val();
    return $('[name=' + name + ']').val();
  }

  /* start 表单提交 start*/
  $(".submit.alipay").click(function(){
    submit("alipay",function(err,data){
      if(!err && data){
        $('#alipayForm').empty().append(data);
        if(data.paymentApprovalUrl) {
          window.open(data.paymentApprovalUrl);
        } else {
          $('#alipayForm').append(data);
        }
      }
    });
  });

  // paypal 提交
  $(".submit.paypal").click(function(){
    submit("paypal",function(err,data){
      if(!err && data.paymentApprovalUrl) {
        window.location.href = data.paymentApprovalUrl;
      } else {
        console.info("err & data::", err, data);
      }
    });
  });
  /* end 表单提交 end*/

  // 提交loading
  $(".translucent-layer").removeClass("modal");
  // 提交函数
  function submit(paymentMethod,callback){
    // if(calcount() > limit){
    //   showtips(); return callback("count is too much");
    // }
    submitData = getDetails(submitData,paymentMethod);
    if(!checkIndent(submitData)){
      $('#formValid').removeClass('hide');
      return callback("data is invalidate");
    }
    $(".translucent-layer").addClass("modal");
    //console.info("提交订单：",submitData);
    $.post(base_url + "/indents/buy", submitData).success(function(data) {
      callback(null,data);
    }).error(function(err){
      callback(err);
    });
  }

  // 获取运费
  function getShipping(country, province) {
    var items = infoInit;
    var lang = isEn ? "en" : "zh";
    if(!country) {
      return setShippingAndTotal();
    };
    $.post(base_url + "/api/shipping",{country:country,province:province,lang:lang,items:items})
    .success(function(data) {
      setShippingAndTotal(data);
    }).error(function(err){});
  }


  // 计算运费和总价
  function setShippingAndTotal(data){
    var shipping = data ? data.shipping :  parseFloat($("#shipping").html());
    var tax = data ? data.tax : parseFloat($("#tax").html()) || 0;
    var taxVal = (allSum * tax / 100).toFixed(2);
    $("#shipping").html(shipping);
    $("#tax").html(tax);
    $("#tax-val").html(taxVal);
    $("#sumAll").text(( allSum * (1 + tax/100) + shipping).toFixed(2));
    $("#shipping").text() == 0 ? $(".shipping_info").hide() : $(".shipping_info").show();
    $("#tax").text() == 0 ? $(".tax").hide() : $(".tax").show();
  }

  // 显示运费
  $(".country").change(function(){
    var country = getVal('country');
    var province = getVal('province');
    getShipping(country, province);
  });
  // 显示运费
  $(".province").change(function(){
    var country = getVal('country');
    var province = getVal('province');
    getShipping(country,province);
  });

  // 上传文件
  if($("#fileupload") && typeof $("#fileupload").fileupload === "function"){
    $("#fileupload").fileupload({
      url: base_url + "/api/image",//文件上传地址，当然也可以直接写在input的data-url属性内
      start: function (e, data) {
        console.info(e, data);
        console.info("start upload file");
        $("a.image-pre").addClass("image-loading").show();
      },
      done:function(e,result){
        //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
        //注意result要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
        //返回的数据在result.result中，假设我们服务器返回了一个json对象
        if(result.result && result.result.picUrl){
          submitData.invoice.businessLicense = result.result.picUrl;
          $("a.image-pre").attr("href",result.result.picUrl).removeClass("image-loading").show();
        }
        checkBusinessLicense();
        console.log(result.result.picUrl);
      }
    });
  }

  // 发票
  $("input[name=invoiceType]").change(function(){
    var val = $("input[name=invoiceType]:checked").val();
    if(val == "addedTax"){
      $(".add-tax-invoice-show").show();
    } else if(val == "regular") {
      $(".add-tax-invoice-show").hide();
      $(".ragular-invoice-show").show();
      $(".ragular-invoice-show").removeClass('hide');
    } else if(val == "noNeed") {
      $(".add-tax-invoice-show").hide();
    }
  });

  // 发票
  $(".invoice-tips-show").click(function(){
    $(".invoice-tips").toggle();

  });


});
