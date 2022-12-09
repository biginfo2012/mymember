import React, {useEffect, useState} from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';
import { connect } from 'react-redux';

const { Option } = Select;
const borderRadiusArray = [0, 5, 10, 15, 20, 25, 50, 75, 150];
const borderArray = [1, 2, 3, 5, 10];
const dropShadowArray = [5, 10, 20, 30, 40];


const CheckboxAdvance = ({ editor, BorderColor }) => {
    const [cornerRadius, setCornerRadius] = useState(0);
    const [cornerRadiusType, setCornerRadiusType] = useState("all");
    const [border, setBorder] = useState("none");
    const [borderStyle, setBorderStyle] = useState("solid");
    const [borderSize, setBorderSize] = useState(1);
    const paddingArray = [0, 5, 10, 15, 20, 25, 50, 75, 150];

    const changeCornerRadius = (radius, type) => {
        const element = getSelectedHtmlElement();
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
                element.addStyle({ 'border-top-left-radius': radius + 'px' })
                element.addStyle({ 'border-top-right-radius': radius + 'px' })
                element.addStyle({ 'border-bottom-left-radius': 0 })
                element.addStyle({ 'border-bottom-right-radius': 0 })
                break;
        }
    }

    const handleBorderChange = (value) => {
        setBorder(value);
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes["border"] = value;
        getSelectedHtmlElement().setAttributes(attributes);
        changeBorder(value, borderStyle, borderSize)
    }
    const handleCornerRadiusChange = (value) => {
        setCornerRadius(value);
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes["corner-radius"] = value;
        getSelectedHtmlElement().setAttributes(attributes);
        changeCornerRadius(value, cornerRadiusType);
    }

    const handleCornerEdgeChange = (value) => {
        setCornerRadiusType(value);
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes["corner-edge"] = value;
        getSelectedHtmlElement().setAttributes(attributes);
        changeCornerRadius(cornerRadius, value);
    }

    const changeBorder = (type, style, size,) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ 'border-style': style, })
        switch (type) {
            case 'none':
                element.addStyle({ 'border-width': 0 })
                break;
            case 'full':
                element.addStyle({ 'border-width': size })
                break;
            case 'bottom':
                element.addStyle({ 'border-width': 0 })
                element.addStyle({ 'border-bottom': size })
                break;
            case 'top':
                element.addStyle({ 'border-width': 0 })
                element.addStyle({ 'border-top': size })
                break;
            case 'top_bottom':
                element.addStyle({ 'border-width': 0 })
                element.addStyle({ 'border-top': size })
                element.addStyle({ 'border-bottom': size })
                break;
        }
    }

    const handleBorderStyleChange = (value) => {
        setBorderStyle(value);
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes["border-style"] = value;
        getSelectedHtmlElement().setAttributes(attributes);
        changeBorder(border, value, borderSize,)
    }

    const handleBorderSizeChange = (value) => {
        setBorderSize(value);
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes["border-size"] = value;
        getSelectedHtmlElement().setAttributes(attributes);
        changeBorder(border, borderStyle, value,)
    }
    const getSelectedHtmlElement = () => {
        const selectedElement = editor.getSelected();
        return selectedElement.getChildAt(0);
    }

    const handlestyle = (event, name) => {
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes[name] = event;
        getSelectedHtmlElement().setAttributes(attributes);
        const element = getSelectedHtmlElement();
        if (name == "display") {
            element.addStyle({
                "display": 'flex',
                'justify-content': event
            })
        } else {
            element.addStyle({ [name]: event })
        }
    }

    const handleiconpicker = (event) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes["icon"] = event.target.value;
      getSelectedHtmlElement().setAttributes(attributes);
      element.addAttributes({ 'icon': event.target.value });

    }

    useEffect(() => {
      let attributes = getSelectedHtmlElement().getAttributes();
      if(!attributes) {
        attributes = {};
        getSelectedHtmlElement().setAttributes(attributes);
      }
      setBorder(attributes["border"])
      setBorderStyle(attributes["border-style"]);
      setBorderSize(attributes["border-size"])
      setCornerRadiusType(attributes["corner-edge"])
      setCornerRadius(attributes["corner-radius"])
    })
    return (
        <div id="checkbox">
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Line Height</Typography>
                </div>
                <Select
                    className='inputstyle'
                    defaultValue={getSelectedHtmlElement().getAttributes()["line-height"]}
                    onChange={(e) => { handlestyle(e, "line-height") }}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    <Option value="auto">Auto</Option>
                    <Option value="0.7em">0.7em</Option>
                    <Option value="1em">1em</Option>
                    <Option value="1.3em">1.3em</Option>
                    <Option value="1.4em">1.4em</Option>
                    <Option value="1.5em">1.5em</Option>
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
                    onChange={(e) => { handlestyle(e, "text-transform") }}
                    className='inputstyle'
                    getPopupContainer={() => document.getElementById('checkbox')}>
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
                    onChange={(e) => { handlestyle(e, "letter-spacing") }}
                    getPopupContainer={() => document.getElementById('checkbox')}>
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
                    >Text Shadow</Typography>
                </div>
                <Select
                    className='inputstyle'
                    defaultValue={getSelectedHtmlElement().getAttributes()["text-shadow"]}
                    onChange={(e) => { handlestyle(e, "text-shadow") }}
                    getPopupContainer={() => document.getElementById('checkbox')}>
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
                    >Icon Picker</Typography>
                </div>
                <Input
                  defaultValue={getSelectedHtmlElement().getAttributes()["icon"]}
                  className='inputstyle'
                  placeholder='Full Name'
                  onChange={handleiconpicker}

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Padding</Typography>
                </div>
                <Select className="inputstyle"
                    defaultValue={getSelectedHtmlElement().getAttributes()["padding"]}
                    onChange={(e) => { handlestyle(e, "padding") }}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    {paddingArray?.map((padding) => {
                        return (
                            <Option value={padding + 'px'} key={padding}>
                                {padding} px
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
                    >Border Radius</Typography>
                </div>
                <Select className="inputstyle"
                    defaultValue={cornerRadius}
                    onChange={handleCornerRadiusChange}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    {borderRadiusArray?.map((borderRadius) => {
                        return (
                            <Option value={borderRadius + 'px'} key={borderRadius}>
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
                    >Radius Edges</Typography>
                </div>
                <Select className="inputstyle"
                    defaultValue={cornerRadiusType}
                    onChange={handleCornerEdgeChange}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    <Option value="all">All</Option>
                    <Option value="top">Top Only</Option>
                    <Option value="bottom">Bottom Only</Option>
                </Select>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Borders</Typography>
                </div>
                <Select className="inputstyle"
                    defaultValue={border}
                    onChange={handleBorderChange}
                    getPopupContainer={() => document.getElementById('checkbox')}>
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
                    >Border Style</Typography>
                </div>
                <Select className="inputstyle"
                    defaultValue={borderStyle}
                    onChange={handleBorderStyleChange}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    <Option value="none">No Border Style</Option>
                    <Option value="solid">Solid</Option>
                    <Option value="dashed">Dashed</Option>
                    <Option value="dotted">Dotted</Option>
                </Select>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Border Size</Typography>
                </div>
                <Select className="inputstyle"
                    defaultValue={borderSize}
                    onChange={handleBorderSizeChange}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    <Option value="none">None</Option>
                    {borderArray?.map((border) => {
                        return (
                            <Option value={border + "px"} key={border}>
                                {border} px
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
                    >Shadow</Typography>
                </div>
                <Select className="inputstyle"
                    defaultValue={getSelectedHtmlElement().getAttributes()["box-shadow"]}
                    onChange={(e) => { handlestyle(e, "box-shadow") }}
                    getPopupContainer={() => document.getElementById('checkbox')}>
                    <Option value={0 + 'px'}>No Shadow</Option>
                    {dropShadowArray?.map((size) => {
                        return (
                            <Option value={size + 'px'} key={size}>
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
        </div>
    )
}
const mapstateprop = (state) => {
    return {
        BorderColor: state.FormBuilderReducer.BorderColor
    }
}
export default connect(mapstateprop, {

})(CheckboxAdvance)
