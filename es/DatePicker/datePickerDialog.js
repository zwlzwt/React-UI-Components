'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dialog = require('../Dialog/dialog.js');

var _dialog2 = _interopRequireDefault(_dialog);

var _time = require('../Time/time.js');

var _time2 = _interopRequireDefault(_time);

var _calendar = require('./calendar.js');

var _calendar2 = _interopRequireDefault(_calendar);

require('./datePickerDialog.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickerDialog = function (_Component) {
  _inherits(DatePickerDialog, _Component);

  function DatePickerDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePickerDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePickerDialog.__proto__ || Object.getPrototypeOf(DatePickerDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      display: 'months',
      date: _this.props.value
    }, _this.handleNewDate = function (value, dayClick) {
      var state = { display: 'months', date: value };
      if (_time2.default.dateOutOfRange(value, _this.props.minDate, _this.props.maxDate)) {
        if (_this.props.maxDate && _this.props.minDate) {
          state.date = _time2.default.closestDate(value, _this.props.maxDate, _this.props.minDate);
        } else {
          state.date = _this.props.maxDate || _this.props.minDate;
        }
      }
      _this.setState(state);
    }, _this.handleSelect = function (event) {
      if (_this.props.onSelect) _this.props.onSelect(_this.state.date, event);
    }, _this.handleSwitchDisplay = function (event) {
      _this.setState({ display: event.target.id });
    }, _this.actions = [{
      label: _this.props.cancelLabel,
      onClick: _this.props.onDismiss
    }, {
      label: _this.props.verifyLabel,
      onClick: _this.handleSelect
    }], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePickerDialog, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          onEscKeyDown = _props.onEscKeyDown,
          onOverlayClick = _props.onOverlayClick,
          locale = _props.locale;


      var DayOfWeek = _time2.default.getFullDayOfWeek(this.state.date.getDay(), locale);
      var Month = _time2.default.getShortMonth(this.state.date, locale);
      var date = this.state.date.getDate();

      return _react2.default.createElement(
        _dialog2.default,
        {
          actions: this.actions,
          active: active,
          onEscKeyDown: onEscKeyDown,
          onOverlayClick: onOverlayClick,
          rootClassName: 'date-pick-dialog'
        },
        _react2.default.createElement(
          'header',
          { className: 'dialog-header' },
          _react2.default.createElement(
            'span',
            { id: 'years', className: 'years', onClick: this.handleSwitchDisplay },
            this.state.date.getFullYear()
          ),
          _react2.default.createElement(
            'h3',
            { id: 'months', className: 'months', onClick: this.handleSwitchDisplay },
            Month,
            date + '日',
            ' ',
            DayOfWeek
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_calendar2.default, {
            display: this.state.display,
            handleSelect: this.handleSelect,
            maxDate: this.props.maxDate,
            minDate: this.props.minDate,
            onChange: this.handleNewDate,
            selectedDate: this.state.date,
            locale: this.props.locale,
            sundayFirstDayOfWeek: this.props.sundayFirstDayOfWeek
          })
        )
      );
    }
  }]);

  return DatePickerDialog;
}(_react.Component);

DatePickerDialog.propTypes = {
  active: _propTypes2.default.bool,
  cancelLabel: _propTypes2.default.string,
  verifyLabel: _propTypes2.default.string,
  locale: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  maxDate: _propTypes2.default.instanceOf(Date),
  minDate: _propTypes2.default.instanceOf(Date),
  onDismiss: _propTypes2.default.func,
  onEscKeyDown: _propTypes2.default.func,
  onOverlayClick: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  sundayFirstDayOfWeek: _propTypes2.default.bool,
  value: _propTypes2.default.instanceOf(Date)
};
DatePickerDialog.defaultProps = {
  active: false,
  cancelLabel: '取消',
  verifyLabel: '确认',
  value: new Date()
};
exports.default = DatePickerDialog;