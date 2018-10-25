import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// Import to load these templates
import '../../ui/layouts/_condensedLayout.js';
import '../../ui/layouts/_fullHeightLayout.js';
import '../../ui/layouts/_plainLayout.js';

//import './page-imports.js'


FlowRouter.route('/', {
    action: function(params) {
      BlazeLayout.render("_condensedLayout", {main: "dashboard"});
    }
});

FlowRouter.route('/login', {
  action: function (params) {
    BlazeLayout.render("_plainLayout", {main: "login"});
  }
});

FlowRouter.route('/register', {
  action: function (params) {
    BlazeLayout.render("_plainLayout", {main: "register"});
  }
});

FlowRouter.route('/lock', {
  action: function (params) {
    BlazeLayout.render("_plainLayout", {main: "lock"});
  }
});

FlowRouter.route('/calendar/:templateName', {
  triggersEnter: [function() {
      $("body").addClass("no-header");
  }],
  action: function (params) {
    BlazeLayout.render("_calendarLayout", {main: params.templateName});
  },
  triggersExit: [function() {
      $("body").removeClass("no-header");
  }]
});

FlowRouter.route('/builder', {
  action: function (params) {
    BlazeLayout.render("_builderLayout", {main: "pageBuilder"});
  }
});

FlowRouter.route('/layouts/boxed-layout', {
  action: function (params) {
    BlazeLayout.render("_boxedLayout", {main: "boxedLayoutSample"});
  },
  triggersEnter: [function() {
      $("body").addClass("box-layout menu-pin");
  }],
  triggersExit: [function() {
      $("body").removeClass("box-layout menu-pin");
  }]
});

FlowRouter.route('/layouts/secondary-layout', {
  action: function (params) {
    BlazeLayout.render("_secondaryLayout", {main: "secondaryLayoutSample"});
  }
});

FlowRouter.route('/layouts/horizontal-layout', {
  action: function (params) {
    BlazeLayout.render("_horizontalLayout", {main: "horizontalLayoutSample"});
  },
  triggersEnter: [function() {
      $("body").addClass("horizontal-menu ");
  }],
  triggersExit: [function() {
      $("body").removeClass("horizontal-menu ");
  }]
});

FlowRouter.route('/error/:code', {
  action: function (params) {
    BlazeLayout.render("_plainLayout", {main: "errorPage", errorCode:params.code});
  }
});

FlowRouter.route('/ui/:templateName', {
  action: function (params) {
    BlazeLayout.render("_condensedLayout", {main: params.templateName});
  }
});

FlowRouter.route('/table/:templateName', {
  action: function (params) {
    BlazeLayout.render("_condensedLayout", {main: params.templateName});
  }
});

FlowRouter.route('/maps/:templateName', {
  action: function (params) {
    
    BlazeLayout.render("_fullHeightLayout", {main: params.templateName});
  }
});

FlowRouter.route('/:templateName', {
    action: function(params) {
      BlazeLayout.render("_condensedLayout", {main: params.templateName});
    }
});

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render("_plainLayout", {main: "errorPage"});
    }
};
