import { TabContext, TabPanel } from "@mui/lab";
import { Avatar, Card, Collapse, Grid, List, ListItem, Tab, Tabs } from "@mui/material";
import React, { Fragment, useState } from "react";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import AllReviews from "./AllReviews";
import NeedsResponce from "./NeedsResponce";
import NewReviews from "./NewReview";
import classnames from "classnames";
import { TabContent, TabPane } from "reactstrap";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Chip, Button, makeStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AddIcon from "@material-ui/icons/Add";
import { connect } from 'react-redux';
import { Dialog, DialogContent, Typography } from '@material-ui/core';
import { Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    activeMainFolder: {
        background: "#eaf4fe",
        maxHeight: "42px",
        "& button": {
            color: "#2796f3",
        },
    },
    inActiveFolder: {
        "&:hover": {
            background: "#eaf4fe",
        },
    },
    folderBtn: {
        background: "transparent",
        textTransform: "inherit !important",
        textAlign: "left",
        justifyContent: "start !important",
        "&:hover": {
            background: "unset",
        },
    },
    listWrapper: {
        width: "280px",
        background: "#fff",
        paddingTop: "0px",
        position: "relative",
        overflow: "scroll",
        minHeight: "100vh",
        borderRight: "2px solid #f8f8f8",
    },
    addMianFOlder: {
        color: "#fff",
        background: "#2796f3",
        fontWeight: "bold !important",
    },
}));



function Reputation() {
    const [activeTab, setActiveTab] = useState("1")
    const [activeSubTab, setActiveSubTab] = useState(0)
    const [open, setOpen] = useState(false);

    const handleFacebookOrGoogle = (event, newValue) => {
        // setOpen(!open)
        setActiveTab(newValue);
    };
    const handleChange = (newValue) => {
        setActiveSubTab(newValue);
    };
    const classes = useStyles();
    const [openSubFolderForm, setOpenSubFolderForm] = useState(false);
    const history = useHistory()
    return (
        <div>
            <BreadCrumbs
                breadCrumbTitle="Reputation"
                breadCrumbParent="Marketing"
                breadCrumbActive="Reputation"
            />
            <Card className="mt-1">
                <div className="d-flex justify-content-center align-items-center">
                    <Tabs
                        value={activeTab}
                        onChange={handleFacebookOrGoogle}
                    >
                        <Tab value={"1"} icon={<FacebookIcon style={{ fontSize: "40px" }} />} />
                        <Tab value={"2"} icon={<GoogleIcon style={{ fontSize: "40px" }} />} />
                    </Tabs>

                </div>
            </Card>
            {/* <TabContext value={activeTab} index={"1"}>
                <Grid spacing={2} container style={{ marginTop: "2px" }}>
                    <Grid item sm={2} md={2} lg={2}>
                        <Card>
                            <List dense style={{ minHeight: '82vh' }} className=' m-"1"'>
                                <ListItem button
                                    style={{ background: (activeTab === 1 ? "#eaf4fe" : "#fff"), color: (activeTab === 1 ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                                    className={`d-flex justify-content-between align-items-center m-0 ${classnames({
                                        active: activeTab === 1,
                                    })}`}
                                    onClick={() => handleChange(1)}
                                >
                                    <div className="d-flex">
                                        <Avatar />
                                        <h5 className="text-capitalize ml-1" style={{ color: (activeTab === 1 ? "#2796f3" : "#878787") }}>
                                            <b>Group 1</b>
                                        </h5>
                                    </div>
                                </ListItem>
                                <ListItem button
                                    style={{ background: (activeTab === 2 ? "#eaf4fe" : "#fff"), color: (activeTab === 2 ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                                    className={`d-flex justify-content-start m-0${classnames({
                                        active: activeTab === 2,
                                    })}`}
                                    onClick={() => handleChange(2)}>
                                    <div className="d-flex">
                                        <Avatar />
                                        <h5 className="text-capitalize ml-1" style={{ color: (activeTab === 2 ? "#2796f3" : "#878787") }}>
                                            <b>Group 2</b>
                                        </h5>
                                    </div>

                                </ListItem>
                                <ListItem button
                                    style={{ background: (activeTab === 3 ? "#eaf4fe" : "#fff"), color: (activeTab === 3 ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                                    className={`d-flex justify-content-start m-0${classnames({
                                        active: activeTab === 3,
                                    })}`}
                                    onClick={() => handleChange(3)}>
                                    <div className="d-flex align-items-center">
                                        <Avatar />
                                        <h5 className="text-capitalize ml-1" style={{ color: (activeTab === 3 ? "#2796f3" : "#878787") }}>
                                            <b>Group 3</b>
                                        </h5>
                                    </div>

                                </ListItem>

                            </List>
                        </Card>
                    </Grid>
                    <Grid item sm={10} md={10} lg={10}>
                        <TabContent activeTab={activeSubTab}>
                            <TabPane tabId={activeSubTab === 1 ? 1 : activeSubTab === 2 ? 2 : 3}>
                                <AllReviews groupNumber={activeSubTab === 1 ? "Group 1" : activeSubTab === 2 ? "Group 2" : "Group 3"} />
                            </TabPane>
                            <TabPane tabId="2">
                                <NewReviews />
                            </TabPane>
                            <TabPane tabId="3">
                                <NeedsResponce />
                            </TabPane>
                        </TabContent>
                    </Grid>
                </Grid>
            </TabContext> */}
            <TabContext value={activeTab} index={"2"}>
                <h1 >Hi My Name is Ajay Udayan</h1>
            </TabContext>

        </div >

        // <Fragment>

        //     <Fragment>
        //         <ListItem
        //             button
        //         >
        //             <Button
        //                 className={classes.folderBtn}
        //                 fullWidth
        //             // onClick={() => { handleClick(item?._id); handleFolderSubFolderValue({ folderName: item?.folderName }); handleFolderId({ folderId: item?._id }) }}
        //             >
        //                 <img
        //                     src={`/images/FolderM.png`}
        //                     alt={'Project'}
        //                 />
        //                 <span className="f-subname text-capitalize">
        //                     {/* {item?.folderName} */}
        //                 </span>
        //             </Button>
        //             {/* {open === item?._id ? <ExpandLess /> : <ExpandMore />} */}
        //             {/* <ListAction folderName={item?.folderName} folderId={item?._id} /> */}
        //         </ListItem>
        //         <Collapse
        //             timeout="auto" unmountOnExit>
        //             <List>
        //                 <ListItem
        //                     button
        //                 // onClick={() => {
        //                 //     history.subtaskFolderId = subitem?._id
        //                 //     handleFolderSubFolderValue({ subFolderName: subitem?.subFolderName, subFolderId: subitem?._id });
        //                 //     tableDataFilter(subitem)
        //                 // }}
        //                 // key={subitem?._id}
        //                 // className={history.subtaskFolderId === subitem?._id ? classes.activeMainFolder : classes.inActiveFolder}
        //                 >
        //                     <Button className={classes.folderBtn} fullWidth>
        //                         <div className="f-subname">
        //                             <img
        //                                 src="/images/FolderS.png"
        //                                 alt={'Project'}
        //                             />
        //                             <span className="f-subnam text-capitalize">
        //                                 {/* {subitem?.subFolderName} */}
        //                             </span>
        //                         </div>
        //                     </Button>
        //                     {/* <SubListAction subFolderName={subitem?.subFolderName} subFolderId={subitem?._id} /> */}
        //                 </ListItem>
        //             </List>
        //         </Collapse>
        //     </Fragment>
        // </Fragment >
    )
}
export default Reputation

