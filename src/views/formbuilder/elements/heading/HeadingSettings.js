import React, {useEffect, useState} from "react"
import { Select, Input } from 'antd'
import { Typography, Slider } from '@mui/material';

const { Option } = Select;
const selectAfter = (
    <Select className="select-after">
    </Select>
);
const HeadingSettings = ({ editor }) => {


    const getSelectedHtmlElement = () => {
        const selectedElement = editor.getSelected();
        return selectedElement.getChildAt(0);
    }

    const handleFontSizeChange = (event, newVal) => {
      const element = getSelectedHtmlElement();
      element.addStyle({'font-size': event.target.value + 'px'})
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.fontSize = event.target.value;
      getSelectedHtmlElement().setAttributes(attributes);
    }

    const handleFontColorChange = (event, newVal) => {
        const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.fontColor = event.target.value;
        getSelectedHtmlElement().setAttributes(attributes);

        element.addStyle({'color': event.target.value})
    }

    const handleBoldFontColorChange = (event, newVal) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.boldFontColor = event.target.value;
      getSelectedHtmlElement().setAttributes(attributes);
      element.addStyle({'color': event.target.value})
    }

    const handleBackgroundColorChange = (event, newVal) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.backgroundColor = event.target.value;
      getSelectedHtmlElement().setAttributes(attributes);
      element.addStyle({'background-color': event.target.value})
    }

    const handleIconColorChange = (event, newVal) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.iconColor = event.target.value;
      getSelectedHtmlElement().setAttributes(attributes);
    }

    const handleBorderColorChange = (event, newVal) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.borderColor = event.target.value;
      getSelectedHtmlElement().setAttributes(attributes);
      element.addStyle({'border-color': event.target.value})
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

      element.addStyle({'opacitiy': opacity});
    }
    useEffect(() => {
      let attributes = getSelectedHtmlElement().getAttributes();
      if(!attributes) {
        attributes = {};
        getSelectedHtmlElement().setAttributes(attributes);
      }
    })
    return (
        <div id="headingSetting">
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='inputlablewarrper mb-0'
                    >Font Family</Typography>
                </div>
                <Input
                    className='inputstyle'
                    placeholder='Full Name'
                    addonAfter={selectAfter}
                />
            </div>
            <div className='sliderinputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='inputlablewarrper mb-0'
                    >Font Size</Typography>
                </div>
                <Slider  onChange={handleFontSizeChange}
                    size="small"
                    defaultValue={getSelectedHtmlElement().getAttributes().fontSize}
                    valueLabelDisplay="auto" />
                <div style={{width: 72}}
                >
                    <Input className='countinput' disabled={true} value={getSelectedHtmlElement().getAttributes().fontSize} />
                </div>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='inputlablewarrper mb-0'
                    >Text Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    defaultValue={getSelectedHtmlElement().getAttributes().fontColor}
                    onChange={handleFontColorChange}
                    size="small"
                    type="color"
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='inputlablewarrper mb-0'
                    >Bold Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    defaultValue={getSelectedHtmlElement().getAttributes().boldFontColor}
                    onChange={handleBoldFontColorChange}
                    size="small"
                    type="color"
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='inputlablewarrper mb-0'
                    >Background Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    defaultValue={getSelectedHtmlElement().getAttributes().backgroundColor}
                    onChange={handleBackgroundColorChange}
                    size="small"
                    type="color"
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='inputlablewarrper mb-0'
                    >Icon Color
                    </Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    defaultValue={getSelectedHtmlElement().getAttributes().iconColor}
                    onChange={handleIconColorChange}
                    size="small"
                    type="color"
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='inputlablewarrper mb-0'
                    >Border Color
                    </Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    defaultValue={getSelectedHtmlElement().getAttributes().borderColor}
                    onChange={handleBorderColorChange}
                    size="small"
                    type="color"
                />
            </div>
            <div className='inputwarrper'>
              <div
                className='inputlablewarrper'>
                <Typography
                  className='inputlablewarrper mb-0'
                >Opacity</Typography>
              </div>
              <Select style={{ width: 250, height: 42}} onChange={handleOpacityChange}
                      defaultValue={getSelectedHtmlElement().getAttributes().opacity}
                      getPopupContainer={() => document.getElementById('headingSetting')}>
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
                  className='inputlablewarrper mb-0'
                >Typography Type</Typography>
              </div>
              <Select style={{ width: 250, height: 42}}  getPopupContainer={() => document.getElementById('headingSetting')}>
                <Option value="content_font">Content Font</Option>
                <Option value="headline_font">Headline Font</Option>
              </Select>
            </div>

        </div>
    );
}

export default HeadingSettings;
