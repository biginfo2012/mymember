import React, {useEffect, useState} from 'react'
import { Select, Input } from 'antd'
import { Slider, Typography } from '@mui/material';
import FontFamily from '../../configuration/fontfamily';
import { GET_BORDER_COLOR_FOR_CHECKBOX } from "../../../../redux/actions/form-builder/index"
import { connect } from 'react-redux';

const { Option } = Select;
const Corners = ["inherit", 'square', '2px', '3px', '4px', '5px', '10px', '15px', '60px', '50%']

const Chekboxsetting = ({ editor, GET_BORDER_COLOR_FOR_CHECKBOX }) => {
    const [fontSize, setFontSize] = useState(0)

    const getSelectedHtmlElement = () => {
        return editor.getSelected().getChildAt(0);
    };
    const handlestyle = (newVal, name) => {
        const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes[name] = newVal;
        getSelectedHtmlElement().setAttributes(attributes);
        element.addStyle({ [name]: newVal })
    }
    const handlestyle2 = (e, name) => {
        const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes[name] = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
        if (name === "border-color") {
            GET_BORDER_COLOR_FOR_CHECKBOX(e)
            element.addStyle({ 'border': `1px solid ${e.target.value}` })

        } else {
            element.addStyle({ [name]: e.target.value })
        }
    }
    const handleaddatribute2 = (e, name) => {
        const element = getSelectedHtmlElement()
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes[name] = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
        element.addAttributes({ [name]: e.target.value })

    }
    const handleFontSizeChange = (event,) => {
        const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.fontSize = event.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
        element.addStyle({ 'font-size': event.target.value + 'px' })
        setFontSize(event.target.value);
    }

    const handleaddatribute = (e, name) => {
        const element = getSelectedHtmlElement()
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes[name] = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
        if (name === "required") {
            if (e === "required") {
                element.addAttributes({ ['required']: true })
            } else {
                element.addAttributes({ ['required']: false })
            }
        } else {
            element.addAttributes({ [name]: e.target.value })
        }
    }

    const handleOpacityChange = (value) => {
        const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.opacity = value;
        getSelectedHtmlElement().setAttributes(attributes);
        let opacity = 1.0;
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

    useEffect(() => {
      let attributes = getSelectedHtmlElement().getAttributes();
      if(!attributes) {
        attributes = {};
        getSelectedHtmlElement().setAttributes(attributes);
      }
    })
    return (
        <div id="checkbox">
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Required</Typography>
                </div>
                <Select
                    className='inputstyle'
                    defaultValue={getSelectedHtmlElement().getAttributes()["required"]}
                    onChange={(e) => handleaddatribute(e, "required")}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    <Option value="required">Required</Option>
                    <Option value="not required">Not Required </Option>
                </Select>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Contact Field Name</Typography>
                </div>
                <Input
                    defaultValue={getSelectedHtmlElement().getAttributes()["full_name"]}
                    className='inputstyle'
                    placeholder='Full Name'
                    onChange={(e) => handleaddatribute2(e, "full_name")}
                />
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
                    getPopupContainer={() => document.getElementById('checkbox')}
                    onChange={(e) => handlestyle(e, "border-radius")}
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
                    >Font Family</Typography>
                </div>
                <Select
                    showSearch
                    className='inputstyle'
                    placeholder="select font"
                    defaultValue={getSelectedHtmlElement().getAttributes()["font-family"]}
                    onChange={(e) => { handlestyle(e, "font-family") }}
                    getPopupContainer={() => document.getElementById('checkbox')}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                    {FontFamily.families.map((item, i) => {
                        return (
                            <Option value={item} key={i}>{item}</Option>
                        )
                    })}
                </Select>            </div>
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
                <Slider
                    size="small"
                    defaultValue={getSelectedHtmlElement().getAttributes()["fontSize"]}
                    onChange={handleFontSizeChange}
                    valueLabelDisplay="auto"
                />
                <div className='countinputwrapper'
                >
                    <Input className='countinput p-0'
                        onChange={handleFontSizeChange}
                           defaultValue={getSelectedHtmlElement().getAttributes()["fontSize"]}
                    />
                </div>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Text Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                    defaultValue={getSelectedHtmlElement().getAttributes()["color"]}
                    onChange={(e) => { handlestyle2(e, "color") }}

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Bold Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                    defaultValue={getSelectedHtmlElement().getAttributes()["bold_color"]}
                    onChange={(e) => { handlestyle2(e, "bold_color") }}

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >BG Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                    defaultValue={getSelectedHtmlElement().getAttributes()["background"]}
                    onChange={(e) => { handlestyle2(e, "background") }}

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Icon Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                // onChange={(e) => { handlestyle(e, "background-color") }}

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Border Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                    defaultValue={getSelectedHtmlElement().getAttributes()["border-color"]}
                    onChange={(e) => { handlestyle2(e, "border-color") }}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Opacity</Typography>
                </div>
                <Select
                    className='inputstyle'
                    onChange={handleOpacityChange}
                    defaultValue={getSelectedHtmlElement().getAttributes()["opacity"]}
                    getPopupContainer={() => document.getElementById('checkbox')}>
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
                    >Typography Type</Typography>
                </div>
                <Select
                    className='inputstyle'
                    defaultValue={getSelectedHtmlElement().getAttributes()["variant"]}
                    onChange={(e) => { handleaddatribute(e, "variant") }}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    <Option value="h1">Headline</Option>
                    <Option value="p">Content Font</Option>
                </Select>
            </div>
        </div>
    )
}
export default connect(null, {
    GET_BORDER_COLOR_FOR_CHECKBOX
})(Chekboxsetting)
