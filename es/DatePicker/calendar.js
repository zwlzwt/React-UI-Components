'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _calendarMonth = require('./calendarMonth.js');

var _calendarMonth2 = _interopRequireDefault(_calendarMonth);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _time = require('../Time/time.js');

var _time2 = _interopRequireDefault(_time);

var _range = require('../Time/range.js');

var _range2 = _interopRequireDefault(_range);

require('./calendar.less');

var _back = require('./back.js');

var _back2 = _interopRequireDefault(_back);

var _next = require('./next.js');

var _next2 = _interopRequireDefault(_next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIRECTION_STEPS = { left: -1, right: 1 };

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      viewDate: _this.props.selectedDate
    }, _this.changeViewMonth = function (event) {
      var direction = event.currentTarget.id;
      _this.setState({
        direction: direction,
        viewDate: _time2.default.addMonths(_this.state.viewDate, DIRECTION_STEPS[direction])
      });
    }, _this.handleDayClick = function (day) {
      _this.props.onChange(_time2.default.setDay(_this.state.viewDate, day), true);
    }, _this.handleYearClick = function (event) {
      var year = parseInt(event.currentTarget.id, 10);
      var viewDate = _time2.default.setYear(_this.props.selectedDate, year);
      _this.setState({ viewDate: viewDate });
      _this.props.onChange(viewDate, false);
    }, _this.handleKeys = function (e) {
      var selectedDate = _this.props.selectedDate;


      if (e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40 || e.which === 13) {
        e.preventDefault();
      }

      switch (e.which) {
        case 13:
          _this.props.handleSelect();
          break;
        case 37:
          _this.handleDayArrowKey(_time2.default.addDays(selectedDate, -1));
          break;
        case 38:
          _this.handleDayArrowKey(_time2.default.addDays(selectedDate, -7));
          break;
        case 39:
          _this.handleDayArrowKey(_time2.default.addDays(selectedDate, 1));
          break;
        case 40:
          _this.handleDayArrowKey(_time2.default.addDays(selectedDate, 7));
          break;
        default:
          break;
      }
    }, _this.handleDayArrowKey = function (date) {
      _this.setState({ viewDate: date });
      _this.props.onChange(date, false);
    }, _this.changeViewMonth = function (event) {
      var direction = event.currentTarget.id;
      _this.setState({
        direction: direction,
        viewDate: _time2.default.addMonths(_this.state.viewDate, DIRECTION_STEPS[direction])
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.body.addEventListener('keydown', this.handleKeys);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.activeYearNode) {
        this.scrollToActive();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('keydown', this.handleKeys);
    }
  }, {
    key: 'scrollToActive',
    value: function scrollToActive() {
      var offset = this.yearsNode.offsetHeight / 2 + this.activeYearNode.offsetHeight / 2;
      this.yearsNode.scrollTop = this.activeYearNode.offsetTop - offset;
    }
  }, {
    key: 'renderYears',
    value: function renderYears() {
      var _this2 = this;

      return _react2.default.createElement(
        'ul',
        {
          className: 'render-years',
          ref: function ref(node) {
            _this2.yearsNode = node;
          }
        },
        (0, _range2.default)(1800, 2100).map(function (year) {
          return _react2.default.createElement(
            'li',
            {
              className: (0, _classnames2.default)('item-style', { active: year === _this2.state.viewDate.getFullYear() }),
              id: year,
              key: year,
              onClick: _this2.handleYearClick,
              ref: function ref(node) {
                if (year === _this2.state.viewDate.getFullYear()) {
                  _this2.activeYearNode = node;
                }
              }
            },
            year
          );
        })
      );
    }
  }, {
    key: 'renderMonths',
    value: function renderMonths() {
      var animationClass = this.state.direction === 'left' ? 'slideLeft' : 'slideRight';
      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'span',
          { id: 'left', className: 'prev', onClick: this.changeViewMonth },
          _react2.default.createElement(_back2.default, null)
        ),
        _react2.default.createElement(
          'span',
          { id: 'right', className: 'next', onClick: this.changeViewMonth },
          _react2.default.createElement(_next2.default, null)
        ),
        _react2.default.createElement(
          _CSSTransitionGroup2.default,
          {
            transitionName: animationClass,
            transitionEnterTimeout: 350,
            transitionLeaveTimeout: 350 },
          _react2.default.createElement(_calendarMonth2.default, {
            enabledDates: this.props.enabledDates,
            disabledDates: this.props.disabledDates,
            key: this.state.viewDate.getMonth(),
            locale: this.props.locale,
            maxDate: this.props.maxDate,
            minDate: this.props.minDate,
            onDayClick: this.handleDayClick,
            selectedDate: this.props.selectedDate,
            sundayFirstDayOfWeek: this.props.sundayFirstDayOfWeek,
            theme: this.props.theme,
            viewDate: this.state.viewDate
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'render-group' },
        this.props.display === 'months' ? this.renderMonths() : this.renderYears()
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  display: _propTypes2.default.oneOf(['months', 'years']),
  handleSelect: _propTypes2.default.func,
  locale: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  maxDate: _propTypes2.default.instanceOf(Date),
  minDate: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func,
  selectedDate: _propTypes2.default.instanceOf(Date),
  sundayFirstDayOfWeek: _propTypes2.default.bool
};
Calendar.defaultProps = {
  display: 'months',
  selectedDate: new Date()
};
exports.default = Calendar;