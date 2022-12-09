import { Button, Slider, Typography } from '@mui/material'
import { Select, Input } from 'antd'
import React, {useEffect, useState} from 'react'
import FontFamily from "../../configuration/fontfamily"

const Option = { Select }

const ButtonSetting = ({ editor, onChangeEvent }) => {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const handlestyle = (e, name) => {
    console.log(e);
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.fontFamily = e;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ [name]: e })
  }
  const handlestyle2 = (e, name) => {
    const element = getSelectedHtmlElement();
    let attributes =getSelectedHtmlElement().getAttributes();
    attributes[name] = e.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ [name]: e.target.value })
  }
  const handleFontsize = (value, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.fontSize = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.getChildAt(0).addStyle({ 'font-size': newVal })
  }
  const handleSubFontSize = (value, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.subFontSize = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.getChildAt(1).addStyle({ 'font-size': newVal })

  }

  const handleTextChange = (e) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.text = e.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.getChildAt(0).set({content: e.target.value})
  }
  const handleSubTextChange = (e) => {
    const element = getSelectedHtmlElement();
    element.getChildAt(1).set({content: e.target.value})
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.subText = e.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
  }

  useEffect(() => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if(!attributes) {
      attributes = {};
      getSelectedHtmlElement().setAttributes(attributes);
    }
    console.log(attributes);
  })
  return (
    <div id="button">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
          className='inputlablewarrper m-b'
          >Edit Action</Typography>
        </div>
        <Button
          className='inputstyle'
          onClick={(e) => {onChangeEvent('button_action')}}
        >
          SET ACTION
        </Button>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
          className='inputlablewarrper m-b'
          >Button Text</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes().text || "Click to Sign Up"}
          onChange={(e) => { handleTextChange(e) }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
          className='inputlablewarrper m-b'
          >Sub Text</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes().subText}
          onChange={(e) => { handleSubTextChange(e) }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
          className='inputlablewarrper m-b'
          >Font </Typography>
        </div>
        <Select
          showSearch
          className='inputstyle'
          placeholder="select font"
          defaultValue={getSelectedHtmlElement().getAttributes().fontFamily }
          onChange={(e) => { handlestyle(e, "font-family") }}
          getPopupContainer={() => document.getElementById('button')}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          {FontFamily.families.map((item, i) => {
            return (
              <Option value={item} key={i}>{item}</Option>
            )
          })}
        </Select>
      </div>
      <div className='sliderinputwarrper'>
        <div
          className='inputlablewarrper'
        >
          <Typography
          className='inputlablewarrper m-b'
          >Font Size</Typography>
        </div>
        <Slider
          size="small"
          onChange={handleFontsize}
          defaultValue={getSelectedHtmlElement().getAttributes().fontSize}
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput p-0'
            defaultValue={getSelectedHtmlElement().getAttributes().fontSize}
            onChange={handleFontsize}
          />
        </div>
      </div>
      <div className='sliderinputwarrper'>
        <div
          className='inputlablewarrper'
        >
          <Typography
          className='inputlablewarrper m-b'
          >Sub Text Size</Typography>
        </div>
        <Slider
          onChange={handleSubFontSize}
          size="small"
          defaultValue={getSelectedHtmlElement().getAttributes().subFontSize}

          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput'
            onChange={handleSubFontSize}
            defaultValue={getSelectedHtmlElement().getAttributes().subFontSize}
            style={{
              border: '1px solid #C4C4C4'
            }} />
        </div>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '120px'
          }}
        >
          <Typography
          className='inputlablewarrper m-b'
          >Text color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          size="small"
          type="color"
          defaultValue={getSelectedHtmlElement().getAttributes().color}
          onChange={(e) => { handlestyle2(e, "color") }}
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
          >BG Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          size="small"
          type="color"
          defaultValue={getSelectedHtmlElement().getAttributes().background}
          onChange={(e) => { handlestyle2(e, "background") }}
        />
      </div>
    </div>
  )
}

export default ButtonSetting
