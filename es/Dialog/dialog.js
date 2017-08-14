'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  active                           Boolean             false            开启对话框
// @param  type                             String                               对话框类型
// @param  title                            String                               对话框标题
// @param  actions                          Array                                给button定义具体文案和函数参考button
// @param  children                         node                                 对话框内部dom
// @param  onEscKeyDown                     Func                                 esc按键回掉
// @param  onOverlayClick                   Func                                 点击对话框后面的遮罩回掉

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _overlay = require('../Overlay/overlay.js');

var _overlay2 = _interopRequireDefault(_overlay);

var _button = require('../Button/button.js');

var _button2 = _interopRequireDefault(_button);

require('./dialog.less');

var _portal = require('../Portal/portal.js');

var _portal2 = _interopRequireDefault(_portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = function Dialog(props) {
  var actions = props.actions.map(function (action, index) {
    return _react2.default.createElement(_button2.default, _extends({}, action, { key: index, rootClassName: 'dialog-button' }));
  });

  var classStyle = (0, _classnames2.default)('dialog-style', props.rootClassName);

  var typeClass = (0, _classnames2.default)('dialog-title', { warning: props.type === 'warning', alert: props.type === 'alert', success: props.type === 'success' });

  return _react2.default.createElement(
    _portal2.default,
    { active: props.active },
    _react2.default.createElement(_overlay2.default, {
      active: props.active,
      onClick: props.onOverlayClick,
      onEscKeyDown: props.onEscKeyDown,
      onMouseDown: props.onOverlayMouseDown,
      onMouseMove: props.onOverlayMouseMove,
      onMouseUp: props.onOverlayMouseUp
    }),
    _react2.default.createElement(
      'div',
      { className: classStyle },
      _react2.default.createElement(
        'section',
        { className: 'dialog-body' },
        props.title ? _react2.default.createElement(
          'h6',
          { className: typeClass },
          props.title
        ) : null,
        props.children
      ),
      actions.length ? _react2.default.createElement(
        'nav',
        { role: 'navigation', className: 'dialog-navi' },
        actions
      ) : null
    )
  );
};

Dialog.propTypes = {
  rootClassName: _propTypes2.default.string,
  actions: _propTypes2.default.array,
  active: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  onEscKeyDown: _propTypes2.default.func,
  onOverlayClick: _propTypes2.default.func,
  onOverlayMouseDown: _propTypes2.default.func,
  onOverlayMouseMove: _propTypes2.default.func,
  onOverlayMouseUp: _propTypes2.default.func,
  title: _propTypes2.default.string,
  type: _propTypes2.default.oneOf(['warning', 'alert', 'message', 'success'])
};

Dialog.defaultProps = {
  rootClassName: '',
  actions: [],
  active: false,
  type: 'message'
};

exports.default = Dialog;