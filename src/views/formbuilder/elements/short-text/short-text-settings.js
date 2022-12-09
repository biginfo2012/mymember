import React,{useState} from "react";

import {
   TextField,
   Stack,
   Typography,
   Switch,
} 
from "@mui/material";

const ShortTextSettings = ({editor}) => {
	
	const [shortTextLabel, setShortTextLabel] = useState("Type a question");
	const [shortTextSubLabel, setShortTextSubLabel] = useState("Type a sublabel");
	const [shortTextRequired, setShortTextRequired] = useState(false);
	
    const onShortTextLabelChanged = (e) => {
		setShortTextLabel(e.target.value)
		editor.getSelected().getChildAt(0).components(e.target.value)
                
                let nameVal = e.target.value
                editor.getSelected().getChildAt(1).setAttributes({"name": nameVal})
                //editor.getSelected().getChildAt(1).setAttributes("name", nameVal)
                //editor.getSelected().getChildAt(1).addAttributes({name: nameVal})
	}	
	
	const onShortTextSubLabelChanged = (e) => {
		setShortTextSubLabel(e.target.value)
		editor.getSelected().getChildAt(2).components(e.target.value)
	}
	
	const handleShortTextRequired = (e) => {
		if(e.target.checked){
		   editor.getSelected().getChildAt(1).addProperties({'required': true});
	    }else{
		   editor.getSelected().getChildAt(1).addProperties({'required': false});
	    }
	}
	

   return (
       <Stack spacing={3}>
           <Stack direction="row" spacing={2}>
               <Typography sx={{textAlign: 'left'}}>
                   Question Label
               </Typography>
               <TextField fullWidth variant="standard" value={shortTextLabel} onChange={onShortTextLabelChanged}/>
           </Stack>

           <Stack direction="row" spacing={2}>
               <Typography sx={{textAlign: 'left'}}>
                   Question SubLabel
               </Typography>
               <TextField fullWidth variant="standard" value={shortTextSubLabel} onChange={onShortTextSubLabelChanged} />
           </Stack>

           <Stack direction="row" spacing={2}>
               <Typography>
                   Required
               </Typography>
               <Switch checked={shortTextRequired} onChange={handleShortTextRequired}/>
           </Stack>
       </Stack>
   )
}

export default ShortTextSettings
