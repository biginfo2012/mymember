import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    Chip,
    Grid,
    Input,
    Menu,
    MenuItem,
    Tab,
    Tabs,
} from "@mui/material";
import React, { useCallback, useDebugValue, useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AddPhotoAlternateOutlined } from "@material-ui/icons";
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { toast } from "react-toastify";
import {
    AvTimerRounded,
    ClearSharp,
    ExpandMore,
    GifBoxOutlined,
    LegendToggleOutlined,
    LocationOnOutlined, RadarOutlined, SentimentSatisfiedSharp, TodayOutlined
} from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FeedView from "./FeedView";
import GridView from "./GridView";
import CalendarView from "./CalendarView";
import person_1 from "../../../../../assets/img/profile/pages/page-01.jpg"
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import {
    GET_PAGE_INFO_DATA,
    FB_POST_DATA,
    FB_POST_TEXT_DATA,
    FB_IMAGE_UPLOAD,
    FB_GROUP_DATA,
    GET_PAGE_DATA,
    GET_GROUP_DATA,
} from "../../../../../redux/actions/marketing/socialMediaConnect"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export const notifySuccess = (message) =>
    toast(<p style={{ fontSize: 16 }}>{message}</p>, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        type: "success"
    });

export const notifyError = (message) =>
    toast(<p style={{ fontSize: 16 }}>{message}</p>, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        type: "error"
    });

