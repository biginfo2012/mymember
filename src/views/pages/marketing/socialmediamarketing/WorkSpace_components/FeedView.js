import { Avatar, Card, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    GET_PAGE_INFO_DATA,
    GET_GROUP_INFO,
    GET_GROUP_INFO_DATA,
    GET_FB_PAGE,
    GET_FB_GROUP
} from "../../../../../redux/actions/marketing/socialMediaConnect"
import person_1 from "../../../../../assets/img/profile/pages/page-01.jpg"
import banner_1 from "../../../../../assets/img/slider/banner-1.jpg"
import FbComment from "./Comment"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

function FeedView(props) {
    const { GET_PAGE_INFO_DATA, GET_GROUP_INFO_DATA, getPageInfo, getGroupInfo, getPage,
        getGroup } = props


    const { type } = useParams()
    const [getPageData, setGetPageData] = useState();
    const [getGroupData, setGetGroupData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setGetPageData(getPageInfo)
        setGetGroupData(getGroupInfo)
    }, [getGroupInfo, getPageInfo])

    const pageName = sessionStorage.getItem("pageName")
    const getPageId = sessionStorage.getItem("getPageId");
    const getPageAccessToken = sessionStorage.getItem("getPageAccessToken");

    useEffect(() => {
        setIsLoading(true)
        GET_PAGE_INFO_DATA(getPageId, getPageAccessToken)
    }, [GET_PAGE_INFO_DATA])


    const getGroupId = sessionStorage.getItem("getGroupId")
    const getGroupAccessToken = sessionStorage.getItem("getGroupAccessToken")
    useEffect(() => {
        setIsLoading(true)
        GET_GROUP_INFO_DATA(getGroupId, getGroupAccessToken)
    }, [GET_GROUP_INFO_DATA])

    return (
        <div className="d-flex justify-content-center w-100 mt-1">
            <div style={{ width: "1200px" }}>
                <Grid spacing={2} container className="">
                    <Grid item sm={2} md={2} lg={2}>
                        <div className="mt-1">
                            <Avatar style={{ width: 150, height: 150 }} src={person_1} />
                            <h3>@_ajay</h3>
                            <h6>example@gmail.com</h6>
                        </div>
                    </Grid>
                    <Grid item sm={10} md={10} lg={10}>
                        <div style={{
                            height: "30vh",
                            border: "1px solid #a4a4a4",
                            boxShadow: '1px 2px 9px #babfc7',
                            backgroundSize: "cover",
                            backgroundImage: `url(${banner_1})`,
                        }}>
                        </div>
                        <Grid spacing={2} container className="mt-1">
                            {
                                getPageData?.data?.map((res) => {
                                    const pageTime = moment(res?.created_time).utc().format('MMMM Do, h:mm')
                                    return (
                                        <>
                                            <Grid item sm={8} md={8} lg={8}>
                                                <Card>
                                                    <div className="d-flex p-1">
                                                        <div className="fbUsers d-flex">
                                                            <Avatar style={{ width: "70px", height: "70px" }} />
                                                            <div className="nameAndTime ml-1">
                                                                <h4>{pageName}</h4>
                                                                <h5>{pageTime}</h5>
                                                            </div>
                                                        </div>
                                                        <div className="fbUsers">

                                                        </div>
                                                    </div>
                                                    <div className="text ml-1">
                                                        <p>{res?.message}</p>
                                                    </div>
                                                    <div style={{
                                                        height: "50vh",
                                                        border: "1px solid #a4a4a4",
                                                        boxShadow: '1px 2px 9px #babfc7',
                                                        backgroundSize: "cover",
                                                        backgroundImage: `url(${res?.full_picture})`,
                                                    }}>

                                                    </div>
                                                </Card>
                                            </Grid>

                                            <FbComment id={res?.id} />
                                        </>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        getFbToken: state?.facebookPage?.getFbToken,
        getPageInfo: state?.facebookPage?.getPageInfo,
        getGroupInfo: state?.facebookPage?.getGroupInfo,
        getPage: state?.facebookPage?.getPage,
        getGroup: state?.facebookPage?.getGroup,
    }
}

export default connect(mapStateToProps, {
    GET_PAGE_INFO_DATA,
    GET_GROUP_INFO,
    GET_GROUP_INFO_DATA,
    GET_FB_PAGE,
    GET_FB_GROUP
})(FeedView)