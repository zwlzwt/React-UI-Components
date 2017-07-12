// created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  active                           Boolean             false            开启对话框
// @param  type                             String                               对话框类型
// @param  title                            String                               对话框标题
// @param  actions                          Array                                给button定义具体文案和函数参考button
// @param  children                         node                                 对话框内部dom
// @param  onEscKeyDown                     Func                                 esc按键回掉
// @param  onOverlayClick                   Func                                 点击对话框后面的遮罩回掉

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Overlay from '../Overlay/overlay.js'
import Button from '../Button/button.js'
import './dialog.less'
import Portal from '../Portal/portal.js'

const Dialog = props => {
  const actions = props.actions.map((action, index) => {
    return <Button {...action} key={index} rootClassName='dialog-button'/>
  })

  const classStyle = classnames('dialog-style', props.rootClassName)

  const typeClass = classnames('dialog-title', {warning: props.type === 'warning', alert: props.type === 'alert', success: props.type === 'success'})

  return (
    <Portal active={props.active}>
      <Overlay
        active={props.active}
        onClick={props.onOverlayClick}
        onEscKeyDown={props.onEscKeyDown}
        onMouseDown={props.onOverlayMouseDown}
        onMouseMove={props.onOverlayMouseMove}
        onMouseUp={props.onOverlayMouseUp}
      />
      <div className={classStyle}>
        <section className='dialog-body'>
          {props.title ? <h6 className={typeClass}>{props.title}</h6> : null}
          {props.children}
        </section>
        {actions.length
          ? <nav role='navigation' className='dialog-navi'>
              {actions}
            </nav>
          : null
        }
      </div>
    </Portal>
  )
}

Dialog.propTypes = {
  rootClassName: PropTypes.string,
  actions: PropTypes.array,
  active: PropTypes.bool,
  children: PropTypes.node,
  onEscKeyDown: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onOverlayMouseDown: PropTypes.func,
  onOverlayMouseMove: PropTypes.func,
  onOverlayMouseUp: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.oneOf(['warning', 'alert', 'message', 'success'])
}

Dialog.defaultProps = {
  rootClassName: '',
  actions: [],
  active: false,
  type: 'message',
}

export default Dialog
