import {
  Card,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { Row, Col, Input, Label, FormGroup } from "reactstrap";
import Profile from "./uploadProfilePic";
import { connect, useDispatch } from "react-redux";
import {
  UPDATE_SUB_USER,
  GET_SUB_USERS_LIST,
  CREATE_SUB_USER,
} from "../../../redux/actions/employee_subusers_roles";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Menu, MenuItem } from "@mui/material";
import { Avatar, Divider, List, ListItem, ListItemText } from "@mui/material";
import "./employ.scss";
import Personal from "./formelemnts/Personal";
import Permission from "./formelemnts/Permission";
import DocumentActiveData from "./formelemnts/DocumentActiveData";
import DocumentEmployeeTable from "./formelemnts/DocumentEmployeeTable";
import EmployeeDocumentList from "./formelemnts/EmployeeDocumentList";
import Wagesandpayment from "./formelemnts/Wagesandpayment";
import Notes from "./formelemnts/Notes";
import Employement from "./formelemnts/Employement";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import WorkHistory from "../workHistory/workHistory";
import { PlayArrow, Stop } from "@material-ui/icons";
import {
  set_work_status,
  setProject,
  setStream,
  setDuration,
} from "../../../redux/actions/work-history";
import {
  // endWork,
  formatDuration,
  getCurrentWork,
  // startWork,
  updateWork,
} from "./utils";
import { startWork, endWork } from "../../../redux/actions/work-history";

