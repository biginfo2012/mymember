import React, {useState} from "react";

import {
    TextField,
    Box,
    Stack,
    Typography,
    Switch
 } 
 from "@mui/material";

const DatePickerSettings = ({editor}) => {


    const [dateLabel, setDateLabel] = useState("Date")
    const [dateSubLabel, setDateSubLabel] = useState("date")
	const [dateRequired, setDateRequired] = useState(false)
    const onDateLabelChanged = (e) => {
        setDateLabel(e.target.value)
		editor.getSelected().getChildAt(0).components(e.target.value)
    }

    const onDateSubLabelChanged = (e) => {
        setDateSubLabel(e.target.value)
		editor.getSelected().getChildAt(2).components(e.target.value)
    }
	
	const handleDateRequired = (e) => {
		if(e.target.checked){
		   editor.getSelected().getChildAt(1).addProperties({'required': true});
	    }else{
		   editor.getSelected().getChildAt(1).addProperties({'required': false});
	    }
	}
 
    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    Label Text
                </Typography>
                <TextField fullWidth 
                           value={dateLabel} 
                           variant="standard"
                           onChange={(e)=>onDateLabelChanged(e)}
                           />
            </Stack>

            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    Sublabel Text
                </Typography>
                <TextField fullWidth 
                           value={dateSubLabel} 
                           variant="standard"
                           onChange={(e)=>onDateSubLabelChanged(e)}
                           />
            </Stack>
 
            <Stack direction="row" spacing={2}>
                <Typography>
                    Required
                </Typography>
                <Switch checked={dateRequired} onChange={handleDateRequired}/>
            </Stack>

        </Stack>
    )

}

export default DatePickerSettings