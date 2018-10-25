module.exports =

        __NEXT_REGISTER_PAGE('/nossr', function() {
          var comp = 
      webpackJsonp([5],{

/***/ "./node_modules/_next@6.0.3@next/dist/lib/dynamic.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamicComponent;
exports.registerChunk = registerChunk;
exports.flushChunks = flushChunks;
exports.SameLoopPromise = void 0;

var _from = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/core-js/array/from.js"));

var _keys = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/core-js/object/keys.js"));

var _getPrototypeOf = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/core-js/object/get-prototype-of.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/possibleConstructorReturn.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/helpers/inherits.js"));

var _set = _interopRequireDefault(__webpack_require__("./node_modules/_@babel_runtime@7.0.0-beta.42@@babel/runtime/core-js/set.js"));

var _react = _interopRequireDefault(__webpack_require__("./node_modules/_react@16.4.0@react/cjs/react.development.js"));

var _utils = __webpack_require__("./node_modules/_next@6.0.3@next/dist/lib/utils.js");

var currentChunks = new _set.default();

function dynamicComponent(p, o) {
  var promise;
  var options;

  if (p instanceof SameLoopPromise) {
    promise = p;
    options = o || {};
  } else {
    // Now we are trying to use the modules and render fields in options to load modules.
    if (!p.modules || !p.render) {
      var errorMessage = '`next/dynamic` options should contain `modules` and `render` fields';
      throw new Error(errorMessage);
    }

    if (o) {
      var _errorMessage = 'Add additional `next/dynamic` options to the first argument containing the `modules` and `render` fields';
      throw new Error(_errorMessage);
    }

    options = p;
  }

  return (
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(DynamicComponent, _React$Component);

      function DynamicComponent() {
        var _ref;

        var _this;

        (0, _classCallCheck2.default)(this, DynamicComponent);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = (0, _possibleConstructorReturn2.default)(this, (_ref = DynamicComponent.__proto__ || (0, _getPrototypeOf.default)(DynamicComponent)).call.apply(_ref, [this].concat(args)));
        _this.LoadingComponent = options.loading ? options.loading : function () {
          return _react.default.createElement("p", null, "loading...");
        };
        _this.ssr = options.ssr === false ? options.ssr : true;
        _this.state = {
          AsyncComponent: null,
          asyncElement: null
        };
        _this.isServer = typeof window === 'undefined'; // This flag is used to load the bundle again, if needed

        _this.loadBundleAgain = null; // This flag keeps track of the whether we are loading a bundle or not.

        _this.loadingBundle = false;

        if (_this.ssr) {
          _this.load();
        }

        return _this;
      }

      (0, _createClass2.default)(DynamicComponent, [{
        key: "load",
        value: function load() {
          if (promise) {
            this.loadComponent();
          } else {
            this.loadBundle(this.props);
          }
        }
      }, {
        key: "loadComponent",
        value: function loadComponent() {
          var _this2 = this;

          promise.then(function (m) {
            var AsyncComponent = m.default || m; // Set a readable displayName for the wrapper component

            var asyncCompName = (0, _utils.getDisplayName)(AsyncComponent);

            if (asyncCompName) {
              DynamicComponent.displayName = "DynamicComponent for ".concat(asyncCompName);
            }

            if (_this2.mounted) {
              _this2.setState({
                AsyncComponent: AsyncComponent
              });
            } else {
              if (_this2.isServer) {
                registerChunk(m.__webpackChunkName);
              }

              _this2.state.AsyncComponent = AsyncComponent;
            }
          });
        }
      }, {
        key: "loadBundle",
        value: function loadBundle(props) {
          var _this3 = this;

          this.loadBundleAgain = null;
          this.loadingBundle = true; // Run this for prop changes as well.

          var modulePromiseMap = options.modules(props);
          var moduleNames = (0, _keys.default)(modulePromiseMap);
          var remainingPromises = moduleNames.length;
          var moduleMap = {};

          var renderModules = function renderModules() {
            if (_this3.loadBundleAgain) {
              _this3.loadBundle(_this3.loadBundleAgain);

              return;
            }

            _this3.loadingBundle = false;
            DynamicComponent.displayName = 'DynamicBundle';
            var asyncElement = options.render(props, moduleMap);

            if (_this3.mounted) {
              _this3.setState({
                asyncElement: asyncElement
              });
            } else {
              _this3.state.asyncElement = asyncElement;
            }
          };

          var loadModule = function loadModule(name) {
            var promise = modulePromiseMap[name];
            promise.then(function (m) {
              var Component = m.default || m;

              if (_this3.isServer) {
                registerChunk(m.__webpackChunkName);
              }

              moduleMap[name] = Component;
              remainingPromises--;

              if (remainingPromises === 0) {
                renderModules();
              }
            });
          };

          moduleNames.forEach(loadModule);
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.mounted = true;

          if (!this.ssr) {
            this.load();
          }
        }
      }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          if (promise) return;
          this.setState({
            asyncElement: null
          });

          if (this.loadingBundle) {
            this.loadBundleAgain = nextProps;
            return;
          }

          this.loadBundle(nextProps);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.mounted = false;
        }
      }, {
        key: "render",
        value: function render() {
          var _state = this.state,
              AsyncComponent = _state.AsyncComponent,
              asyncElement = _state.asyncElement;
          var LoadingComponent = this.LoadingComponent;
          if (asyncElement) return asyncElement;
          if (AsyncComponent) return _react.default.createElement(AsyncComponent, this.props);
          return _react.default.createElement(LoadingComponent, this.props);
        }
      }]);
      return DynamicComponent;
    }(_react.default.Component)
  );
}

function registerChunk(chunk) {
  currentChunks.add(chunk);
}

function flushChunks() {
  var chunks = (0, _from.default)(currentChunks);
  currentChunks.clear();
  return chunks;
}

var SameLoopPromise =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(SameLoopPromise, null, [{
    key: "resolve",
    value: function resolve(value) {
      var promise = new SameLoopPromise(function (done) {
        return done(value);
      });
      return promise;
    }
  }]);

  function SameLoopPromise(cb) {
    (0, _classCallCheck2.default)(this, SameLoopPromise);
    this.onResultCallbacks = [];
    this.onErrorCallbacks = [];
    this.cb = cb;
  }

  (0, _createClass2.default)(SameLoopPromise, [{
    key: "setResult",
    value: function setResult(result) {
      this.gotResult = true;
      this.result = result;
      this.onResultCallbacks.forEach(function (cb) {
        return cb(result);
      });
      this.onResultCallbacks = [];
    }
  }, {
    key: "setError",
    value: function setError(error) {
      this.gotError = true;
      this.error = error;
      this.onErrorCallbacks.forEach(function (cb) {
        return cb(error);
      });
      this.onErrorCallbacks = [];
    }
  }, {
    key: "then",
    value: function then(onResult, onError) {
      var _this4 = this;

      this.runIfNeeded();
      var promise = new SameLoopPromise();

      var handleError = function handleError() {
        if (onError) {
          promise.setResult(onError(_this4.error));
        } else {
          promise.setError(_this4.error);
        }
      };

      var handleResult = function handleResult() {
        promise.setResult(onResult(_this4.result));
      };

      if (this.gotResult) {
        handleResult();
        return promise;
      }

      if (this.gotError) {
        handleError();
        return promise;
      }

      this.onResultCallbacks.push(handleResult);
      this.onErrorCallbacks.push(handleError);
      return promise;
    }
  }, {
    key: "catch",
    value: function _catch(onError) {
      var _this5 = this;

      this.runIfNeeded();
      var promise = new SameLoopPromise();

      var handleError = function handleError() {
        promise.setResult(onError(_this5.error));
      };

      var handleResult = function handleResult() {
        promise.setResult(_this5.result);
      };

      if (this.gotResult) {
        handleResult();
        return promise;
      }

      if (this.gotError) {
        handleError();
        return promise;
      }

      this.onErrorCallbacks.push(handleError);
      this.onResultCallbacks.push(handleResult);
      return promise;
    }
  }, {
    key: "runIfNeeded",
    value: function runIfNeeded() {
      var _this6 = this;

      if (!this.cb) return;
      if (this.ran) return;
      this.ran = true;
      this.cb(function (result) {
        return _this6.setResult(result);
      }, function (error) {
        return _this6.setError(error);
      });
    }
  }]);
  return SameLoopPromise;
}();

