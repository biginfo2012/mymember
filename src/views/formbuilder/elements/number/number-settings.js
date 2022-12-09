import React, {useState} from "react";

import {
   TextField,
   Stack,
   Typography,
   Switch,
} 
from "@mui/material";

const NumberSettings = ({editor}) => {

   
   const [numberLabel, setNumberLabel] = useState("number number")
   const [numberSubLabel, setNumberSubLabel] = useState("Please enter a valid number number")
   const [numberRequired, setNumberRequired] = useState(false);
   
   const onNumberLabelChanged = (e) => {
	   setNumberLabel(e.target.value)
	   editor.getSelected().getChildAt(0).components(e.target.value)
   }
   
   const onNumberSubLabelChanged = (e) => {
	   setNumberLabel(e.target.value)
	   //editor.getSelected().getChildAt(0).components(e.target.value)
   }
   
   const onNumberRequired = (e) => {
	   if(e.target.checked){
		   setNumberRequired(true);
		   editor.getSelected().getChildAt(1).addAttributes({'required': true})
	   }else{
		   setNumberRequired(false);
		   editor.getSelected().getChildAt(1).addAttributes({'required': false})
	   }
   }

   return(
      <Stack spacing={3}>
         <Stack direction="row" spacing={2}>
            <Typography sx={{textAlign: 'left'}}>
               Label Text
            </Typography>
            <TextField fullWidth value={numberLabel} onChange={onNumberLabelChanged} variant="standard" />
         </Stack>

         <Stack direction="row" spacing={2}>
            <Typography sx={{textAlign: 'left'}}>
               SubLabel Text
            </Typography>
            <TextField fullWidth value={numberSubLabel} onChange={onNumberSubLabelChanged} variant="standard" />
         </Stack>

         <Stack direction="row" spacing={2}>
            <Typography>
               Required
            </Typography>
            <Switch value={numberRequired} onChange={onNumberRequired}/>
         </Stack>
   </Stack>
   )
}

export default NumberSettings