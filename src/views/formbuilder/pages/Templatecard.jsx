import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent, Checkbox, Stack, Typography } from "@mui/material";


const Templatescard = ({templates}) => {
    
    return (
        <div className="ss">
            {templates.map(form=>
            <div className="car" key={form.id}>
                <Card sx={{backgroundColor:'transnparent', boxShadow:"none",border:'none'}}>
                    <Stack direction='row'>
                    <CardActionArea>
                <CardContent>
                <Stack direction="column" spacing={2}>
               <Typography variant="h5">{form.title}</Typography>
               <Stack direction="row" spacing={3}>
                  <Typography variant="p"> <span className="spa">{form.number}</span> Submission</Typography>
                  <Typography variant="p">Created on <span className="spa">{form.create}</span></Typography>
               </Stack>         
               </Stack>
                </CardContent>
                </CardActionArea>
                    <CardActions>
                    <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{color:"red"}}/>}/>
                    </CardActions>
                    </Stack>
            </Card>
            </div>
            )}
        </div>
         
    );
}
 
export default Templatescard;