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

require('./tab.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled            Boolean             false            禁用这个tab
// @param  hidden              Boolean             false            隐藏掉这个tab
// @param  label               String                               tab名称标题
// @param  onClick             Function                             点击事件触发的callback


var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (!_this.props.disabled && _this.props.onClick) {
        _this.props.onClick(event, _this.props.index);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootClassName = _props.rootClassName,
          label = _props.label,
          children = _props.children,
          disabled = _props.disabled,
          hidden = _props.hidden,
          index = _props.index,
          active = _props.active,
          others = _objectWithoutProperties(_props, ['rootClassName', 'label', 'children', 'disabled', 'hidden', 'index', 'active']);

      var classname = (0, _classnames2.default)('tab', {
        disabled: disabled,
        hidden: hidden,
        active: active
      }, rootClassName);

      return _react2.default.createElement(
        'div',
        _extends({}, others, {
          className: classname,
          onClick: this.handleClick
        }),
        label,
        children
      );
    }
  }]);

  return Tab;
}(_react.Component);

Tab.propTypes = {
  active: _propTypes2.default.bool,
  rootClassName: _propTypes2.default.string,
  label: _propTypes2.default.string,
  children: _propTypes2.default.node,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  hidden: _propTypes2.default.bool,
  index: _propTypes2.default.number
};
Tab.defaultProps = {
  active: false,
  rootClassName: '',
  disabled: false,
  hidden: false
};
exports.default = Tab;