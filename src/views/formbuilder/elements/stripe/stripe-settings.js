import React,{useState} from "react"
import {
   TextField,
   Stack,
   Typography,
   Button,
   Select,
   MenuItem
} 
from "@mui/material";

const StripeSettings = ({editor}) => {

   const [amount,setAmount] = useState("5")
   const onAmountChanged = () => {

   }

   const getServerSideProps = async() => {
      await fetch(
         process.env.PUBLIC_BASE_URL + '/api/verifyStripe',
         {
            method: 'POST',
            body: JSON.stringify({

            }),
            headers: {
               'Content-Type': 'application/json'
            }
         }
      )
   }

   const openWindow = () => {
      const url = `https://dashboard.stripe.com/oauth/authorize?
                   response_type=code&client_id=${process.env.OAUTH_CLIENT_ID}&
                  scope=read_write&redirect_uri=http://localhost:3001`

      window.open(url, "_blank", "height=500,width=500")
   }

   return(
	   <Stack spacing={3}>
         <Stack direction="row">
            <Button fullWidth variant="contained" onClick={openWindow} color="primary">Connect</Button>
         </Stack>

         <Stack>
            <Typography sx={{textAlign: 'left'}}>Mode</Typography>
            <Select>
               <MenuItem value="test">Test mode</MenuItem>
               <MenuItem value="live">Live mode</MenuItem>
            </Select>
         </Stack>

         <Stack>
            <Typography sx={{textAlign: 'left'}}>Currency</Typography>
            <Select>
               <MenuItem value="test">USD United States Dollars</MenuItem>
               <MenuItem value="live">EUR European Union Currency</MenuItem>
            </Select>
         </Stack>

         <Stack>
            <Typography sx={{textAlign: 'left'}}>Type</Typography>
            <Select>
               <MenuItem value="test">Fixed</MenuItem>
               <MenuItem value="live">Variable</MenuItem>
            </Select>
         </Stack>

         <Stack direction="row" spacing={1}>
            <Typography sx={{textAlign: 'left'}}>
                  Amount
            </Typography>
            <TextField fullWidth value={amount} onChange={onAmountChanged} variant="standard" />
         </Stack>

	   </Stack>
   )
}

export default StripeSettings