import {useState, useEffect} from 'react';
import { 
    Box,
    Container,
    Grid,
    Stack,
    Button,
    Typography
} from '@mui/material';
import Formcard from './components/Formcard';
import { Link } from "react-router-dom";
import { Add } from '@mui/icons-material';

const Body = () => {
    const [forms,setForms]=useState([
        {title: "Form Title",
          number: "12",
          create: "12th March,2022",
          created: "Gao",
          id: "1"
        },
        {title: "Form Title 2",
          number: "12",
          create: "12th March,2022",
          created: "Gao",
          id: "2"
        }
        
    ]);
    const [err,setErr]=useState(null);
    const [isLoading, setIsLoading]=useState(true)

    useEffect(()=>{

        /*fetch('')
         .then(res=>{
            if(res.ok!==true){
                throw Error ('Error fetching forms')
            }
            return res.json();
         })
         .then(forms=>{
            setForms(forms);
            setErr(null);
            setIsLoading(false);
            console.log(forms);
         })
         .catch(err=>{
            setErr(err.message);
            setIsLoading(false);
        })*/
        
    },[]);

    return (
        <div className="bodycomp">
            
           
        </div>
    );
}
 
export default Body;