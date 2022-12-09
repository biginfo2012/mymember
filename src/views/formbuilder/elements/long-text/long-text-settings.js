import React, {useState} from "react"

import {
   Stack,
   Typography,
   TextField,
   Switch
} from "@mui/material"

const LongTextSettings = ({editor}) => {

   const [questionLabel, setQuestionLabel] = useState("Type a question")
   const [questionSubLabel, setQuestionSubLabel] = useState("Type a sublabel")
   const [questionRequired, setQuestionRequired] = useState(false);
	
    const onQuestionLabelChanged = (e) => {
		setQuestionLabel(e.target.value)
		editor.getSelected().getChildAt(0).components(e.target.value)
	}	
	
	const onQuestionSubLabelChanged = (e) => {
		setQuestionSubLabel(e.target.value)
		editor.getSelected().getChildAt(2).components(e.target.value)
	}
	
	const handleQuestionRequired = (e) => {
		if(e.target.checked){
		   editor.getSelected().getChildAt(1).addProperties({'required': true});
	    }else{
		   editor.getSelected().getChildAt(1).addProperties({'required': false});
	    }
	}

   return(
	   <Stack>
         <Stack direction="row" spacing={2}>
            <Typography sx={{textAlign: 'left'}}>
                  Question Label
            </Typography>
            <TextField fullWidth variant="standard" value={questionLabel} onChange={onQuestionLabelChanged}/>
         </Stack>

         <Stack direction="row" spacing={2}>
            <Typography sx={{textAlign: 'left'}}>
                  Question SubLabel
            </Typography>
            <TextField fullWidth variant="standard" value={questionSubLabel} onChange={onQuestionSubLabelChanged}/>
         </Stack>

         <Stack direction="row" spacing={2}>
            <Typography>
                  Required
            </Typography>
            <Switch checked={questionRequired} onChange={handleQuestionRequired}/>
         </Stack>
	   </Stack>
   )
}

export default LongTextSettings