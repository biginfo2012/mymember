import React, {useState} from 'react';

import {
    TextField,
    Stack,
    Typography,
    Switch
} 
from "@mui/material";

const FullNameSettings = ({editor}) => {

    const [nameLabel, setNameLabel] = useState("Name")
    const [firstNameSubLabel, setFirstNameSubLabel] = useState("first name")
    const [lastNameSubLabel, setLastNameSubLabel] = useState("last name")
	const [firstNameRequired, setFirstNameRequired] = useState(false)
	const [lastNameRequired, setLastNameRequired] = useState(false)
    
    
    const onNameLabelChanged = (e) => {
	setNameLabel(e.target.value)
	editor.getSelected().getChildAt(0).components(e.target.value)
    }

    const onFirstNameSubLabelChanged = (e) => {
	setFirstNameSubLabel(e.target.value)
	editor.getSelected().getChildAt(2).getChildAt(0).components(e.target.value)
    }

    const onLastNameSubLabelChanged = (e) => {
	setLastNameSubLabel(e.target.value)
        editor.getSelected().getChildAt(2).getChildAt(1).components(e.target.value)
    }

    const onFirstNameRequired = (e) => {
		if(e.target.checked){
		   setFirstNameRequired(true);
		   editor.getSelected().getChildAt(1).getChildAt(0).addAttributes({'required': true})
	   }else{
		   setFirstNameRequired(false);
		   editor.getSelected().getChildAt(1).getChildAt(0).addAttributes({'required': false})
	   }
    }

    const onLastNameRequired = (e) => {
		if(e.target.checked){
		   setLastNameRequired(true);
		   editor.getSelected().getChildAt(1).getChildAt(0).addAttributes({'required': true})
	    }else{
		   setLastNameRequired(false);
		   editor.getSelected().getChildAt(1).getChildAt(0).addAttributes({'required': false})
	    }
    }

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    Name Label
                </Typography>
                <TextField fullWidth variant="standard" onChange={(e)=>onNameLabelChanged(e)} value={nameLabel}/>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    First name sublabel
                </Typography>
                <TextField fullWidth variant="standard" onChanged={(e)=>onFirstNameSubLabelChanged(e)} value={firstNameSubLabel} />
            </Stack>

            <Stack direction="row" spacing={2}>
                <Typography sx={{textAlign: 'left'}}>
                    Last name sublabel
                </Typography>
                <TextField fullWidth variant="standard" onChanged={(e)=>onLastNameSubLabelChanged(e)} value={lastNameSubLabel}/>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Typography>
                    First Name Required
                </Typography>
                <Switch value={firstNameRequired} onChange={onFirstNameRequired}/>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Typography>
                    Last Name Required
                </Typography>
                <Switch value={lastNameRequired} onChange={onLastNameRequired}/>
            </Stack>

        </Stack>
    );
}

export default FullNameSettings;