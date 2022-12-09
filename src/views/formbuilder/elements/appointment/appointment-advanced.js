import React from "react";

import {
    Stack,
    Typography,
    MenuItem,
    Select,
    Input
} from "@mui/material"

const AppointmentAdvanced = () => {

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
                <Typography sx={{textAlign: 'left'}}>
                    Font Weight
                </Typography >
                <Select fullWidth variant="standard" label="Font Weight">
                    <MenuItem> Normal </MenuItem>
                </Select>
            </Stack>

            <Stack direction="row" spacing={1}>
                <Typography sx={{textAlign: 'left'}}>
                    Text Align
                </Typography>
                <Select fullWidth variant="standard" label="Font Weight">
                    <MenuItem>Left</MenuItem>
                </Select>
            </Stack>

            <Stack direction="row">
                <Typography sx={{textAlign: 'left'}}>
                    Corners
                </Typography>
                <Input fullWidth size="small"/>
            </Stack>
        </Stack>
    )

}

export default AppointmentAdvanced