const Editemplyee = (props) => {
  const {
    UPDATE_SUB_USER,
    CREATE_SUB_USER,
    employeeSubUsersList,
    GET_SUB_USERS_LIST,
    isStartWork,
    set_work_status,
    setProject,
    project,
    stream,
    setStream,
    setDuration,
    duration,
  } = props;
  const [activeStep, setActiveStep] = useState("Personal");
  const history = useHistory();
  const [payload, setPayload] = useState({});
  const [optionData, setOptionData] = useState("Update");
  const [profileImg, setProfileImg] = useState();
  const videosRef = React.useRef(null);

  const toastCSS = () => {
    return {
      position: "bottom-right",
      autoClose: 5000,
      icon: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  };

  const colors = ["#000000", "#60b644", "#ff4361"];

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    let formData = new FormData();
    if (optionData === "create") {
      formData.append("firstname", payload?.firstname);
      formData.append("lastname", payload?.lastname);
      formData.append("birthday", payload?.birthday);
      formData.append("mobileNo", payload?.mobileNo);
      formData.append("homeNo", payload?.homeNo);
      formData.append("pronouns", payload?.pronouns);
      formData.append("address", payload?.address);
      formData.append("city", payload?.city);
      formData.append("state", payload?.state);
      formData.append("email", payload?.email);
      formData.append("contactName", payload?.contactName);
      formData.append("contactNo", payload?.contactNo);
      for (let file of profileImg) {
        formData.append("profile_img", file);
      }
      await CREATE_SUB_USER(formData);
    }
  };

  // START END time tracking

  return (
    <div className="w-100">
      <Card className="w-100 p-2">
        <div className="m-1 d-flex justify-content-between w-90">
          <div className="w-100">
            <Button
              type="text"
              className="m-0"
              onClick={() => {
                history.goBack();
              }}
            >
              <ArrowBackIosIcon /> Employee
            </Button>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Avatar
                  src={payload?.profile_img}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <Typography
                  className="ml-1 font-bold"
                  variant="h4"
                >{`${payload?.firstname} ${payload?.lastname}`}</Typography>
              </div>
              <TimeTracker
                isStartWork={isStartWork}
                set_work_status={set_work_status}
                setProject={setProject}
                project={project}
                stream={stream}
                setStream={setStream}
                duration={duration}
                setDuration={setDuration}
              />
            </div>
          </div>
          <div>
            <div>
              <Button>Message</Button>
            </div>
          </div>
        </div>
        <Divider />
        <div className="mt-0 d-flex w-100 ">
          <List style={{ width: "300px" }} className="pr-1">
            {option?.map((item) => {
              return (
                <ListItem
                  key={item?.name}
                  className={`${`element${
                    activeStep === item?.name ? "-active" : ""
                  }`} w-100 pr-1`}
                  onClick={() => {
                    setActiveStep(item?.name);
                  }}
                >
                  <ListItemText>{item?.name}</ListItemText>
                </ListItem>
              );
            })}
          </List>
          <div className="border-left w-100 m-1">
            {activeStep === "Personal" && (
              <Personal
                payload={payload}
                optionData={optionData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
            {activeStep === "Documents" && <DocumentActiveData />}
            {activeStep === "Permission" && <Permission />}
            {activeStep === "Wages And Payment" && <Wagesandpayment />}
            {activeStep === "Notes" && <Notes />}
            {activeStep === "Employment" && <Employement />}
            {activeStep === "Work History" && <WorkHistory />}
          </div>
        </div>
      </Card>
      <video ref={videosRef} width={400} height={300} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role_id: state.employeeSubUser.role_id,
    employeeSubUsersList: state.employeeSubUser.employeeSubUsersList,
    isStartWork: state.workhistory.isStartWork,
    project: state.workhistory.project,
    stream: state.workhistory.stream,
    duration: state.workhistory.duration,
  };
};

export default connect(mapStateToProps, {
  UPDATE_SUB_USER,
  CREATE_SUB_USER,
  GET_SUB_USERS_LIST,
  set_work_status,
  setProject,
  setStream,
  setDuration,
})(Editemplyee);

const option = [
  { name: "Info" },
  { name: "Personal" },
  { name: "Employment" },
  { name: "Assignment" },
  { name: "Wages And Payment" },
  { name: "Documents" },
  { name: "Acknowledgement" },
  { name: "Permission" },
  { name: "Notes" },
  { name: "Work History" },
];

const SelectProject = ({ project, setProject }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (projectName) => {
    setProject(projectName);
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const videosRef = React.useRef(null);
  const [stream, setStream] = useState();

  return (
    <div>
      <Button
        size="large"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {project}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        defaultValue="Project1"
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={(e) => handleClose("Project1")}>Project1</MenuItem>
        <MenuItem onClick={(e) => handleClose("Project2")}>Project2</MenuItem>
        <MenuItem onClick={(e) => handleClose("Project3")}>Project3</MenuItem>
      </Menu>
    </div>
  );
};

const TimeTracker = ({
  isStartWork,
  set_work_status,
  project,
  setProject,
  stream,
  setStream,
  duration,
  setDuration,
}) => {
  const videosRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const imageRef = React.useRef(null);
  // const [stream, setStream] = useState();
  // const [duration, setDuration] = useState(0);

  const { id } = useParams();

  const handleStartWorking = async (start) => {
    await startWork(id, "project1", set_work_status, setDuration);
    // if (isStartWork) {
    //   setDuration(0);
    //   let tracks = stream?.getTracks();
    //   tracks?.forEach((track) => track.stop());
    //   if (videosRef.current) videosRef.current.srcObject = null;
    //   localStorage.setItem("currentWork", "");
    // } else {
    //   let createdStream = await navigator.mediaDevices.getDisplayMedia({
    //     video: true,
    //     audio: false,
    //   });
    //   if (videosRef.current) videosRef.current.srcObject = createdStream;
    //   setStream(createdStream);
    //   const response = await startWork(id, project);
    //   localStorage.setItem("currentWork", JSON.stringify(response?.data));
    // }

    // set_work_status(start);
  };

  const handleEndWork = async () => {
    await endWork(set_work_status, setDuration);
  };

  React.useEffect(() => {
    // let timerId;
    // if (isStartWork) {
    //   timerId = setInterval(async () => {
    //     setDuration(duration + 1);
    //     if (duration % 10 === 0) {
    //       const imageCapture = new window.ImageCapture(
    //         stream?.getVideoTracks()[0]
    //       );
    //       if (
    //         !(
    //           imageCapture.track.readyState != "live" ||
    //           !imageCapture.track.enabled ||
    //           imageCapture.track.muted
    //         )
    //       ) {
    //         const frame = await imageCapture.grabFrame();
    //         var ctx = canvasRef.current?.getContext("2d");
    //         const screenshot = canvasRef.current?.toDataURL();
    //         // imageRef.current.src = screenshot;
    //         if (screenshot) await updateWork(getCurrentWork()._id, screenshot);
    //         if (canvasRef.current)
    //           ctx?.drawImage(
    //             frame,
    //             0,
    //             0,
    //             canvasRef.current?.width,
    //             canvasRef.current?.height
    //           );
    //       }
    //     }
    //   }, 1000);
    // }
    // if (isStartWork && !stream?.active) {
    //   set_work_status(false);
    //   setDuration(0);
    //   endWork(getCurrentWork()._id);
    // }
    // return () => clearInterval(timerId);
  }, [isStartWork, duration]);

  // React.useEffect(() => {
  //   console.log("props stream is ", stream);
  //   if(stream?.active) {
  //     setDuration(duration + 1);
  //   }
  // }, [])

  return (
    <div className="d-flex flex-row align-items-center">
      {isStartWork ? (
        <IconButton
          onClick={(e) => handleEndWork(true)}
          aria-label="fingerprint"
          style={{
            backgroundColor: "#eb4e29",
            color: "white",
            marginRight: "14px",
          }}
        >
          CLOCK OUT
          <Stop fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          onClick={(e) => handleStartWorking(true)}
          aria-label="fingerprint"
          style={{
            backgroundColor: "#27c26c",
            color: "white",
            marginRight: "14px",
          }}
        >
          CLOCK IN
          <PlayArrow fontSize="large" />
        </IconButton>
      )}
      <div>
        <SelectProject project={project} setProject={setProject} />
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {formatDuration(duration)}
        </div>
      </div>
      <video ref={videosRef} width={400} height={300} hidden />
      <canvas ref={canvasRef} width={400} height={300} hidden />
    </div>
  );
};
