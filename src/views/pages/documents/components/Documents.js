import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Drawer, useMediaQuery, List, ListItem } from "@material-ui/core";
import { Card } from "@material-ui/core";
import DocumentsListing from "./documentsList";
import classnames from "classnames";
import DocumentSidebar from "./documentsSidebar";
import {
  GET_DOCUMENT_FOLDER_LIST,
  SET_FOLDER_ID,
  REMOVE_FOLDER,
  REMOVE_SUB_FOLDER,
} from "../../../../redux/actions/document/document";
import { CardText, Col, Row, TabContent, TabPane } from "reactstrap";
//add All, Shared with me and trash component
import ShareWithMe from "./ShareWithMe";
import Trash from "./Trash";
import ShareWithMeAction from "./ShareWithMeAction";
//Add status component
import ForApproval from "./status/ForApproval";
import Sent from "./status/Sent";
import Viewed from "./status/Viewed";
import Completed from "./status/Completed";
import Expired from "./status/Expired";
import { Divider } from "@mui/material";
import { useHistory } from "react-router-dom";
import CreateRecipientUploadDoc from "./CreateRecipientUploadDoc";

const Documents = (props) => {
  const { userinformation, documentFolderList, GET_DOCUMENT_FOLDER_LIST } =
    props;
  // const classes = useStyles();
  const [activeMainFolder, setActiveMainFolder] = useState(null);
  const [activeSubMainFolder, setActiveSubMainFolder] = useState(null);
  const [FolderMenuOpen, setFolderMenuOpen] = useState(false);
  const [openCreateRecipient, setOpenCreateRecipient] = useState(false);
  const IsSmallDevise = useMediaQuery("(max-width:1224px)");
  const [listOfDocument, setListOfDocument] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [documentTutoOrTable, setDocumentTutoOrTable] = useState(true);
  const history = useHistory();

  useEffect(() => {
    GET_DOCUMENT_FOLDER_LIST();
  }, [GET_DOCUMENT_FOLDER_LIST]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchdata = async () => {
    // console.log("fetchdata",activeSubMainFolder,activeMainFolder)
    if (activeSubMainFolder) {
      let findActiveMainFolder = await documentFolderList?.filter(
        (item) => item?._id === activeMainFolder?._id
      );
      let findActiveSubFolder =
        await findActiveMainFolder[0]?.subFolder?.filter(
          (item) => item?._id === activeSubMainFolder?._id
        );
      if (findActiveSubFolder?.length > 0) {
        await setListOfDocument(findActiveSubFolder[0]?.document);
      }
    } else if (activeMainFolder) {
      let findActiveMainFolder = await documentFolderList?.filter(
        (item) => item?._id === activeMainFolder?._id
      );
      if (findActiveMainFolder?.length) {
        await setListOfDocument(findActiveMainFolder[0]?.document);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, [
    fetchdata,
    documentFolderList,
    listOfDocument,
    activeMainFolder,
    activeSubMainFolder,
  ]);

  const handleClick = () => {
    setDocumentTutoOrTable(!documentTutoOrTable);
  };

  return (
    <>
      <div className="d-flex">
        <Breadcrumbs
          className="d-flex"
          breadCrumbTitle="Documents"
          breadCrumbParent="Pages"
          breadCrumbActive="Documents"
        />
        <ShareWithMeAction
          setDocumentTutoOrTable={setDocumentTutoOrTable}
          handleClick={handleClick}
          setOpenCreateRecipient={setOpenCreateRecipient}
          openCreateRecipient={openCreateRecipient}
        />
      </div>
      <Row>
        <Col sm="2">
          <Card className="p-1">
            <div>
              <h4 className="ml-1">Documents</h4>
              <Divider className="mt-0" />
            </div>
            <div className="mb-1" style={{ padding: "0.5em" }}>
              <div
                className="d-flex align-items-center finance-nav cursor-pointer"
                onClick={() => {
                  setActiveTab("1");
                }}
              >
                <div
                  className={`${activeTab === "1" ? "bullet active_bullet" : "bullet"
                    }`}
                />
                <CardText className={`${activeTab === "1" && "text-primary"}`}>
                  All
                </CardText>
              </div>
              <div
                className="d-flex align-items-center finance-nav cursor-pointer"
                onClick={() => {
                  setActiveTab("2");
                }}
              >
                <div
                  className={`${activeTab === "2" ? "bullet active_bullet" : "bullet"
                    }`}
                />
                <CardText className={`${activeTab === "2" && "text-primary"}`}>
                  Shared with me
                </CardText>
              </div>
              <div
                className="d-flex align-items-center finance-nav cursor-pointer"
                onClick={() => {
                  setActiveTab("3");
                }}
              >
                <div
                  className={`${activeTab === "3" ? "bullet active_bullet" : "bullet"
                    }`}
                />
                <CardText className={`${activeTab === "3" && "text-primary"}`}>
                  Trash
                </CardText>
              </div>
            </div>

            <div>
              <h4 className="ml-1 ">Status</h4>
              <Divider className="mt-0" />
            </div>

            <div dense className="ml-1 m-0">
              <div
                button
                style={{
                  background: activeTab === "4" ? "#fff" : "#fff",
                  color: activeTab === "4" ? "bullet active-bullet" : "bullet",
                  paddingTop: "5px",
                }}
                className={`d-flex justify-content-start m-0 ${classnames({
                  active: activeTab === "4",
                })}`}
              // onClick={() => setActiveTab("4")}
              >
                <div className="d-flex">
                  <input
                    type="radio"
                    className="radioOrange"
                    style={{ marginTop: "3px" }}
                  />
                  <span className=" ml-1">For approval</span>
                </div>
              </div>
              <div
                button
                style={{
                  background: activeTab === "5" ? "#fff" : "#fff",
                  color: activeTab === "5" ? "bullet active-bullet" : "bullet",
                  paddingTop: "5px",
                }}
                className={`d-flex justify-content-start m-0 ${classnames({
                  active: activeTab === "5",
                })}`}
              // onClick={() => setActiveTab("5")}
              >
                <div className="d-flex">
                  <input
                    type="radio"
                    className="radioBlue"
                    style={{ marginTop: "3px" }}
                  />
                  <span className="text-capitalize ml-1">Sent</span>
                </div>
              </div>
              <div
                button
                style={{
                  background: activeTab === "6" ? "#fff" : "#fff",
                  color: activeTab === "6" ? "bullet active-bullet" : "bullet",
                  paddingTop: "5px",
                }}
                className={`d-flex justify-content-start m-0 ${classnames({
                  active: activeTab === "6",
                })}`}
              // onClick={() => setActiveTab("6")}
              >
                <div className="d-flex">
                  <input
                    type="radio"
                    className="radioVoilot"
                    style={{ marginTop: "3px" }}
                  />
                  <span className="text-capitalize ml-1">Viewed</span>
                </div>
              </div>
              <div
                button
                style={{
                  background: activeTab === "7" ? "#fff" : "#fff",
                  color: activeTab === "7" ? "bullet active-bullet" : "bullet",
                  paddingTop: "5px",
                }}
                className={`d-flex justify-content-start m-0 ${classnames({
                  active: activeTab === "7",
                })}`}
              // onClick={() => setActiveTab("7")}
              >
                <div className="d-flex">
                  <input
                    type="radio"
                    className="radioLightGreen"
                    style={{ marginTop: "3px" }}
                  />
                  <span className="text-capitalize ml-1">Completed</span>
                </div>
              </div>
              <div
                button
                style={{
                  background: activeTab === "8" ? "#fff" : "#fff",
                  color: activeTab === "8" ? "bullet active-bullet" : "bullet",
                  paddingTop: "5px",
                }}
                className={`d-flex justify-content-start m-0 ${classnames({
                  active: activeTab === "8",
                })}`}
              // onClick={() => setActiveTab("8")}
              >
                <div className="d-flex">
                  <input
                    type="radio"
                    className="radioRed"
                    style={{ marginTop: "3px" }}
                  />
                  <span className="text-capitalize ml-1">Expired</span>
                </div>
              </div>
              <div
                button
                style={{
                  background: activeTab === "9" ? "#fff" : "#fff",
                  color: activeTab === "9" ? "bullet active-bullet" : "bullet",
                  paddingTop: "5px",
                }}
                className={`d-flex justify-content-start m-0 ${classnames({
                  active: activeTab === "9",
                })}`}
              // onClick={() => setActiveTab("8")}
              >
                <div className="d-flex">
                  <input
                    type="radio"
                    className="radioDeraft"
                    style={{ marginTop: "3px" }}
                  />
                  <span className="text-capitalize ml-1">Drafts</span>
                </div>
              </div>
            </div>
            {IsSmallDevise ? (
              <Drawer
                onClose={() => {
                  setFolderMenuOpen(!FolderMenuOpen);
                }}
                open={FolderMenuOpen}
              >
                <DocumentSidebar
                  documentFolderList={documentFolderList}
                  setActiveMainFolder={setActiveMainFolder}
                  activeMainFolder={activeMainFolder}
                  activeSubMainFolder={activeSubMainFolder}
                  setActiveSubMainFolder={setActiveSubMainFolder}
                  userinformation={userinformation}
                />
              </Drawer>
            ) : (
              <div className="d-flex flex-column  align-items-center">
                <DocumentSidebar
                  documentFolderList={documentFolderList}
                  setActiveMainFolder={setActiveMainFolder}
                  activeSubMainFolder={activeSubMainFolder}
                  setActiveSubMainFolder={setActiveSubMainFolder}
                  activeMainFolder={activeMainFolder}
                  userinformation={userinformation}
                />
              </div>
            )}
          </Card>
        </Col>
        <Col sm="10">
          {/* <h1>Hello dalle</h1> */}
          <Card>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <DocumentsListing
                    documentTutoOrTable={documentTutoOrTable}
                    documentFolderList={documentFolderList}
                    listOfDocument={listOfDocument}
                    activeSubMainFolder={activeSubMainFolder}
                    data={props?.data}
                    isrecommendedOrregistered={props.isrecommendedOrregistered}
                    isDelete={props.isDelete}
                    userinformation={userinformation}
                    activeMainFolder={activeMainFolder}
                  />
                }
              </TabPane>
              <TabPane tabId="2">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <ShareWithMe />
                }
              </TabPane>
              <TabPane tabId="3">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <Trash />
                }
              </TabPane>
              <TabPane tabId="4">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <ForApproval />
                }
              </TabPane>
              <TabPane tabId="5">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <Sent />
                }
              </TabPane>
              <TabPane tabId="6">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <Viewed />
                }
              </TabPane>
              <TabPane tabId="7">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <Completed />
                }
              </TabPane>
              <TabPane tabId="8">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <Expired />
                }
              </TabPane>
              <TabPane tabId="9">
                {openCreateRecipient ?
                  <CreateRecipientUploadDoc
                    setOpenCreateRecipient={setOpenCreateRecipient}
                  />
                  :
                  <Expired />
                }
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    documentFolderList: state.document.documentFolderList,
    userinformation: state.userinfo.userinformation,
  };
};
export default connect(mapStateToProps, {
  GET_DOCUMENT_FOLDER_LIST,
  SET_FOLDER_ID,
  REMOVE_FOLDER,
  REMOVE_SUB_FOLDER,
})(Documents);
