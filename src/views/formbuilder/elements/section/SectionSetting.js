import { TextField, Button, Slider, Typography } from '@mui/material'
import { Select, Input } from 'antd'
import React, {useEffect} from 'react'
import Icon from "@ant-design/icons";
import Image from "../../../../assets/img/image.png"

const { Option } = Select;

const SectionSetting = (props) => {
  let sectionValue = "full_page";
  const selectType = props.editor.getSelected().attributes.type;
  switch (selectType) {
    case 'section-wide':
      sectionValue = 'wide';
      break;
    case 'section-full-width':
      sectionValue = 'full_page';
      break;
    case 'section-medium':
      sectionValue = 'medium';
      break;
    case 'section-small':
      sectionValue = 'small';
      break;
  }
  const getSelectedHtmlElement = () => {
    return props.editor.getSelected().getChildAt(0);
  };

  const handlePaddingXChange = (event, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.paddingX = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'padding-left': newVal })
    element.addStyle({ 'padding-right': newVal })

  };
  const handlePaddingTopChange = (event, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.paddingTop = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'padding-top': newVal })
  };

  const handlePaddingBottomChange = (event, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.paddingBottom = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'padding-bottom': newVal })
  };

  const handleTextColorChange = (event) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.textColor = event.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'color': event.target.value })
  }

  const handleBackgroundColorChange = (event) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.backgroundColor = event.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'background-color': event.target.value })
  }

  const handleBackgroundImageChange = (event) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.backgroundSource = event.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'background-image': "url('" + event.target.value + "')" })
  }

  const handleSectionWidthChange = (value) => {

  }

  useEffect(() => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if(!attributes) {
      attributes = {};
      getSelectedHtmlElement().setAttributes(attributes);
    }
  })
  return (
    <div id="sectionSetting">
      <div className='p-1'>
        <div className='d-flex' >
          <Typography
            className='inputlablewarrper mb-0'>
            Bg Image</Typography>
          <TextField
            style={{
              border: "1px solid #b8c2cc",
              height: '40px'
            }}
            variant={"outlined"}
            size="small"
            type="text"
            placeholder="Image URL"
            defaultValue={getSelectedHtmlElement().getAttributes().backgroundSource}
            onChange={handleBackgroundImageChange}
          />
          <Button
            className='bgsecondary'>
            <Icon component={() => <img src={Image} />} />
          </Button>
        </div>
      </div>
      <div className="bgsecondary d-flex align-items-center"
        style={{
          height: "40px"
        }}>
        <Typography className='p-1 mb-0'>SIZE & POSITION</Typography>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Section Width</Typography>
        </div>
        <Select defaultValue={sectionValue} style={{ width: 250, height: 42}} onChange={handleSectionWidthChange} getPopupContainer={() => document.getElementById('sectionSetting')}>
          <Option value="full_page">Full Page</Option>
          <Option value="wide">Wide</Option>
          <Option value="medium">Medium</Option>
          <Option value="small">Small</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Sticky</Typography>
        </div>
        <Select style={{ width: 250, height: 42}} onChange={handleSectionWidthChange} getPopupContainer={() => document.getElementById('sectionSetting')}>
          <Option value="full_page">No Stickiness</Option>
          <Option value="wide">Stick To Top On Scroll</Option>
          <Option value="medium">Stick To Bottom On Load</Option>
        </Select>
      </div>
      <div className="bgsecondary d-flex align-items-center"
        style={{
          height: "40px"
        }}>
        <Typography className='p-1 mb-0'>COLORS</Typography>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '120px'
          }}
        >
          <Typography
            className='inputlablewarrper mb-0'
          >Background Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 200,
            height: '40px'
          }}
          onChange={handleBackgroundColorChange}
          size="small"
          type="color"
          defaultValue={getSelectedHtmlElement().getAttributes().backgroundColor}
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
            className='inputlablewarrper mb-0'
          >Text Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 200,
            height: '40px'
          }}
          size="small"
          type="color"
          onChange={handleTextColorChange}
          defaultValue={getSelectedHtmlElement().getAttributes().textColor}
        />
      </div>
      <div className="bgsecondary d-flex align-items-center"
        style={{
          height: "40px"
        }}>
        <Typography className='p-1 mb-0'>Padding</Typography>
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
            className='inputlablewarrper mb-0'
          >Top</Typography>
        </div>
        <Slider defaultValue={getSelectedHtmlElement().getAttributes().paddingTop}
          size="small"
          onChange={handlePaddingTopChange}
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput' />
        </div>
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
            className='inputlablewarrper mb-0'
          >Bottom</Typography>
        </div>
        <Slider
          size="small"
          defaultValue={getSelectedHtmlElement().getAttributes().paddingBottom}
          onChange={handlePaddingBottomChange}
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput' />
        </div>
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
            className='inputlablewarrper mb-0'
          >Left Right</Typography>
        </div>
        <Slider defaultValue={getSelectedHtmlElement().getAttributes().paddingX}
          onChange={handlePaddingXChange}
          size="small"
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput' />
        </div>
      </div>
    </div >
  )
}

export default SectionSetting
