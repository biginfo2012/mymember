import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateWorkSpaceFirst from "./CreateWorkspaceFirst";
import SocialMediaCard from "./SocialMediaCard";

const styles = (theme) => ({
  root: {
    width: "90%",
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  stepIcon: {
    color: "pink",
  },
});

function getSteps() {
  return [
    "Create a workspace",
    "Connect social account",
    "Create an ad",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CreateWorkSpaceFirst />;
    case 1:
      return <SocialMediaCard />;
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  isStepOptional = (step) => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState((state) => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel
                  StepIconProps={{
                    classes: { root: classes.stepIcon },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div style={{ textAlign: "center" }}>
                {activeStep === steps.length - 1 ? (
                  <Button
                    style={{
                      width: "300px",
                      marginLeft: "95px",
                      borderRadius: "5px",
                      background: "rgb(64, 167, 225)",
                      color: "#fff",
                      marginTop: "10px",
                    }}
                    disabled={activeStep === 1}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={this.handleNext}
                    className={classes.button}
                    style={{
                      width: "300px",
                      marginLeft: "95px",
                      borderRadius: "5px",
                      background: "rgb(64, 167, 225)",
                      color: "#fff",
                      marginTop: "10px",
                    }}
                  >
                    {activeStep !== steps.length - 1 ? "Next" : "Finish"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLinearStepper);
