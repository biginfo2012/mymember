import { Container } from "@mui/material";
import Appbar from "./Appbar";
import Body from "./Body";


const Formview = () => {
    return ( 
        <div className="app">
            <Appbar/>
                <div className="check">
                    <Container sx={{maxWidth:"lg"}}>
                        <Body />
                    </Container>
                </div>
        </div>
     );
}
 
export default Formview;