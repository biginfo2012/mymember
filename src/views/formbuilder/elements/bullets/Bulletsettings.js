import React, { useState } from 'react'
import { Select, Input, } from 'antd'
import { Typography, Slider } from '@mui/material';
import FontFamily from "../../configuration/fontfamily"

const { Option } = Select;

const Bulletsettings = ({ editor }) => {
  const [bulletspace, setbulletspace] = useState(0)

  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e.target.value })
    if (name === "margin-top") {
      setbulletspace(e.target.value)

    }
  }
  const handlestyle2 = (e, value) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [value]: e })
  }
  const handleaddoptionforULorOL = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addAttributes({ [name]: e })
  }
  return (
    <div id='bullets'>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          > List Type</Typography>
        </div>
        <Select
          className='inputstyle'
          getPopupContainer={() => document.getElementById('bullets')}
          onChange={(e) => { handleaddoptionforULorOL(e, 'list-style') }}>
          <Option value="ul">Order List</Option>
          <Option value="ol">Icon List</Option>
        </Select>
      </div>
      <div className='sliderinputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '210px',
            color: '#828282'
          }}
        >
          <Typography
            className='mb-0'
          >Bullet Space</Typography>
        </div>
        <Slider
          size="small"
          valueLabelDisplay="auto"
          defaultValue={bulletspace}
          onChange={(e) => { handlestyle(e, "margin-top") }} />
        <div className='countinputwrapper'
        >
          <Input className='countinput'
            defaultValue={bulletspace}

            onChange={(e) => { handlestyle(e, "margin-top") }}
          />
        </div>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Font Family</Typography>
        </div>
        <Select
          className='inputstyle'
          getPopupContainer={() => document.getElementById('bullets')}
          onChange={(e) => { handlestyle2(e, 'list-style') }}>
          {FontFamily.families.map((item, i) => {
            return (
              <Option value={item} key={i}>{item}</Option>
            )
          })}
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '120px'
          }}
        >
          <Typography
            className='mr-2 mb-0'
          >Text Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          size="small"
          type="color"
          onChange={(e) => { handlestyle2(e, 'color') }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '120px'
          }}
        >
          <Typography
            className='mr-2 mb-0'
          >Bold Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          onChange={(e) => { handlestyle2(e, 'color') }}
          size="small"
          type="color"
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '120px'
          }}
        >
          <Typography
            className='mr-2 mb-0'
          >Icon Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          onChange={(e) => { handlestyle2(e, 'list-style') }}
          size="small"
          type="color"
        />
      </div>
    </div>
  )
}

export default Bulletsettings