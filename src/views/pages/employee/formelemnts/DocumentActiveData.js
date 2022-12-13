import { Card, MenuItem, Select, Button } from "@material-ui/core";
import React, { useState } from 'react'
import {
  Col, FormGroup, Label, Row, TabContent, TabPane,
  CardHeader, CardBody, CardTitle, CardText, CardFooter, Table,
} from 'reactstrap'
import CircularProgress from "@material-ui/core/CircularProgress";
import DocumentEmployeeTable from "./DocumentEmployeeTable";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function DocumentActiveData() {
  const [currentActiveTab, setCurrentActiveTab] = useState('1');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const toggle = tab => {
  //   if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  // }
  return (
    <div className='p-1'>
      <div className="">
        <h2>Name Employee Folder</h2>
      </div>
      <TabContent activeTab={currentActiveTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Row>
                <Col sm="6">
                  <Card style={{
                    height: '100%'
                  }}>
                    <CardHeader className="d-flex justify-content-between p-1">
                      <h5>Employee Information</h5>
                      <div>
                        <Button variant="contained" className="primary m-1">Edit</Button>
                        <Button variant="contained" className="primary m-1"
                          onClick={handleClickOpen}>Add</Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <CardTitle tag="h3">
                        Contact Information
                      </CardTitle>
                      <CardText>
                        <h5>hello@gmail.com</h5>
                      </CardText>
                      <CardTitle tag="h3">
                        Division
                      </CardTitle>
                      <CardText>
                        <p>Mad for Chicken Sunnyside</p>
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      <FormGroup style={{ margin: "5px" }}>
                        <Select
                          variant="outlined"
                          style={{
                            border: '1px solid #ced4da',
                            background: "white",
                            width: '100%',

                          }}>

                          <MenuItem >
                            hjj
                          </MenuItem>
                        </Select>
                      </FormGroup>
                    </CardFooter>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card style={{
                    height: '100%'
                  }}>
                    <CardHeader className="d-flex justify-content-between p-1">
                      <h5>Employee Status</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="d-flex justify-content-between">
                        <div className="change">
                          <h4>Status: Active</h4>
                          <Button variant="contained" className="btn btn-danger" >Deactivate</Button>
                        </div>
                        <CircularProgress
                          variant="determinate"
                          value={10}
                          style={{
                            width: "80px",
                            height: "80px",
                            color: "#ff892e",
                            borderRadius: "100%",
                            boxShadow: "inset 0 0 0px 11px #dbdbdb",
                            backgroundColor: "transparent",
                          }}
                          thickness={5}
                        />
                      </div>
                      <Table className="formTable">
                        <tbody>
                          <tr>
                            <td>Date Created</td>
                            <td>Otto</td>
                          </tr>
                          <tr>
                            <td>Date Active</td>
                            <td>Thornton</td>
                          </tr>
                          <tr>
                            <td>Last Activity</td>
                            <td>the Bird</td>
                          </tr>
                          <tr>
                            <td>Form Assigned</td>
                            <td>the Bird</td>
                          </tr>
                          <tr>
                            <td>Form Submitted</td>
                            <td>the Bird</td>
                          </tr>
                          <tr>
                            <td>Form Approved</td>
                            <td>the Bird</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      <Dialog
        className="employeeForm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Upload Documents"}
        </DialogTitle>
        <DialogContent>
          <Label htmlFor="file" className="d-flex">
            <h4>Upload Documents</h4>
            <InsertDriveFileIcon className="fbIcons ml-3" />
          </Label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            accept="image/*"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>


      <div className="mt-1">
        <DocumentEmployeeTable />
      </div>
    </div>
  )
}

export default DocumentActiveData