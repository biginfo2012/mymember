import React, {useState} from "react";

import {
   TextField,
   Stack,
   Typography,
   Switch
} 
from "@mui/material";

const PhoneSettings = ({editor}) => {
   
   const [phoneLabel, setPhoneLabel] = useState("Phone number")
   const [phoneSubLabel, setPhoneSubLabel] = useState("Please enter a valid phone number")
   const [phoneRequired, setPhoneRequired] = useState(false);
   
   const onPhoneLabelChanged = (e) => {
		setPhoneLabel(e.target.value)
		editor.getSelected().getChildAt(0).components(e.target.value)
   }
   
   const onPhoneSubLabelChanged = (e) => {
	   setPhoneSubLabel(e.target.value)
	   editor.getSelected().getChildAt(2).components(e.target.value)
   }
   
   const handlePhoneRequired = (e) => {
	   if(e.target.checked){
                   setPhoneRequired(true)
		   editor.getSelected().getChildAt(1).addProperties({'required': true});
	   }else{
                   setPhoneRequired(false)
		   editor.getSelected().getChildAt(1).addProperties({'required': false});
	   }
   }

   return (
       <Stack spacing={3}>
           <Stack direction="row" spacing={2}>
               <Typography sx={{textAlign: 'left'}}>
                   Label Text
               </Typography>
               <TextField fullWidth value={phoneLabel} onChange={onPhoneLabelChanged} variant="standard" />
           </Stack>

           <Stack direction="row" spacing={2}>
               <Typography sx={{textAlign: 'left'}}>
                   SubLabel Text
               </Typography>
               <TextField fullWidth value={phoneSubLabel} onChange={onPhoneSubLabelChanged} variant="standard" />
           </Stack>

           <Stack direction="row" spacing={2}>
               <Typography>
                   Required
               </Typography>
               <Switch checked={phoneRequired} onChange={handlePhoneRequired}/>
           </Stack>

          
       </Stack>
   )
}

export default PhoneSettings