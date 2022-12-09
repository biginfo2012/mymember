import React from "react"
import {
    Stack,
    Button,
    TextField,
    Box,
    Typography
} from "@mui/material"

const SingleChoiceAdvanced = () => {

    //const [options, setOptions] = []

    return(
        <Stack>
            <Box>
                <Button variant="contained">New Option</Button>
            </Box>

            <Box>
                <Typography>First Option Label</Typography>
                <TextField fullWidth label="Placeholder" variant="standard" placeholder="Placeholder"/>
            </Box>

            <Box>
                <Typography>Second Option Label</Typography>
                <TextField fullWidth label="Placeholder" variant="standard" placeholder="Placeholder"/>
            </Box>
        </Stack>
    )
}

export default SingleChoiceAdvanced