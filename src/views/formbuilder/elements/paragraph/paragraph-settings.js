import React, {useState} from "react";
import {
   Stack,
   Typography,
   TextField,
   Switch
} from "@mui/material"

const ParagraphSettings = () => {

   const [questionLabel, setQuestionLabel] = useState("Type a question")
   const [questionSubLabel, setQuestionSubLabel] = useState("")

   return(
      <Stack>
      <Stack direction="row" spacing={2}>
         <Typography sx={{textAlign: 'left'}}>
               Question Label
         </Typography>
         <TextField fullWidth variant="standard" value={questionLabel}/>
      </Stack>

      <Stack direction="row" spacing={2}>
         <Typography sx={{textAlign: 'left'}}>
               Question SubLabel
         </Typography>
         <TextField fullWidth variant="standard" value={questionSubLabel}/>
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

export default ParagraphSettings