'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./page.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page(props) {
  var handleClick = function handleClick() {
    props.onClick(props.pageNum);
  };

  var handleKeyPress = function handleKeyPress(event) {
    props.onKeyPress(event, props.onClick, props.pageNum);
  };

  return _react2.default.createElement(
    'li',
    {
      title: props.pageNum,
      tabIndex: '0',
      onClick: handleClick,
      onKeyPress: handleKeyPress,
      className: (0, _classnames2.default)('page-item-style', { 'foucs-active': props.active }, props.pageClass)
    },
    _react2.default.createElement(
      'a',
      null,
      props.pageNum
    )
  );
};

Page.propTypes = {
  pageNum: _propTypes2.default.number,
  active: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  handleKeyPress: _propTypes2.default.func,
  pageClass: _propTypes2.default.string
};

exports.default = Page;