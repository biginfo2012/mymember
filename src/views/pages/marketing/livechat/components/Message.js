import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    message: {
        backgroundColor: (props) => props.send ? '#427fe1' : '#f2f3f4',
        borderRadius: '1.4em',
        padding: '10px 20px 12px',
        fontSize: '15px',
        overflowWrap: 'anywhere',
        textAlign: 'start',
        maxWidth: '300px',
        width: 'fit-content',
        color: (props) => props.send ? 'white' : 'black',
    },
    
    sendDateTime: {
        width:'100%',
        justifyContent:(props) => props.send ? 'flex-end' : 'flex-start',
        fontSize: '13px'
    },

    messageContainer: {
        width: '100%', 
        padding: '0.5rem', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems:(props) => props.send ? 'flex-end' : 'flex-start',
    }
})


const Message = (props) => {

    const classes = useStyle(props);
    return ( 
    <div className={classes.messageContainer}>
        <div className={classes.message}>{props.content}</div>
        <div style={{width:'fit-content', marginLeft:'15px', marginRight: '15px'}}>{props.sendTime}</div>
    </div>
    );
}

export default Message;