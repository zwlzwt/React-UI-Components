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

var _check = require('./check.js');

var _check2 = _interopRequireDefault(_check);

require('./checkbox.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled            Boolean             false            禁用input框和input原生的disabled一致
// @param  checked             Boolean             false            被选中状态
// @param  label               String或者node                        label名字或者自己定义dom结构
// @param  onChange            Func                                 第一个参数是value 是否被选中状态bool

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.handleToggle = function (event) {
      if (event.pageX !== 0 && event.pageY !== 0) _this.blur();
      if (!_this.props.disabled && _this.props.onChange) {
        _this.props.onChange(!_this.props.checked, event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkbox, [{
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
          disabled = _props.disabled,
          label = _props.label,
          name = _props.name,
          style = _props.style,
          onChange = _props.onChange,
          onMouseEnter = _props.onMouseEnter,
          onMouseLeave = _props.onMouseLeave,
          others = _objectWithoutProperties(_props, ['rootClassName', 'checked', 'children', 'disabled', 'label', 'name', 'style', 'onChange', 'onMouseEnter', 'onMouseLeave']);

      return _react2.default.createElement(
        'label',
        {
          className: (0, _classnames2.default)('checkbox-field', rootClassName),
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        },
        _react2.default.createElement('input', _extends({}, others, {
          checked: checked,
          className: 'checkbox-real-input',
          disabled: disabled,
          name: name,
          onChange: function onChange() {},
          onClick: this.handleToggle,
          ref: function ref(node) {
            _this2.inputNode = node;
          },
          type: 'checkbox'
        })),
        _react2.default.createElement(_check2.default, {
          checked: checked,
          disabled: disabled
        }),
        label ? _react2.default.createElement(
          'span',
          { className: (0, _classnames2.default)('checkbox-label', { disabled: disabled }) },
          label
        ) : null,
        children
      );
    }
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  checked: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  rootClassName: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func
};
Checkbox.defaultProps = {
  rootClassName: '',
  checked: false,
  disabled: false
};
exports.default = Checkbox;