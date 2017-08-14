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

require('./input.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled            Boolean             false            禁用input框和input原生的disabled一致
// @param  error               String                               校验输入信息，不匹配显示error
// @param  errorStyle          String              ''               error样式(必须添加根组建的class然后才能添加error class样式)
// @param  hint                String                               输入框默认的提示信息相当于placeholder
// @param  hintStyle           String              ''               hint样式(必须添加根组建的class然后才能添加hint class样式)
// @param  barStyle            String              ''               bar样式(必须添加根组建的class然后才能添加bar class样式)bar是input框底部的线
// @param  label               String                               输入框名字相当于laber标签
// @param  labelStyle          String              ''               label样式(必须添加根组建的class然后才能添加label class样式)
// @param  multiLine           Boolean             false            如果true就是textarea输入框可伸缩
// @param  maxLength           Number                               限制字数input的时候不显示输入数字和总数，textarea时候显示
// @param  rows                Number                               限制textarea的行数
// @param  maxLength           Number                               限制字数input的时候不显示输入数字和总数，textarea时候显示
// @param  required            Boolean             false            必填标示 * 必须在声明label后才有
// @param  type                String              text             原生input的type
// @param  value               Any                                  现在input的值
// @param  onChange            Function                             当value发生改变时候callback 默认参数是(value,event)
// @param  children            node                                 可扩展自定义的dom结构添加在input框下面


var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.handleResize = function () {
      var element = _this.inputNode;
      var rows = _this.props.rows;

      if (typeof rows === 'number' && !isNaN(rows)) {
        element.style.height = null;
      } else {
        var style = getComputedStyle(element, null);
        var heightOffset = style.boxSizing === 'content-box' ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)) : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + heightOffset + 'px';
      }
    }, _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          multiLine = _this$props.multiLine,
          maxLength = _this$props.maxLength;

      var valueFromEvent = event.target.value;
      var haveToTrim = multiLine && maxLength && event.target.value.length > maxLength;
      var value = haveToTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;
      _this.handleResize();

      if (onChange) onChange(value, event);
    }, _this.handlBlur = function (event) {
      var onBlur = _this.props.onBlur;

      var valueFromEvent = event.target.value;
      if (onBlur) onBlur(valueFromEvent, event);
    }, _this.handleFocus = function (event) {
      var onFocus = _this.props.onFocus;

      var valueFromEvent = event.target.value;
      if (onFocus) onFocus(valueFromEvent, event);
    }, _this.valuePresent = function (value) {
      return value !== null && value !== undefined && value !== '' && !(typeof value === 'number' && isNaN(value));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.multiLine) {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.inputNode.blur();
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.inputNode.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          rootClassName = _props.rootClassName,
          multiLine = _props.multiLine,
          defaultValue = _props.defaultValue,
          disabled = _props.disabled,
          error = _props.error,
          labelText = _props.label,
          required = _props.required,
          type = _props.type,
          hint = _props.hint,
          barStyle = _props.barStyle,
          hintStyle = _props.hintStyle,
          labelStyle = _props.labelStyle,
          errorStyle = _props.errorStyle,
          value = _props.value,
          maxLength = _props.maxLength,
          _props$rows = _props.rows,
          rows = _props$rows === undefined ? 1 : _props$rows,
          others = _objectWithoutProperties(_props, ['children', 'rootClassName', 'multiLine', 'defaultValue', 'disabled', 'error', 'label', 'required', 'type', 'hint', 'barStyle', 'hintStyle', 'labelStyle', 'errorStyle', 'value', 'maxLength', 'rows']);

      var length = maxLength && value ? value.length : 0;

      var className = (0, _classnames2.default)('input-root', rootClassName);

      var inputElementProps = _extends({}, others, {
        onChange: this.handleChange,
        ref: function ref(node) {
          _this2.inputNode = node;
        },
        className: (0, _classnames2.default)('input-element', { 'filled': this.valuePresent(value) || this.valuePresent(defaultValue) }, { 'disabled': disabled }),
        name: name,
        defaultValue: defaultValue,
        onBlur: this.handlBlur,
        onFocus: this.handleFocus,
        disabled: disabled,
        required: required,
        type: type,
        value: value
      });
      if (!multiLine) {
        inputElementProps.maxLength = maxLength;
      } else {
        inputElementProps.rows = rows;
      }

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(multiLine ? 'textarea' : 'input', inputElementProps),
        _react2.default.createElement('span', { className: (0, _classnames2.default)('input-bar', barStyle) }),
        labelText ? _react2.default.createElement(
          'label',
          { className: (0, _classnames2.default)('input-label', labelStyle) },
          labelText,
          required ? _react2.default.createElement(
            'span',
            { className: 'input-required' },
            ' * '
          ) : null
        ) : null,
        hint ? _react2.default.createElement(
          'span',
          { className: (0, _classnames2.default)('input-hint', hintStyle) },
          hint
        ) : null,
        error ? _react2.default.createElement(
          'span',
          { className: (0, _classnames2.default)('input-error', errorStyle) },
          error
        ) : null,
        maxLength && multiLine ? _react2.default.createElement(
          'span',
          { className: 'input-count' },
          length,
          '/',
          maxLength
        ) : null,
        children
      );
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = {
  children: _propTypes2.default.node,
  rootClassName: _propTypes2.default.string,
  barStyle: _propTypes2.default.string,
  hintStyle: _propTypes2.default.string,
  labelStyle: _propTypes2.default.string,
  errorStyle: _propTypes2.default.string,
  multiLine: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  rows: _propTypes2.default.number,
  defaultValue: _propTypes2.default.string,
  error: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  hint: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  maxLength: _propTypes2.default.number,
  name: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object, _propTypes2.default.string])
};
Input.defaultProps = {
  rootClassName: '',
  hint: '',
  multiLine: false,
  disabled: false,
  required: false,
  type: 'text'
};
exports.default = Input;