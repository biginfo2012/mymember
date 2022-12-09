import React from "react"

import {
    TextField,
    Stack,
    Typography,
    Switch,
    Select,
    MenuItem,
    Slider,
    Input
 } 
 from "@mui/material";

const AppointmentSettings = () => {

    const handleSliderChange = () => {

    }
 
    const handleSliderInputChange = () => { 
 
    }
 
    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    Label Text
                </Typography>
                <TextField fullWidth label="Placeholder" variant="standard" placeholder="Placeholder"/>
            </Stack>
 
            <Stack direction="row" spacing={2}>
                <Typography>
                    Required
                </Typography>
                <Switch />
            </Stack>
 
            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    Font Family
                </Typography>
                <Select fullWidth variant="standard">
                    <MenuItem value="Roboto">Roboto</MenuItem>
                    <MenuItem value="Sans Serif">Sans Serif</MenuItem>
                </Select>
            </Stack>
 
            <Stack direction="row" spacing={1}>
                <Typography sx={{textAlign: 'left'}}>
                    Font Size
                </Typography>
                <Slider 
                    size="small"
                    defaultValue={20}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={handleSliderChange}
                    />
                <Input 
                    size="small"
                    sx={{width: "50px"}}
                    onChange={handleSliderInputChange}
                    />
            </Stack>
        </Stack>
    )

}

export default AppointmentSettings