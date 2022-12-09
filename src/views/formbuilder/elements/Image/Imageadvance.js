import React from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;
const borderRadiusArray = [0, 5, 10, 15, 20, 25, 50, 75, 150];

const Imageadvance = ({ editor }) => {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };

  const handlestyle = (e, name) => {
    if (name === "border-radius") {
      if (e === "square") {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: '0' })
      } else {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: e })
      }
    } else {
      const element = getSelectedHtmlElement();
      element.addStyle({ [name]: e })
    }
    if (name === "justify-content") {
      const element = getSelectedHtmlElement();
      element.addStyle({ 'dispaly': "flex", [name]: e })
    }
  }
  const handleOpacityChange = (value) => {
    const element = getSelectedHtmlElement();
    let opacity = 1 / 0;
    switch (value) {
      case 'none':
        opacity = 1.0;
        break;
      case 'light_fade':
        opacity = 0.75;
        break;
      case 'half_fade':
        opacity = 0.5;
        break;
      case 'heavy_fade':
        opacity = 0.25;
        break;
    }
    element.addStyle({ 'opacitiy': opacity });
  }
  return (
    <div id="image">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Align</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => handlestyle(e, "justify-content")}
          getPopupContainer={() => document.getElementById('image')}>
          <Option value="center">Center</Option>
          <Option value="left">Left</Option>
          <Option value="right">Right</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Radius</Typography>
        </div>
        <Select
          className='inputstyle'
          getPopupContainer={() => document.getElementById('image')}
          onChange={(e) => handlestyle(e, "border-radius")}
        >
          {borderRadiusArray?.map((borderRadius) => {
            return (
              <Option value={borderRadius} key={borderRadius}>
                {borderRadius} px
              </Option>
            );
          })}
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Borders</Typography>
        </div>
        <Select
          onChange={(e) => { handlestyle(e, "") }}
          className="inputstyle"
          getPopupContainer={() => document.getElementById('image')}>
          <Option value="none">No Border</Option>
          <Option value="full">Full Border</Option>
          <Option value="bottom">Bottom Border</Option>
          <Option value="top">Top Border</Option>
          <Option value="top_bottom">Top & Bottom Border</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Shadow</Typography>
        </div>
        <Select className='inputstyle'
          onChange={(e) => { handlestyle(e, "box-shadow") }}
          getPopupContainer={() => document.getElementById('image')}>
          <Option value="none">No Shadow</Option>
            <Option value="subtitle">Subtitle Shadow</Option>
            <Option value="mid">Mid Shadow</Option>
            <Option value="strong">Strong Shadow</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Opacity</Typography>
        </div>
        <Select className='inputstyle'
          onChange={handleOpacityChange}
          getPopupContainer={() => document.getElementById('image')}>
          <Option value="none">None</Option>
          <Option value="light_fade">Light Fade</Option>
          <Option value="half_fade">Half Fade</Option>
          <Option value="heavy_fade">Heavy Fade</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Grey Scale FX</Typography>
        </div>
        <Select className='inputstyle'
          onChange={(e) => { handlestyle(e, "box-shadow") }}
          getPopupContainer={() => document.getElementById('image')}>
          <Option value="none">None</Option>
          <Option value="light_fade">Light Fade</Option>
          <Option value="half_fade">Half Fade</Option>
          <Option value="heavy_fade">Heavy Fade</Option>
        </Select>
      </div>
    </div>
  )
}

export default Imageadvance