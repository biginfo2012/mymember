import React, {useState} from "react";
import {
    TextField,
    Box,
    Stack,
    Typography,
    Switch,
    Select,
    MenuItem,
    Slider,
    Input
} 
from "@mui/material";

const FullNameAdvanced = ({editor}) => {

     const [firstNamePlaceholder, setFirstNamePlaceholder] = useState("")
     const [lastNamePlaceholder, setLastNamePlaceholder] = useState("")

     const handleFirstNamePlaceholder = (e) => {
        setFirstNamePlaceholder(e.target.value)
	    editor.getSelected().getChildAt(1).getChildAt(0).addAttributes({'placeholder': e.target.value})
    }

    const handleLastNamePlaceholder = (e) => {
	   setLastNamePlaceholder(e.target.value)
	   editor.getSelected().getChildAt(1).getChildAt(1).addAttributes({'placeholder': e.target.value})
    }

    return (
        <Stack spacing={2}>
            <Stack direction="row">
                <Typography sx={{textAlign: 'left'}}>
                    First Name Placeholder
                </Typography>
                <Input fullWidth size="small" value={firstNamePlaceholder} onChange={(e)=>handleFirstNamePlaceholder(e)}/>
            </Stack>

            <Stack direction="row">
                <Typography sx={{textAlign: 'left'}}>
                    Last Name Placeholder
                </Typography>
                <Input fullWidth size="small" value={lastNamePlaceholder} onChange={(e)=>handleLastNamePlaceholder(e)}/>
            </Stack>

        </Stack>
    )

}

export default FullNameAdvanced