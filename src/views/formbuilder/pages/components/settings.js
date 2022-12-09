import React, {useState, useEffect} from 'react';

import {
    TextField,
    Box,
    Stack,
    Button,
    Grid,
    Typography,
    Select,
    MenuItem
} from '@mui/material';

import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_FORM_SETTING, GET_FORM} from "../../../../redux/actions/form-builder/index"

const Settings = ({editor, setEditor}) => {

    const [form, setForm] = useState({})
    const [formTitle, setFormTitle] = useState("Fo")
    const [formStatus, setFormStatus] = useState("enabled")

	const dispatch = useDispatch()
	const getForm = useSelector((state)=> {
		return state.FormBuilderReducer?.uform
	})

    const handleFormTitle = (e) => {
        setFormTitle(e.target.value)
    }

    const handleFormStatus = (e) => {
		setFormStatus(e.target.value)
    }
	
	useEffect(() => {
        let pathlength = window.location.pathname.split('/').length
		let formId = window.location.pathname.split('/')[pathlength-1]
		
		dispatch(GET_FORM(formId))
		
		setForm(getForm)
		setFormTitle(getForm?.title)
		getForm?.enabled === true ? setFormStatus("enabled") : setFormStatus("disabled")
	},[])

    const updateFormSettings = () => {
        let pathlength = window.location.pathname.split('/').length 
        let formId = window.location.pathname.split('/')[pathlength-1]
        
	UPDATE_FORM_SETTING(formId, formTitle, formStatus)
    }
    return(
        <Grid container sx={{bgcolor: 'background.paper', height: '30em', padding: '50px'}}>
            <Grid item md={3}/>
            <Grid item md={6}>
                <Stack spacing={2} start>
                    <Box>
                        <Typography variant="h6" sx={{textAlign: "left"}}>
                            Form Title
                        </Typography>
                        <TextField id="form-title-basic"
                                    fullWidth
                                    value={formTitle}
                                    onChange={handleFormTitle} 
                                    variant="standard"/>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{textAlign: "left"}}>
                            Form Status
                        </Typography>

                        <Select label="Status" sx={{textAlign: "left"}} value={formStatus} onChange={handleFormStatus} fullWidth>
                            <MenuItem value="enabled">Enabled</MenuItem>
                            <MenuItem value="disabled">Disabled</MenuItem>
                        </Select>
                    </Box>

                    <Box>
                        <Button variant="outlined" fullWidth onClick={updateFormSettings}>Submit</Button>
                    </Box>
                </Stack>
            </Grid>
            <Grid item md={3}/>
        </Grid>
    )

}

export default Settings
