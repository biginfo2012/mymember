
import { List, ListItem, Chip, Typography, IconButton, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AddProject from '../addProject/addProject';
import ProjectListing from '../addProject/projectlisting';
import MenuIcon from "@material-ui/icons/Menu";
import { CardText } from 'reactstrap';

const TaskAndGoalsSidebar = (props) => {
  const {
    featureType,
    filtertype
  } = useParams()
  const IsSmallDevise = useMediaQuery("(max-width:1224px)");
  const history = useHistory()
  return (
    <div className='p-1 pt-0' style={{ background: '#fff', borderRadius: '6px' }}>
      <List dense style={{ height: '78vh' }}>
        <div className="d-flex w-100">
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
          <Typography style={{ fontSize: 16, color: '#252525' }} className="mb-1 pl-1">Select One</Typography>
        </div>

        <div className='divider' />
        <div
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${featureType === "task" ? "bullet active_bullet" : "bullet"
              }`}
            onClick={() => {
              props.setFoldermenuOpen(false);
              history.push(`/app/task-and-goals/task/all/taskonly`)
            }}
          />
          <CardText className={`${featureType === "task" && "text-primary"}`}>
            Tasks
          </CardText>
        </div>
        <div
          className="d-flex align-items-center finance-nav cursor-pointer"
          onClick={() => {
            props.setFoldermenuOpen(false);
            history.push(`/app/task-and-goals/goals/all/Mymember`)
          }}
        >
          <div
            className={`${featureType === 'goals' ? "bullet active_bullet" : "bullet"}`}
          />
          <CardText className={`${featureType === 'goals' && "text-primary"}`}>
            Goals
          </CardText>
        </div>
        <div className='divider' />
        <Typography style={{ fontSize: 16, color: '#252525' }} className="mb-1 pl-1">Select {featureType === 'task' ? "Task" : "Goals"}</Typography>
        <ListItem className='border-top pt-1'>
          <AddProject type='mainFolder' title='ADD TO-DO LIST' />
        </ListItem>
        <ProjectListing setFoldermenuOpen={props.setFoldermenuOpen} />
      </List>
    </div>
  )
}

export default TaskAndGoalsSidebar;
