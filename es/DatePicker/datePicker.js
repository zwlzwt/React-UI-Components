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

var _input = require('../Input/input.js');

var _input2 = _interopRequireDefault(_input);

var _DatePickerDialog = require('./DatePickerDialog');

var _DatePickerDialog2 = _interopRequireDefault(_DatePickerDialog);

var _time = require('../Time/time.js');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                Type                Default          Description
// @param  active              Boolean             false            控制date-picker-dialog是否显示
// @param  cancelLabel         String              取消              左边的button文案
// @param  verifyLabel         String              确认              右边button文案
// @param  inputFormat         Func                                 自定义的排版方式
// @param  locale              String或者Object                      自定义日期可以参考time.js文件
// @param  maxDate             Date
// @param  minDate             Date
// @param  onChange            Func
// @param  onClick             Func
// @param  onDismiss           Func
// @param  onEscKeyDown        Func
// @param  onKeyPress          Func
// @param  onOverlayClick      Func
// @param  value               Date
// @param  onChange            Func

var DatePicker = function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      active: _this.props.active
    }, _this.handleInputFocus = function (value, event) {
      event.preventDefault();
      event.stopPropagation();
      _this.setState({ active: true });
    }, _this.handleInputClick = function (value, event) {
      event.preventDefault();
      event.stopPropagation();
      _this.setState({ active: true });
      if (_this.props.onClick) _this.props.onClick(event);
    }, _this.handleSelect = function (value, event) {
      if (_this.props.onChange) _this.props.onChange(value, event);
      _this.setState({ active: false });
    }, _this.handleDismiss = function () {
      _this.setState({ active: false });
      if (_this.props.onDismiss) {
        _this.props.onDismiss();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootClassName = _props.rootClassName,
          active = _props.active,
          onDismiss = _props.onDismiss,
          cancelLabel = _props.cancelLabel,
          inputFormat = _props.inputFormat,
          locale = _props.locale,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          verifyLabel = _props.verifyLabel,
          onEscKeyDown = _props.onEscKeyDown,
          onOverlayClick = _props.onOverlayClick,
          sundayFirstDayOfWeek = _props.sundayFirstDayOfWeek,
          value = _props.value,
          others = _objectWithoutProperties(_props, ['rootClassName', 'active', 'onDismiss', 'cancelLabel', 'inputFormat', 'locale', 'maxDate', 'minDate', 'verifyLabel', 'onEscKeyDown', 'onOverlayClick', 'sundayFirstDayOfWeek', 'value']);

      var finalInputFormat = inputFormat || _time2.default.formatDate;
      var date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
      var formattedDate = date === undefined ? '' : finalInputFormat(value, locale);

      return _react2.default.createElement(
        'div',
        { className: rootClassName },
        _react2.default.createElement(_input2.default, _extends({}, others, {
          onFocus: this.handleInputFocus,
          onClick: this.handleInputClick,
          readOnly: true,
          value: formattedDate
        })),
        _react2.default.createElement(_DatePickerDialog2.default, {
          active: this.state.active,
          cancelLabel: cancelLabel,
          locale: locale,
          maxDate: maxDate,
          minDate: minDate,
          name: this.props.name,
          onDismiss: this.handleDismiss,
          verifyLabel: verifyLabel,
          onEscKeyDown: onEscKeyDown || this.handleDismiss,
          onOverlayClick: onOverlayClick || this.handleDismiss,
          onSelect: this.handleSelect,
          sundayFirstDayOfWeek: sundayFirstDayOfWeek,
          value: date
        })
      );
    }
  }]);

  return DatePicker;
}(_react.Component);

DatePicker.propTypes = {
  active: _propTypes2.default.bool,
  cancelLabel: _propTypes2.default.string,
  inputFormat: _propTypes2.default.func,
  rootClassName: _propTypes2.default.string,
  locale: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  maxDate: _propTypes2.default.instanceOf(Date),
  minDate: _propTypes2.default.instanceOf(Date),
  verifyLabel: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  onEscKeyDown: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func,
  onOverlayClick: _propTypes2.default.func,
  sundayFirstDayOfWeek: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(Date), _propTypes2.default.string])
};
DatePicker.defaultProps = {
  rootClassName: '',
  active: false,
  sundayFirstDayOfWeek: false
};
exports.default = DatePicker;