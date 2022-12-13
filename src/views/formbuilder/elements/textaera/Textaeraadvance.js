import React from 'react'
import { Select, } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;

const Textaeraadvance = ({ editor }) => {
  const getSelectedHtmlElement = () => {
    const selectedElement = editor.getSelected();
    return selectedElement.getChildAt(0);
  }

  const handlestyle = (newVal, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: newVal });
  }
  return (
    <div id="inputAdvance">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Font Weight</Typography>
        </div>
        <Select style={{ width: 250, height: 42 }}
          onChange={(e) => { handlestyle(e, "font-weight") }}
          getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="normal">Normal</Option>
          <Option value="bold">Bold</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Text Align</Typography>
        </div>
        <Select style={{ width: 250, height: 42 }}
          onChange={(e) => { handlestyle(e, "text-align") }}
          getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="left">Left</Option>
          <Option value="center">Center</Option>
          <Option value="right">Center</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Corners</Typography>
        </div>
        <Select style={{ width: 250, height: 42 }} onChange={(e) => { handlestyle(e, "border-radius") }}
          getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="0">Square Edges</Option>
          <Option value="5px">5px</Option>
          <Option value="10px">10px</Option>
          <Option value="20px">20px</Option>
          <Option value="120px">120px</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Height</Typography>
        </div>
        <Select style={{ width: 250, height: 42 }}
          onChange={(e) => { handlestyle(e, "height") }}
          getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="default">Default</Option>
          <Option value="100px">100px</Option>
          <Option value="150px">150px</Option>
          <Option value="225px">225px</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >BG Color</Typography>
        </div>
        <Select style={{ width: 250, height: 42 }}
          onChange={(e) => { handlestyle(e, "background") }}
          getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="white">White</Option>
          <Option value="grey">Grey</Option>
          <Option value="black">Black</Option>
          <Option value="#F01">Light Gradient</Option>
          <Option value="linear-gradient(to bottom, #ebebeb 0%, #f6f6f6 9%, white 100%) !important">Medium Gradient</Option>
        </Select>
      </div>
    </div>
  )
}

export default Textaeraadvance
