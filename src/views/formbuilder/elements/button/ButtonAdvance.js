import React, {useEffect} from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;

const Corners = ["inherit", 'square', '2px', '3px', '4px', '5px', '10px', '15px', '60px', '50%']
const verticalspace = ["inherit", '5px', '10px', '15px', '20px', '25px', '30px', '35px', '40px', '0px']
const border = ["inherit", "none", "1px", '2px', '3px', '4px', '5px', '10px']

const ButtonAdvance = ({ editor }) => {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const handlestylewidth = (e, value) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.widthStyle = e;
    getSelectedHtmlElement().setAttributes(attributes);
    if (e === "fill width") {
      const element = getSelectedHtmlElement();
      element.addStyle({ width: '100%' })
    } else {
      const element = getSelectedHtmlElement();
      element.addStyle({ width: '200px' })
    }

  }
  const handlestyle2 = (e, name) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes[name] = e;
    getSelectedHtmlElement().setAttributes(attributes);
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
  const addeffct = (e, name) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes[name] = e;
    getSelectedHtmlElement().setAttributes(attributes);
    const element = getSelectedHtmlElement();
    if (e === "no-effect") {
      element.addStyle({
        'position': "relative"
      })
    } else if (e === "pulseGlow") {
      element.addStyle({
        'animation': 'pulseGlow 2s infinite',
        'animation-timing-function': 'ease-in-out'
      })
    } else if (e === "rocking") {
      element.addStyle({
        'animation': 'rocking 2s infinite',
        'animation-timing-function': 'cubic-bezier(0, 0, 0.58, 1)',
        'transition': '.2s'
      })
    } else if (e === "bounce") {
      element.addStyle({
        'animation': 'bounce 1.5s infinite',
        'animation-timing-function': 'ease-in',
        'transition': '.2s'

      })
    } else if (e === "wobble") {
      element.addStyle({
        'transition': '.3s'
      })
    } else {
      element.addStyle({
        'transition': '.2s',
        ' box-shadow': '0px 0px 0px 0px rgb(0 0 0 / 0%)'
      })
    }

  }

  const handlePaddingVerticalChange = (value) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes["padding-vertical"] = value;
    getSelectedHtmlElement().setAttributes(attributes);
    const element = getSelectedHtmlElement();
    element.addStyle({
      'padding-left': value,
      'padding-right': value,
    })
  }

  const handlePaddingHorizontalChange = (value) => {
    console.log(value + ":" + value);
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes["padding-horizontal"] = value;
    getSelectedHtmlElement().setAttributes(attributes);
    const element = getSelectedHtmlElement();
    element.addStyle({
      'padding-top': value,
      'padding-bottom': value,
    })
  }
  useEffect(() => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if(!attributes) {
      attributes = {};
      getSelectedHtmlElement().setAttributes(attributes);
    }
  })
  return (
    <div id='buttoninput'
    >
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Button Width</Typography>
        </div>
        <Select
          defaultValue={getSelectedHtmlElement().getAttributes().widthStyle}
          className='inputstyle'
          getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlestylewidth(e, "width")}
        >
          <Option value="fuild">Fuild</Option>
          <Option value="fill width">Fill width</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Inline / Block</Typography>
        </div>
        <Select
          defaultValue={getSelectedHtmlElement().getAttributes().display}
          className='inputstyle'
          getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlestyle2(e, "display")}
        >
          <Option value="block">Display Block</Option>
          <Option value="inline">Display Inline</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Style</Typography>
        </div>
        <Select
          defaultValue={getSelectedHtmlElement().getAttributes()["display-style"]}
          className='inputstyle'
          getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlestyle2(e, "display-style")}
        >
          <Option value="display-block">Custom</Option>
          <Option value="display-inline">Line flat</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Vertical Space</Typography>
        </div>
        <Select

          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes()["padding-vertical"]}
          getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlePaddingVerticalChange(e)}
        >
          {verticalspace.map((item) => {
            return (
              <Option key={item} value={item}>{item}</Option>
            )
          })}
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Horizontal Space</Typography>
        </div>
        <Select
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes()["padding-horizontal"]}
          getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlePaddingHorizontalChange(e)}
        >
          {verticalspace.map((item) => {
            return (
              <Option key={item} value={item}>{item}</Option>
            )
          })}
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Corners</Typography>
        </div>
        <Select
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes()["border-radius"]}
          getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlestyle2(e, "border-radius")}
        >
          {Corners.map((item) => {
            return (
              <Option key={item} value={item}>{item}</Option>
            )
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
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes()["border"]}
          getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={(e) => handlestyle2(e, "border")}
        >
          {border.map((item) => {
            return (
              <Option key={item} value={item}>{item}</Option>
            )
          })}
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Box Shadow</Typography>
        </div>
        <Select style={{ width: 250, height: 42 }}
          defaultValue={getSelectedHtmlElement().getAttributes()["box-shadow"]}
          onChange={(e) => { handlestyle2(e, "box-shadow") }}
          getPopupContainer={() => document.getElementById('buttonAdvance')}>
          <Option value="none">No Shadow</Option>
          <Option value="soft_shadow">Soft Shadow</Option>
          <Option value="mid_shadow">Mid Shadow</Option>
          <Option value="hard_shadow">Hard Shadow</Option>
          <Option value="far_shadow">Far Shadow</Option>
          <Option value="blurry_shadow">Blurry Shadow</Option>
          <Option value="dark_highlight">Dark with Highlight</Option>
          <Option value="1_inset_light">Sharp 1px Inset Light</Option>
          <Option value="1_inner_border">Sharp 1px Inner Border</Option>
          <Option value="2_inner_border">Sharp 2px Inner Border</Option>
          <Option value="highlight">Hightlight On Hover Only</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Text Shadow</Typography>
        </div>
        <Select
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes()["text-shadow"]}
          onChange={(e) => { handlestyle2(e, "text-shadow") }}
          getPopupContainer={() => document.getElementById('buttoninput')}>
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
          >Text Transform</Typography>
        </div>
        <Select
          defaultValue={getSelectedHtmlElement().getAttributes()["text-transform"]}
          onChange={(e) => { handlestyle2(e, "text-transform") }}
          className='inputstyle'
          getPopupContainer={() => document.getElementById('buttoninput')}>
          <Option value="normal">Normal</Option>
          <Option value="uppercase">Uppercase</Option>
          <Option value="lowercase">Lowercase</Option>
          <Option value="capitalize">Capitalize</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Letter Spacing</Typography>
        </div>
        <Select
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes()["letter-spacing"]}
          onChange={(e) => { handlestyle2(e, "letter-spacing") }}
          getPopupContainer={() => document.getElementById('buttoninput')}>
          <Option value="normal">Normal</Option>
          <Option value="1px">1px Spacing</Option>
          <Option value="2px">2px Spacing</Option>
          <Option value="3px">3px Spacing</Option>
          <Option value="-1px">-1px Spacing</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Icon Picker</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue='None'
          type='icon'
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Button Effect</Typography>
        </div>
        <Select
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes()["effect"]}
          onChange={(e) => { addeffct(e, "effect") }}
          getPopupContainer={() => document.getElementById('buttoninput')}>
          <Option value="no-effect">No Effect</Option>
          <Option value="pulseGlow">Pluse Glow </Option>
          <Option value="rocking">Rocking (loop)</Option>
          <Option value="bounce">Bounce (loop)</Option>
          <Option value="wobble">Wobble (loop)</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Button Align</Typography>
        </div>
        <Select
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes()["justify-content"]}
          onChange={(e) => handlestyle2(e, "justify-content")}
          getPopupContainer={() => document.getElementById('buttoninput')}>
          <Option value="center">Center</Option>
          <Option value="left">Left</Option>
          <Option value="right">Right</Option>
        </Select>
      </div>
    </div >
  )
}

export default ButtonAdvance
