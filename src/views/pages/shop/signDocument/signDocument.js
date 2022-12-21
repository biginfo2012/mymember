import { Typography, Dialog, DialogContent, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { GET_MEMBERSHIP_FOLDER_LIST } from "../../../../redux/actions/shop";
import { connect } from "react-redux";
import Home from "./Home";
import MailSentSuccess from "./mailSentSuccess";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CreateFormstepper from "../../../formbuilder/pages/CreateFormstepper";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Automation from "../../../../assets/img/Automation.png";
import Money from "../../../../assets/img/money.png";
import { Plus, X } from "react-feather";
import {
  AppBar,
  Toolbar,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  DialogTitle,
} from "@mui/material";
import Steps from "../../../formbuilder/pages/funnelsteps/Steps";
import { Col, Row } from "reactstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DocumentSign = (props) => {
  const { getmebershipfolderlisting } = props;
  const [open, setOpen] = useState(false);
  const docTypes = [
    { id: 1, type: "None" },
    { id: 2, type: "Document" },
    { id: 2, type: "Digital" },
  ];
  const [docType, setDocType] = useState(docTypes?.map((res) => res?.type));

  const [islinksent2Email, setIslinksent2Email] = useState(false);
  console.log(getmebershipfolderlisting);

  const handleChange = (event) => {
    setDocType(event.target.value);
  };

  useEffect(() => {
    GET_MEMBERSHIP_FOLDER_LIST();
  }, [GET_MEMBERSHIP_FOLDER_LIST]);

  return (
    <div>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={docType}
          label="docType"
          onChange={handleChange}
        >
          <MenuItem value={"Digital"}>Digital</MenuItem>
          <MenuItem value={"Document"}>Document</MenuItem>
          <MenuItem value={"None"}>None</MenuItem>
        </Select>
      </FormControl>
      <div className="d-flex justify-content-center align-items-center">
        {docType === "Digital" ? (
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext className="w-100">
              <AppBar position="static">
                <Toolbar
                  variant="dense"
                  style={{
                    background: "rgb(1, 132, 255)",
                  }}
                >
                  <div className="w-100">
                    <Tab
                      icon={<FormatListBulletedIcon fontSize="20px" />}
                      style={{
                        color: "#fff",
                        minWidth: "20%",
                        fontSize: "15px",
                      }}
                      indicatorcolor="#fff"
                      iconPosition="start"
                      label="Step"
                    />{" "}
                  </div>
                </Toolbar>
              </AppBar>
              <Row>
                <Col sm="4">
                  <div className="d-flex">
                    <div
                      style={{
                        width: "330px",
                      }}
                      className="shadow mb-5 bg-white "
                    >
                      <div>
                        <List>
                          <ListItem className="steps py-1">
                            <ListItemIcon className="mx-2">
                              <FormatListBulletedIcon
                                color="primary index"
                                fontSize="20px"
                              />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography
                                color="primary"
                                className="mb-0 title"
                              >
                                {props.isTemplate
                                  ? "Template Steps"
                                  : "Funnel Steps"}
                              </Typography>
                            </ListItemText>
                          </ListItem>
                        </List>
                        <div className="w-100 p-1">
                          <Button variant="contained" className="w-100 primary">
                            <Plus /> Add New Step
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm="8">
                  <CardContent>
                    <iframe
                      scrolling="no"
                      className="shadow-sm"
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                        border: "none",
                        height: "350px",
                      }}
                      src={
                        "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
                      }
                    />
                  </CardContent>
                </Col>
              </Row>
            </TabContext>
          </Box>
        ) : docType === "Document" ? (
          <div>
            <h1>Document</h1>
          </div>
        ) : docType === "None" ? (
          <h1>None Data</h1>
        ) : null}

        {islinksent2Email ? (
          <MailSentSuccess />
        ) : (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img
              src="/images/signature-Image-removebg-preview.png"
              alt="signature "
              style={{ width: "70%", objectFit: "contain" }}
            />
            <Button
              fullWidth
              variant="contained"
              className="rounded text-white"
              style={{ background: "#2191fd" }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Create Document
            </Button>
            <Typography color="textSecondary">
              Continue to document signature..{" "}
            </Typography>
          </div>
        )}
        {/* </div> */}
        <Dialog className="p-0" fullScreen maxWidth open={open}>
          <DialogTitle className="d-flex justify-content-end">
            <div className="close-icon">
              <X
                className="cursor-pointer"
                size={20}
                onClick={() => setOpen(false)}
              />
            </div>
          </DialogTitle>
          <DialogContent>
            {/* <CreateRecipientSelectDoc
              setOpen={setOpen}
            /> */}
            <Home
              setOpen={setOpen}
              setIslinksent2Email={setIslinksent2Email}
              agreementType="membership"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// GET_STUDENT_LIST
const mapStateToProps = (state) => {
  return {
    membershipList: state.shop.membershipList,
    getmebershipfolderlisting: state.shop.getmebershipfolderlisting,
  };
};
export default connect(mapStateToProps, {
  GET_MEMBERSHIP_FOLDER_LIST,
})(DocumentSign);
