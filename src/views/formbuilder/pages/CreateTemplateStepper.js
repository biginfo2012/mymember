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
  CREATE_TEMPLATE,
  CREATE_TEMPLATE_FORM,
  GET_TEMPLATE_DETAIL
} from '../../../redux/actions/form-builder';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import TemplateInformation from "./TemplateInformation";

const steps = ['Template Information', 'Publish'];

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

const CreateTemplateStepper = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [state, setState] = React.useState(
        {
            "name": "",
            "categoryId": "",
            "image": "",
            "description": ""
        }
    )
    const [activeStep, setActiveStep] = React.useState(0);
    const [error, seterror] = React.useState({})
    const history = useHistory()

    const getselectedformdata = async (state) => {
        const request = await dispatch(GET_TEMPLATE_DETAIL(state?._id))
        await setState(request?.data)
    }

    React.useEffect(() => {
        if (history?.location?.state !== undefined) {
            getselectedformdata(history?.location?.state)

        }

    }, [history.location?.state])

    const getTemplateInfo = async() => {
      if (params?.id) {
        const request = await dispatch(GET_TEMPLATE_DETAIL(params?.id))
        await setState({
          ...state,
          forms: request.data.forms,
          templateId: params?.id,
          name: request.data.name,
          categoryId: request.data.categoryId,
          description: request.data.description,
          image: request.data.thumbnail
        })
        setActiveStep(1)
      } else {
        setActiveStep(0)
      }
    }

    React.useEffect( () => {
        getTemplateInfo()
    }, []);

    const handleNext = async () => {
        if (activeStep === 0) {
            const valid = await validationfornext()
            const keys = await Object.keys(valid)
            if (keys?.length > 0) {

            } else {
                let formData = new FormData();
                console.log(state.file)
                formData.append("file", state.file)
                formData.append("name", state.name);
                formData.append("categoryId", state.categoryId)
                formData.append("description", state.description)
                const res = await dispatch(CREATE_TEMPLATE(formData))
                if (res.success == false) {
                  toast.error(res.msg, toastCSS());
                  return
                } else {
                  toast.success("Create Template successfully", toastCSS());
                }
                let payload = {
                  "title": "Form"
                }

                payload.templateId = res.templateId;
                await dispatch(CREATE_TEMPLATE_FORM(payload))
                const request = await dispatch(GET_TEMPLATE_DETAIL(res.templateId))
                await setState({
                  ...state, forms: request.data.forms, templateId: res.templateId, formId: request.data.forms[0]._id
                })

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };



    const validationfornext = () => {
        const data = { ...error }
        if (state?.name.trim().length === 0) {
            data["name"] = 'Template Name is required'
        }
        if (state?.categoryId.trim().length === 0) {
            data["categoryId"] = 'Category is required'
        }

        if (state?.image.trim().length === 0) {
          data["image"] = 'Thumbnail is required'
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
                        activeStep === 0 && <TemplateInformation
                            state={state}
                            setState={setState}
                            error={error}
                            action={<Button
                                variant="contained"
                                type="submit"
                                onClick={handleNext}>
                                {activeStep === 0 ? 'Create' : 'Publish'}
                            </Button>}


                        />
                    }

                    {
                        activeStep === 1 && <><Publishd
                            isTemplate={true}
                            state={state}
                            setState={setState}

                        /></>
                    }

                </React.Fragment>
            )}
        </Box>
    );
}
export default CreateTemplateStepper;
