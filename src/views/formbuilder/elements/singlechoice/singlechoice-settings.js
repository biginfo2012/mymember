import React from "react"

import {
   Stack,
   Typography,
   TextField,
   Switch
} from "@mui/material"

const SingleChoiceSettings = () => {
   return(
      <Stack spacing={2}>

         <Stack direction="row" spacing={2}>
            <Typography sx={{textAlign: 'left'}}>
               Question Label
            </Typography>
            <TextField fullWidth label="Placeholder" variant="standard" placeholder="Placeholder"/>
         </Stack>

         <Stack direction="row" spacing={2}>
            <Typography>
                  Required
            </Typography>
            <Switch />
         </Stack>

      </Stack>
      
   )
}

export default SingleChoiceSettings