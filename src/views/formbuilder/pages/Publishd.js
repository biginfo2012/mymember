import {
  Toolbar, Typography,
  AppBar, List,
  ListItem,
  ListItemText, ListItemIcon,
  Tab, Icon, Button, Dialog, DialogContent, DialogTitle, IconButton
} from '@mui/material'
import React, { useState } from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Automation from "../../../../src/assets/img/Automation.png"
import Money from "../../../../src/assets/img/money.png"
import { ArrowBack, Settings } from '@mui/icons-material';
import Steps from './funnelsteps/Steps';
import { Plus, X } from "react-feather";
import Contact from "../pages/funnelsteps/Contact"
import Salses from "../pages/funnelsteps/Salses"
import Automations from "./funnelsteps/Automations"
import Setting from './funnelsteps/Setting';
import ConfirmationModal from '../../../components/gloabal/confirmation';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import {
  CREATE_FORM,
  CREATE_TEMPLATE_FORM,
  DELETE_FORM, DELETE_TEMPLATE_FORM,
  GET_SINGLE_FUNNLE,
  GET_TEMPLATE_DETAIL
} from '../../../redux/actions/form-builder';
import { toast } from "react-toastify";

const Publishd = (props) => {
  const drawerWidth = 300;
  const [val, setVal] = useState("1");
  const [activeStep, setActiveStep] = useState(0);
  const [modal, setModal] = useState(false);
  const [defaultAlert, setdefaultAlert] = React.useState(false)
  const [selected, setselected] = React.useState()
  const [data, setdata] = useState({})

  const history = useHistory()
  const { state, setState } = props

  const dispatch = useDispatch()
  const handleCh = (event, newVal) => {
    setVal(newVal);
  };

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

  const changeStep = (item) => {
    let list = [...state?.forms];
    setActiveStep(item);
    setState({
      ...state, formId: list[item]._id
    });
  };

  const removeStep = async (item) => {
    let formId = state?.forms[item]._id;
    let selectedFormId = state?.formId;
    if(props.isTemplate) {
      const res = await dispatch(DELETE_TEMPLATE_FORM(formId))
      showToast(res, "Remove Form Successfully");
      const request = await dispatch(GET_TEMPLATE_DETAIL(state?.templateId))

      if(formId == selectedFormId) {
        if(request.data.forms.length > 0) {
          selectedFormId = request.data.forms[0]._id
        } else {
          selectedFormId = null;
        }
      }
      await setState({
        ...state, forms: request.data.forms, formId: selectedFormId
      })

    } else {
      const res = await dispatch(DELETE_FORM(formId))
      showToast(res, "Remove Form Successfully");
      const request = await dispatch(GET_SINGLE_FUNNLE(state?._id))
      if(formId == selectedFormId) {
        if(request.data.forms.length > 0) {
          selectedFormId = request.data.forms[0]._id
        } else {
          selectedFormId = null;
        }
      }
      await setState({
        ...state, forms: request.data.forms, formId: selectedFormId
      })
    }


  };

  const addStep = () => {
    setModal(true);
  };
  const handlealert = (index) => {
    setdefaultAlert(true)
    setselected(index)
  }

  const showToast = (res, msg) => {
    console.log(res);
    let message = res.data.msg;
    if(msg) {
      message = msg;
    }
    if(res.data.success) {
      toast.success(message, toastCSS());
    } else {
      toast.error(message, toastCSS());
    }
  }
  const handlesubmit = async (e) => {
    e.preventDefault()
    let payload = {

      "title": data?.title
    }
    if(props.isTemplate) {
      payload.templateId = state?.templateId;
      const res = await dispatch(CREATE_TEMPLATE_FORM(payload))
      showToast(res, "Create Form Successfully");
      const request = await dispatch(GET_TEMPLATE_DETAIL(state?.templateId))
      await setState({
        ...state, forms: request.data.forms
      })
    } else {
      payload.funnelId = state?._id;

      const res = await dispatch(CREATE_FORM(payload))
      showToast(res, "Create Form Successfully");
      const request = await dispatch(GET_SINGLE_FUNNLE(state?._id))
      await setState({
        ...state, forms: request.data.forms
      })

    }
    setModal(false);

  }



  return (
    <div className="mt-1">
      <div>
        <Button
          onClick={() => {
            history.goBack()
          }}
          className="primary">
          <ArrowBack /> Back
        </Button>
      </div>
      <br />
      <TabContext value={val} className="w-100">
        <AppBar position="static">
          <Toolbar variant="dense"
            style={{
              background: "rgb(1, 132, 255)"
            }}
          >
            <Typography variant="h6" color="inherit" component="div"
              style={{
                width: drawerWidth,
                borderRight: '1px solid rgba(255, 255, 255, 0.38)',
              }}>
              {props.isTemplate? state.name: state?.funnelName}
            </Typography>
            <div className='w-100'>
              <TabList
                aria-label="lab API tabs"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#FFFF"
                  }
                }}
                onChange={handleCh}>
                <Tab
                  icon={<FormatListBulletedIcon fontSize='20px' />}
                  style={{
                    color: "#fff",
                    minWidth: "20%",
                    fontSize: "15px"
                  }}
                  indicatorcolor="#fff"
                  iconPosition="start" label="Step" value="1" />
                <Tab
                  style={{
                    color: "#fff",
                    minWidth: "20%",
                    fontSize: "15px"
                  }}
                  icon={<PeopleAltIcon />}
                  iconPosition="start" label="Contact" value="2" />
                <Tab
                  style={{
                    color: "#fff",
                    minWidth: "20%",
                    fontSize: "15px"
                  }}
                  icon={<Icon>
                    <img src={Money} />
                  </Icon>} iconPosition="start" label="Sales" value="3" />
                <Tab
                  style={{
                    color: "#fff",
                    minWidth: "20%",
                    fontSize: "15px"
                  }}
                  icon={<Icon>
                    <img src={Automation} />
                  </Icon>}
                  iconPosition="start" label="Automations"
                  value="4" />
                <Tab
                  style={{
                    color: "#fff",
                    minWidth: "20%",
                    fontSize: "15px"
                  }}
                  icon={<Settings />}
                  iconPosition="start" label="Settings"
                  value="5"
                />
              </TabList>
            </div>
          </Toolbar>
        </AppBar>

        <div className='d-flex'>
          <div
            style={{
              width: '330px'
            }}
            className='shadow mb-5 bg-white '
          >
            <div>
              <List>
                <ListItem className='steps py-1'>
                  <ListItemIcon className='mx-2'>
                    <FormatListBulletedIcon color="primary index" fontSize='20px' />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography color='primary' className="mb-0 title">
                      {props.isTemplate? "Template Steps": "Funnel Steps"}
                    </Typography>
                  </ListItemText>

                </ListItem>
                {state?.forms?.length > 0 && state?.forms?.map((step, index) => {
                  return (
                    <ListItem key={index}
                      className={`steps pt-1 ${activeStep == index
                        ? "active"
                        : ""
                        }`} onClick={() => changeStep(index)}>
                      <ListItemIcon className="left-background" >

                      </ListItemIcon>
                      <ListItemIcon className="mx-2" style={{
                        fontSize: "20px"
                      }}>
                        <Typography className="primarycolor mb-0 index" variant='h4'>
                          {index + 1}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography className="mb-0 font-weight-bold title">
                          {step.title}
                        </Typography>
                      </ListItemText>
                      <ListItemIcon
                        className={activeStep == index ? 'right-remove' : 'd-none'}
                        onClick={() => handlealert(index)}>
                        <X></X>
                      </ListItemIcon>
                    </ListItem>
                  );
                })}
              </List>
              <div className="w-100 p-1">
                <Button variant='contained' className='w-100 primary' onClick={() => addStep()}>
                  <Plus /> Add New Step
                </Button>
              </div>
            </div >
          </div>
          <div className='mt-1 ml-1 w-100'>
            <TabPanel value='1' className="p-0">
              <Steps formId={state?.formId}
                removeStep={removeStep}
                activeStep={activeStep} />
            </TabPanel>
            <TabPanel value='2' className="p-0">
              <Contact />
            </TabPanel>
            <TabPanel value='3' className="p-0">
              <Salses />
            </TabPanel>
            <TabPanel value='4' className="p-0">
              {/*change to implement automation logic*/}
              <Automations formId={state?.formId}/>
            </TabPanel>
            <TabPanel value='5' className="p-0">
              <Setting
                state={state}
                setState={setState}
              />
            </TabPanel>
          </div>
        </div>
      </TabContext>
      <Dialog open={modal}>
        <DialogTitle className='p-0'>
          <div className='d-flex justify-content-end'>
            <IconButton
              onClick={() => {
                setModal(!modal)
              }}>
              <X />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handlesubmit}>
            <div>
              <Typography>{props.isTemplate? "Name of template step": "Name of funnel step"}</Typography>
              <Input
                required
                className='' type='text' name="title"
                onChange={(e) => {
                  setdata({
                    ...data, title: e.target.value
                  })

                }} />
            </div>
            <div className='d-flex justify-content-end mt-1'>
              <Button type="submit" className="primary">Add Step</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaultAlert}
        title="Are you sure?"
        onConfirm={() => {
          removeStep(selected);
          setdefaultAlert(false)
        }}
        onCancel={() => {
          setdefaultAlert(!defaultAlert);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Yes"}
        description="Do you want to Remove this step ?"
      />
    </div>
  )
}

export default Publishd
