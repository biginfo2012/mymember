import React from 'react';

import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
    container: {
        width: "100%",
        height: '100px',
        backgroundColor: 'white',
        padding: '1rem',
        position: 'relative'
    },
    timeline: {
        position: 'relative',
    },
    fullDivider: {
        width: '1px',
        height: '80px',
        backgroundColor: '#dcdde1',
        position: 'relative'
    },
    fullDividerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    fullDividerText: {
        position: 'absolute',
        bottom: '-30px',
        color: '#a4a7b2',
        fontSize: '12px',
        left: '-10px' 
    },
    halfDivider: {
        width: '1px',
        height: '60px',
        backgroundColor: '#dcdde1',
        position: 'relative',
        top: '20px',
    },
    trackedTimeWrapper: {
        width: '100%',
        height: '40px',
        position: 'absolute',
        paddingTop: '20px',
        paddingBottom: '20px',
    }
})

const mockData = [
    {
        start: new Date(2022,11,19,3,26,0),
        end: new Date(2022,11,19,6,26,0),
    },
    {
        start: new Date(2022,11,19,13,26,0),
        end: new Date(2022,11,19,18,26,0),
    }
]

const TimeRuler = ({data}) => {
    const classes = useStyle();
    console.log("timeline data is ", data);
    return (
    <div className={classes.container}>
        <div className={classes.timeline}>
            <div className={classes.fullDividerWrapper}>
                {
                    Array.apply(null, Array(13)).map((value, index) => {
                        let displayTime = '';
                        if(index === 0) displayTime = '';
                        else if(index < 6) displayTime = `${index*2}AM`;
                        else if(index == 6) displayTime = "12PM";
                        else if(index > 6) displayTime = `${(index-6)*2}PM`;
                        if(index === 12) displayTime = ''
                        return <div className={classes.fullDivider} style={{left: `calc(95%/12*${index})`}}>
                            <p className={classes.fullDividerText}>{displayTime}</p>
                        </div>
                    })
                }
            </div>
            <div className={classes.fullDividerWrapper}>
                {
                    Array.apply(null, Array(12)).map((value, index) => {

                        return <div className={classes.halfDivider} style={{left: `calc(95%/24*${2*index+1})`}}></div>
                    })
                }
            </div>
        </div>
        <div className={classes.trackedTimeWrapper}>
            {
                data?.map((data) => {
                    const startDiff = data.start.getHours()*60 + data.start.getMinutes();
                    const duration = data.end.getHours()*60 + data.end.getMinutes() - data.start.getHours()*60 - data.start.getMinutes();
                    return (<div style={{position: 'absolute', left:`calc(95%*${startDiff}/1440)`, width: `calc(95%*${duration}/1440)`, height: '40px', backgroundColor:'#27c26c'}}></div>)
                })
            }

        </div>
    </div>);
}

export default TimeRuler;