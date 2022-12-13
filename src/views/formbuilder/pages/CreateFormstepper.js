import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Funnelinformation from './Funnelinformation';
import SelectFunnel from './SelectFunnel';
import Publishd from './Publishd';
import "../../../assets/scss/pages/funnel.scss"
import { useHistory, useParams } from 'react-router-dom';
import {
    CREATE_FORM,
    CREATE_FUNNEL, DELETE_TEMPLATE_CATEGORY_FOR_ADMIN,
    GET_SINGLE_FUNNLE, GET_TEMPLATE, GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN,
    GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN
} from '../../../redux/actions/form-builder';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from "react";

const steps = ['Funnel Information', 'Selected-Template', 'Publish'];

const toastCSS = () => {
    return {
        position: "top-center",
        autoClose: 3000,
        icon: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
};

const CreateFormstepper = (props) => {
    const {
        GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN,
        GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN,
        GET_TEMPLATE,
        templates,
        templateCategoryList,
        templateCategoryTypeList
    } = props;
    const params = useParams()
    const dispatch = useDispatch()
    const [state, setState] = React.useState(
        {
            "funnelName": "",
            "memberType": "",
            "funnelType": "optin",
            "templateBody": "",
            "templateName": "Create new",
            "isAutomation": true
        }
    )
    const [activeStep, setActiveStep] = React.useState(0);
    const [error, seterror] = React.useState({})
    const history = useHistory()

    const getselectedformdata = async (state) => {
        const request = await dispatch(GET_SINGLE_FUNNLE(state?._id))
        if(request?.data.forms.length > 0) {
          request.data.formId = request.data.forms[0]._id
        }
        await setState(request?.data)
    }

    useEffect(() => {
        GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN()
        GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN();
        GET_TEMPLATE(0, 100);
    }, [GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN, GET_TEMPLATE, GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN]);

    React.useEffect(() => {
        if (history?.location?.state !== undefined) {
            getselectedformdata(history?.location?.state)

        }

    }, [history.location?.state])

    React.useEffect(() => {
        if (params?.id) {
            setActiveStep(2)
        } else {
            setActiveStep(0)
        }
    }, []);

    const handleNext = async () => {
        if (activeStep === 0) {
            const valid = await validationfornext()
            const keys = await Object.keys(valid)
            if (keys?.length > 0) {
                toast.error("input fields are required", toastCSS());

            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else {
            const res = await dispatch(CREATE_FUNNEL(state))
            if (res.success == false) {
                toast.error(res.msg, toastCSS());
                return
            } else {
                toast.success("Create Funnel successfully", toastCSS());
            }
            await setState({
                ...res?.data
            })
            const funnelId = res.data._id;
            if(!state.templateId) {
              let payload = {
                "title": "Form"
              }
              payload.funnelId = funnelId;
              await dispatch(CREATE_FORM(payload));
            }
            const request = await dispatch(GET_SINGLE_FUNNLE(funnelId))
            await setState({
                ...state, forms: request.data.forms, _id: funnelId, formId: request.data.forms[0]._id
            })
            await setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };



    const changeTemplate = (key) => {
        setState({
            ...state, "templateId": key
        })
    }

    const validationfornext = () => {
        const data = { ...error }
        if (state?.funnelName.trim().length === 0) {
            data["funnelName"] = 'Form Name is required'
        }
        if (state?.memberType.trim().length === 0) {
            data["memberType"] = 'Member Type is required'
        }
        seterror(data)

        return data
    }
    return (
        <Box
            className="form-stepper w-100">
            <div
                sx={{
                    width: '100%',
                    justifyContent: 'center',
                    margin: '0px', padding: '0px',
                    maxWidth: '100%'
                }}>
                {activeStep >= 2 ? null : <Stepper
                    activeStep={activeStep}
                    sx={{ width: '100%', margin: '0px', padding: '0px', }}
                    alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}  >
                                <StepLabel {...labelProps}
                                >{label}</StepLabel>
                            </Step>

                        );
                    })}
                </Stepper>}
            </div>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {
                        activeStep === 0 && <Funnelinformation
                            templateCategoryTypeList={templateCategoryTypeList}
                            state={state}
                            setState={setState}
                            error={error}
                            action={<Button
                                variant="contained"
                                type="submit"
                                onClick={handleNext}>
                                {activeStep === steps.length - 2 ? 'Publish' : 'Next'}
                            </Button>}


                        />
                    }
                    {
                        activeStep === 1 && <><SelectFunnel
                            state={state}
                            setState={setState}
                            templateCategoryList={templateCategoryList}
                            templates={templates}
                            changeTemplate={changeTemplate}
                            action={<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button
                                    color="inherit"
                                    hidden={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                    variant="contained"
                                    className="mr-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    onClick={handleNext}>
                                    {activeStep === steps.length - 2 ? 'Publish' : 'Next'}
                                </Button>
                            </Box>}
                        /></>
                    }
                    {
                        activeStep === 2 && <><Publishd
                            formId={params}
                            state={state}
                            setState={setState}

                        /></>
                    }

                </React.Fragment>
            )}
        </Box>
    );
}
const mapStateToProps = (state) => {
    return {
        templateCategoryList:
            state.FormBuilderReducer?.templateCategories,
        templates: state.FormBuilderReducer?.templates,
        templateCategoryTypeList: state.FormBuilderReducer?.templateCategoryTypes
    };
};
export default connect(mapStateToProps, {
    GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN,
    GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN,
    GET_TEMPLATE
})(CreateFormstepper);
