import React, {useState} from "react";

import {
    TextField,
    Box,
    Stack,
    Typography
 } 
 from "@mui/material";

const ShortTextAdvanced = ({editor}) => {

    const [shortTextPlacholder, setShortTextPlaceholder] = useState("")
    const onChangeShortTextPlaceholder = (e) => {
        setShortTextPlaceholder(e.target.value)
		editor.getSelected().getChildAt(1).addProperties({'placeholder': e.target.value});
    }

    return (
        <Stack spacing={2}>
            <Box>
               <Typography sx={{textAlign: 'left'}}>
                   Placeholder
               </Typography>
               <TextField fullWidth 
                          value={shortTextPlacholder} 
                          variant="standard" 
                          onChange={(e)=>onChangeShortTextPlaceholder(e)}
                    />
           </Box>
        </Stack>
    )
}

export default ShortTextAdvanced