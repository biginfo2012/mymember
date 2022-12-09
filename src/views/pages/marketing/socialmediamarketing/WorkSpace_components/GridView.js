import { Button, Card, Chip, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import profile_2 from "../../../../../assets/img/pages/content-img-1.jpg"
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "../style.css"
import { GET_PAGE_INFO_DATA, GET_GROUP_INFO, GET_GROUP_INFO_DATA } from "../../../../../redux/actions/marketing/socialMediaConnect"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function GridView(props) {
    const { GET_PAGE_INFO_DATA, GET_GROUP_INFO_DATA, getPageInfo, getGroupInfo } = props

    const { type } = useParams()
    const [getPageData, setGetPageData] = useState();
    const [getGroupData, setGetGroupData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setGetPageData(getPageInfo)
        setGetGroupData(getGroupInfo)
    }, [getGroupInfo, getPageInfo])


    const getPageId = sessionStorage.getItem("getPageId");
    const getPageAccessToken = sessionStorage.getItem("getPageAccessToken");

    useEffect(() => {
        setIsLoading(true)
        GET_PAGE_INFO_DATA(getPageId, getPageAccessToken)
    }, [GET_PAGE_INFO_DATA,])


    const getGroupId = sessionStorage.getItem("getGroupId")
    const getGroupAccessToken = sessionStorage.getItem("getGroupAccessToken")
    useEffect(() => {
        setIsLoading(true)
        GET_GROUP_INFO_DATA(getGroupId, getGroupAccessToken)
    }, [GET_GROUP_INFO_DATA])

    return (
        <div className="d-flex justify-content-center w-100 mt-2">
            <div style={{ width: "1200px" }}>
                <Grid spacing={2} container>
                    {
                        type === "page" ?
                            isLoading ? getPageData?.data?.map((res) => {

                                return (
                                    <Grid item sm={3} md={3} lg={3} key={res?.id}>
                                        <Card
                                            style={{
                                                height: "30vh",
                                                backgroundSize: "cover",
                                                backgroundImage: `url(${res?.full_picture})`,
                                            }}>
                                            <div className="p-1" style={{ height: "5vh", background: "#000" }}>
                                                <p style={{ color: "#fff" }}>{res?.message}</p>
                                            </div>
                                            <div className="d-flex justify-content-end" style={{ marginBottom: "10px", marginRight: "10px", marginTop: "20vh" }}>
                                                <div className="gridView-icon" style={{ backgroundColor: "#71cb67" }}>
                                                    <CheckIcon fontSize="medium" style={{ color: "#fff" }} />
                                                </div>
                                                <div className="gridView-icon" style={{ backgroundColor: "#1976d2", marginLeft: "10px" }}>
                                                    <AccessTimeIcon fontSize="medium" style={{ color: "#fff" }} />
                                                </div>
                                            </div>
                                        </Card>
                                    </Grid>
                                )
                            })
                                :
                                <CircularProgress disableShrink />
                            :
                            isLoading ?
                                getGroupData?.data?.map((res) => {
                                    return (
                                        <Grid item sm={3} md={3} lg={3} key={res?.id}>
                                            <Card
                                                style={{
                                                    height: "30vh",
                                                    backgroundSize: "cover",
                                                    backgroundImage: `url(${res?.full_picture})`,
                                                }}>
                                                <div className="p-1" style={{ height: "5vh", background: "#000" }}>
                                                    <p style={{ color: "#fff" }}>{res?.message}</p>
                                                </div>
                                                <div className="d-flex justify-content-end" style={{ marginBottom: "10px", marginRight: "10px", marginTop: "20vh" }}>
                                                    <div className="gridView-icon" style={{ backgroundColor: "#71cb67" }}>
                                                        <CheckIcon fontSize="medium" style={{ color: "#fff" }} />
                                                    </div>
                                                    <div className="gridView-icon" style={{ backgroundColor: "#1976d2", marginLeft: "10px" }}>
                                                        <AccessTimeIcon fontSize="medium" style={{ color: "#fff" }} />
                                                    </div>
                                                </div>
                                            </Card>
                                        </Grid>
                                    )
                                })
                                :
                                <CircularProgress disableShrink />
                    }
                </Grid>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        getFbToken: state?.facebookPage?.getFbToken,
        getPageInfo: state?.facebookPage?.getPageInfo,
        getGroupInfo: state?.facebookPage?.getGroupInfo,
    };
};
export default connect(mapStateToProps, {
    GET_GROUP_INFO_DATA,
    GET_PAGE_INFO_DATA,
    GET_GROUP_INFO,
})(GridView);

