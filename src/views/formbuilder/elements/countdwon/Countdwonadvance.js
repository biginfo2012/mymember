import React from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;
const selectAfter = (
  <Select className="select-after">
  </Select>
);
const Countdwonadvance = ({ editor }) => {
  const getSelectedHtmlElement = () => {
    const selectedElement = editor.getSelected();
    return selectedElement.getChildAt(0);
    
  }
  const handlestyle = (event, name) => {
    const element = getSelectedHtmlElement();
    if (name == "display") {
      element.addStyle({
        "display": 'flex',
        'justify-content': event
      })
    } else {
      element.addStyle({ [name]: event })
    }
  }

  return (
    <div id="countdwon">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Size</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => { handlestyle(e, "font-size") }}
          getPopupContainer={() => document.getElementById('countdwon')}>
          <Option value="meadum">Meadum</Option>
          <Option value="small">Small</Option>
          <Option value="large">Large</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Align</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => { handlestyle(e, "display") }}
          getPopupContainer={() => document.getElementById('countdwon')}>
          <Option value="left">Left</Option>
          <Option value="right">Right</Option>
          <Option value="center">Center</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Label Weight</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => { handlestyle(e, "font-weight") }}
          getPopupContainer={() => document.getElementById('countdwon')}>
          <Option value="normal">Normal</Option>
          <Option value="bold">Bold</Option>
        </Select>
      </div>
    </div>
  )
}

export default Countdwonadvance
