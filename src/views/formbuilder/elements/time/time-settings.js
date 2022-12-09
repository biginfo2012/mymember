import React, {useState} from "react";

import {
   TextField,
   Stack,
   Typography,
   Switch
} 
from "@mui/material";

const TimeSettings = ({editor}) => {
	
   const [timeLabel, setTimeLabel] = useState("Time")
   const [timeSubLabel, setTimeSubLabel] = useState("Hour Minutes")
   const [timeRequired, setTimeRequired] = useState(false)
   
   const onTimeLabelChanged = (e) => {
	   setTimeLabel(e.target.value)
	   editor.getSelected().getChildAt(0).components(e.target.value)
   }
   
   const onTimeSubLabelChanged = (e) => {
	   setTimeSubLabel(e.target.value)
	   editor.getSelected().getChildAt(2).components(e.target.value)
   }
   
   const handleTimeRequired = (e) => {
	    if(e.target.checked){
		   setTimeRequired(true)
		   editor.getSelected().getChildAt(1).addProperties({'required': true});
	    }else{
		   setTimeRequired(false)
		   editor.getSelected().getChildAt(1).addProperties({'required': true});
	    }
   }
   return(
        <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                   Label Text
               </Typography>
               <TextField fullWidth value={timeLabel} onChange={onTimeLabelChanged} variant="standard" />
           </Stack>

           <Stack direction="row" spacing={2}>
               <Typography sx={{textAlign: 'left'}}>
                   SubLabel Text
               </Typography>
               <TextField fullWidth value={timeSubLabel} onChange={onTimeSubLabelChanged} variant="standard" />
           </Stack>

           <Stack direction="row" spacing={2}>
               <Typography>
                   Required
               </Typography>
               <Switch checked={timeRequired} onChange={handleTimeRequired}/>
           </Stack>  
        </Stack>
   )
}

export default TimeSettings