function WorkSpace(props) {
    const { getPage, getGroup, getPageInfo, GET_PAGE_INFO_DATA, FB_POST_DATA, FB_GROUP_DATA, FB_POST_TEXT_DATA, GET_PAGE_DATA, GET_GROUP_DATA, getUplaodImage } = props
    const [value, setValue] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewType, setViewType] = useState("Grid View")
    const [getPageData, setGetPageData] = useState(getPageInfo)
    const [openModal, setOpenModel] = React.useState(false);
    const [postText, setPostText] = useState("");
    const [postedTime, setPostedTime] = useState(new Date())
    const [trueAndFalse, setTrueAndFalse] = useState(false)
    console.log(getPage)

    const { type } = useParams()
    const history = useHistory()

    const getPageId = sessionStorage.getItem("getPageId")
    const getPageAccessToken = sessionStorage.getItem("getPageAccessToken")
    const getGroupId = sessionStorage.getItem("getGroupId")
    const getGroupAccessToken = sessionStorage.getItem("getGroupAccessToken")

    useEffect(() => {
        GET_PAGE_INFO_DATA(getPageId, getPageAccessToken)
    }, [GET_PAGE_INFO_DATA])

    useEffect(() => {
        GET_GROUP_DATA(getPageId, getPageAccessToken)
        GET_PAGE_DATA(getGroupId, getGroupAccessToken)
    }, [GET_GROUP_DATA, GET_PAGE_DATA])

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleViewType = (viewType) => {
        setViewType(viewType)
        setAnchorEl(null)
    }

    const handleClickOpen = () => {
        setOpenModel(true);
    };

    const handleClose = () => {
        setOpenModel(false);
    };

    const handleUpload = async (e) => {
        const formData = new FormData();
        const files = await e?.target?.files
        const file = files?.length && files.item(0);
        formData.append('img', file);
        await props.FB_IMAGE_UPLOAD(formData)

    }

    const handleTextMessage = (e) => {
        setPostText(e.target.value)
    }

    const handleSubmitPost = async (responseData) => {
        if (responseData) {
            if (type === "page") {
                getUplaodImage?.success === true ?
                    await FB_POST_DATA(type === "page" ? getPageId : getGroupId,
                        type === "page" ? getPageAccessToken : getGroupAccessToken,
                        getUplaodImage?.data,
                        postText,
                        Math.floor(postedTime.getTime() / 1000)
                    )
                    :
                    await FB_POST_TEXT_DATA(
                        type === "page" ? getPageId : getGroupId,
                        type === "page" ? getPageAccessToken : getGroupAccessToken,
                        postText,
                    )
                notifySuccess("Data posted successfully");
                setOpenModel(false);


            } else {
                getUplaodImage?.success === true ?
                    await FB_GROUP_DATA(
                        type === "page" ? getPageId : getGroupId,
                        type === "page" ? getPageAccessToken : getGroupAccessToken,
                        getUplaodImage?.data ? getUplaodImage?.data : "",
                        postText,
                    )
                    :
                    await FB_POST_TEXT_DATA(
                        type === "page" ? getPageId : getGroupId,
                        type === "page" ? getPageAccessToken : getGroupAccessToken,
                        postText,
                    )
                notifySuccess("Data posted successfully");
                setOpenModel(false);
            }

        } else {
            notifyError("Data Error");
        }
    }

    const handleDateChange = (date) => {
        setPostedTime(date);
        console.log(postedTime);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mt-0">
                <div className="d-flex">
                    <Chip onClick={() => {
                        history.fromback = true
                        history.goBack()
                    }} label='Back' icon={<ArrowBackIcon color='secondary' />} />
                    <h2 className="ml-1 content-header-title float-left mb-0" >
                        {
                            type === "page" ? <>Page Workspace</> : <>Group Workspace</>
                        }
                    </h2>
                </div>
                <AvatarGroup total={5}>
                    <Avatar alt="Remy Sharp" src={person_1} />
                    <Avatar alt="Travis Howard" src={person_1} />
                    <Avatar alt="Agnes Walker" src={person_1} />
                    <Avatar alt="Trevor Henderson" src={person_1} />
                </AvatarGroup>
            </div>
            <Card className="mt-1">
                <Grid spacing={2} container className="d-flex align-items-center">
                    <Grid item sm={5} md={5} lg={5}>
                        <div>
                            <div className="d-flex align-items-end ml-1">
                                <Button style={{ textTransform: 'none', color: "#636363", fontSize: "16px" }} onClick={handleClick}>
                                    {viewType}{<KeyboardArrowDownIcon fontSize="small" style={{ color: "#636363" }} />}
                                </Button>
                            </div>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => handleViewType("Feed View")}>Feed View</MenuItem>
                                <MenuItem onClick={() => handleViewType("Calendar View")}>Calendar View</MenuItem>
                                <MenuItem onClick={() => handleViewType("Grid View")}>Grid View</MenuItem>
                            </Menu>
                        </div>

                    </Grid>
                    <Grid item sm={7} md={7} lg={7}>
                        <div className="d-flex justify-content-between align-items-center">
                            <Tabs
                                value={value}
                            >
                                <Tab value={1} label={`facebook`} icon={<FacebookIcon style={{ fontSize: "40px" }} />} />
                                <Tab value={2} icon={<GoogleIcon style={{ fontSize: "40px" }} />} />
                            </Tabs>
                            <Button
                                onClick={handleClickOpen}
                                startIcon={<BorderColorTwoToneIcon size={20} />}
                                className="mr-1 p-1"
                                style={{
                                    color: "#fff",
                                    height: 40,
                                    background: "#71cb67",
                                    borderRadius: "4px",
                                    width: "auto",
                                }}
                            >
                                <b> Compose</b>
                            </Button>
                        </div>
                    </Grid>
                    <Dialog
                        open={openModal}
                        className="modelWrapper"
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="clearShape" onClick={handleClose}>
                            <ClearSharp />
                        </div>
                        <DialogTitle id="alert-dialog-title">
                            <Avatar
                                variant="rounded"
                                style={{ background: "rgb(214, 26, 127)", color: "#fff" }}
                            >
                                M
                            </Avatar>
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <input
                                    placeholder="Write something... or type :balloon: to insert a 🎈"
                                    type="text"
                                    className="inputMessage"
                                    value={postText}
                                    onChange={handleTextMessage}
                                />
                            </DialogContentText>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <Label htmlFor="file" onClick={handleUpload}>
                                        <AddPhotoAlternateOutlined className="fbIcons" />
                                    </Label>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleUpload}
                                    />
                                    <Label>
                                        <GifBoxOutlined className="fbIcons" />
                                    </Label>
                                    <LegendToggleOutlined className="fbIcons" />
                                </div>
                                <div className="d-flex">
                                    <LocationOnOutlined className="fbIcons" />
                                    <RadarOutlined className="fbIcons" />
                                    <SentimentSatisfiedSharp className="fbIcons" />
                                </div>
                            </div>
                        </DialogContent>

                        <div className="">
                            {/* <div className="clearImgShape">
                                <ClearSharp />
                            </div> */}
                            {
                                getUplaodImage?.success === true ?
                                    <img src={getUplaodImage?.data} alt="" style={{ width: "500px", height: "200px", marginBottom: "20px", marginLeft: "25px" }} />
                                    :
                                    ""
                            }
                        </div>
                        {
                            type === "page" ?
                                <div className="dialogAction d-flex justify-content-between">
                                    <div className="scheduler d-flex">
                                        <AvTimerRounded style={{ fontSize: "40px", marginLeft: "5px", marginTop: "15px", color: "#858585" }} />
                                        <div>
                                            <Label htmlFor="startDate">Start Date & time</Label>
                                            <DatePicker
                                                selected={postedTime}
                                                onChange={(date) => {
                                                    handleDateChange(date);
                                                }}
                                                showTimeSelect
                                                id="startDate"
                                                timeIntervals={15}
                                                timeFormat="p"
                                                className="form-control mb-1"
                                                dateFormat="MM/d/yyyy h:mm aa"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="fbPostsaveBtn" onClick={handleSubmitPost}>Save</button>
                                </div>
                                :
                                <div className="dialogAction d-flex justify-content-between">
                                    <div>
                                    </div>
                                    <button type="submit" className="fbPostsaveBtn mb-1 text-center" style={{ paddingLeft: "25px" }} onClick={handleSubmitPost}>Save</button>
                                </div>
                        }
                    </Dialog>
                </Grid>
            </Card>
            {viewType === "Feed View" ? <FeedView /> : viewType === "Calendar View" ? <CalendarView /> : <GridView getPageData={getPageData} />}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        getPageInfo: state?.facebookPage?.getPageInfo,
        getUplaodImage: state?.facebookPage?.getUplaodImage,
        getPage: state?.facebookPage?.getPage,
        getGroup: state?.facebookPage?.getGroup,
        getUserData: state?.facebookPage?.getUserData
    };
};
export default connect(mapStateToProps, {
    // GET_FB_LOGIN,
    FB_GROUP_DATA,
    FB_IMAGE_UPLOAD,
    GET_PAGE_DATA,
    GET_GROUP_DATA,
    GET_PAGE_INFO_DATA,
    FB_POST_DATA,
    FB_POST_TEXT_DATA
})(WorkSpace);


