import React, {useState} from "react"
import {
    Stack,
    Box,
    Typography,
    TextField
} from "@mui/material";

const LongTextAdvanced = ({editor}) => {

    const [longTextPlaceholder, setLongTextPlaceholder] = useState("")
    const onChangeLongTextPlaceholder = (e) => {
        setLongTextPlaceholder(e.target.value);
		editor.getSelected().getChildAt(1).addProperties({'placeholder': e.target.value});
    }   

    return(
        <Stack spacing={2}>
            <Box>
                <Typography sx={{textAlign: 'left'}}>
                    Placeholder
                </Typography>
                <TextField fullWidth 
                    value={longTextPlaceholder} 
                    variant="standard" 
                    onChange={(e)=>onChangeLongTextPlaceholder(e)}
                />
            </Box>
        </Stack>
    )
}

export default LongTextAdvanced