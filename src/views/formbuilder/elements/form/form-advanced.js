import React, {useState} from "react";
import {
    Box,
    FilledInput,
    InputAdornment,
    Typography,
    Button,
    Stack
} from "@mui/material";

import {SketchPicker} from 'react-color';

const FormAdvanced = ({editor}) => {

    
    const [showPageColorPicker, setShowPageColorPicker] = useState(false)
	const [showFormColorPicker, setShowFormColorPicker] = useState(false)
	const [showFontColorPicker, setShowFontColorPicker] = useState(false)
	const [showInputBackgroundColorPicker, setShowInputBackgroundColorPicker] = useState(false)
	
    const closePageColorPicker = () => setShowPageColorPicker(false)
    const openPageColorPicker = () => setShowPageColorPicker(true)
	const closeFormColorPicker = () => setShowFormColorPicker(false)
    const openFormColorPicker = () => setShowFormColorPicker(true)
	const closeFontColorPicker = () => setShowFontColorPicker(false)
    const openFontColorPicker = () => setShowFontColorPicker(true)
	const closeInputBackgroundColorPicker = () => setShowFontColorPicker(false)
    const openInputBackgroundColorPicker = () => setShowFontColorPicker(true)
	

	const [pageColor, setPageColor] = useState("#fff")
	const [formColor, setFormColor] = useState("#fff")
	const [fontColor, setFontColor] = useState("#000")
	const [inputBackgroundColor, setInputBackgroundColor] = useState("#fff")
	const [formAction, setFormAction] = useState("/new-student")
	
	const handleFormAction = (e) => {
		setFormAction(e.target.value)
	}
	
	const pickPageColor = (e) => {
        setPageColor(e.hex)
		editor.DomComponents.getWrapper().setStyle({'background-color': e.hex})
    }
	
	const handlePageColor = (e) => {
		setPageColor(e.hex)
		editor.DomComponents.getWrapper().setStyle({'background-color': e.hex})
	}
	
	const handleFormColor = (e) => {
		setFormColor(e.hex)
		editor.DomComponents.getWrapper().setStyle({'background-color': e.hex})
	}
	
	const handleFontColor = (e) => {
		setFontColor(e.hex)
		editor.DomComponents.getWrapper().setStyle({'color': e.hex})
	}
	
	const handleInputBackground = (e) => {
		setInputBackgroundColor(e.hex)
		editor.DomComponents.getWrapper().find('').setStyle({'background-color': e.hex})
	}

    return(
        <Stack spacing={2}>
		
			<>
                <Typography sx={{textAlign: 'left'}}>Form Action</Typography>
                <FilledInput 
                    id="form-width"
                    value={formAction}
					onChange={handleFormAction}
                />
            </>
		
            <>
                <Typography sx={{textAlign: 'left'}}>Form Color</Typography>
                <FilledInput 
                    id="page-color"
                    sx={{height: '40px'}}
                    value={formColor}
					onChange={handleFormColor}
                    endAdornment={
                        <InputAdornment position="end">
                            <>
                                <Button 
                                    sx={{backgroundColor: pageColor, height: "40px"}}
                                    style={{width: "10px"}} 
                                    onClick={()=>openFormColorPicker()}
                                    >
                                </Button>
                                {showFormColorPicker === true?
                                    <div onClick={()=>closeFormColorPicker()}>
                                        <SketchPicker 
                                           color={formColor} 
                                           onChange={(e)=>handleFormColor(e)}/>
                                    </div>
                                    : 
                                    null
                                }
                            </>
                        </InputAdornment>
                    }
                />
            </>

            <>
                <Typography sx={{textAlign: 'left'}}>Font Color</Typography>
                <FilledInput 
                    id="page-color"
                    sx={{height: '40px'}}
                    value={fontColor}
					onChange={handleFontColor}
                    endAdornment={
                        <InputAdornment position="end">
                            <>
                                <Button 
                                    sx={{backgroundColor: fontColor, height: "40px"}}
                                    style={{width: "10px"}} 
                                    onClick={()=>openFontColorPicker()}
                                    >
                                </Button>
                                {showFontColorPicker === true?
                                    <div onClick={()=>closeFontColorPicker()}>
                                        <SketchPicker 
                                           color={fontColor} 
                                           onChange={(e)=>handleFontColor(e)}/>
                                    </div>
                                    : 
                                    null
                                }
                            </>
                        </InputAdornment>
                    }
                />
            </>

            <>
                <Typography sx={{textAlign: 'left'}}>Input Background</Typography>
                <FilledInput 
                    id="page-color"
                    sx={{height: '40px'}}
                    value={inputBackgroundColor}
					onChange={handleInputBackground}
                    endAdornment={
                        <InputAdornment position="end">
                            <>
                                <Button 
                                    sx={{backgroundColor: inputBackgroundColor, height: "40px"}}
                                    style={{width: "10px"}} 
                                    onClick={()=>openInputBackgroundColorPicker()}
                                    >
                                </Button>
                                {showInputBackgroundColorPicker === true?
                                    <div onClick={()=>closeInputBackgroundColorPicker()}>
                                        <SketchPicker 
                                           color={inputBackgroundColor} 
                                           onChange={(e)=>handleInputBackground(e)}/>
                                    </div>
                                    : 
                                    null
                                }
                            </>
                        </InputAdornment>
                    }
                />
            </>
        </Stack>
    )

}

export default FormAdvanced 