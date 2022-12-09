import React from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const { Option } = Select;

const selectAfter = (
    <Select className="select-after">
    </Select>
);
const Countdownsetting = ({ editor }) => {
    const getSelectedHtmlElement = () => {
        const selectedElement = editor.getSelected();
        return selectedElement.getChildAt(0);

    }
    const handlestyle = (event, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: event.target.value })

    }
    const handleaddAttributes = (event, name) => {
        const element = getSelectedHtmlElement();
        element.setComponents({ [name]: event })
    }

    return (
        <div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >End Date</Typography>
                </div>
                <Input
                    className='inputstyle'
                    placeholder='Full Name'
                    type='date'
                    onChange={handleaddAttributes}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Time Zone</Typography>
                </div>
                <Input
                    className='inputstyle'
                    placeholder='Full Name'
                    name="enddate"

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Translate</Typography>
                </div>
                <Input
                    className='inputstyle'
                    addonAfter={selectAfter}
                    placeholder='Full Name'

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Expire Action</Typography>
                </div>
                <Input
                    className='inputstyle'
                    addonAfter={selectAfter}
                    placeholder='Full Name'

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Redirect URL</Typography>
                </div>
                <Input
                    className='inputstyle'
                    addonAfter={selectAfter}
                    placeholder='Full Name'

                />
            </div>
            <div className="bgsecondary d-flex align-items-center"
                style={{
                    height: "40px"
                }}>
                <Typography className='mb-0 p-1'>Customize Display</Typography>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Years</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        size='larg' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Months</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        size='larg' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Weeks</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        size='larg' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Days</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        size='larg' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Hours</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        size='larg' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Minutes</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        size='larg' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Seconeds</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        size='larg' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Font Family</Typography>
                </div>
                <Input
                    className='inputstyle'
                    addonAfter={selectAfter}
                    placeholder='Full Name'

                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Time Units Color</Typography>
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
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Label Color</Typography>
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
                />
            </div>
        </div >
    )
}

export default Countdownsetting
