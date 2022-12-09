import React, {useState} from "react"

import {
    Stack,
    Typography,
    Input
 } 
 from "@mui/material";

const NumberAdvanced = ({editor}) => {
    const [numberPlaceholder, setNumberPlaceholder] = useState("")

	const onNumberPlaceholderChanged = (e) => {
		setNumberPlaceholder(e.target.value)
		editor.getSelected().getChildAt(1).addAttributes({'placeholder': e.target.value})
	}

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    Placeholder
                </Typography>
                <Input fullWidth value={numberPlaceholder} onChange={onNumberPlaceholderChanged} size="small"/>
            </Stack>
        </Stack>
    )
}

export default NumberAdvanced