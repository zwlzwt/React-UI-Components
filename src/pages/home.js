import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './home.less'

import Input from '../components/Input/input.js'
import Autocomplete from '../components/AutoComplete/autoComplete.js'
import SelectField from '../components/SelectField/selectField.js'
import RadioButton from '../components/Radio/radioButton.js'
import RadioGroup from '../components/Radio/radioGroup.js'
import Tabs from '../components/Tabs/tabs.js'
import Tab from '../components/Tabs/tab.js'
import Stepper from '../components/Stepper/stepper.js'
import Step from '../components/Stepper/step.js'
import StepLabel from '../components/Stepper/stepLabel.js'
import Button from '../components/Button/button.js'
import ProgressBar from '../components/ProgressBar/progressBar.js'
import Upload from '../components/Upload/upload.js'
import Dialog from '../components/Dialog/dialog.js'
import DatePicker from '../components/DatePicker/datePicker.js'
import Checkbox from '../components/Checkbox/checkbox.js'
import TooltipFactory from '../components/Tooltip/tooltip.js'

const TooltipButton = TooltipFactory(Button)
const TooltipInput = TooltipFactory(Input)

class Home extends Component {
  constructor() {
    super()
    this.changeClick = this.changeClick.bind(this)
    this.changeAutoInput = this.changeAutoInput.bind(this)
    this.handleSelectValue = this.handleSelectValue.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.handleTab = this.handleTab.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleDialog = this.handleDialog.bind(this)
    this.handleDateValue = this.handleDateValue.bind(this)
    this.handleFormatDate = this.handleFormatDate.bind(this)
  }

  state = { name: '', auto: '', selectValue: 'Spain', radioValue: 'front-end', tabIndex: 2, stepIndex: 0, progress: 0, DialogActive: false, dateValue: '' }

  handleChange = (name, value) => {
   this.setState({...this.state, [name]: value})
  }

  changeAutoInput(value) {
    this.setState({auto: value})
  }

  handleSelectValue(value) {
    this.setState({selectValue: value})
  }

  changeClick() {
    this.props.reduceStar()
  }

  handleRadio(value) {
    this.setState({radioValue: value})
  }

  handleTab(index) {
    this.setState({tabIndex: index})
  }

  handleNext() {
    const { stepIndex } = this.state
    this.setState({
      stepIndex: stepIndex + 1
    })
  }

