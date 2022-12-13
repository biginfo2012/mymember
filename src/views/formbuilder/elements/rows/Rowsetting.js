import { TextField, Button, Typography ,Slider} from '@mui/material'
import { Select, Input } from 'antd'
import React from 'react'
import Icon from "@ant-design/icons";
import Image from "../../../../assets/img/image.png"

const { Option } = Select;

const selectAfter = (
    <Select defaultValue="" className="select-after">
    </Select>
);
const SectionAdvance = (props) => {
  const getSelectedHtmlElement = () => {
    // const selectedElement = props.editor.getSelected();
    // const element = selectedElement.view.el;
    // return element.getElementsByClassName('section-row-child')[0];
    return props.editor.getSelected();
  };

  const handlePaddingXChange = (event, newVal) => {

    const element = getSelectedHtmlElement();
    // element.style.paddingLeft = newVal;
    // element.style.paddingRight = newVal;

    element.addStyle({ 'padding-left': newVal })
    element.addStyle({ 'padding-right': newVal })

  };
  const handlePaddingTopChange = (event, newVal) => {
    const element = getSelectedHtmlElement();
    //element.style.paddingTop = newVal;
    element.addStyle({ 'padding-top': newVal })
  };

  const handlePaddingBottomChange = (event, newVal) => {
    const element = getSelectedHtmlElement();
    //element.style.paddingBottom = newVal;
    element.addStyle({ 'padding-bottom': newVal })
  };

  const handleTextColorChange = (event) => {
    const element = getSelectedHtmlElement();
    //element.style.fontColor = event.target.value;
    element.addStyle({ 'color': event.target.value })
  }

  const handleBackgroundColorChange = (event) => {

    const element = getSelectedHtmlElement();
    // element.style.backgroundColor = event.target.value;
    element.addStyle({ 'background-color': event.target.value })
  }

  const handleBackgroundImageChange = (event) => {
    const element = getSelectedHtmlElement();
    //element.style.backgroundImage =  "url('" + event.target.value + "')";
    element.addStyle({ 'background-image': "url('" + event.target.value + "')" })
  }
    return (
        <div>
            <div className='p-1'>
                <div className='d-flex' >
                    <div
                        className='inputlablewarrper'
                    >
                        <Typography className='mb-0'
                        >Bg Image</Typography>
                    </div>
                    <TextField
                        style={{
                            border: "1px solid #b8c2cc",
                            height: '40px'
                        }}
                        className='inputstyle'
                        variant={"outlined"}
                        size="small"
                        type="text"
                        placeholder="Image URL"
                        onChange={handleBackgroundImageChange}
                    />
                    <Button
                        className='bgsecondary'>
                        <Icon component={() => <img src={Image} />} />
                    </Button>
                </div>
            </div>
            <div className='inputwarrper'>
                <div className="inputlablewarrper">
                    <Typography className='mb-0'
                    >Background  Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                    defaultValue={'#EFEFEF'}
                    onChange={handleBackgroundColorChange}
                />
            </div>
            <div className='inputwarrper'>
                <div className="inputlablewarrper">
                    <Typography className='mb-0'
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
                    defaultValue={'#EFEFEF'}
                    onChange={handleTextColorChange}
                />
            </div>

            <div className="bgsecondary d-flex align-items-center"
                style={{
                    height: "40px"
                }}>
                <Typography className='mb-0 p-1'>Padding</Typography>
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
                <Slider defaultValue={50}
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
                <Slider defaultValue={50}
                    size="small"
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
                <Slider defaultValue={50}
                    size="small"
                    onChange={handlePaddingXChange}
                    valueLabelDisplay="auto" />
                <div className='countinputwrapper'
                >
                    <Input className='countinput' />
                </div>
            </div>
        </div>
    )
}

export default SectionAdvance;
