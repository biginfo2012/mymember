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
import { connect } from "react-redux";
import { UPDATE_SUB_USER } from "../../../redux/actions/employee_subusers_roles";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from "antd";
import { Avatar, Divider, List, ListItem, ListItemText } from "@mui/material";
import "./employ.scss"
import Personal from "./formelemnts/Personal";
import Permission from "./formelemnts/Permission";
import DocumentActiveData from "./formelemnts/DocumentActiveData";
import DocumentEmployeeTable from "./formelemnts/DocumentEmployeeTable"; 
import EmployeeDocumentList from "./formelemnts/EmployeeDocumentList";
import Wagesandpayment from "./formelemnts/Wagesandpayment";
import Notes from "./formelemnts/Notes";
import Employement from "./formelemnts/Employement";

const Editemplyee = (props) => {
  const [activeStep, setActiveStep] = useState('Personal')
  const history = useHistory()
  const [payload, setPayload] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email_id: "",
    RPassword: "",
    CRPassword: "",
    phone_number: "",
  });

  return (
    <div className="w-100">
      <Card className="w-100 p-2">
        <div className="m-1 d-flex justify-content-between w-90">
          <div>
            <Button
              type="text"
              className="m-0"
              onClick={() => {
                history.goBack()
              }}
            ><ArrowBackIosIcon /> Employee</Button>
            <div className="d-flex align-items-center">
              <Avatar src={payload?.profile_img} style={{
                width: "100px",
                height: "100px"
              }} />
              <Typography
                className="ml-1 font-bold" variant="h4">{`${payload?.firstname} ${payload?.lastname}`}</Typography>
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
            {
              option?.map((item) => {
                return (
                  <ListItem
                    key={item?.name}
                    className={`${`element${activeStep === item?.name ? '-active' : ""}`} w-100 pr-1`}
                    onClick={() => {
                      setActiveStep(item?.name)
                    }}
                  >
                    <ListItemText
                    >
                      {item?.name}
                    </ListItemText>
                  </ListItem>)
              })}
          </List>
          <div className="border-left w-100 m-1">
            {
              activeStep === "Personal" &&
              <Personal
                changeHandler={() => { }}
                payload={payload}
              />
            }
            {
              activeStep === "Documents" &&
              <DocumentActiveData />
            }
            {
              activeStep === "Permission" &&
              <Permission />
            }
            {
              activeStep === "Wages And Payment" &&
              <Wagesandpayment />
            }
            {
              activeStep === "Notes" && <Notes />
            }
             {
              activeStep === "Employment" && <Employement />
            }
          </div>
        </div>
      </Card >
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    role_id: state.employeeSubUser.role_id,
  };
};

export default connect(mapStateToProps, { UPDATE_SUB_USER })(Editemplyee);

const option = [
  { name: "Info" },
  { name: "Personal" },
  { name: "Employment" },
  { name: "Assignment" },
  { name: "Wages And Payment" },
  { name: "Documents" },
  { name: "Acknowledgement" },
  { name: "Permission" },
  { name: "Notes" }

]