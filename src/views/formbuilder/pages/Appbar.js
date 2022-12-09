import {
    AppBar, 
    Toolbar,
    Stack,
    Button,
    Typography
} from '@mui/material';



const Appbar = () => {

    return ( 
        <div className="app">
            <AppBar position="Fixed" sx={{margin: 0, background: "#fff", color: "#000"}}>
                        <Toolbar sx={{justifyContent:'space-between'}}>
                            <Typography variant='h4' component='div' sx={{fontFamily:'sans-serif', fontWeight:'bold',color:''}}>Form Builder</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button variant='text' href='/' color='primary'>My Form</Button>
                                <Button variant='text' href='/templates' color='inherit'>Template</Button>
                                <Button variant='text' href='/Create' color='inherit'>New Form</Button>
                            </Stack>
                        </Toolbar>
            </AppBar>
        </div>
     );
}
 
export default Appbar;