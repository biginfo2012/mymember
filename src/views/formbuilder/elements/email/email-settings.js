import React, {useState, useEffect} from "react"

import {
   TextField,
   Stack,
   Typography,
   Switch,
   ButtonGroup,
   Button
} 
from "@mui/material";

const EmailSettings = ({editor}) => {
    
   /*useEffect(()=> {
      //const component = editor.getSelected();
      //const traits = component.get('traits');
      //traits.forEach(trait=> console.log("TRAITS::", trait.props()) )
   })*/

   const setTextAlignment = (pos) => {

   }

   const [emailVal, setEmailVal] = useState("Email")
   const [emailSubLabel, setEmailSubLabel] = useState("example@example.com")
   const [emailRequired, setEmailRequired] = useState(false);

   const emailChanged = (e) => {
      let email = e.target.value;
      setEmailVal(email);
      editor.getSelected().getChildAt(0).components(email);
   }

   const subLabelChanged = (e) => {
       let subLabel = e.target.value;
	   setEmailSubLabel(subLabel);
       editor.getSelected().getChildAt(2).components(subLabel);
   }
   
   const handleEmailRequired = (e) => {
	   if(e.target.checked){
		   setEmailRequired(true);
		   editor.getSelected().getChildAt(1).getChildAt(0).addAttributes({'required': true})
	   }else{
		   setEmailRequired(false);
		   editor.getSelected().getChildAt(1).getChildAt(0).addAttributes({'required': true})
	   }
   }

   return (
       <Stack spacing={3}>
           <Stack direction="row" spacing={2}>
               <Typography sx={{textAlign: 'left'}}>
                   Question Text
               </Typography>
               <TextField fullWidth onChange={(e)=>emailChanged(e)} variant="standard" value={emailVal}/>
           </Stack>

           <Stack direction="row" spacing={2}>
               <Typography>
                   Required
               </Typography>
               <Switch 
					checked={emailRequired}
					onChange={handleEmailRequired}
			   />
           </Stack>

           <div style={{float: 'left', align: 'left'}}>
                <Typography sx={{textAlign: 'left'}} variant="body2">
                    Label Alignment
                </Typography> 
                <ButtonGroup fullWidth>
                    <Button onClick={()=>setTextAlignment('left')}>LEFT</Button>
                    <Button onClick={()=>setTextAlignment('center')}>CENTER</Button>
                    <Button onClick={()=>setTextAlignment('top')}>TOP</Button>
                </ButtonGroup>
            </div>

           <Stack direction="row" spacing={2}>
               <Typography sx={{textAlign: 'left'}}>
                   Sub Label
               </Typography>
               <TextField fullWidth value={emailSubLabel} onChange={(e)=>subLabelChanged(e)} variant="standard"/>
           </Stack>

           
       </Stack>
   )
}

export default EmailSettings