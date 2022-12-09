
import {List, ListItem, Chip, Typography, IconButton, useMediaQuery} from '@material-ui/core';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AddProject from '../addProject/addProject';
import ProjectListing from '../addProject/projectlisting';
import MenuIcon from "@material-ui/icons/Menu";

const TaskAndGoalsSidebar = (props) => {
    const { featureType,
        filtertype
    } = useParams()
    const IsSmallDevise = useMediaQuery("(max-width:1224px)");
    return (
        <div className='p-1' style={{ background: '#fff', borderRadius: '6px' }}>
            <List dense style={{ height: '78vh' }}>
                <div className="d-flex w-100 p-1">
                  {IsSmallDevise ? (
                    <IconButton
                      onClick={() => {
                        props.setFoldermenuOpen(false);
                      }}
                      className="rounded-circle pt-0"
                    >
                      <MenuIcon />
                    </IconButton>
                  ) : null}
                  <Typography  style={{ fontSize: 16, color:'#252525' }} className="pl-1">Select One</Typography>
                </div>

                <ListItem className='border-top' style={{ paddingLeft: 8 }} component={Link} onClick={() => {
                  props.setFoldermenuOpen(false);
                }} to={`/app/task-and-goals/task/all/taskonly`}>
                    <Chip
                        style={{ fontSize: 14 }}
                        className='bg-transparent cursor-pointer'
                        icon={featureType === 'task' ? <FiberManualRecordIcon style={{
                            color: '#0184FF'
                        }} fontSize='small' /> : <RadioButtonUncheckedIcon fontSize='small' />} label='Tasks' />
                </ListItem>
                <ListItem style={{ paddingLeft: 8 }} component={Link} onClick={() => {
                  props.setFoldermenuOpen(false);
                }} to={`/app/task-and-goals/goals/all/Mymember`}>
                    <Chip
                        style={{ fontSize: 14 }}
                        className='bg-transparent cursor-pointer mb-1'
                        icon={featureType === 'goals' ? <FiberManualRecordIcon style={{
                            color: '#0184FF'
                        }} fontSize='small' /> : <RadioButtonUncheckedIcon fontSize='small' />} label='Goals' />
                </ListItem>
                <Typography  style={{ fontSize: 16, color:'#252525' }} className="pl-1">Select {featureType === 'task' ? "Task" : "Goals"}</Typography>
                <ListItem className='border-top pt-1'>
                    <AddProject type='mainFolder' title='ADD TO-DO LIST' />
                </ListItem>
                <ProjectListing setFoldermenuOpen={props.setFoldermenuOpen}/>
            </List>
        </div>
    )
}

export default TaskAndGoalsSidebar;
