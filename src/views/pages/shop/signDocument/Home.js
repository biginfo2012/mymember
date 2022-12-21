import React, { useEffect, useRef, useState } from 'react';
import HomePdfViewer from './components/home-pdfViewer.js';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import TargetBox from './components/TargetBox';
import { Grid, List, ListItem, Typography, Card, CardContent, Divider, Select } from '@material-ui/core';
import MainAdditionalSigner from './components/addMMUSigner.js';
import AddAdditionalSigner from './components/Addinvite'
import MymeberSigner from './components/ListmymeberSigner.js';
import AdditonalSigner from './components/ListadditionalSigner'
import { ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER, REQUEST_USERS_FOR_SIGNATURE, SEND_INVITATION_TO_EMAIL_SIGNATURE } from '../../../../redux/actions/docuSign/index.js';
import { connect } from 'react-redux';
import HowToUseDocuSign from './components/howToUse.js';
// import { Select } from 'antd';
import doctImage1 from "../../../../images/DocWall-6.png"
import doctImage2 from "../../../../images/DocWall-5.png"
import doctImage3 from "../../../../images/DocWall-4.png"
import CircleIcon from '@mui/icons-material/Circle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ApprovalIcon from '@mui/icons-material/Approval';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import TitleIcon from '@mui/icons-material/Title';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import FunctionsIcon from '@mui/icons-material/Functions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import NotesIcon from '@mui/icons-material/Notes';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import MenuItem from '@mui/material/MenuItem';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
const { Option } = Select

