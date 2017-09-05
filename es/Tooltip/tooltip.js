'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _portal = require('../Portal/portal.js');

var _portal2 = _interopRequireDefault(_portal);

require('./tooltip.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITION = {
  BOTTOM: 'bottom',
  HORIZONTAL: 'horizontal',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  VERTICAL: 'vertical'
};

var defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  passthrough: true,
  showOnClick: false,
  position: POSITION.VERTICAL
};

var getViewport = function getViewport() {
  return {
    height: window.innerHeight || document.documentElement.offsetHeight,
    width: window.innerWidth || document.documentElement.offsetWidth
  };
};

var TooltipFactory = function TooltipFactory(ComposedComponent) {
  var Tooltips = function (_Component) {
    _inherits(Tooltips, _Component);

    function Tooltips() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Tooltips);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltips.__proto__ || Object.getPrototypeOf(Tooltips)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        active: false,
        position: _this.props.tooltipPosition
      }, _this.handleMouseEnter = function (event) {
        _this.activate();
        if (_this.props.onMouseEnter) _this.props.onMouseEnter(event);
      }, _this.handleMouseLeave = function (event) {
        _this.deactivate();
        if (_this.props.onMouseLeave) _this.props.onMouseLeave(event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tooltips, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout);
      }
    }, {
      key: 'activate',
      value: function activate() {
        var _this2 = this;

        if (this.timeout) clearTimeout(this.timeout);
        this.setState({ visible: true });
        this.timeout = setTimeout(function () {
          _this2.setState({ active: true });
        }, this.props.tooltipDelay);
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        if (this.timeout) clearTimeout(this.timeout);
        if (this.state.active) {
          this.setState({ active: false });
        } else if (this.state.visible) {
          this.setState({ visible: false });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _state = this.state,
            active = _state.active,
            position = _state.position,
            visible = _state.visible;

        var _props = this.props,
            children = _props.children,
            rootClassName = _props.rootClassName,
            onClick = _props.onClick,
            onMouseEnter = _props.onMouseEnter,
            onMouseLeave = _props.onMouseLeave,
            tooltip = _props.tooltip,
            tooltipDelay = _props.tooltipDelay,
            tooltipHideOnClick = _props.tooltipHideOnClick,
            tooltipPosition = _props.tooltipPosition,
            tooltipShowOnClick = _props.tooltipShowOnClick,
            other = _objectWithoutProperties(_props, ['children', 'rootClassName', 'onClick', 'onMouseEnter', 'onMouseLeave', 'tooltip', 'tooltipDelay', 'tooltipHideOnClick', 'tooltipPosition', 'tooltipShowOnClick']);

        var childProps = _extends({}, other, {
          rootClassName: rootClassName,
          onClick: this.handleClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        });

        var styleInsert = {
          position: 'absolute',
          display: 'block',
          top: '-50px',
          height: 'auto',
          width: 'auto'
        };

        return _react2.default.createElement(ComposedComponent, childProps, children, visible && _react2.default.createElement(
          _portal2.default,
          {
            active: active,
            _className: styleInsert
          },
          _react2.default.createElement(
            'span',
            {
              ref: function ref(node) {
                _this3.tooltipNode = node;
              },
              className: 'tooltip-wrap'
            },
            _react2.default.createElement(
              'span',
              { className: 'tooltip-inner' },
              tooltip
            )
          )
        ));
      }
    }]);

    return Tooltips;
  }(_react.Component);

  Tooltips.propTypes = {
    children: _propTypes2.default.node,
    rootClassName: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    onMouseEnter: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    tooltip: _propTypes2.default.string
  };
  Tooltips.defaultProps = {
    rootClassName: '',
    tooltipDelay: 0,
    tooltipPosition: POSITION.VERTICAL
  };

  return Tooltips;
};

exports.default = TooltipFactory;