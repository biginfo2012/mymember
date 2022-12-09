import React from 'react'
import { Select } from 'antd'
import { Typography } from '@mui/material';
const { Option } = Select
const paddingArray = [0, 5, 10, 15, 20, 25, 50];

const Videoadvance = ({ editor }) => {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e })
  }
  return (
    <div id="video">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Widht</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => { handlestyle(e, "widht") }}
          getPopupContainer={() => document.getElementById('video')}>
          <Option value="">Full widht</Option>
          <Option value="">Half widht</Option>
          <Option value="">2/4 Widht</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Sticky on Scroll</Typography>
        </div>
        <Select
          className='inputstyle'
          getPopupContainer={() => document.getElementById('video')}>
          <Option value="on">on</Option>
          <Option value="of">Of</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Paddding</Typography>
        </div>
        <Select
          className="inputstyle"
          onChange={(e) => { handlestyle(e, "padding") }}
          getPopupContainer={() => document.getElementById('video')}>
          {paddingArray?.map((padding) => {
            return (
              <Option value={padding + 'px'} key={padding}>
                {padding} px
              </Option>
            );
          })}
        </Select>
      </div>
    </div>
  )
}

export default Videoadvance