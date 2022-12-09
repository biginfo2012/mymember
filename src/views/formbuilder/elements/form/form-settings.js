import React, {useState} from "react"
import {
    Box,
    FilledInput,
    InputAdornment,
    Stack,
    Select,
    MenuItem,
    Typography
} from "@mui/material";

const FormSettings = ({editor}) => {

    const [formWidth, setFormWidth] = useState("900")
	const [formSize, setFormSize] = useState("")
	const [labelAlignment, setLabelAlignment] = useState("")
	const [spacing, setSpacing] = useState("")
	const [labelWidth, setLabelWidth] = useState("")
	const [font, setFont] = useState("Arial")
	const [fontSize, setFontSize] = useState("20")
	
	const fontList = ["Inter", "Roboto", "Aclonica", "Allan", "Annie Use Your Telescope", "Anonymous Pro",
				  "Allerta Stencil", "Allerta", "Amaranth", "Anton", "Architects Daughter",
				  "Arimo", "Artifika", "Arvo", "Asset","Astloch", "Bangers", "Bentham", "Bevan",
				  "Bigshot One", "Bowlby One", "Bowlby One SC", "Brawler", "Buda", "Cabin",
				  "Calligraffitti", "Candal", "Cantarell", "Cardo", "Carter One", "Caudex",
				  "Cherry Cream Soda", "Chewy", "Coda", "Coming Soon", "Copse", "Corben",
				  "Cousine", "Covered By Your Grace", "Crafty Girls", "Crimson Text",
				  "Crushed", "Cuprum", "Damion", "Dancing Script", "Dawning of a New Day", 
				  "Didact Gothic", "Droid Sans", "Droid Sans Mono", "Droid Serif", "EB Garamond",
				  "Expletus Sans", "Fontdiner Swanky", "Forum", "Francois One", "Geo", "Give Your Glory",
				  "Goblin One", "Goudy Bookletter 1911", "Gravitas One", "Gruppa", "Hammersmith One",
				  "Holtwood One SC", "Homemade apple", "Inconsolata", "Indie Flower",
				  "Arial", "Arial Black", "Courier New", "Helvetica", "Lucida Grande", "Tahoma",
				  "Times New Roman", "Trebuchet MS", "Verdana", "Comic Sans MS"
		]
	
	const handleFormWidth = (e) => {
		setFormWidth(e.target.value)
		editor.DomComponents.getWrapper().setStyle({width: `${e.target.value}px`})
	}
	
	const handleLabelAlignment = (e) => {
		setLabelAlignment(e.target.value)
		editor.DomComponents.getWrapper().setStyle({'text-align': e.target.value})
	}
	
	const handleSpacing = (e) => {
		setSpacing(e.target.value)
		editor.DomComponents.getWrapper().setStyle({'margin-top': `${e.target.value}px`})
	}
	
	const handleLabelWidth = (e) => {
		setLabelWidth(e.target.value)
		editor.DomComponents.getWrapper().get.setStyle({width: `${e.target.value}px`})
	}
	
	const handleSelectFont = (e) => {
		setFont(e.target.value)
		editor.DomComponents.getWrapper().setStyle({'font-family': `${e.target.value}`})
	}
	
	const handleFontSize = (e) => {	
		setFontSize(e.target.value)
		editor.DomComponents.getWrapper().setStyle({'font-size': `${e.target.value}px`})
	}

    return(
        <Stack spacing={2}>
            <>
                <Typography sx={{textAlign: 'left'}}>Form Width</Typography>
                <FilledInput 
                    id="form-width"
                    value={formWidth}
					onChange={handleFormWidth}
                    endAdornment={<InputAdornment position="end">px</InputAdornment>}
                />
            </>

            <>
                <Typography sx={{textAlign: 'left'}}>Label Alignment</Typography>
                <Select label="Label Alignment" sx={{textAlign: 'left'}} value={labelAlignment} onChange={handleLabelAlignment}>
                    <MenuItem value="top">Top</MenuItem>
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                </Select>
            </>

            <>
                <Typography sx={{textAlign: 'left'}}>Spacing</Typography>
                <FilledInput 
                    id="form-width"
                    value={spacing}
					onChange={handleSpacing}
                    endAdornment={<InputAdornment position="end">px</InputAdornment>}
                />
            </>

            <>
                <Typography sx={{textAlign: 'left'}}>Label Width</Typography>
                <FilledInput 
                    id="form-width"
                    value={labelWidth}
					onChange={handleLabelWidth}
                    endAdornment={<InputAdornment position="end">px</InputAdornment>}
                />
            </>

            <>
                <Typography sx={{textAlign: 'left'}}>Font</Typography>
                <Select value={font} sx={{textAlign: 'left'}} onChange={handleSelectFont}>
					{fontList.map((f,index) => 
						<MenuItem key={index} value={f}>{f}</MenuItem>
					)}
                </Select>
            </>

             <>
                <Typography sx={{textAlign: 'left'}}>Font Size</Typography>
                <FilledInput 
                    id="form-width"
                    value={fontSize}
					onChange={handleFontSize}
                    endAdornment={<InputAdornment position="end">px</InputAdornment>}
                />
            </>

        </Stack>
    )

}

export default FormSettings