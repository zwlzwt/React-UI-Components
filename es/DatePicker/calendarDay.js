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

var _time = require('../Time/time.js');

var _time2 = _interopRequireDefault(_time);

require('./calendarDay.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_Component) {
  _inherits(Day, _Component);

  function Day() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Day);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Day.__proto__ || Object.getPrototypeOf(Day)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      if (!_this.props.disabled && _this.props.onClick) {
        _this.props.onClick(_this.props.day);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Day, [{
    key: 'dayStyle',
    value: function dayStyle() {
      if (this.props.day === 1) {
        var e = this.props.sundayFirstDayOfWeek ? 0 : 1;
        var firstDay = _time2.default.getFirstWeekDay(this.props.viewDate) - e;

        return {
          marginLeft: (firstDay >= 0 ? firstDay : 6) * (100 / 7) + '%'
        };
      }
      return undefined;
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      var sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear();
      var sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth();
      var sameDay = this.props.day === this.props.selectedDate.getDate();
      return sameYear && sameMonth && sameDay;
    }
  }, {
    key: 'render',
    value: function render() {
      var dayItemStyle = (0, _classnames2.default)('day-item', { active: this.isSelected(), disabled: this.props.disabled });
      return _react2.default.createElement(
        'div',
        { className: 'calendar-day', style: this.dayStyle() },
        _react2.default.createElement(
          'span',
          { onClick: this.handleClick, className: dayItemStyle },
          this.props.day
        )
      );
    }
  }]);

  return Day;
}(_react.Component);

Day.propTypes = {
  day: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  selectedDate: _propTypes2.default.instanceOf(Date),
  sundayFirstDayOfWeek: _propTypes2.default.bool,
  viewDate: _propTypes2.default.instanceOf(Date)
};
exports.default = Day;