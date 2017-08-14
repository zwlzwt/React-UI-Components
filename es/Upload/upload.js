'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUpload = require('rc-upload');

var _rcUpload2 = _interopRequireDefault(_rcUpload);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uploadList = require('./uploadList');

var _uploadList2 = _interopRequireDefault(_uploadList);

require('./upload.less');

var _Add = require('./Add.js');

var _Add2 = _interopRequireDefault(_Add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  listType                         String              text             有两种上传形式一种照片一种文件，text & picture-card
// @param  disabled                         Boolean             false            禁用上传 继承自upload组建 地址: https://github.com/react-component/upload
// @param  children                         node
// @param  defaultFileList                  Array                                默认的文件上传列表格式: [{name: xx, status:'done', url:'', thumbUrl:''}]
// @param  action                           String                               上传地址 继承自upload组建 地址: https://github.com/react-component/upload
// @param  name                                                                  上传文件name 继承自upload组建 地址: https://github.com/react-component/upload
// @param  withCredentials                  Boolean             false            cookie是否携带 继承自upload组建 地址: https://github.com/react-component/upload
// @param  headers                          object              {}               header设置 继承自upload组建 地址: https://github.com/react-component/upload
// @param  fileList                         Array

function removeFileItem(file, fileList) {
  var matchKey = file.uid ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {
    return item[matchKey] !== file[matchKey];
  });
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}

function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    percent: 0,
    originFileObj: file,
    status: null
  };
}

var Upload = function (_Component) {
  _inherits(Upload, _Component);

  function Upload() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Upload);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Upload.__proto__ || Object.getPrototypeOf(Upload)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      fileList: _this.props.fileList || _this.props.defaultFileList || []
    }, _this.handleManualRemove = function (file) {
      _this.uploadNode.abort(file);
      file.status = 'removed';
      _this.handleRemove(file);
    }, _this.onStart = function (file) {
      var targetItem = void 0;
      var nextFileList = _this.state.fileList.concat();
      if (file.length > 0) {
        targetItem = file.map(function (el) {
          el.status = 'uploading';
          return el;
        });
        nextFileList = nextFileList.push(targetItem);
      } else {
        file.status = 'uploading';
        nextFileList.push(file);
      }
      _this.onChange({
        file: file,
        fileList: nextFileList
      });
    }, _this.onError = function (error, response, file) {
      var fileList = _this.state.fileList;
      var targetItem = _this.getItem(file, fileList);
      if (!targetItem) {
        return;
      }

      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      _this.onChange({
        file: _extends({}, targetItem),
        fileList: fileList
      });
    }, _this.onSuccess = function (response, file) {
      try {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        } else {
          response = response;
        }
      } catch (e) {}
      var fileList = _this.state.fileList;
      var targetItem = _this.getItem(file, fileList);
      if (!targetItem) {
        return;
      }
      targetItem.status = 'done';
      targetItem.response = response;
      _this.onChange({
        file: _extends({}, targetItem),
        fileList: fileList
      });
    }, _this.onProgress = function (e, file) {
      var fileList = _this.state.fileList;
      var targetItem = _this.getItem(file, fileList);
      if (!targetItem) {
        return;
      }
      targetItem.percent = e.percent;
      _this.onChange({
        event: e,
        file: _extends({}, targetItem),
        fileList: _this.state.fileList
      });
    }, _this.getItem = function (file, fileList) {
      var matchKey = file.uid ? 'uid' : 'name';
      if (fileList.length !== 0) {
        return fileList.filter(function (item) {
          return item[matchKey] === file[matchKey];
        })[0];
      } else {
        return file;
      }
    }, _this.onChange = function (info) {
      if (!('fileList' in _this.props)) {
        _this.setState({ fileList: info.fileList });
      }

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(info);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Upload, [{
    key: 'handleRemove',
    value: function handleRemove(file) {
      var _props = this.props,
          onRemove = _props.onRemove,
          disabled = _props.disabled;

      if (!disabled) {
        var removedFileList = removeFileItem(file, this.state.fileList);
        if (removedFileList) {
          this.onChange({
            file: file,
            fileList: removedFileList
          });
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('fileList' in nextProps || 'defaultFileList' in nextProps) {
        this.setState({
          fileList: nextProps.fileList || nextProps.defaultFileList || []
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          rootClassName = _props2.rootClassName,
          listType = _props2.listType,
          onPreview = _props2.onPreview,
          disabled = _props2.disabled,
          children = _props2.children;


      var childButton = { children: listType === 'picture-card' ? _react2.default.createElement(_Add2.default, { className: 'add-file' }) : children };

      var rcUploadProps = Object.assign({}, {
        onStart: this.onStart,
        onError: this.onError,
        onSuccess: this.onSuccess,
        onProgress: this.onProgress,
        className: 'upload-component'
      }, this.props, childButton);

      var uploadList = _react2.default.createElement(_uploadList2.default, {
        listType: listType,
        items: this.state.fileList,
        onPreview: onPreview,
        onRemove: this.handleManualRemove
      });

      var uploadButton = _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('upload-button-style', { disabled: disabled }, rootClassName) },
        _react2.default.createElement(_rcUpload2.default, _extends({}, rcUploadProps, { ref: function ref(node) {
            _this2.uploadNode = node;
          } }))
      );

      if (listType === 'picture-card') {
        return _react2.default.createElement(
          'div',
          { className: 'upload-photo' },
          uploadButton,
          uploadList
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'upload-wrap' },
        uploadButton,
        uploadList
      );
    }
  }]);

  return Upload;
}(_react.Component);

Upload.propTypes = {
  rootClassName: _propTypes2.default.string,
  listType: _propTypes2.default.oneOf(['text', 'picture-card']),
  onPreview: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  children: _propTypes2.default.node,
  defaultFileList: _propTypes2.default.arrayOf(_propTypes2.default.object)
};
Upload.defaultProps = {
  listType: 'text',
  disabled: false,
  rootClassName: ''
};
exports.default = Upload;