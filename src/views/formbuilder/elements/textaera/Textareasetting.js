import React, {useEffect, useState} from 'react'
import { Select, Input } from 'antd'
import { Slider, Typography } from '@mui/material';
import FontFamily from '../../configuration/fontfamily';

const { Option } = Select;
const selectAfter = (
  <Select className="select-after">
  </Select>
);

const Textareasetting = ({ editor }) => {
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
  const [fontsize, setfontsize] = useState(0)

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
    attributes.fontSize = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'font-size': newVal + 'px'})
    setfontsize(newVal)
  }
  const handlestyle = (newVal,name) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes[name] = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addAttributes({ [name]: newVal });
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
        <Select defaultValue={getSelectedHtmlElement().getAttributes().type} style={{ width: 250, height: 42 }} onChange={handleChangeType} getPopupContainer={() => document.getElementById('inputSetting')}>
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
          defaultValue={getSelectedHtmlElement().getAttributes().placeHolder}
          onChange={handleChangePlaceholder}
          className='inputstyle'
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
        <Select defaultValue={getSelectedHtmlElement().getAttributes().required}
                style={{ width: 250, height: 42 }} onChange={handleRequireChange} getPopupContainer={() => document.getElementById('inputSetting')}>
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
          showSearch
          className='inputstyle'
          placeholder="select font"
          defaultValue={getSelectedHtmlElement().getAttributes()["font-family"]}
          onChange={(e) => { handlestyle(e, "font-family") }}
          getPopupContainer={() => document.getElementById('inputSetting')}
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
          <div className='countinput' style={{
            border: '1px solid #C4C4C4'
          }}>
            {fontsize}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Textareasetting
