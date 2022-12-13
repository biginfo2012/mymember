import React from "react"
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;

const DropDownAdvanced = ({ editor }) => {
    const getSelectedHtmlElement = () => {
        return editor.getSelected().getChildAt(0);
    };
    const handlestyle = (newVal, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: newVal })
    }
    const handlestyle2 = (newVal, name) => {
        const element = getSelectedHtmlElement();
        element.addIcon({'icon': newVal })
    }
    return (
        <div id="dropdwon">
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Font Weight</Typography>
                </div>
                <Select className="inputstyle"
                    getPopupContainer={() => document.getElementById('dropdwon')}
                    onChange={(e) => { handlestyle(e, "font-weight") }}
                >
                    <Option value="bold">Bolde</Option>
                    <Option value="normal">Normal</Option>
                </Select>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Icon</Typography>
                </div>
                <Select className="inputstyle"
                    onChange={(e) => { handlestyle2(e) }}
                    getPopupContainer={() => document.getElementById('dropdwon')}>
                    <Option value="caret">Caret</Option>
                    <Option value="up-dwon-arrow">Up dwon Arrow</Option>
                    <Option value="Caret-square">Caret Square</Option>
                    <Option value="chevron">Chevron</Option>
                    <Option value="chevron-circle">Chevron Circle</Option>
                    <Option value="arrow">Arrow</Option>
                </Select>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Corners</Typography>
                </div>
                <Select className="inputstyle"
                    onChange={(e) => { handlestyle(e, "border-radius") }}
                    getPopupContainer={() => document.getElementById('dropdwon')}>
                    <Option value="0">Square Edage</Option>
                    <Option value="5px">5px</Option>
                    <Option value="10px">10px</Option>
                    <Option value="20px">20px</Option>
                    <Option value="120px">120px</Option>
                </Select>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >BG color</Typography>
                </div>
                <Select className="inputstyle"
                    onChange={(e) => { handlestyle(e, "background") }}
                    getPopupContainer={() => document.getElementById('dropdwon')}>
                    <Option value="white">White</Option>
                    <Option value="#e5e5e5">Gray</Option>
                    <Option value="#000">Black</Option>
                    <Option value="#F01">Light Gradient</Option>
                    <Option value="linear-gradient(to bottom, #ebebeb 0%, #f6f6f6 9%, white 100%) !important">Medium Gradient</Option>
                </Select>
            </div>
        </div>
    )
}

export default DropDownAdvanced