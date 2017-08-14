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

require('./button.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled                         Boolean             false            禁用button 按钮
// @param  children                         node                                 button内部的自主添加结构
// @param  raised                           Boolean             false            是否有凸起效果
// @param  type                             String              text             原生button的type
// @param  icon                             node                                 svg的icon
// @param  label                            String                               button 上的文字
// @param  onMouseUp                        Function                             鼠标移入callback
// @param  onMouseLeave                     Function                             鼠标移出callback

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.getShape = function () {
      if (_this.props.raised) return 'raised';
      return 'flat';
    }, _this.handleMouseUp = function (event) {
      _this.buttonNode.blur();
      if (_this.props.onMouseUp) _this.props.onMouseUp(event);
    }, _this.handleMouseLeave = function (event) {
      _this.buttonNode.blur();
      if (_this.props.onMouseLeave) _this.props.onMouseLeave(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rootClassName = _props.rootClassName,
          icon = _props.icon,
          label = _props.label,
          children = _props.children,
          raised = _props.raised,
          disabled = _props.disabled,
          type = _props.type,
          others = _objectWithoutProperties(_props, ['rootClassName', 'icon', 'label', 'children', 'raised', 'disabled', 'type']);

      var shap = this.getShape();

      var classes = (0, _classnames2.default)('button-style', shap, { disabled: disabled }, rootClassName);

      var props = _extends({}, others, {
        ref: function ref(node) {
          _this2.buttonNode = node;
        },
        disabled: this.props.disabled,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        type: type,
        className: classes
      });

      return _react2.default.createElement('button', props, icon ? _react2.default.createElement(
        'span',
        null,
        icon
      ) : null, label, children);
    }
  }]);

  return Button;
}(_react.Component);

Button.propTypes = {
  rootClassName: _propTypes2.default.string,
  label: _propTypes2.default.string,
  children: _propTypes2.default.node,
  type: _propTypes2.default.string,
  onMouseLeave: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  raised: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  icon: _propTypes2.default.node
};
Button.defaultProps = {
  rootClassName: '',
  type: 'button',
  raised: false
};
exports.default = Button;