  handlePrev() {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      })
    }
  }

  simulateProgress() {
   setTimeout(() => {
     if (this.state.progress < 100) {
       this.increaseProgress()
     } else {
       this.setState({progress: 0})
     }
     this.simulateProgress()
    }, (Math.random() * 1 + 1) * 1000)
   }

  componentWillMount() {
     this.simulateProgress()
   }

  increaseProgress() {
    this.setState({
      progress: Math.random() * 30 + this.state.progress
    })
  }

  handleUpload (info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      console.log('完成')
    } else if (info.file.status === 'error') {
      console.log('错误')
    }
  }

  handleDialog() {
    this.setState({DialogActive: !this.state.DialogActive})
  }

  handleDateValue(value, event) {
    this.setState({dateValue: value})
  }

  handleFormatDate(value, event) {
    let month = value.getMonth()+1
    if (month < 10) {
      month = `0${month}`
    }
    return `${value.getFullYear()}-${month}-${value.getDate()}`
  }

  handleCheckbox(field, value) {
    this.setState({[field]: value})
  }

  render() {
    const node = <em/>

    const dialogActions = [
      { label: '返回',  onClick: this.handleDialog },
      { label: '确认',  onClick: this.handleDialog },
    ]

    const fileList = [{
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }, {
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]

    let max = new Date(2017, 4, 15)
    let min = new Date(2017, 3, 10)
    const maxRange = new Date(max.setDate(10))
    const minRange = new Date(min.setDate(5))

    return (
      <div>
        <Input multiLine error='错误提示' hint='测试用的提示信息' maxLength={12} label='姓名' required  value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
        <Autocomplete source={['wo', 'ni', '123', 'fuck', 'you']} value={this.state.auto} onChange={this.changeAutoInput} showSuggestionsWhenValueIsSet/>
        <SelectField
          label='名字是什么呢'
          source={
            [
              { value: 'England', label: 'England' },
              { value: 'Spain', label: 'Spain'},
              { value: 'Thailand', label: 'Thailand', disabled: true },
              { value: 'USA', label: 'USA'}
            ]
          }
          value={this.state.selectValue}
          onChange={this.handleSelectValue}
        />
        <RadioGroup value={this.state.radioValue} onChange={this.handleRadio}>
          <RadioButton  label='前端开发' value='front-end' />
          <RadioButton label='后端开发' value='back-end' />
          <RadioButton label='全栈开发' value='full-stack' />
          <RadioButton label='什么都不是' value='nobody' disabled />
          <RadioButton label='游戏开发' value='unity-3d' />
        </RadioGroup>
        <Tabs index={this.state.tabIndex} onChange={this.handleTab} fixed>
          <Tab label='第一项'>
            <p>第一个选项内容</p>
            <p>第一个选项内容</p>
            <p>第一个选项内容</p>
            <p>第一个选项内容</p>
          </Tab>
          <Tab label='第二项'><p>第二个选项内容</p></Tab>
          <Tab label='第三项'><p>第三个选项内容</p></Tab>
          <Tab label='第四项' disabled><p>第四个选项内容</p></Tab>
          <Tab label='第五项'><p>第五个选项内容</p></Tab>
        </Tabs>
        <Stepper activeStep={this.state.stepIndex}>
          <Step><StepLabel>第一步</StepLabel></Step>
          <Step><StepLabel>第二步</StepLabel></Step>
          <Step><StepLabel>第三步</StepLabel></Step>
          <Step><StepLabel>第四步</StepLabel></Step>
          <Step><StepLabel>第五步</StepLabel></Step>
        </Stepper>
        <Button onClick={this.handleNext} label={this.state.stepIndex === 4 ? '完成' : '下一步'} raised></Button>
        <Button onClick={this.handlePrev} label='上一步' disabled={this.state.stepIndex === 0}></Button>
        <Upload name='fileName' action='//127.0.0.1:3002/upload' onChange={this.handleUpload}><Button label='upload' raised></Button></Upload>
        <Upload name='photo' action='//127.0.0.1:3002/upload' onChange={this.handleUpload} listType='picture-card' defaultFileList={[...fileList]}></Upload>
        <ProgressBar percent={this.state.progress}/>
        <ProgressBar percent={this.state.progress} type='circular'/>
        <ProgressBar mode='indeterminate' type='circular' showInfo={false}/>
        <Button onClick={this.handleDialog} label='提示框'/>
        <Dialog active={this.state.DialogActive} onOverlayClick={this.handleDialog} onEscKeyDown={this.handleDialog} actions={dialogActions} title='对话框' type='warning'>
          <p>测试用的数据如果是错误数据</p>
        </Dialog>
        <DatePicker
          // minDate={minRange}
          // maxDate={maxRange}
          value={this.state.dateValue}
          onChange={this.handleDateValue}
          label='日期选择'
          hint='请选择您需要的日期'
          inputFormat={this.handleFormatDate}
        />
        <Checkbox label='银行卡' onChange={this.handleCheckbox.bind(this, 'checkbox1')} checked={this.state.checkbox1}/>
        <Checkbox label='在线支付' onChange={this.handleCheckbox.bind(this, 'checkbox2')} checked={this.state.checkbox2}/>
        <Checkbox label='禁用check' disabled/>
        <TooltipButton
          tooltip={'提示错误原因是字数过多，或者是别的什么原因导致的'}
          raised
          label='驳回原因提示'
        />
        <TooltipInput
          tooltip={'提示错误原因是字数过多，或者是别的什么原因导致的'}
          label='驳回原因提示'
          tooltipDelay={200}
        />
      </div>
    )
  }
}

export default Home
