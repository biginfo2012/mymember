import React, { useEffect, useState } from 'react';
import {
  Box,
  Tab,
  IconButton,
  Button,
  Grid,
  Dialog,
  DialogContent,
  Card,
  Typography
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./home-module.scss";
import Build from "./components/build.js";
import Settings from "./components/settings.js";
import { DesktopMac, TabletMac, PhoneIphone, LinkOutlined } from '@mui/icons-material';
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { ArrowBack, Save } from "@mui/icons-material";
import { useHistory, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { GET_FORM, GET_FORM_DATA, UPDATE_FORM_DATA } from "../../../redux/actions/form-builder/index"
import {
  GET_MEMBERSHIP_LIST,GET_PRODECT_FOLDER,
  GET_STUDENT_LIST,
} from "../../../redux/actions/shop";
import Publish from './components/QrCode';
import Downloadhtml from './components/Downloadhtml';
import {history} from "../../../history";

const Home = (props) => {
  const {
    GET_MEMBERSHIP_LIST,
    GET_STUDENT_LIST,
    GET_PRODECT_FOLDER,
    studentList,
    membershipList,
    productFolderList
  } = props;
  const [editor, setEditor] = useState(null);
  const history = useHistory()
  const dispatch = useDispatch()
  const getForm = useSelector((state) => {
    return state.FormBuilderReducer?.uform
  })

  const [form, setForm] = useState({})
  const [toggleStatus, setToggleStatus] = useState(false)
  // //Tabs
  // const [val, setVal] = useState("1");
  // const handleCh = (event, newVal) => {
  //   setVal(newVal);
  // };

  const showMobileView = (e) => {
    editor?.runCommand('set-device-mobile');
  }

  const showTabletView = (e) => {
    editor?.runCommand('set-device-tablet');
  }

  const showDesktopView = (e) => {
    editor?.runCommand('set-device-desktop');
  }

  const showFullscreenView = (e) => {
    editor?.runCommand('fullscreen')
  }

  //const [active, setActive] = useState(0)
  const toggleOff = (e) => {
    setToggleStatus(false)
    editor?.stopCommand('preview')
  }
  const toggleOn = (e) => {
    setToggleStatus(true)
    editor?.runCommand('preview')
  }

  const showPreview = () => {
    window.open("/builder/preview", '_blank');
  }

  const saveEditor = () => {
    if (editor) {
      const pathlength = window.location.pathname.split('/').length
      const formId = window.location.pathname.split("/")[pathlength - 1]
      let data = {
        "gjs-css": localStorage.getItem("gjs-css"),
        "gjs-html": localStorage.getItem("gjs-html"),
        "gjs-assets": localStorage.getItem("gjs-assets"),
        "gjs-styles": localStorage.getItem("gjs-styles"),
        "gjs-components": localStorage.getItem("gjs-components")
      }
      let html = editor.getHtml()
      let css = editor.getCss()
      let js = editor.getJs();
      // console.log(JSON.stringify(data));
      dispatch(UPDATE_FORM_DATA(formId, html, css, js, JSON.stringify(data)))
      setForm({
        formData: JSON.stringify(data)
      })
    }

  }


  useEffect(() => {
    let pathlength = window.location.pathname.split('/').length
    let formId = window.location.pathname.split('/')[pathlength - 1]
    console.log("getForm::", formId)
    dispatch(GET_FORM_DATA(formId))
    //setForm(getForm)

  }, [dispatch])

  useEffect(() => {
    setForm(getForm);
  }, [getForm]);

  useEffect(() => {

    GET_MEMBERSHIP_LIST();
    GET_STUDENT_LIST();
    GET_PRODECT_FOLDER();
  }, [GET_MEMBERSHIP_LIST, GET_STUDENT_LIST, GET_PRODECT_FOLDER]);


  return (
    <div className="App">
      <div className='topbar'>
        <div className='m-1'>
          <Button
            variant='contained'
            startIcon={<ArrowBack />}
            onClick={() => {
              history.goBack()
            }}
            sx={{
              border: '1px solid transparent',
              borderRadius: '12px'
            }}>back</Button>

          <Button variant='contained'
            className='tobbarbutton'
            onClick={(e) => showDesktopView()}>
            <DesktopMac /></Button>
          <Button
            className='tobbarbutton'
            variant='contained'
            onClick={(e) => showTabletView()}>
            <TabletMac />
          </Button>
          <Button
            className='tobbarbutton'
            variant='contained'
            onClick={(e) => showMobileView()}>
            <PhoneIphone />
          </Button>
          <Button
            className='tobbarbutton'
            variant='contained'
            onClick={(e) => showFullscreenView()}>
            <FullscreenIcon />
          </Button>
        </div>
        <div className='m-1 d-flex align-items-center'>
          <div
            style={{
              color: "#ffff",
              cursor: 'pointer'
            }}
            onClick={() => {showPreview()}}
          >
            Preview Form
            {/*{toggleStatus === false ?*/}
            {/*  <IconButton onClick={(e) => toggleOn(e)} style={{ color: "#ffff" }}>*/}
            {/*    <ToggleOffIcon fontSize="large" />*/}
            {/*  </IconButton>*/}
            {/*  :*/}
            {/*  <IconButton onClick={(e) => toggleOff(e)} style={{ color: "#ffff" }}>*/}
            {/*    <ToggleOnIcon fontSize="large" />*/}
            {/*  </IconButton>*/}
            {/*}*/}
          </div>
          <Button
            variant='contained'
            className='m-1'
            startIcon={<Save />}
            onClick={() => {
              saveEditor()
            }}
          >Save</Button>
        </div>
      </div>
      <Box sx={{ width: '100%', typography: 'body1', marginTop: '1em' }}>
        {/* <TabContext value={val}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleCh} aria-label="lab API tabs" centered>
              <Tab label="Builder" value="1" />
              <Tab label="Settings" value="2" />
              <Tab label="Publish" value="3" />

              <div style={{ marginTop: '10px', marginLeft: '250px' }}>

                <DesktopMac sx={{ marginLeft: '15px' }} onClick={(e) => showDesktopView()} />
                <TabletMac sx={{ marginLeft: '15px' }} onClick={(e) => showTabletView()} />
                <PhoneIphone sx={{ marginLeft: '15px' }} onClick={(e) => showMobileView()} />
                <FullscreenIcon sx={{ marginLeft: '15px' }} onClick={(e) => showFullscreenView()} />
              </div>
              <div style={{ lineHeight: '20px', position: 'absolute', right: 0 }}>
                Preview Form
                {toggleStatus === false ?
                  <IconButton onClick={(e) => toggleOn(e)}>
                    <ToggleOffIcon fontSize="large" />
                  </IconButton>
                  :
                  <IconButton onClick={(e) => toggleOff(e)}>
                    <ToggleOnIcon fontSize="large" />
                  </IconButton>
                }
              </div>
            </TabList>
          </Box>
          <TabPanel value="1">
            <Build editor={editor} setEditor={setEditor} form={form} studentList={studentList} membershipList={membershipList}/>
          </TabPanel>
          <TabPanel value="2">
            <Settings editor={editor} setEditor={setEditor} form={form}/>
          </TabPanel>
          <TabPanel value="3">
            <Publish editor={editor} setEditor={setEditor} />
          </TabPanel>
        </TabContext> */}
        <Build
          editor={editor}
          setEditor={setEditor}
          form={form}
          studentList={studentList}
          membershipList={membershipList}
          productFolderList={productFolderList}
        />
      </Box>
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    studentList: state.shop.studentList,
    membershipList: state.shop.membershipList,
    productFolderList: state.shop.getProdectfolder
  };
};

export default connect(mapStateToProps, {
  GET_STUDENT_LIST,
  GET_MEMBERSHIP_LIST,
  GET_PRODECT_FOLDER
})(Home);
