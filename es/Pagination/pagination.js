'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _page = require('./page.js');

var _page2 = _interopRequireDefault(_page);

require('./pagination.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      current: _this.props.current || _this.props.defaultCurrent,
      pageSize: _this.props.pageSize || _this.props.defaultPageSize
    }, _this.isValid = function (page) {
      return Number.isInteger(page) && page >= 1 && page !== _this.state.current;
    }, _this.handleChange = function (p) {
      var page = p;
      if (_this.isValid(page)) {
        if (page > _this.calculateAllPage()) {
          page = _this.calculateAllPage();
        }

        if (!('current' in _this.props)) {
          _this.setState({
            current: page
          });
        }

        var pageSize = _this.state.pageSize;
        _this.props.onChange(page, pageSize);

        return page;
      }

      return _this.state.current;
    }, _this.enterRun = function (event, callback) {
      for (var _len2 = arguments.length, restParams = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        restParams[_key2 - 2] = arguments[_key2];
      }

      if (event.key === 'Enter' || event.which === 13) {
        callback.apply(undefined, restParams);
      }
    }, _this.canPrev = function () {
      return _this.state.current > 1;
    }, _this.canNext = function () {
      return _this.state.current < _this.calculateAllPage();
    }, _this.prev = function () {
      if (_this.canPrev()) {
        _this.handleChange(_this.state.current - 1);
      }
    }, _this.next = function () {
      if (_this.canNext()) {
        _this.handleChange(_this.state.current + 1);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('current' in nextProps) {
        this.setState({
          current: nextProps.current
        });
      }

      if ('pageSize' in nextProps) {
        var newState = {};
        var current = this.state.current;
        var newCurrent = this.calculateAllPage(nextProps.pageSize);
        current = current > newCurrent ? newCurrent : current;
        if (!('current' in nextProps)) {
          newState.current = current;
          newState.currentInputValue = current;
        }
        newState.pageSize = nextProps.pageSize;
        this.setState(newState);
      }
    }
  }, {
    key: 'calculateAllPage',
    value: function calculateAllPage(p) {
      var pageSize = p;
      if (typeof pageSize === 'undefined') {
        pageSize = this.state.pageSize;
      }
      return Math.floor((this.props.total - 1) / pageSize) + 1;
    }
  }, {
    key: 'render',
    value: function render() {
      var pageList = [];
      var allPages = this.calculateAllPage();
      var prevDisabled = !this.canPrev();
      var nextDisabled = !this.canNext();
      var _state = this.state,
          current = _state.current,
          pageSize = _state.pageSize;
      var _props = this.props,
          rootClassName = _props.rootClassName,
          pageClass = _props.pageClass;

      var pageBufferSize = 2;
      var firstPage = null;
      var lastPage = null;
      var leaveOutPrev = null;
      var leaveOutNext = null;

      if (allPages <= 9) {
        for (var i = 1; i <= allPages; i++) {
          var active = this.state.current === i;
          pageList.push(_react2.default.createElement(_page2.default, {
            onClick: this.handleChange,
            onKeyPress: this.enterRun,
            pageNum: i,
            key: i,
            active: active,
            pageClass: pageClass
          }));
        }
      } else {
        leaveOutPrev = _react2.default.createElement(
          'li',
          {
            key: 'prev',
            className: 'leave-out-prev'
          },
          _react2.default.createElement('a', null)
        );
        leaveOutNext = _react2.default.createElement(
          'li',
          {
            key: 'next',
            className: 'leave-out-next'
          },
          _react2.default.createElement('a', null)
        );
        lastPage = _react2.default.createElement(_page2.default, {
          onClick: this.handleChange,
          onKeyPress: this.enterRun,
          key: allPages,
          pageNum: allPages,
          active: false
        });
        firstPage = _react2.default.createElement(_page2.default, {
          onClick: this.handleChange,
          onKeyPress: this.enterRun,
          key: 1,
          pageNum: 1,
          active: false
        });

        var left = Math.max(1, current - pageBufferSize);
        var right = Math.min(current + pageBufferSize, allPages);

        if (current - 1 <= pageBufferSize) {
          right = 1 + pageBufferSize * 2;
        }

        if (allPages - current <= pageBufferSize) {
          left = allPages - pageBufferSize * 2;
        }

        for (var _i = left; _i <= right; _i++) {
          var _active = current === _i;
          pageList.push(_react2.default.createElement(_page2.default, {
            onClick: this.handleChange,
            onKeyPress: this.enterRun,
            key: _i,
            pageNum: _i,
            active: _active,
            pageClass: pageClass
          }));
        }

        if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
          pageList.unshift(leaveOutPrev);
        }
        if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
          pageList.push(leaveOutNext);
        }

        if (left !== 1) {
          pageList.unshift(firstPage);
        }
        if (right !== allPages) {
          pageList.push(lastPage);
        }
      }

      return _react2.default.createElement(
        'ul',
        {
          className: (0, _classnames2.default)('pagination-wrap', rootClassName)
        },
        _react2.default.createElement(
          'li',
          {
            title: '\u4E0A\u4E00\u9875',
            className: (0, _classnames2.default)('pagination-prev', { prevDisabled: prevDisabled }),
            onClick: this.prev,
            tabIndex: '0'
          },
          _react2.default.createElement('a', { className: (0, _classnames2.default)({ disabled: prevDisabled }) })
        ),
        pageList,
        _react2.default.createElement(
          'li',
          {
            title: '\u4E0B\u4E00\u9875',
            className: (0, _classnames2.default)('pagination-next', { nextDisabled: nextDisabled }),
            onClick: this.next,
            tabIndex: '0'
          },
          _react2.default.createElement('a', { className: (0, _classnames2.default)({ disabled: nextDisabled }) })
        )
      );
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.defaultProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
  onChange: noop,
  rootClassName: '',
  pageClass: ''
};
Pagination.propTypes = {
  current: _propTypes2.default.number,
  pageSize: _propTypes2.default.number,
  total: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  defaultCurrent: _propTypes2.default.number,
  rootClassName: _propTypes2.default.string,
  pageClass: _propTypes2.default.string
};
exports.default = Pagination;