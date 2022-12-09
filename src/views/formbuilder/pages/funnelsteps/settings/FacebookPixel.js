import {
    TextField,
    Select,
    Typography,
    MenuItem
} from '@mui/material'
import { Button, } from 'antd'
import React from 'react'

const FacebookPixel = () => {
    return (
        <div>
            <div className='d-flex justify-content-between m-1'>
                <h4>Edit Settings For This Funnel</h4>
                <div className='d-flex justify-content-end'>
                    <Button style={{
                        background: 'rgb(1, 132, 255)',
                        color: '#fff'
                    }}>
                        Save & update
                    </Button>
                </div>
            </div>
            <div className='d-flex justify-content-between m-1'>
                <div>
                    <h4>Facebook Conversion Pixel Integration</h4>
                    <span className='textsecondery'>
                        Here you will be able to
                        select which Facebook Pixel
                        Conversion Event will be
                        triggered when this page loads
                    </span>
                    <div>
                        <Typography className="mb-0 fw-bolder" color="textSecondary">
                            Sub Cetogary
                        </Typography>
                        <div
                            style={{
                                height: "3em",
                                borderRadius: "0.4em",
                                border: "1px solid #b8c2cc",
                                width:'300px'
                            }}
                        >
                            <Select
                                type="select"
                                style={{ padding: "10px !imporant", height: "100%" }}
                                fullWidth
                                variant={"outlined"}
                                name={"gender"}
                                placeholder="Sub Cetogary"
                            >
                                <MenuItem value="Male">smartlist 1</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div>
                        <TextField
                            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                            variant={"outlined"}
                            size="small"
                            type="textarea"
                            name="customId"
                            placeholder="Not Connected"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacebookPixel