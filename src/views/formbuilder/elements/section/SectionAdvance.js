import { Typography } from '@mui/material'
import { Select, Input } from 'antd'
import React, { useState, useEffect } from 'react'

const { Option } = Select;

const SectionAdvance = (props) => {
  const [cornerRadius, setCornerRadius] = useState(0);
  const [cornerRadiusType, setCornerRadiusType] = useState("all");
  const [border, setBorder] = useState("none");
  const [borderStyle, setBorderStyle] = useState("solid");
  const [borderSize, setBorderSize] = useState(1);
  const [borderColor, setBorderColor] = useState("#EFEFEF");


  const cornerRadiusArray = [5, 10, 15, 20, 25, 50, 75, 150];
  const borderSizeArray = [1, 2, 3, 5, 10];
  const dropShadowArray = [5, 10, 20, 30, 40];
  const getSelectedHtmlElement = () => {
    return props.editor.getSelected().getChildAt(0);
  };

  const changeCornerRadius = (radius, type) => {
    const element = getSelectedHtmlElement();
    //element.style.borderRadius = radius + 'px';
    switch (type) {
      case 'all':
        element.addStyle({ 'border-top-left-radius': radius + 'px' })
        element.addStyle({ 'border-top-right-radius': radius + 'px' })
        element.addStyle({ 'border-bottom-left-radius': radius + 'px' })
        element.addStyle({ 'border-bottom-right-radius': radius + 'px' })
        break;
      case 'bottom':
        element.addStyle({ 'border-top-left-radius': 0 })
        element.addStyle({ 'border-top-right-radius': 0 })
        element.addStyle({ 'border-bottom-left-radius': radius + 'px' })
        element.addStyle({ 'border-bottom-right-radius': radius + 'px' })
        break;
      case 'top':
        // element.style.borderBottomLeftRadius = 0;
        // element.style.borderBottomRightRadius = 0;
        element.addStyle({ 'border-top-left-radius': radius + 'px' })
        element.addStyle({ 'border-top-right-radius': radius + 'px' })
        element.addStyle({ 'border-bottom-left-radius': 0 })
        element.addStyle({ 'border-bottom-right-radius': 0 })
        break;
    }
  }

  const handleCornerRadiusChange = (value) => {
    setCornerRadius(value);
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.cornerRadius = value;
    getSelectedHtmlElement().setAttributes(attributes);
    changeCornerRadius(value, cornerRadiusType);
  }

  const handleCornerEdgeChange = (value) => {
    setCornerRadiusType(value);
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.cornerRadiusType = value;
    getSelectedHtmlElement().setAttributes(attributes);
    changeCornerRadius(cornerRadius, value);
  }

  const changeBorder = (type, style, size, color) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'border-color': color })
    element.addStyle({ 'border-style': style })

    switch (type) {
      case 'none':
        element.addStyle({ 'border-width': 0 })
        break;
      case 'full':
        // element.style.border = size;
        element.addStyle({ 'border-width': size })
        break;
      case 'bottom':
        // element.style.border = 0;
        // element.style.borderBottom = size;
        element.addStyle({ 'border-width': 0 })
        element.addStyle({ 'border-bottom': size })
        break;
      case 'top':
        // element.style.border = 0;
        // element.style.borderTop = size;
        element.addStyle({ 'border-width': 0 })
        element.addStyle({ 'border-top': size })
        break;
      case 'top_bottom':
        // element.style.border = 0;
        // element.style.borderTop = size;
        // element.style.borderBottom = size;
        element.addStyle({ 'border-width': 0 })
        element.addStyle({ 'border-top': size })
        element.addStyle({ 'border-bottom': size })
        break;
    }
  }

  const handleBorderChange = (value) => {
    setBorder(value);
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.border = value;
    getSelectedHtmlElement().setAttributes(attributes);
    changeBorder(value, borderStyle, borderSize, borderColor)
  }

  const handleBorderStyleChange = (value) => {
    setBorderStyle(value);
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.borderStyle = value;
    getSelectedHtmlElement().setAttributes(attributes);
    changeBorder(border, value, borderSize, borderColor)
  }

  const handleBorderSizeChange = (value) => {
    setBorderSize(value);
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.borderSize = value;
    getSelectedHtmlElement().setAttributes(attributes);
    changeBorder(border, borderStyle, value, borderColor)
  }

  const handleBorderColorChange = (event) => {
    const value = event.target.value;
    setBorderColor(value);
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.borderColor = value;
    getSelectedHtmlElement().setAttributes(attributes);
    changeBorder(border, borderStyle, borderSize, value)
  }

  const handleFloatChange = (value) => {
    const element = getSelectedHtmlElement();
    // element.style.float = value;
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.float = value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'float': value })
  }

  const handleDisplayChange = (value) => {
    const element = getSelectedHtmlElement();
    //element.style.position = value;
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.display = value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'position': value })
  }

  useEffect(() => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if(!attributes) {
      attributes = {};
    }
    setCornerRadius(attributes.cornerRadius);
    setCornerRadiusType(attributes.cornerRadiusType);
    setBorder(attributes.border);
    setBorderSize(attributes.borderSize);
    setBorderStyle(attributes.borderStyle);
    setBorderColor(attributes.borderColor);
    console.log(attributes);
  })
  return (
    <div id="sectionAdvance">
      <div className='py-0'>
        <div className='inputwarrper'>
          <div
            className='inputlablewarrper'>
            <Typography
              className='mb-0'
            >Corner Radius</Typography>
          </div>
          <Select
            style={{ width: 250, height: 42 }} defaultValue={cornerRadius} onChange={handleCornerRadiusChange} getPopupContainer={() => document.getElementById('sectionAdvance')}>
            <Option value={0}>Square</Option>
            {cornerRadiusArray?.map((radius) => {
              return (
                <Option value={radius} key={radius}>
                  {radius} px
                </Option>
              );
            })}
            <Option value={100}>100%</Option>
          </Select>
        </div>
        {
          cornerRadius > 0 ?
            (
              <div className='inputwarrper'>
                <div className="inputlablewarrper">
                  <Typography className='mb-0'
                  >Edges</Typography>
                </div>
                <Select defaultValue={cornerRadiusType} style={{ width: 250, height: 42 }} onChange={handleCornerEdgeChange} getPopupContainer={() => document.getElementById('sectionAdvance')}>
                  <Option value="all">All</Option>
                  <Option value="top">Top Only</Option>
                  <Option value="bottom">Bottom Only</Option>
                </Select>
              </div>
            ) : null
        }

      </div>
      <div className="bgsecondary d-flex align-items-center"
        style={{
          height: "40px"
        }}>
        <Typography className='mb-0 p-1'>BORDER</Typography>
      </div>
      <div className='inputwarrper'>
        <div
          className="inputlablewarrper">
          <Typography className='mb-0'
          >Border</Typography>
        </div>
        <Select style={{ width: 250, height: 42 }} value={border} onChange={handleBorderChange} getPopupContainer={() => document.getElementById('sectionAdvance')}>
          <Option value="none">None</Option>
          <Option value="full">Full Border</Option>
          <Option value="bottom">Bottom Only</Option>
          <Option value="top">Top Only</Option>
          <Option value="top_bottom">Top & Bottom</Option>
        </Select>
      </div>
      {
        border !== "none" ? (
          <>
            <div className='inputwarrper'>
              <div className="inputlablewarrper">
                <Typography className='mb-0'
                >Solid</Typography>
              </div>
              <Select value={borderStyle} style={{ width: 250, height: 42 }} onChange={handleBorderStyleChange} getPopupContainer={() => document.getElementById('sectionAdvance')}>
                <Option value="solid">Solid</Option>
                <Option value="dashed">Dashed</Option>
                <Option value="dotted">Dotted</Option>
              </Select>
            </div>
            <div className='inputwarrper'>
              <div className="inputlablewarrper">
                <Typography className='mb-0'
                >Size</Typography>
              </div>
              <Select value={borderSize} style={{ width: 250, height: 42 }} onChange={handleBorderSizeChange} getPopupContainer={() => document.getElementById('sectionAdvance')}>
                {borderSizeArray?.map((size) => {
                  return (
                    <Option value={size} key={size}>
                      {size} px
                    </Option>
                  );
                })}
              </Select>

            </div>
            <div className='inputwarrper'>
              <div className="inputlablewarrper">
                <Typography className='mb-0'
                >Color</Typography>
              </div>
              <Input
                className='p-0'
                style={{
                  width: 200,
                  height: '40px'
                }}
                onChange={handleBorderColorChange}
                size="small"
                type="color"
                defaultValue={borderColor}
              />
            </div>
          </>
        ) : null
      }

      <div className="bgsecondary d-flex align-items-center"
        style={{
          height: "40px"
        }}>
        <Typography className='mb-0 p-1'>EXTRA</Typography>
      </div>
      <div className='inputwarrper'>
        <div className="inputlablewarrper">
          <Typography className='mb-0'
          >Drop Shadow</Typography>
        </div>
        <Select style={{ width: 250, height: 42 }} getPopupContainer={() => document.getElementById('sectionAdvance')}>
          <Option value={0}>No Shadow</Option>
          {dropShadowArray?.map((size) => {
            return (
              <Option value={size} key={size}>
                {size}% drop Shadow
              </Option>
            );
          })}
          {dropShadowArray?.map((size) => {
            return (
              <Option value={-size} key={-size}>
                {size}% Inner Shadow
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="bgsecondary d-flex align-items-center"
        style={{
          height: "40px"
        }}>
        <Typography className='mb-0 p-1'>Advance Css</Typography>
      </div>
      <div className='inputwarrper'>
        <div className="inputlablewarrper">
          <Typography className='mb-0'
          >Float</Typography>
        </div>
        <Select defaultValue={getSelectedHtmlElement().getAttributes().float} style={{ width: 250, height: 42 }} onChange={handleFloatChange} getPopupContainer={() => document.getElementById('sectionAdvance')}>
          <Option value="initial">None</Option>
          <Option value="left">Left</Option>
          <Option value="right">Right</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div className="inputlablewarrper">
          <Typography className='mb-0'
          >Position</Typography>
        </div>
        <Select defaultValue={getSelectedHtmlElement().getAttributes().display} style={{ width: 250, height: 42 }} onChange={handleDisplayChange} getPopupContainer={() => document.getElementById('sectionAdvance')}>
          <Option value="initial">None</Option>
          <Option value="relative">Relative</Option>
          <Option value="absolute">Absolute</Option>
          <Option value="fixed">Fixed</Option>
        </Select>
      </div>
    </div >
  )
}

export default SectionAdvance;
