import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Plus } from "react-feather";
import one from "../../../../images/one.jpg";
import two from "../../../../images/two.jpg";
import three from "../../../../images/three.jpg";
import four from "../../../../images/four.jpg";
import five from "../../../../images/five.jpg";
import { DropzoneArea } from "material-ui-dropzone";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "antd";
import { BorderColor, Lock, PeopleAltSharp } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = ["Need to Sign"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles((theme) => ({
  styleDropZone: {
    margin: "6px 0px 4px 0px",
    // padding: "170px 180px 50px 180px",
    border: "3px dashed #82c6fe",
    background: "#F7FDFF",
    width: "100%",
    height: "280px",
  },

  styleCards: {
    boxShadow: "0 2px 4px rgb(0 0 0 / 8%), 0 0 1px rgb(50 79 58 / 15%)",
    background: "#fff",
    width: "150px",
    height: "180px",
    marginTop: "20px",
  },
  styleText: {
    fontSize: "14px",
    paddingTop: "5px",
    fontWeight: "600",
  },
  root: {
    margin: "5px",
    width: "160px",
  },
  input: {
    display: "none",
  },
}));

export default function AttachDocxfile(props) {
  const classes = useStyles();
  const [Name, setName] = useState("I am only singer");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [inputList, setInputList] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const colors = ['purple', 'yellow', 'orange', 'brown', 'black', "red", "green", "pink"];

  const addfile = (e) => {
    props.handleDocument(e.target.files[0].name, e.target.files[0]);
    setName(e.target.files[0].name);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const onAddBtnClick = (event) => {
    setInputList(
      inputList.concat(
        <div>
          <div>
            <div>
              <Input type="checkbox" className="checkbox" />
              <label
                for="vehicle1"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  marginLeft: "25px",
                }}
              >
                I'm the only singer
              </label>
            </div>
            <div className="d-flex">
              <div>
                <Input type="checkbox" className="checkbox" />
                <label
                  for="vehicle1"
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginLeft: "25px",
                  }}
                >
                  Set siginig order{" "}
                </label>
              </div>
              <Divider type="vertical" style={{ height: "30px" }} />
              <div>
                <Lock />
                <label
                  for="vehicle1"
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginLeft: "5px",
                  }}
                >
                  Import bulk list
                </label>
              </div>
            </div>
          </div>

          <Card className="mt-2">
            <CardHeader id="box" style={{ background: colors[ inputList.length % colors.length] }}></CardHeader>
            <FormGroup
              style={{
                width: "200px",
                marginTop: "20px",
                marginLeft: "80%",
                marginBottom: "-35px",
              }}
            >
              <Select
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Label style={{ fontSize: "16px" }}>CUSTOMIZE</Label>
                    );
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <Label style={{ fontSize: "16px" }}>CUSTOMIZE</Label>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormGroup>
            <CardBody>
              <FormGroup>
                <Label for="exampleEmail" style={{ fontSize: "18px" }}>
                  Name
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  type="email"
                  style={{ height: "50px", fontSize: "24px" }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail" style={{ fontSize: "18px" }}>
                  Email
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  type="email"
                  style={{ height: "50px", fontSize: "24px" }}
                />
              </FormGroup>
              <div style={{ display: "flex" }}>
                <BorderColor style={{ marginTop: "6px", color: "#949393" }} />
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <Label style={{ fontSize: "16px" }}>Need to sign</Label>
                      );
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <Label style={{ fontSize: "16px" }}>Need to sign</Label>
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </CardBody>
          </Card>
        </div>
      )
    );
  };

  return (
    <div className="container">
      <Row>
        <div
          style={{
            width: "100%",
          }}
        >
          <h2>Add Documents</h2>
          <Row>
            <Col md="3">
              <Card>
                <img alt="Card" src="https://picsum.photos/280/200" />
                <CardBody>
                  <h5>Hello world</h5>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <input
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={addfile}
              />
              <label
                htmlFor="contained-button-file"
                className="w-100 uploadFiles"
              >
                <DropzoneArea
                  dropzoneText="Drop your files here or"
                  dropzoneClass={classes.styleDropZone}
                  // onChange={handleFileUpload}
                  showAlerts={true}
                  // showPreviews={true}
                  filesLimit={1}
                  // showPreviewsInDropzone
                  showPreviewsInDropzone={true}
                />

                {/* <Button component="span" className={classes.styleDropZone} fullWidth>
            <Plus />
          </Button> */}
              </label>
            </Col>
          </Row>
          {/* <hr className="mt-5" /> */}

          <Accordion style={{ height: "70px !imporant", marginTop: "40px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ fontSize: "28px", fontWeight: "700" }}>
                Add Recipient
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div>
                  <div>
                    <Input type="checkbox" className="checkbox" />
                    <label
                      for="vehicle1"
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        marginLeft: "25px",
                      }}
                    >
                      I'm the only singer
                    </label>
                  </div>
                  <div className="d-flex">
                    <div>
                      <Input type="checkbox" className="checkbox" />
                      <label
                        for="vehicle1"
                        style={{
                          fontSize: "18px",
                          fontWeight: "500",
                          marginLeft: "25px",
                        }}
                      >
                        Set siginig order{" "}
                      </label>
                    </div>
                    <Divider type="vertical" style={{ height: "30px" }} />
                    <div>
                      <Lock />
                      <label
                        for="vehicle1"
                        style={{
                          fontSize: "18px",
                          fontWeight: "500",
                          marginLeft: "5px",
                        }}
                      >
                        Import bulk list
                      </label>
                    </div>
                  </div>
                </div>

                <Card className="mt-2">
                  <CardHeader style={{ background: "#1CA7E2" }}></CardHeader>
                  <FormGroup
                    style={{
                      width: "200px",
                      marginTop: "20px",
                      marginLeft: "80%",
                      marginBottom: "-35px",
                    }}
                  >
                    <Select
                      multiple
                      displayEmpty
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return (
                            <Label style={{ fontSize: "16px" }}>
                              CUSTOMIZE
                            </Label>
                          );
                        }

                        return selected.join(", ");
                      }}
                      MenuProps={MenuProps}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        <Label style={{ fontSize: "16px" }}>CUSTOMIZE</Label>
                      </MenuItem>
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormGroup>
                  <CardBody>
                    <FormGroup>
                      <Label for="exampleEmail" style={{ fontSize: "18px" }}>
                        Name
                      </Label>
                      <Input
                        id="exampleEmail"
                        name="email"
                        type="email"
                        style={{ height: "50px", fontSize: "24px" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail" style={{ fontSize: "18px" }}>
                        Email
                      </Label>
                      <Input
                        id="exampleEmail"
                        name="email"
                        type="email"
                        style={{ height: "50px", fontSize: "24px" }}
                      />
                    </FormGroup>
                    <div style={{ display: "flex" }}>
                      <BorderColor
                        style={{ marginTop: "6px", color: "#949393" }}
                      />
                      <Select
                        multiple
                        displayEmpty
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <Label style={{ fontSize: "16px" }}>
                                Need to sign
                              </Label>
                            );
                          }

                          return selected.join(", ");
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem disabled value="">
                          <Label style={{ fontSize: "16px" }}>
                            Need to sign
                          </Label>
                        </MenuItem>
                        {names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </CardBody>
                </Card>
              </div>
              {inputList}
              <Button
                className="btn mt-2"
                style={{ background: "#d5d5d575" }}
                onClick={onAddBtnClick}
              >
                <PeopleAltSharp style={{ color: "gray" }} />{" "}
                <span style={{ marginLeft: "10px" }}>Add More Recipients</span>
                <KeyboardArrowDownIcon style={{ marginLeft: "10px" }} />
              </Button>
            </AccordionDetails>
          </Accordion>
          {/* 
          <div>
            <div>
              <div>
                <Input type="checkbox" className="checkbox" />
                <label
                  for="vehicle1"
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginLeft: "25px",
                  }}
                >
                  I'm the only singer
                </label>
              </div>
              <div className="d-flex">
                <div>
                  <Input type="checkbox" className="checkbox" />
                  <label
                    for="vehicle1"
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      marginLeft: "25px",
                    }}
                  >
                    Set siginig order{" "}
                  </label>
                </div>
                <Divider type="vertical" style={{ height: "30px" }} />
                <div>
                  <Lock />
                  <label
                    for="vehicle1"
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      marginLeft: "5px",
                    }}
                  >
                    Import bulk list
                  </label>
                </div>
              </div>
            </div>

            <Card className="mt-2">
              <CardHeader style={{ background: "#1CA7E2" }}></CardHeader>
              <FormGroup
                style={{
                  width: "200px",
                  marginTop: "20px",
                  marginLeft: "80%",
                }}
              >
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <Label style={{ fontSize: "16px" }}>CUSTOMIZE</Label>
                      );
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <Label style={{ fontSize: "16px" }}>CUSTOMIZE</Label>
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
              <CardBody>
                <FormGroup>
                  <Label for="exampleEmail" style={{ fontSize: "18px" }}>
                    Name
                  </Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    type="email"
                    style={{ height: "50px", fontSize: "24px" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" style={{ fontSize: "18px" }}>
                    Email
                  </Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    type="email"
                    style={{ height: "50px", fontSize: "24px" }}
                  />
                </FormGroup>
                <div style={{ display: "flex" }}>
                  <BorderColor style={{ marginTop: "6px", color: "#949393" }} />
                  <Select
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return (
                          <Label style={{ fontSize: "16px" }}>
                            Need to sign
                          </Label>
                        );
                      }

                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <Label style={{ fontSize: "16px" }}>Need to sign</Label>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </CardBody>
            </Card>
          </div> */}

          {/* <Row>
            <Col>
              <div>
                <img
                  src={one}
                  style={{ height: "200px", width: "160px", marginTop: "10px" }}
                  alt=""
                />
                <span>La history de Rondha</span>
              </div>
            </Col>
            <Col>
              <div>
                <img
                  src={two}
                  style={{ height: "200px", width: "160px", marginTop: "10px" }}
                  alt=""
                />
                <span>The mind of a leader</span>
              </div>
            </Col>
            <Col>
              <div>
                <img
                  src={three}
                  style={{ height: "200px", width: "160px", marginTop: "10px" }}
                  alt=""
                />
                <span>Love in the first line</span>
              </div>
            </Col>
            <Col>
              <div>
                <img
                  src={four}
                  style={{ height: "200px", width: "160px", marginTop: "10px" }}
                  alt=""
                />
                <span>Labyrinth</span>
              </div>
            </Col>
            <Col>
              <div>
                <img
                  src={five}
                  style={{ height: "200px", width: "160px", marginTop: "10px" }}
                  alt=""
                />
                <span>The Dream</span>
              </div>
            </Col>
            <Col>
              <div>
                <img
                  src={one}
                  style={{ height: "200px", width: "160px", marginTop: "10px" }}
                  alt=""
                />
                <span>Labyrinth</span>
              </div>
            </Col>
          </Row> */}
        </div>
      </Row>
    </div>
  );
}
