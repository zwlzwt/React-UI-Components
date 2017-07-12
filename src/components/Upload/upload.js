// created by @zhaoweilong
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

import React, { Component } from 'react'
import RcUpload from 'rc-upload'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import UploadList from './uploadList'
import './upload.less'
import Add from './Add.js'

function removeFileItem(file, fileList) {
  const matchKey = file.uid ? 'uid' : 'name'
  const removed = fileList.filter(item => item[matchKey] !== file[matchKey])
  if (removed.length === fileList.length) {
    return null
  }
  return removed
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
    status: null,
  }
}

class Upload extends Component {
  static propTypes = {
    rootClassName: PropTypes.string,
    listType: PropTypes.oneOf(['text', 'picture-card']),
    onPreview: PropTypes.func,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node,
    defaultFileList: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    listType: 'text',
    disabled: false,
    rootClassName: '',
  }

  state = {
    fileList: this.props.fileList || this.props.defaultFileList || [],
  }

  handleRemove(file) {
    const { onRemove, disabled } = this.props
    if (!disabled) {
      const removedFileList = removeFileItem(file, this.state.fileList)
      if (removedFileList) {
        this.onChange({
          file,
          fileList: removedFileList,
        })
      }
    }
  }

  handleManualRemove = (file) => {
    this.uploadNode.abort(file)
    file.status = 'removed'
    this.handleRemove(file)
  }

  onStart = (file) => {
    let targetItem
    let nextFileList = this.state.fileList.concat()
    if (file.length > 0) {
      targetItem = file.map(el => {
        el.status = 'uploading'
        return el
      })
      nextFileList = nextFileList.push(targetItem)
    } else {
      file.status = 'uploading'
      nextFileList.push(file)
    }
    this.onChange({
      file,
      fileList: nextFileList,
    })
  }

  componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps || 'defaultFileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || nextProps.defaultFileList || [],
      })
    }
  }

  onError = (error, response, file) => {
    let fileList = this.state.fileList
    let targetItem = this.getItem(file, fileList)
    if (!targetItem) {
      return
    }

    targetItem.error = error
    targetItem.response = response
    targetItem.status = 'error'
    this.onChange({
      file: { ...targetItem },
      fileList,
    })
  }

  onSuccess = (response, file) => {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      } else {
        response = response
      }
    } catch (e) {

    }
    let fileList = this.state.fileList
    let targetItem = this.getItem(file, fileList)
    if (!targetItem) {
      return
    }
    targetItem.status = 'done'
    targetItem.response = response
    this.onChange({
      file: { ...targetItem },
      fileList,
    })
  }

  onProgress = (e, file) => {
    let fileList = this.state.fileList
    let targetItem = this.getItem(file, fileList)
    if (!targetItem) {
      return
    }
    targetItem.percent = e.percent
    this.onChange({
      event: e,
      file: { ...targetItem },
      fileList: this.state.fileList,
    })
  }

  getItem = (file, fileList) => {
    const matchKey = file.uid ? 'uid' : 'name'
    if (fileList.length !== 0) {
      return fileList.filter(item => item[matchKey] === file[matchKey])[0]
    } else {
      return file
    }
  }

  onChange = (info) => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList });
    }

    const { onChange } = this.props
    if (onChange) {
      onChange(info)
    }
  }

  render() {
    const {
      rootClassName,
      listType,
      onPreview,
      disabled,
      children,
    } = this.props

    const childButton = {children: listType === 'picture-card' ? <Add className='add-file'/> : children }

    const rcUploadProps = Object.assign({}, {
      onStart: this.onStart,
      onError: this.onError,
      onSuccess: this.onSuccess,
      onProgress: this.onProgress,
      className: 'upload-component',
    }, this.props, childButton)

    const uploadList = (
      <UploadList
        listType={listType}
        items={this.state.fileList}
        onPreview={onPreview}
        onRemove={this.handleManualRemove}
      />
    )

    const uploadButton = (
      <div className={classnames('upload-button-style', {disabled: disabled}, rootClassName)}>
        <RcUpload {...rcUploadProps} ref={node => {this.uploadNode = node}} />
      </div>
    )

    if (listType === 'picture-card') {
      return (
        <div className='upload-photo'>
          {uploadButton}
          {uploadList}
        </div>
      )
    }

    return (
      <div className='upload-wrap'>
        {uploadButton}
        {uploadList}
      </div>
    )
  }
}

export default Upload