const urlGStorage = process.env.REACT_APP_GOOGLE_STORAGE_PATH
// const demoPdf = 'https://storage.googleapis.com/mymember-storage/All-Images/30504871-c6d2-472c-b0b4-489b78c100eb-Test.pdf'
function Home(props) {
  const { setOpen, REQUEST_USERS_FOR_SIGNATURE, ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER, SEND_INVITATION_TO_EMAIL_SIGNATURE, signaturePDFLinkNIP, agreementType, setIslinksent2Email, userinformation } = props
  const [items, setItems] = useState(null);
  const [currentRecipients, setCurrentRecipients] = useState("Clinton Oh")
  const [dataAfterInviteUser, setDataAfterInviteUser] = useState(null)
  const [currentPage, setPage] = useState(1);
  const [startProcess, setStartprocess] = useState(false)
  const [addAdditionalUser, setAddAdditionalUser] = useState([])
  const [currentEmailToken, setCurrentEmailToken] = useState('')
  const topLevelRef = useRef(null)

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setCurrentRecipients(event.target.value);
  };
  const [heightAndWidth, setHeightAndWidth] = useState({
    height: 0,
    width: 0
  })
  const handleRecipients = (e) => {
    setCurrentRecipients(e)
  }
  const handleSubmitDate = async () => {
    if (items === null) return
    setStartprocess(true)
    let copyItems = { ...items };
    let viewed = [];

    for (let [key, value] of Object.entries(copyItems)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itm of v) {
          delete itm.component;
        }
      }
    }
    let emails = []

    for (let [key, value] of Object.entries(copyItems)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itmObj of v) {
          if (!emails?.includes(itmObj?.email)) {
            emails.push(itmObj?.email)
          }
          viewed.push({
            fullname: itmObj?.fullname,
            email: itmObj?.email,
            time: '',
            Status: 'Not seen',
            ipAddress: '',
            signer: itmObj?.signer === 'owner' ? 'Mymember' : 'Invite'
          })
        }
      }
    }
    let afterFilterView = viewed?.filter((v, i, a) => a.findIndex(t => (t?.email === v?.email)) === i)
    let payload = {
      items: copyItems,
      signDocFor: agreementType,
      signDocForId: signaturePDFLinkNIP?.Buy_MSId, // membership id or product id
      viewed: afterFilterView
    }
    let data = await REQUEST_USERS_FOR_SIGNATURE(payload)
    setDataAfterInviteUser(data?.data)
    if (data?.success) {
      let pdfLink = signaturePDFLinkNIP?.data?.split(urlGStorage)[1]
      let docLink = `${process.env.REACT_APP_BASE_URL}/docusign/sign/${data?.data?._id}/${pdfLink}/${data?.emailToken}`
      setCurrentEmailToken(data?.emailToken)
      let emailSendLinkPayload = { emails, docLink }
      let res = await SEND_INVITATION_TO_EMAIL_SIGNATURE(emailSendLinkPayload)
      if (res.success) {
        setIslinksent2Email(true)
      }
      setStartprocess(false)
      setOpen(false)
    } else {
      setStartprocess(false)
    }
  }

  const genrateSignature = () => {
    // eslint-disable-next-line no-undef
    if (userinformation?.signature !== undefined || userinformation?.signature !== '') {
      ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER(userinformation?.signature, userinformation)
      return
    }
    const sdfsd = require("text-image")
    var style = {
      font: 'system-ui',
      align: 'center',
      color: 'Black',
      size: 20,
      background: 'transparent',
      stroke: 1,
      strokeColor: 'rgba(0, 0, 0, 0)',
    };

    // eslint-disable-next-line no-undef
    var textImage = TextImage(style);
    let sign = textImage.toDataURL(userinformation?.firstname + '...');
    ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER(sign, userinformation)

  }
  useEffect(() => {
    setHeightAndWidth({
      height: topLevelRef.current.clientHeight,
      width: topLevelRef.current.clientWidth
    })
  }, [])

  useEffect(() => {
    if (userinformation !== null) {
      genrateSignature()
    }
  }, [userinformation])
  return (
    <div ref={topLevelRef}>
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={12} lg={12}>
            <Card className="shadow-sm h-100">
              <CardContent className='p-0'>
                <HowToUseDocuSign
                  // pdfUrl={demoPdf}
                  pdfUrl={urlGStorage + signaturePDFLinkNIP?.data?.split(urlGStorage)[1]}
                  setItems={setItems}
                  currentEmailToken={currentEmailToken}
                  dataAfterInviteUser={dataAfterInviteUser}
                  items={items}
                  startProcess={startProcess}
                  handleSubmitDate={handleSubmitDate} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={2} md={2} lg={2} className="pr-4">
            <div
              style={{
                borderRadius: "0.4em",
                height: "4vh",
                border: "1px solid #b8c2cc",
                width: "100%",
              }}
            >
              <Select
                fullWidth
                variant="outlined"
                value={currentRecipients}
                onChange={handleChange}

              >

                <MenuItem value="Clinton Oh"><CircleIcon style={{ color: "#fcd55a" }} className="mr-1" />Clinton Oh</MenuItem>
                <MenuItem value="Next Level MA Consulting LLC"><CircleIcon style={{ color: "#fcd55a" }} className="mr-1" />Next Level MA Consulting LLC</MenuItem>
                <MenuItem value="Mountian"><CircleIcon style={{ color: "#fcd55a" }} className="mr-1" />Mountian</MenuItem>

              </Select>
            </div>
          </Grid>
          <Grid item sm={10} md={10} lg={10}>
            <div style={{ backgroundColor: "gray", width: "100%" }}>

            </div>
          </Grid>
          {/* Old Side Bar */}
          {/* <Grid style={{ width: '100%' }} item sm={12} md={3} lg={3}>
            <Card className="h-100 shadow-sm">
              <CardContent>
                <List
                  style={{
                    position: "relative",
                    overflow: "auto",
                  }}
                  dense
                >
                  <ListItem className="pl-0 pr-0 d-flex justify-content-between align-items-center">
                    <Typography
                      style={{ color: "#0e0e0e" }}
                      className="mb-0"
                    >
                      <b>MYMEMBER USER</b>
                    </Typography>
                    <MainAdditionalSigner
                      color="#c43d4a"
                      buttonText="Add"
                      title="Add Mymember user"
                      id={1}
                      isEdit={false}
                    />
                  </ListItem>
                  <MymeberSigner ipAddress={signaturePDFLinkNIP?.ipAddress} />
                  <Divider />
                  <ListItem className="pl-0 pr-0 d-flex justify-content-between align-items-center">
                    <Typography
                      style={{ color: "#0e0e0e" }}
                      className="mb-0"
                    >
                      <b>ADDITIONAL SIGNER</b>
                    </Typography>
                    <AddAdditionalSigner
                      setAddAdditionalUser={setAddAdditionalUser}
                      addAdditionalUser={addAdditionalUser}
                      color="#c43d4a"
                      buttonText="Add"
                      title="Add Additional Signer"
                    />
                  </ListItem>
                  <AdditonalSigner addAdditionalUser={addAdditionalUser} />
                </List>
              </CardContent>
            </Card>
          </Grid> */}
          {/* <Grid item sm={10} md={10} lg={10}>
            <div className="d-flex justify-content-center">
              <TargetBox
                currentPage={currentPage}
                type="sign"
                setSignBtns={setItems}
                boxes={items}
                onDropItem={(item) => {
                  const copyItems = { ...items };
                  if (!copyItems[item.signer]) copyItems[item.signer] = {};
                  if (!copyItems[item.signer][currentPage])
                    copyItems[item.signer][currentPage] = [];
                  copyItems[item.signer][currentPage].push({ ...item, id: Date.now() });
                  setItems(copyItems);
                }}
              >
                <HomePdfViewer
                  ipAddress={signaturePDFLinkNIP?.ipAddress}
                  onPageChange={setPage}
                  setSignBtns={setItems}
                  signBtns={items}
                  // url={demoPdf}
                  width={heightAndWidth.width}
                  height={heightAndWidth.height}
                  url={urlGStorage + signaturePDFLinkNIP?.data?.split(urlGStorage)[1]}
                />
              </TargetBox>
            </div>
          </Grid> */}

          <Grid item sm={2} md={2} lg={2} className="pr-4">
            <Grid container spacing={1}>
              <Grid item sm={2} md={2} lg={2}>
                <Card style={{ backgroundColor: "#e9e9e9", minHeight: "93vh" }}>
                  <div className='d-flex justify-content-center mt-1'>
                    <BorderColorIcon />
                  </div>
                  <Divider />
                  <div className='d-flex justify-content-center'>
                    <ApprovalIcon />
                  </div>
                  <Divider />
                  <div className='d-flex justify-content-center'>
                    <CalendarTodayIcon />
                  </div>
                  <Divider />
                </Card>
              </Grid>
              <Grid item sm={10} md={10} lg={10}>
                <Card>
                  <List>
                    <ListItem >
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <BorderColorIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Signature</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <HourglassEmptyIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Initial</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <ApprovalIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Stamp</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <CalendarTodayIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Date Signed</p>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <PersonIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Name</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <EmailIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Email</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <BusinessIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Company</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <WorkIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Title</p>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <TitleIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Text</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <CheckBoxOutlinedIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Checkbox</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <ArrowDropDownCircleOutlinedIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>DropDown</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <RadioButtonCheckedIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Radio</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <PaymentsOutlinedIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Payment Item</p>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <FunctionsIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Formula</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <AttachFileIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Attachment</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <NotesIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Note</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <TaskAltIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Approve</p>
                    </ListItem>
                    <ListItem>
                      <div className='mr-1 ' style={{ backgroundColor: "#fcd55a", borderRadius: "4px", padding: "5px" }}>
                        <HighlightOffIcon />
                      </div>
                      <p style={{ fontSize: "16px" }}>Decline</p>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={10} md={10} lg={10}>
            <Grid container spacing={1}>
              <Grid item sm={10} md={10} lg={10}>
                <div className=''
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    maxHeight: "100vh",
                    minHeight: '100%',
                  }}
                >
                  <div className="d-flex justify-content-center w-100" >
                    <div className='mx-4 w-100'>
                      <img alt='' src={doctImage1} style={{ height: "100vh", width: "100%" }} />
                      <Divider />
                      <img alt='' src={doctImage2} style={{ height: "100vh", width: "100%" }} />
                      <Divider />
                      <img alt='' src={doctImage3} style={{ height: "100vh", width: "100%" }} />
                    </div>
                  </div>

                </div>

              </Grid>
              <Grid item sm={2} md={2} lg={2}>
                <div className=''
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    maxHeight: "100vh",
                    minHeight: '100%',
                  }}
                >
                  <div className="d-flex justify-content-center w-100" >
                    <div className=' w-100'>
                      <div className='d-flex m-1'>
                        <h4>1.</h4>
                        <img className='ml-1' alt='' src={doctImage1} style={{ height: "25vh", width: "100%" }} />
                      </div>
                      <div className='d-flex m-1'>
                        <h4>2.</h4>
                        <img className='ml-1' alt='' src={doctImage2} style={{ height: "25vh", width: "100%" }} />
                      </div>
                      <div className='d-flex m-1'>
                        <h4>3.</h4>
                        <img className='ml-1' alt='' src={doctImage3} style={{ height: "25vh", width: "100%" }} />
                      </div>
                      {/* <img alt='' src={doctImage2} style={{ height: "30vh", width: "100%" }} />
                      <img alt='' src={doctImage3} style={{ height: "30vh", width: "100%" }} /> */}
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DndProvider>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    signaturePDFLinkNIP: state.shop?.signaturePDFLinkNIP,
    userinformation: state.userinfo?.userinformation
  };
};
export default connect(mapStateToProps, { REQUEST_USERS_FOR_SIGNATURE, SEND_INVITATION_TO_EMAIL_SIGNATURE, ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER })(Home);