exports.SameLoopPromise = SameLoopPromise;

/***/ }),

/***/ "./node_modules/_next@6.0.3@next/dynamic.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/_next@6.0.3@next/dist/lib/dynamic.js")


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

/***/ "./pages/nossr.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/_react@16.4.0@react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_dynamic__ = __webpack_require__("./node_modules/_next@6.0.3@next/dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_dynamic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_next_dynamic__);
var _jsxFileName = "/Users/jartto/Documents/my-web-accumulation/nextjs-demo/pages/nossr.js";


(function () {
  var enterModule = __webpack_require__("./node_modules/_react-hot-loader@4.1.3@react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var DynamicComponentWithNoSSR = __WEBPACK_IMPORTED_MODULE_1_next_dynamic___default()(new (__webpack_require__("./node_modules/_next@6.0.3@next/dynamic.js").SameLoopPromise)(function (resolve, reject) {
  var weakId = /*require.resolve*/("./pages/image.js");

  try {
    var weakModule = __webpack_require__(weakId);

    return resolve(weakModule);
  } catch (err) {}

  __webpack_require__.e/* require.ensure */(4).then((function (require) {
    try {
      var m = __webpack_require__("./pages/image.js");

      m.__webpackChunkName = 'pages_image_b236c4a51e2202924e208980e1dd7a08';
      resolve(m);
    } catch (error) {
      reject(error);
    }
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}), {
  ssr: false
});

var _default = function _default() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(DynamicComponentWithNoSSR, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, "Hello Jartto!"));
};

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/_react-hot-loader@4.1.3@react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__("./node_modules/_react-hot-loader@4.1.3@react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(DynamicComponentWithNoSSR, "DynamicComponentWithNoSSR", "/Users/jartto/Documents/my-web-accumulation/nextjs-demo/pages/nossr.js");
  reactHotLoader.register(_default, "default", "/Users/jartto/Documents/my-web-accumulation/nextjs-demo/pages/nossr.js");
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/nossr")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/_webpack@3.10.0@webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/nossr.js");


/***/ })

},[3])
          return { page: comp.default }
        })
      ;
//# sourceMappingURL=nossr.js.map