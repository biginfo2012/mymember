import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { Container, Button,AppBar,Toolbar,Typography, Card, CardMedia, CardContent, CardActionArea, useMediaQuery } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import Temp from './svg/usetemplates.svg';
import Bring from './svg/import.svg';
import { useDispatch, useSelector } from "react-redux";
import {CREATE_FORM} from "../../../redux/actions/form-builder/index";
import Classicform from './svg/classicform.svg';
import Cardform from './svg/cardform.svg';

const Chooselayout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tablet= useMediaQuery('(max-Width:600px)');
    const desktop=useMediaQuery('(min-width:600px)');

    const newFormResponse= useSelector((state)=> {
		return state.FormBuilderReducer.createFormResponse
	})

    const createClassicForm = async() => {
        
        let response = await dispatch(CREATE_FORM())
        console.log("response::",response)
        
        let newFormId = response.data.formId
        console.log("newFormId::", newFormId)

        history.push(`/builder/home/${newFormId}`)
        
    }

    const createCardForm = () => {

    }

    return ( 
        <div className="dd">
       
            <Container component='div' sx={{width:'100vw', pt:'20px',pl:'20px',pb:'20px', justifyContent:'flex-start',margin:'0px'}}>
            <Link to='/builder/create' className="link">
                <Button variant='contained' startIcon={<ArrowBack/>} sx={{border:'1px solid transparent', borderRadius:'12px'}}>back</Button>
            </Link>
            </Container>
            <Container component='div' sx={{width:'100%',justifyContent:'flex-start',margin:'0px',padding:'0px', alignItems:'center',textAlign:'center'}}>
                <Typography variant="h5" component='div' sx={{color:'#000',fontFamily:'sans-serif', fontWeight:'700'}}>Select your form layout</Typography>
                <Typography variant="p" component='div' sx={{color:'rgba(0,0,0,0.5)',fontFamily:'sans-serif', fontWeight:'700', mt:'8px'}} >Choose a layout according to your needs</Typography>
            </Container>
            {desktop && 
                <Container component='div' sx={{width:'100%', marginTop:'20px', marginRight:'0px',marginLeft:'0px',py:'0px',display:'flex'}} className="anim">
                <Container component='div' sx={{width:'86.6vw',margin:'0px',padding:'0px',justifyContent:'center',display:'flex',flexDirection:'row'}}>
                    <Container component='div' sx={{width:'27.7vw',margin:'0px',padding:'0px'}}>
                        
                            <Card sx={{textAlign:'center', 
                                        maxHeight:'400px', 
                                        width:'100%',
                                        backgroundColor:'transparent', 
                                        boxShadow:'none',
                                        border:'none'
                                    }}
                                    onClick={createClassicForm}
                                    >
                                <CardActionArea>
                                    <CardMedia component='img' image={Classicform} alt='start from scratch' sx={{maxHeight:'280px'}}/>
                                    <CardContent sx={{textAlign:'center'}}>
                                        <Typography variant='h6' sx={{color:'#000',fontFamily:'sans-serif', fontWeight:'700'}}>Classic Form</Typography>
                                        <Typography variant='p' sx={{color:'rgba(0,0,0,0.5)',fontFamily:'sans-serif', fontWeight:'700'}}>Show all questions on one page</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </Container>
                    <Container component='div' sx={{width:'27.7vw',height:'400px',margin:'0px',padding:'0px'}}>
                            <Card onClick={createCardForm} sx={{textAlign:'center', maxHeight:'400px', width:'100%',backgroundColor:'transparent', boxShadow:'none',border:'none'}}>
                                <CardActionArea>
                                    <CardMedia component='img' image={Cardform} alt='start from scratch'sx={{maxHeight:'280px'}}/>
                                    <CardContent sx={{textAlign:'center'}}>
                                        <Typography variant='h6' sx={{color:'#000',fontFamily:'sans-serif', fontWeight:'700'}}>Card Form</Typography>
                                        <Typography variant='p' sx={{color:'rgba(0,0,0,0.5)',fontFamily:'sans-serif', fontWeight:'700'}}>Show single question per page</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </Container>
                </Container>
            </Container>
            }
            {tablet && 
                <Container component='div' sx={{width:'100%', marginTop:'20px', marginRight:'0px',marginLeft:'0px',py:'0px',display:'flex',justifyContent:'center',alignItems:'center'}} className="anim">
                <Container component='div' sx={{width:'86.6vw',margin:'0px',padding:'0px',justifyContent:'center',display:'flex', flexDirection:'column',alignItems:'center'}}>
                    <Container component='div' sx={{width:'80vw',margin:'0px',padding:'0px'}}>
                        
                            <Card onClick={createClassicForm} sx={{textAlign:'center', maxHeight:'400px', width:'100%',backgroundColor:'transparent', boxShadow:'none',border:'none'}}>
                                <CardActionArea>
                                    <CardMedia component='img' image={Classicform} alt='start from scratch' sx={{maxHeight:'280px'}}/>
                                    <CardContent sx={{textAlign:'center', maxHeight:'120px'}}>
                                        <Typography variant='h6' sx={{color:'#000',fontFamily:'sans-serif', fontWeight:'700',fontSize:'1.2rem'}}>Classic Form</Typography>
                                        <Typography variant='p' sx={{color:'rgba(0,0,0,0.5)',fontFamily:'sans-serif', fontWeight:'700',fontSize:'1rem'}}>Show all questions on one page</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </Container>
                    <Container component='div' sx={{width:'80vw',height:'400px',margin:'0px',padding:'0px'}}>
                            <Card onClick={createCardForm}  sx={{textAlign:'center', maxHeight:'400px', width:'100%',backgroundColor:'transparent', boxShadow:'none',border:'none'}}>
                                <CardActionArea>
                                    <CardMedia component='img' image={Cardform} alt='start from scratch'sx={{maxHeight:'280px'}}/>
                                    <CardContent sx={{textAlign:'center',maxHeight:'120px'}}>
                                        <Typography variant='h6' sx={{color:'#000',fontFamily:'sans-serif', fontWeight:'700',fontSize:'1.2rem'}}>Card Form</Typography>
                                        <Typography variant='p' sx={{color:'rgba(0,0,0,0.5)',fontFamily:'sans-serif', fontWeight:'700',fontSize:'1rem'}}>Show single question per page</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </Container>
                </Container>
            </Container>
            }
        </div>
     );
}
 
export default Chooselayout;

