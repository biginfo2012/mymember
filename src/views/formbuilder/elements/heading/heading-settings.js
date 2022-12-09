import React,{useState} from "react"

import {
    TextField,
    Box,
    Stack,
    ButtonGroup,
    Button,
    Typography,
    Switch
} from '@mui/material';

const HeadingSettings = ({editor}) => {

    const [headingText, setHeadingText] = useState("Heading")
    const [subHeadingText, setSubHeadingText] = useState("Type a subheader")

    const headingTextChanged = (e) => {
       setHeadingText(e.target.value)       
       editor.getSelected().getChildAt(0).components(e.target.value)
    }

    const subHeadingTextChanged = (e) => {
	setSubHeadingText(e.target.value)
	editor.getSelected().getChildAt(1).components(e.target.value)
    }
    
    const setHeadingSize = (e, pos) => {

    }

    const setTextAlignment = (e,pos) => {

    }

    return(
        <Stack spacing={1} justifyContent="start">
            <div style={{textAlign: 'left'}}>
                <div>Heading Text</div>
                <TextField id="heading-standard-basic" fullWidth value={headingText} onChanged={(e)=>headingTextChanged(e)} variant="standard"/>
            </div>

            <div style={{textAlign: 'left'}}>
                <div>Sub-Heading Text</div>
                <TextField id="subheader-standard-basic" fullWidth value={subHeadingText} onChange={(e)=>subHeadingTextChanged(e)} helperText="Small text below the heading" variant="standard"/>
            </div>

            <div>
                <div style={{textAlign: 'left'}}>
                    Heading Size
                </div> 
                <ButtonGroup fullWidth>
                    <Button onClick={()=>setHeadingSize('default')}>DEFAULT</Button>
                    <Button onClick={()=>setHeadingSize('large')}>LARGE</Button>
                    <Button onClick={()=>setHeadingSize('small')}>SMALL</Button>
                </ButtonGroup>
            </div>

            <div style={{float: 'left', align: 'left'}}>
                <Typography sx={{textAlign: 'left'}} variant="body2">
                    Text Alignment
                </Typography> 
                <ButtonGroup fullWidth>
                    <Button onClick={()=>setTextAlignment('left')}>LEFT</Button>
                    <Button onClick={()=>setTextAlignment('center')}>CENTER</Button>
                    <Button onClick={()=>setTextAlignment('right')}>RIGHT</Button>
                </ButtonGroup>
            </div>

            <div>
                <Stack direction="row">
                    
                    Hide Fields
                    
                    <Switch />
                </Stack>
            </div>

        </Stack>
    );
}

export default HeadingSettings;