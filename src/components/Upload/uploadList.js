// created by @zhaoweilong
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ProgressBar from '../ProgressBar/progressBar.js'
import FileIcon from './FileIcon'
import Close from './Close'
import Delete from './Delete'
import Preview from './Preview'
import './uploadList.less'

const previewFile = (file, callback) => {
  const reader = new FileReader()
  reader.onloadend = () => callback(reader.result)
  reader.readAsDataURL(file)
}

class UploadList extends Component {
  static propTypes = {
    listType: PropTypes.oneOf(['text', 'picture-card']),
    item: PropTypes.array
  }

  static defaultProps = {
    items: []
  }

  handleClose = (file) => {
    const onRemove = this.props.onRemove
    if (onRemove) {
      onRemove(file)
    }
  }

  handlePreview = (file, e) => {
    const { onPreview } = this.props
    if (!onPreview) {
      return
    }
    e.preventDefault()
    return onPreview(file)
  }

  componentDidUpdate() {
    if (this.props.listType !== 'picture-card') {
      return
    }

    (this.props.items || []).forEach(file => {
      if (file.thumbUrl !== undefined) {
         return
      }
      previewFile(file, (previewDataUrl) => {
        file.thumbUrl = previewDataUrl
      })
    })
  }

  render() {
    const {
      items,
      listType,
    } = this.props

    const showList = items.map(
      (file, index) => {
        let progress
        let icon = <FileIcon className='file-icon' />

        if (listType === 'picture-card') {
          if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
            icon = <div className=''>{'Upload...'}</div>
          } else {
            icon = (
              <a
                className='img-block'
                onClick={e => this.handlePreview(file, e)}
                href={file.url || file.thumbUrl}
                target='_blank'
              >
                <img src={file.thumbUrl || file.url} alt={file.name} className='img'/>
              </a>
            )
          }
        }

        if (file.status === 'uploading') {
          progress = (
            <div>
              {
                ('percent' in file) ? (
                  <ProgressBar rootClassName='bar-pro' percent={file.percent} />
                  ) : null
              }
            </div>
          )
        }

        const preview = file.url ? (
          <a
            href={file.url}
            target="_blank"
            className=''
            onClick={e => this.handlePreview(file, e)}
            title={file.name}
          >
            {file.name}
          </a>
        ) : (
          <span
            className='file-name'
            onClick={e => this.handlePreview(file, e)}
            title={file.name}
          >
            {file.name}
          </span>
        )

        const removeIcon = (
          <Close title='delete file' onClick={() => this.handleClose(file)}  className={classnames('close-icon', {delete: listType === 'picture-card'})}/>
        )

        const previewIcon = (
          <a
            href={file.url || file.thumbUrl}
            target='_blank'
            onClick={e => this.handlePreview(file, e)}
          >
            <Preview  className='preview-icon'/>
          </a>
        )

        const message = file.response || (file.error && file.error.statusText) || 'upload error'
        const iconAndPreview = (file.status === 'error')
          ? console.log(message)
          : <span className=''>{icon}{listType !== 'picture-card' ? preview : null}</span>

        return (
          <div className={classnames('upload-list', {card: listType === 'picture-card'})} key={file.uid || index}>
            <div className={classnames('upload-item', {item: listType === 'picture-card'})}>
              {iconAndPreview}
            </div>
            {removeIcon}
            {progress}
          </div>
        )
      }
    )

    return (
      <div className={classnames('upload-list-wrap', {picture: listType === 'picture-card'})}>
        {showList}
      </div>
    )
  }
}

export default UploadList
