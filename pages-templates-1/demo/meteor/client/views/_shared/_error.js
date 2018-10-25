Template.errorPage.helpers({
	code:function(){
		var code;
		if(FlowRouter.getParam("code") == null)
			code="404";
		code = FlowRouter.getParam("code");
		return code;
	}
});