import React, {useState} from "react"

import {
    TextField,
    Box,
    Stack,
    Typography
 } 
 from "@mui/material";

const EmailAdvanced = ({editor}) => {
	
	const [emailPlaceholder, setEmailPlaceholder] = useState("")
	
	const onEmailPlaceholderChanged = (e) => {
		setEmailPlaceholder(e.target.value)
		editor.getSelected().getChildAt(1).getChildAt(0).addAttributes({'placeholder': e.target.value})
	}
	

    return (
        <Stack spacing={2}>
            <Box>
               <Typography sx={{textAlign: 'left'}}>
                   Placeholder
               </Typography>
               <TextField fullWidth variant="standard" value={emailPlaceholder} onChange={onEmailPlaceholderChanged}/>
           </Box>
        </Stack>
    )
}

export default EmailAdvanced