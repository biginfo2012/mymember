import React from 'react';
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
    container: {
        border: '1px solid rgb(221, 226, 230)',
        margin: '0px 10px',
        borderRadius: '18px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '15px',
        lineHeight: '1.5em',
        overflowWrap: 'breakWord',
        overflow: 'hidden',
        minWidth: '190px',
        maxWidth: '420px',
    },
    header: {
        color: 'rgb(66, 77, 87)',
        backgroundColor: 'rgb(243, 247, 249)',
        padding: '12px 22px',
        borderRadius: '18px 18px 0px 0px',
        textAlign: 'center',
    },
    body: {
        padding: '12px 0px',
        borderRadius: '0px 0px 18px 18px',
    },
    item: {
        display: 'flex',
    flexDirection: 'column',
    margin: '10px 22px',
    },
    answer: {
        color: 'rgb(66, 77, 87)',
    }
})

export const PreChatMessage = ({username, email, key}) => {
    const classes = useStyle();
    return (
        <div key={key} className={classes.container}>
            <div className={classes.header}>Pre-chat form</div>
            <div className={classes.body}>
                <div className={classes.item}>
                    <div className={classes.question}>Name:</div>
                    <div className={classes.answer}><span>{username}</span></div>
                </div>
                <div className={classes.item}>
                    <div className={classes.question}>E-mail:</div>
                    <div className={classes.answer}><span>{email}</span></div>
                </div>
            </div>
        </div>
    )
}