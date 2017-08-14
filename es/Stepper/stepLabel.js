'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // created by @zhaoweilong
//         Name                             Type                        Default          Description
// @param  rootClassName                    String                      ''               根组建样式添加(以class的形式在css中添加)
// @param  children                         node                                         label的内容，步骤名称

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./stepLabel.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var renderIcon = function renderIcon(completed, icon, active) {
  var iconType = typeof icon === 'undefined' ? 'undefined' : _typeof(icon);

  if (iconType === 'number' || iconType === 'string') {
    if (completed) {
      return _react2.default.createElement(
        'svg',
        { viewBox: '0 0 24 24', className: (0, _classnames2.default)("icon-svg-container", { completed: completed }) },
        _react2.default.createElement('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
      );
    }

    return _react2.default.createElement(
      'svg',
      { viewBox: '0 0 24 24', className: (0, _classnames2.default)("icon-svg-container", { active: active }) },
      _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
      _react2.default.createElement(
        'text',
        {
          x: '12',
          y: '16',
          textAnchor: 'middle',
          fontSize: '12',
          fill: '#fff'
        },
        icon
      )
    );
  }

  return icon;
};

var StepLabel = function StepLabel(props) {
  var active = props.active,
      children = props.children,
      completed = props.completed,
      indexIcon = props.icon,
      last = props.last,
      other = _objectWithoutProperties(props, ['active', 'children', 'completed', 'icon', 'last']);

  var icon = renderIcon(completed, indexIcon, active);

  return _react2.default.createElement(
    'span',
    _extends({ className: 'step-label-root' }, other),
    icon && _react2.default.createElement(
      'span',
      { className: 'step-label-icon' },
      icon
    ),
    children
  );
};

StepLabel.propTypes = {
  active: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  completed: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.number]),
  last: _propTypes2.default.bool
};

exports.default = StepLabel;