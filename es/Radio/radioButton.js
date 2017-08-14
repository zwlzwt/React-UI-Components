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

require('./radioButton.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled                         Boolean             false            禁用radio和radio的disabled一致
// @param  label                            String                               输入框名字相当于laber标签在选择框右侧
// @param  name                             String                               给选择框name值
// @param  value                            Any                                  radio的value值

var RadioButton = function (_Component) {
  _inherits(RadioButton, _Component);

  function RadioButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
      var _this$props = _this.props,
          checked = _this$props.checked,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange;

      if (event.pageX !== 0 && event.pageY !== 0) _this.blur();
      if (!disabled && !checked && onChange) onChange(event, _this);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioButton, [{
    key: 'blur',
    value: function blur() {
      if (this.inputNode) {
        this.inputNode.blur();
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.inputNode) {
        this.inputNode.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rootClassName = _props.rootClassName,
          checked = _props.checked,
          children = _props.children,
          className = _props.className,
          disabled = _props.disabled,
          label = _props.label,
          name = _props.name,
          onChange = _props.onChange,
          onMouseEnter = _props.onMouseEnter,
          onMouseLeave = _props.onMouseLeave,
          theme = _props.theme,
          others = _objectWithoutProperties(_props, ['rootClassName', 'checked', 'children', 'className', 'disabled', 'label', 'name', 'onChange', 'onMouseEnter', 'onMouseLeave', 'theme']);

      return _react2.default.createElement(
        'label',
        {
          className: (0, _classnames2.default)('radio', { disabled: disabled }, rootClassName),
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        },
        _react2.default.createElement('input', _extends({}, others, {
          checked: checked,
          className: 'real-radio',
          type: 'radio',
          ref: function ref(node) {
            _this2.inputNode = node;
          },
          onChange: function onChange() {},
          onClick: this.handleClick,
          disabled: disabled,
          name: name
        })),
        _react2.default.createElement('div', { className: 'fade-radio' }),
        label ? _react2.default.createElement(
          'span',
          { className: 'radio-label' },
          label
        ) : null,
        children
      );
    }
  }]);

  return RadioButton;
}(_react.Component);

RadioButton.propTypes = {
  checked: _propTypes2.default.bool,
  rootClassName: _propTypes2.default.string,
  children: _propTypes2.default.node,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  name: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};
RadioButton.defaultProps = {
  checked: false,
  disabled: false
};
exports.default = RadioButton;