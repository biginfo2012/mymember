import React, { useEffect, useRef, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Grid, Chip, List, ListItem, Card, Button, Menu, CardContent, Select } from '@material-ui/core';
import { connect } from 'react-redux';
// import HowToUseDocuSign from './components/howToUse.js';
import { useHistory } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
import PerfectScrollbar from "react-perfect-scrollbar"
import MenuItem from '@mui/material/MenuItem';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import { Divider } from '@mui/material';
const { Option } = Select

const urlGStorage = process.env.REACT_APP_GOOGLE_STORAGE_PATH
function DocumentSign(props) {
    const { setOpen, setOpenCreateRecipient, REQUEST_USERS_FOR_SIGNATURE, SEND_INVITATION_TO_EMAIL_SIGNATURE, setOpenDocuSign, signaturePDFLinkNIP, agreementType, setIslinksent2Email, } = props
    const [items, setItems] = useState(null);
    const [currentRecipients, setCurrentRecipients] = useState("Clinton Oh")
    const [dataAfterInviteUser, setDataAfterInviteUser] = useState(null)
    const [startProcess, setStartprocess] = useState(false)
    const [currentEmailToken, setCurrentEmailToken] = useState('')
    const topLevelRef = useRef(null)
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleChange = (event) => {
        setCurrentRecipients(event.target.value);
    };
    const handleCloseCreate = () => {
        setOpenDocuSign(false)
        setOpenCreateRecipient(false)
    };


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
    return (
        <div ref={topLevelRef}>
            <DndProvider backend={HTML5Backend}>
                <Grid container spacing={1}>
                    <Grid item sm={12} md={12} lg={12}>
                        <Card className="shadow-sm h-100">
                            <CardContent className='p-0'>
                                {/* <HowToUseDocuSign
                                    // pdfUrl={demoPdf}
                                    pdfUrl={urlGStorage + signaturePDFLinkNIP?.data?.split(urlGStorage)[1]}
                                    setItems={setItems}
                                    currentEmailToken={currentEmailToken}
                                    dataAfterInviteUser={dataAfterInviteUser}
                                    items={items}
                                    startProcess={startProcess}
                                    handleSubmitDate={handleSubmitDate} /> */}
                                <div className='p-1'>
                                    <Grid container spacing={2}>
                                        <Grid item sm={6} md={6} lg={6}>
                                            <div className='d-flex'>
                                                <Chip onClick={
                                                    // history.fromback = true
                                                    // history.goBack()
                                                    handleCloseCreate
                                                }
                                                    label='Back'
                                                    icon={<ArrowBackIcon color='secondary' />}
                                                />
                                                <Button
                                                    className='ml-1'
                                                    startIcon={<CloseIcon />}
                                                    variant='outlined'
                                                    style={{ color: "#c94d59", borderColor: "#c94d59" }}
                                                    onClick={
                                                        // () => setOpenDocuSign(false)
                                                        handleCloseCreate
                                                    }
                                                // color='secondary'
                                                >

                                                    Close
                                                </Button>
                                            </div>
                                        </Grid>
                                        <Grid item sm={6} md={6} lg={6}>
                                            <div className='d-flex justify-content-end align-items-center'>
                                                <div>
                                                    <Button
                                                        onClick={handleClick}
                                                        style={{ color: "black" }}
                                                    >
                                                        Action<KeyboardArrowDownIcon fontSize='small' />
                                                    </Button>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleClose}>Edit Recipients</MenuItem>

                                                    </Menu>
                                                </div>
                                                <Button
                                                    className="ml-2"
                                                    style={{
                                                        color: "#6b6b6b",
                                                        height: 40,
                                                        borderRadius: "4px",
                                                        width: "100px",
                                                        border: "1px solid #b8c2cc",
                                                    }}
                                                // onClick={props?.handleClose}
                                                >
                                                    Preview
                                                </Button>
                                                <Button
                                                    className="ml-2"
                                                    style={{
                                                        color: "#fff",
                                                        height: 40,
                                                        background: "#0184FF",
                                                        borderRadius: "4px",
                                                        width: "90px",
                                                    }}
                                                // onClick={props?.handleClose}
                                                >
                                                    Send
                                                </Button>

                                            </div>
                                        </Grid>

                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={2} md={2} lg={2} className="">
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
                        <div className="d-flex justify-content-center" style={{ marginRight: "15em" }}>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="d-flex mx-1" style={{ borderRight: "1px solid #0000" }}>
                                    <UndoIcon fontSize='medium' />
                                    <RedoIcon fontSize='medium' />
                                </div>
                                <div className="d-flex mx-1">
                                    <ContentCopyIcon fontSize='medium' />
                                    <ContentPasteIcon fontSize='medium' />
                                </div>
                                <div className="d-flex align-items-center mx-1">
                                    <p className='mt-1'>200%</p>
                                    <ArrowDropDownIcon fontSize='medium' />
                                </div>
                                <div className='mx-1'>
                                    <MarkChatUnreadOutlinedIcon fontSize='medium' />
                                </div>
                            </div>
                            <Divider />
                        </div>

                    </Grid>
                    <Grid item sm={2} md={2} lg={2} className="">
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
                    <Grid item sm={8} md={8} lg={8}>

                        <div className=''
                            style={{
                                overflow: "scroll",
                                whiteSpace: "nowrap",
                                // overflowX: "hidden",
                                maxHeight: "100vh",
                                minHeight: '100%',
                            }}
                        >
                            {/* <PerfectScrollbar
                            className=" "
                            options={{
                                wheelPropagation: false
                            }}
                        > */}
                            <div className="d-flex justify-content-center w-100" >
                                <div className='w-100'>
                                    <div className='d-flex justify-content-center'>
                                        <img alt='' src={doctImage3} style={{ height: "90vh", width: "90%" }} />
                                    </div>
                                    <Divider />
                                    <img alt='' src={doctImage2} style={{ height: "90vh", width: "90%" }} />
                                    <Divider />
                                    <img alt='' src={doctImage1} style={{ height: "90vh", width: "90%" }} />
                                </div>
                            </div>
                            {/* </PerfectScrollbar> */}
                        </div>
                    </Grid>
                    <Grid item sm={2} md={2} lg={2} >
                        <div className='w-100'
                            style={{
                                overflow: "scroll",
                                whiteSpace: "nowrap",
                                // overflowX: "hidden",
                                maxHeight: "100vh",
                                minHeight: '100%',
                            }}
                        >
                            <div className="d-flex justify-content-center w-100" >
                                <div className='w-100 '>
                                    <div className='d-flex justify-content-center'>
                                        <h4>1.</h4>
                                        <img className='' alt='' src={doctImage1} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <h4>2.</h4>
                                        <img className='' alt='' src={doctImage2} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <h4>3.</h4>
                                        <img className='' alt='' src={doctImage3} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <h4>1.</h4>
                                        <img className='' alt='' src={doctImage1} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <h4>2.</h4>
                                        <img className='' alt='' src={doctImage2} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <h4>3.</h4>
                                        <img className='' alt='' src={doctImage3} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <h4>1.</h4>
                                        <img className='' alt='' src={doctImage1} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <h4>2.</h4>
                                        <img className='' alt='' src={doctImage2} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <h4>3.</h4>
                                        <img className='' alt='' src={doctImage3} style={{ height: "25vh", width: "70%" }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Grid>
                </Grid>
            </DndProvider>
        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        signaturePDFLinkNIP: state.shop?.signaturePDFLinkNIP,
        userinformation: state.userinfo?.userinformation
    };
};
export default connect(mapStateToProps, null)(DocumentSign);
