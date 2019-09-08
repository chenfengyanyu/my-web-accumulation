module.exports =

        __NEXT_REGISTER_PAGE('/_app', function() {
          var comp = 
      webpackJsonp([1],{

/***/ "./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/extends.js":
/***/ (function(module, exports, __webpack_require__) {

var _Object$assign = __webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/core-js/object/assign.js");

function _extends() {
  module.exports = _extends = _Object$assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/_next@6.0.3@next/app.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/_next@6.0.3@next/dist/lib/app.js")


/***/ }),

/***/ "./node_modules/_next@6.0.3@next/dist/lib/app.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUrl = createUrl;
exports.Container = exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/asyncToGenerator.js"));

var _extends2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/extends.js"));

var _objectSpread2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/objectSpread.js"));

var _getPrototypeOf = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/core-js/object/get-prototype-of.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/possibleConstructorReturn.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__("./node_modules/_react@16.4.0@react/cjs/react.development.js"));

var _propTypes = _interopRequireDefault(__webpack_require__("./node_modules/_prop-types@15.6.0@prop-types/index.js"));

var _shallowEquals = _interopRequireDefault(__webpack_require__("./node_modules/_next@6.0.3@next/dist/lib/shallow-equals.js"));

var _utils = __webpack_require__("./node_modules/_next@6.0.3@next/dist/lib/utils.js");

var _router = __webpack_require__("./node_modules/_next@6.0.3@next/dist/lib/router/index.js");

var App =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(App, _Component);

  function App() {
    (0, _classCallCheck2.default)(this, App);
    return (0, _possibleConstructorReturn2.default)(this, (App.__proto__ || (0, _getPrototypeOf.default)(App)).apply(this, arguments));
  }

  (0, _createClass2.default)(App, [{
    key: "getChildContext",
    value: function getChildContext() {
      var headManager = this.props.headManager;
      return {
        headManager: headManager,
        router: (0, _router.makePublicRouterInstance)(this.props.router),
        _containerProps: (0, _objectSpread2.default)({}, this.props)
      };
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(err, info) {
      // To provide clearer stacktraces in error-debug.js in development
      // To provide clearer stacktraces in app.js in production
      err.info = info;

      if (false) {
        // In production we render _error.js
        window.next.renderError({
          err: err
        });
      } else {
        // In development we throw the error up to AppContainer from react-hot-loader
        throw err;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          router = _props.router,
          Component = _props.Component,
          pageProps = _props.pageProps;
      var url = createUrl(router);
      return _react.default.createElement(Container, null, _react.default.createElement(Component, (0, _extends2.default)({}, pageProps, {
        url: url
      })));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_ref) {
        var Component, router, ctx, pageProps;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, router = _ref.router, ctx = _ref.ctx;
                _context.next = 3;
                return (0, _utils.loadGetInitialProps)(Component, ctx);

              case 3:
                pageProps = _context.sent;
                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);
  return App;
}(_react.Component);

exports.default = App;
Object.defineProperty(App, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'App'
});
Object.defineProperty(App, "childContextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    _containerProps: _propTypes.default.any,
    headManager: _propTypes.default.object,
    router: _propTypes.default.object
  }
});

var Container =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(Container, _Component2);

  function Container() {
    (0, _classCallCheck2.default)(this, Container);
    return (0, _possibleConstructorReturn2.default)(this, (Container.__proto__ || (0, _getPrototypeOf.default)(Container)).apply(this, arguments));
  }

  (0, _createClass2.default)(Container, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollToHash();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.scrollToHash();
    }
  }, {
    key: "scrollToHash",
    value: function scrollToHash() {
      var hash = this.props.hash;
      if (!hash) return;
      var el = document.getElementById(hash);
      if (!el) return; // If we call scrollIntoView() in here without a setTimeout
      // it won't scroll properly.

      setTimeout(function () {
        return el.scrollIntoView();
      }, 0);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // need this check not to rerender component which has already thrown an error
      return !(0, _shallowEquals.default)(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.createElement(_react.default.Fragment, null, children);
    }
  }]);
  return Container;
}(_react.Component);

exports.Container = Container;
Object.defineProperty(Container, "contextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    _containerProps: _propTypes.default.any
  }
});
var warnUrl = (0, _utils.execOnce)(function () {
  if (true) {
    (0, _utils.warn)("Warning: the 'url' property is deprecated. https://err.sh/next.js/url-deprecated");
  }
});

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  var pathname = router.pathname,
      asPath = router.asPath,
      query = router.query;
  return {
    get query() {
      warnUrl();
      return query;
    },

    get pathname() {
      warnUrl();
      return pathname;
    },

    get asPath() {
      warnUrl();
      return asPath;
    },

    back: function back() {
      warnUrl();
      router.back();
    },
    push: function push(url, as) {
      warnUrl();
      return router.push(url, as);
    },
    pushTo: function pushTo(href, as) {
      warnUrl();
      var pushRoute = as ? href : null;
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: function replace(url, as) {
      warnUrl();
      return router.replace(url, as);
    },
    replaceTo: function replaceTo(href, as) {
      warnUrl();
      var replaceRoute = as ? href : null;
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "./node_modules/_webpack@3.10.0@webpack/buildin/harmony-module.js":
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./pages/_app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_app__ = __webpack_require__("./node_modules/_next@6.0.3@next/app.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_next_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("./node_modules/_react@16.4.0@react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);

var _jsxFileName = "/Users/jartto/Documents/my-web-accumulation/nextjs-demo/pages/_app.js";

(function () {
  var enterModule = __webpack_require__("./node_modules/_react-hot-loader@4.1.3@react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var MyApp =
/*#__PURE__*/
function (_App) {
  _inherits(MyApp, _App);

  function MyApp() {
    _classCallCheck(this, MyApp);

    return _possibleConstructorReturn(this, (MyApp.__proto__ || Object.getPrototypeOf(MyApp)).apply(this, arguments));
  }

  _createClass(MyApp, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          Component = _props.Component,
          pageProps = _props.pageProps;
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_app__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Component, _extends({}, pageProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      })));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(_ref) {
        var Component, router, ctx, pageProps;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, router = _ref.router, ctx = _ref.ctx;
                pageProps = {};

                if (!Component.getInitialProps) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return Component.getInitialProps(ctx);

              case 5:
                pageProps = _context.sent;

              case 6:
                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return MyApp;
}(__WEBPACK_IMPORTED_MODULE_1_next_app___default.a);


;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/_react-hot-loader@4.1.3@react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__("./node_modules/_react-hot-loader@4.1.3@react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MyApp, "MyApp", "/Users/jartto/Documents/my-web-accumulation/nextjs-demo/pages/_app.js");
  leaveModule(module);
})();

;
    (function (Component, route) {
      if(!Component) return
      if (false) return
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/_app")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/_webpack@3.10.0@webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/_app.js");


/***/ })

},[1])
          return { page: comp.default }
        })
      ;
//# sourceMappingURL=_app.js.map