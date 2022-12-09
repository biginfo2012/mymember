import { TextField, Button, Slider, Typography } from '@mui/material'
import { Select, Input } from 'antd'
import React, { useState } from 'react'
import Icon from "@ant-design/icons";
import Image from "../../../../assets/img/image.png"

const Imagesetting = ({ editor }) => {
    const [fontsize, setfontsize] = useState(0)

    const handleFontsize = (value, newVal) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ 'font-size': newVal })
        setfontsize(newVal)
    }
    const getSelectedHtmlElement = () => {
        return editor.getSelected().getChildAt(0);
    };
    const addAttributes = (event, name) => {
        const element = getSelectedHtmlElement();
        element.addAttributes({ [name]: event.target.value })
    }
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
        if (name === "background-image") {
            editor.setCustomParserCss({ 'background-image': "url('" + e.target.value + "')" })
        } else {
            editor.setCustomParserCss({ [name]: e.target.value })
        }
    }

    return (
        <div id='image'>
            <div className='d-flex m-1' >
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
                    onChange={(e) => { handlestyle(e, "background-image") }}
                />
                <Button
                    className='bgsecondary'>
                    <Icon component={() => <img src={Image} />} />
                </Button>
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
                    >Font Size</Typography>
                </div>
                <Slider
                    onChange={handleFontsize}
                    size="small"
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
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Alt Text</Typography>
                </div>
                <Input
                    className='inputstyle'
                    onChange={(e) => { addAttributes(e, "alt") }}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Image Width</Typography>
                </div>
                <Input
                    className='inputstyle'
                    onChange={(e) => { handlestyle(e, "widht") }}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Image Height</Typography>
                </div>
                <Input
                    className='inputstyle'
                    onChange={(e) => { handlestyle(e, "height") }}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Link URL</Typography>
                </div>
                <Input
                    className='inputstyle'
                    onChange={(e) => { addAttributes(e, "src") }}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Link URL Target</Typography>
                </div>
                <Input
                    className='inputstyle'
                    onChange={(e) => { handlestyle(e, "height") }}
                />
            </div>
        </div>
    )
}

export default Imagesetting