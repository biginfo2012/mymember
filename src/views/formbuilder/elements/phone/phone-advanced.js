import React, {useState} from "react"

import {
    Stack,
    Typography,
    Input
 } 
 from "@mui/material";

const PhoneAdvanced = ({editor}) => {

    const [phonePlaceholder, setPhonePlaceholder] = useState("000-000-0000")
	const onPhonePlaceholderChanged = (e) => {
		setPhonePlaceholder(e.target.value)
		editor.getSelected().getChildAt(1).addProperties({'placeholder': e.target.value});
	}

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    Placeholder
                </Typography>
                <Input fullWidth value={phonePlaceholder} onChange={onPhonePlaceholderChanged} size="small"/>
            </Stack>
        </Stack>
    )
}

export default PhoneAdvanced