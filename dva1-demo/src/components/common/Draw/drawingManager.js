Object.defineProperty(exports, '__esModule', {
  value: true,
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _defineProperty2 = require('babel-runtime/helpers/defineProperty');
const _defineProperty3 = _interopRequireDefault(_defineProperty2);
const _extends2 = require('babel-runtime/helpers/extends');
const _extends3 = _interopRequireDefault(_extends2);
const _flowRight2 = require('lodash/flowRight');
const _flowRight3 = _interopRequireDefault(_flowRight2);
const _react = require('react');
const PropTypes = require('prop-types');
const _react2 = _interopRequireDefault(_react);
const _constants = require('./constants');
const _enhanceElement = require('./enhanceElement');
const _enhanceElement2 = _interopRequireDefault(_enhanceElement);

let controlledPropTypes = {
  drawingMode: PropTypes.any,
  options: PropTypes.object,
};


let defaultUncontrolledPropTypes = (0, _enhanceElement.addDefaultPrefixToPropTypes)(controlledPropTypes);

let eventMap = {
  onCircleComplete: 'circlecomplete',
  onMarkerComplete: 'markercomplete',
  onOverlayComplete: 'overlaycomplete',
  onPolygonComplete: 'polygoncomplete',
  onPolylineComplete: 'polylinecomplete',
  onRectangleComplete: 'rectanglecomplete',
  onDrawingModeChanged: 'drawingmode_changed',
};

const publicMethodMap = {
  getDrawingMode: function getDrawingMode(drawingManager) {
    return drawingManager.getDrawingMode();
  },
  setDrawingMode: function setDrawingMode(drawingManager) {
    return drawingManager.setDrawingMode();
  },
  setMap: function setMap(drawingManager, map) {
    return drawingManager.setMap();
  },
};

const controlledPropUpdaterMap = {
  drawingMode: function drawingMode(drawingManager, _drawingMode) {
    drawingManager.setDrawingMode(_drawingMode);
  },
  options: function options(drawingManager, _options) {
    drawingManager.setOptions(_options);
  },
};

function getInstanceFromComponent(component) {
  return component.state[_constants.DRAWING_MANAGER];
}

exports.default = (0, _flowRight3.default)(_react2.default.createClass, (0, _enhanceElement2.default)(getInstanceFromComponent, publicMethodMap, eventMap, controlledPropUpdaterMap))({
  displayName: 'drawingManager',

  propTypes: (0, _extends3.default)({}, controlledPropTypes, defaultUncontrolledPropTypes),

  contextTypes: (0, _defineProperty3.default)({}, _constants.MAP, PropTypes.object),

  getInitialState: function getInitialState() {
    let drawingManager = new google.maps.drawing.DrawingManager((0, _extends3.default)({
      map: this.context[_constants.MAP],
    }, (0, _enhanceElement.collectUncontrolledAndControlledProps)(defaultUncontrolledPropTypes, controlledPropTypes, this.props)));
    return (0, _defineProperty3.default)({}, _constants.DRAWING_MANAGER, drawingManager);
  },
  componentWillUnmount: function componentWillUnmount() {
    let drawingManager = getInstanceFromComponent(this);
    if (drawingManager) {
      drawingManager.setMap(null);
    }
  },
  render: function render() {
    return false;
  },
});
