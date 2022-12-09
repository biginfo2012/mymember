import React, {useEffect} from 'react'
import { Select, Input } from 'antd'
import { Slider, Typography } from '@mui/material';
import FontFamily from "../../configuration/fontfamily"

const { Option } = Select;
const Inputsetting = ({ editor }) => {
  const inputTypeArray = [
    {
      key: 'not-set',
      label: 'Not Set'
    },
    {
      key: 'name',
      label: 'Full Name'
    },
    {
      key: 'first_name',
      label: 'First Name'
    },
    {
      key: 'last_name',
      label: 'Last Name'
    },
    {
      key: 'email',
      label: 'Email Address'
    },
    {
      key: 'phone',
      label: 'Phone Number'
    },
    {
      key: 'birthday',
      label: 'BirthDay'
    },
    {
      key: 'address',
      label: 'Address'
    },
    {
      key: 'city',
      label: 'City'
    },
    {
      key: 'state',
      label: 'State'
    },
    {
      key: 'country',
      label: 'Country'
    },
    {
      key: 'zip',
      label: 'Zip'
    },
    {
      key: 'shipping_address',
      label: 'Shipping Address'
    },
    {
      key: 'shipping_state',
      label: 'Shipping State'
    },
    {
      key: 'shipping_country',
      label: 'Shipping Country'
    },
    {
      key: 'shipping_zip',
      label: 'Shipping Zip'
    },
    {
      key: 'vat_number',
      label: 'VAT Number'
    },
    {
      key: 'custom_type',
      label: 'Custom Type'
    }
  ]

  const getSelectedHtmlElement = () => {
    const selectedElement = editor.getSelected();
    return selectedElement.getChildAt(0);
  }

  const handleChangeType = (newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.type = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addAttributes({ 'type': newVal });
  }

  const handleChangePlaceholder = (event, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.placeHolder = event.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addAttributes({ 'placeholder': event.target.value });
  }

  const handleRequireChange = (newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.required = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addAttributes({ 'required': newVal });
  }

  const handleFontSizeChange = (event, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.fontSize = event.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'font-size': event.target.value + 'px' })
  }
   const handlefontfamily = (event, newVal) => {
    const element = getSelectedHtmlElement();
     let attributes = getSelectedHtmlElement().getAttributes();
     attributes.fontFamily = newVal;
     getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'font-family': newVal})
  }

  useEffect(() => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if(!attributes) {
      attributes = {};
      getSelectedHtmlElement().setAttributes(attributes);
    }
  })
  return (
    <div id="inputSetting">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Input Type</Typography>
        </div>
        <Select className='inputstyle'
                defaultValue={getSelectedHtmlElement().getAttributes().type}
        onChange={handleChangeType} getPopupContainer={() => document.getElementById('inputSetting')}>
          {inputTypeArray?.map((inputType) => {
            return (
              <Option value={inputType.key} key={inputType.key}>
                {inputType.label}
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
          >Placeholder Text</Typography>
        </div>
        <Input
          onChange={handleChangePlaceholder}
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes().placeHolder}
          placeholder='Full Name'
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Required</Typography>
        </div>
        <Select className='inputstyle'
                defaultValue={getSelectedHtmlElement().getAttributes().required}
        onChange={handleRequireChange} getPopupContainer={() => document.getElementById('inputSetting')}>
          <Option value="false">Not Required</Option>
          <Option value="true">Required</Option>
        </Select>
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
          defaultValue={getSelectedHtmlElement().getAttributes().fontFamily}
          getPopupContainer={() => document.getElementById('inputSetting')}
          onChange={handlefontfamily}
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
          style={{
            width: '210px',
            color: '#828282'
          }}
        >
          <Typography
            className='mb-0'
          >Font Size</Typography>
        </div>
        <Slider defaultValue={getSelectedHtmlElement().getAttributes().fontSize}
          size="small"
          onChange={handleFontSizeChange}
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput' defaultValue={getSelectedHtmlElement().getAttributes().fontSize}/>
        </div>
      </div>
    </div>
  )
}

export default Inputsetting
