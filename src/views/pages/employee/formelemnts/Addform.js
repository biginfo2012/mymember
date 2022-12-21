import { Button, Card, Grid } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import forms from "../../../../../src/assets/img/forms.png";
import { connect } from "react-redux";
import { CREATE_ROLE_LIST } from "../../../../redux/actions/employee_subusers_roles";
import Documents from "./Documents";
import Digitalforms from "./Digitalforms";

const steps = ["Select one", "Select form"];
const Addform = ({ setOpen, roleName }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selected, setselected] = React.useState("Digital");
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      setOpen(false);
    }
  };
  const goBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div id={"add-from"}>
      <h4>Add Form</h4>
      <Card className="d-flex justify-content-center">
        <Box sx={{ width: "500px", padding: "10px" }}>
          <Stepper
            activeStep={activeStep}
            sx={{ width: "100%", margin: "0px", padding: "0px" }}
            alternativeLabel
          >
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <div className="m-1">
              <Grid container spacing={1}>
                <Grid item sm={12} md={4} lg={4}>
                  <Card
                    className={`templates_card d-flex align-items-center justify-content-center flex-column ${
                      selected === "Digital" ? "active" : ""
                    }`}
                    style={{
                      height: "150px",
                    }}
                    onClick={() => {
                      setselected("Digital");
                    }}
                  >
                    <div className="w-100 d-flex justify-content-center">
                      <img alt="forms" src={forms} />
                    </div>
                    <span className="create_title">Digital</span>
                  </Card>
                </Grid>
                <Grid item sm={12} md={4} lg={4}>
                  <Card
                    className={`templates_card d-flex align-items-center justify-content-center flex-column ${
                      selected === "Documents" ? "active" : ""
                    }`}
                    style={{
                      height: "150px",
                    }}
                    onClick={() => {
                      setselected("Documents");
                    }}
                  >
                    <div className="w-100 d-flex justify-content-center">
                      <img alt="forms" src={forms} />
                    </div>
                    <span className="create_title">Documents</span>
                  </Card>
                </Grid>
                <Grid item sm={12} md={4} lg={4}>
                  <Card
                    className={`templates_card d-flex align-items-center justify-content-center flex-column ${
                      selected === "My forms" ? "active" : ""
                    }`}
                    style={{
                      height: "150px",
                    }}
                    onClick={() => {
                      setselected("My forms");
                    }}
                  >
                    <div className="w-100 d-flex justify-content-center">
                      <img alt="forms" src={forms} />
                    </div>
                    <span className="create_title">My forms</span>
                  </Card>
                </Grid>
              </Grid>
              <div className="d-flex justify-content-end m-1">
                <Button className="primary" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="m-1">
              {selected === "Documents" && (
                <Documents roleName={roleName} goBack={goBack} handleNext={handleNext} />
              )}{" "}
              {selected === "Digital" && (
                <Digitalforms roleName={roleName} goBack={goBack} handleNext={handleNext} />
              )}
            </div>
          )}
        </Box>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeRolesList: state.employeeSubUser.employeeRolesList,
    usersRoleInfoList: state.employeeSubUser.usersRoleInfoList,
  };
};

export default connect(mapStateToProps, {
  CREATE_ROLE_LIST
})(Addform);


