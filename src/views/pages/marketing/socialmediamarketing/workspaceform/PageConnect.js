import { Store } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Facebook, Flag, Plus, Star, Users } from "react-feather";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Dialog } from "@material-ui/core";
import noComment from "../../../../../assets/img/social/no-pages.svg";
import { Box, Chip } from "@mui/material";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Google } from "@mui/icons-material";
import {
  FB_LOGIN,
  GET_PAGE_DATA,
  GET_PAGE_INFO,
  GET_PAGE_INFO_DATA,
  GET_GROUP_INFO,
  GET_GROUP_INFO_DATA,
  GET_GROUP_DATA,
  GET_ME_INFO,
} from "../../../../../redux/actions/marketing/socialMediaConnect";
import { connect } from "react-redux";
import "../style.css";
import axios from "axios";
import GoogleAuthLogin from "./GoogleLogin";
import { Link } from "react-router-dom";

function PageConnect(props) {
  const {
    getFbToken,
    getPage,
    getGroup,
    getPageInfo,
    getGroupInfo,
    FB_LOGIN,
    GET_PAGE_DATA,
    GET_PAGE_INFO_DATA,
    GET_GROUP_INFO_DATA,
    GET_GROUP_DATA,
    GET_ME_INFO
  } = props;

console.log(getFbToken)

  const [state, setState] = useState(false);
  const [value, setValue] = useState("1");
  const [isData, setIsData] = useState("")
  const [userName, setUserName] = useState()
  const history = useHistory();


  useEffect(() => {
    FB_LOGIN();
    GET_ME_INFO(getFbToken?.userID)
  }, [FB_LOGIN, GET_ME_INFO]);

  const handlePageClick = async (data) => {
    await GET_PAGE_DATA(getFbToken?.userID, getFbToken?.accessToken);

  };
  const handleGroupClick = async () => {
    await GET_GROUP_DATA(getFbToken?.userID, getFbToken?.accessToken);
  };

  const handleConnectPage = async (data) => {
    setIsData("page")
    await GET_PAGE_INFO_DATA(data?.id, data?.access_token);
    sessionStorage.setItem('getPageId', data?.id)
    sessionStorage.setItem('getPageAccessToken', data?.access_token)
    history.push(`/app/marketing/social-media-connecting/page`)
  }

  const handleConnectGroup = async (data) => {
    setIsData("group")
    await GET_GROUP_INFO_DATA(data?.id, getFbToken?.accessToken);
    sessionStorage.setItem("getGroupId", data?.id)
    sessionStorage.setItem("getGroupAccessToken", getFbToken?.accessToken)
    // history.push(`/app/marketing/social-media-connecting/group`)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleModal = () => {
    window.FB.api(
      `/me?access_token=${getFbToken?.accessToken}`,
      'GET',
      function (response) {
        setUserName(response);
      }
    );
    setState(true);
  };

  const toggleClose = () => {
    setState(false);
  };

  return (
    <>
      <Chip
        onClick={() => {
          history.fromback = true;
          history.goBack();
        }}
        label="Back"
        icon={<ArrowBackIcon color="secondary" />}
      />
      <div className="p-1">
        <select
          style={{
            width: "100px",
            padding: "5px",
            background: "#fff",
            borderRadius: "5px",
          }}
        >
          <option>Name</option>
          <option>Name</option>
          <option>Name</option>
        </select>
      </div>
      <div className="page-connect-main d-flex justify-content-center">
        <div className="mt-5 text-center">
          <img src={noComment} alt="no data found" />
          <h1 className="mt-1">No pages connected yet</h1>
          <p>Get started by connecting your pages, or invite collaborators.</p>

          <button onClick={toggleModal} className="mt-2 btn btn-primary">
            Connect your pages
          </button>
        </div>
      </div>

      <Dialog open={state} maxWidth="lg">
        <Box
          sx={{ width: "100%", typography: "body1" }}
          style={{ width: "100vh" }}
        >
          <button
            onClick={toggleClose}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "none",
              border: "none",
              zIndex: "9999",
            }}
          >
            X
          </button>
          <TabContext value={value}>
            <h3 className="d-flex justify-content-center mt-1">
              Add pages to {userName?.name}
            </h3>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab icon={<Facebook />} aria-label="phone" value="1" />
                <Tab icon={<Google />} aria-label="favorite" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Row>
                {
                  getPage?.map((data) => {
                    sessionStorage.setItem("pageName", data?.name)
                    return (
                      <Col sm="3" key={data?.id}>
                        <Card className="socialCard" onClick={() => handleConnectPage(data)}>
                          <div className="social_icons">
                            <Flag style={{ width: "15px" }} />
                          </div>
                          <CardBody className="text-center">
                            <div className="d-flex justify-content-center firstString">
                              <h4>{data?.name[0]}</h4>
                            </div>
                            <h5>{data?.name}</h5>
                            <p style={{ color: "gray" }}>{data?.category}</p>
                          </CardBody>
                          <div
                            className="connect d-flex"
                          >
                            <Plus style={{ width: "18px" }} />
                            <p >Connect</p>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                {
                  getGroup?.data?.map((item) => {
                    sessionStorage.setItem("groupName", item?.name)
                    if (item?.privacy === "OPEN") {
                      return (
                        <Col sm="3" key={item?.id}>
                          <Card className="socialCard" onClick={() => handleConnectGroup(item)}>
                            <div className="social_icons">
                              <Users style={{ width: "15px" }} />
                            </div>
                            <CardBody className="text-center">
                              <div className="d-flex justify-content-center firstString">
                                <h4>{item?.name[0]}</h4>
                              </div>
                              <h5 tag="h5">{item?.name}</h5>
                              <p style={{ color: "gray" }}>Open group</p>
                            </CardBody>
                            <div
                              className="connect d-flex"
                            // onClick={handleGroupClick}
                            >
                              <Plus style={{ width: "18px" }} />
                              <p>Connect</p>
                            </div>
                          </Card>
                        </Col>
                      );
                    }
                  })}

                {
                  isData === "page" ?
                    <Link to="/app/marketing/social-media-connecting/workspace" ></Link>
                    :
                    <Link to="/app/marketing/social-media-connecting/workspace"></Link>
                }
                <Col sm="3">
                  <Card className="socialCard" onClick={handlePageClick}>
                    <div className="text-center" style={{ padding: "40px" }}>
                      <div className="social_icon">
                        <Flag />
                      </div>
                      <h5 style={{ padding: "5px" }}>Add Facebook Pages</h5>
                    </div>
                  </Card>
                </Col>
                <Col sm="3">
                  <Card className="socialCard" onClick={handleGroupClick}>
                    <div className="text-center" style={{ padding: "40px" }}>
                      <div className="social_icon">
                        <Users />
                      </div>
                      <h5 style={{ padding: "5px" }}>Add Facebook groups</h5>
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPanel>
            <TabPanel value="2">
              <div className="connect-page">
                <div className="page-list">
                  <div className="responsive-square">
                    <GoogleAuthLogin />
                    <div className="responsive-square-inner">
                      <div
                        className="panel-dashed full-width"
                        style={{ height: "170px" }}
                      >
                        <Star />
                        <div className="media-body">Create a mockup page</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
        {/* <ModalBody className="facebook-modal-body">
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </ModalBody> */}
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    getFbToken: state?.facebookPage?.getFbToken,
    getPage: state?.facebookPage?.getPage,
    getGroup: state?.facebookPage?.getGroup,
    getMeData: state?.facebookPage?.getMeData,
    getPageInfo: state?.facebookPage?.getPageInfo,
    getGroupInfo: state?.facebookPage?.getGroupInfo
  };
};
export default connect(mapStateToProps, {
  // GET_FB_LOGIN,
  FB_LOGIN,
  GET_PAGE_DATA,
  GET_GROUP_DATA,
  GET_PAGE_INFO,
  GET_PAGE_INFO_DATA,
  GET_GROUP_INFO_DATA,
  GET_GROUP_INFO,
  GET_ME_INFO
})(PageConnect);
