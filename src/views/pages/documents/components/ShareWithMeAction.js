import React from 'react'
import { Message } from '@mui/icons-material'
import Search from '@material-ui/icons/Search';
import { QuestionMark } from '@mui/icons-material';

function ShareWithMeAction() {
    return (
        <>
            <div className='d-flex justify-content-between wrapper'>
                <div>
                    <Message style={{ color: "#00a6e1", fontSize: "30px", marginTop: "5px" }} />
                </div>
                <div className="searchContainer">
                    <Search className="searchIcon" style={{color: "#00a6e1"}} />
                    <input className="searchBox" type="search" name="search" placeholder="Search..." />
                </div>
                <div >
                    <button className='createBtn'>Create</button>
                </div>
                <div style={{ background: "rgb(169 222 240)", padding: "5px", borderRadius: "25px", height: "30px", marginTop: "5px" }}>
                    <QuestionMark style={{ color: "rgb(15 137 179)" }} />
                </div>
            </div>
        </>
    )
}

export default ShareWithMeAction