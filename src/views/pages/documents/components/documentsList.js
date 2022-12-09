import { Card, Grid, CardContent } from "@material-ui/core";
import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  UPLOAD_DOCUMENT,
  EDIT_DOCUMENT,
  REMOVE_DOCUMENT,
  UPLOAD_DOCUMENT_IN_FOLDER,
  REMOVE_DOCUMENT_IN_FOLDER,
} from "../../../../redux/actions/document/document";
import { connect } from "react-redux";
import AddOrEditDoc from "./AddOrEditDoc";
import EditDeletDoc from "./EditDeletDoc";
import SampleDocxButton from "./sampleDocx";
import LinearProgress from "@material-ui/core/LinearProgress";
import Content from "./Content";
import ConfirmationModal from "../../../../components/gloabal/confirmation";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import AddfileTofolder from "./AddfileTofolder";
import EditAnddeletFolderDoc from "./EditAnddeletFolderDoc";
import { Tabs, Tab, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./style.css";

// const useStyles = makeStyles({
//   twitter: {
//     "&:hover": {
//       color: "#00acee"
//     },
//     "&:active": {
//       color: "#00acee"
//     },
//     "&:focus": {
//       color: "#00acee"
//     }
//   }
// });

const DocumentsList = (props) => {
  const {
    REMOVE_DOCUMENT,
    listOfDocument,
    userinformation,
    activeMainFolder,
    activeSubMainFolder,
    documentFolderList,
  } = props;
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [progress, setProgress] = React.useState(false);
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [leadView, setLeadView] = useState("Draft");

  const handlesweatalert = (item, type) => {
    setSweetAlertOpen(true);
    setId(item?._id);
    setType(type);
  };

  const handleDeleteDocument = () => {
    if (type === "subfolder") {
      REMOVE_DOCUMENT(id);
      setSweetAlertOpen(false);
    } else {
      props.REMOVE_DOCUMENT_IN_FOLDER(id);
      setSweetAlertOpen(false);
    }
  };
  // const classes = useStyles();

  return (
    <div style={{ width: "100%" }} className="p-1">
      <div className="d-flex justify-content-between w-100 mt-1">
        {activeMainFolder !== null ? (
          <div className="w-100">
            <div className="row breadcrumbs-top p-0">
              <div className="col-12">
                <Breadcrumb tag="ol" className="p-0">
                  <BreadcrumbItem tag="li">
                    <span className="text-capitalize">
                      {activeMainFolder?.folderName}
                    </span>
                  </BreadcrumbItem>
                  <BreadcrumbItem tag="li">
                    <span className="text-capitalize">
                      {activeSubMainFolder?.subFolderName}
                    </span>
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </div>
        ) : null}
        {activeSubMainFolder?.document?.length >= 0 ? (
          <div className="d-flex justify-content-end w-100 p-0">
            <SampleDocxButton />
            <AddOrEditDoc
              userinformation={userinformation}
              activeSubMainFolder={activeSubMainFolder}
              activeMainFolder={activeMainFolder}
              UPLOAD_DOCUMENT={props.UPLOAD_DOCUMENT}
            />
          </div>
        ) : activeSubMainFolder?.adminId !== undefined ? null : (
          <div className="w-100 p-0">
            {activeSubMainFolder?.document?.length >= 0 ? (
              <div className="d-flex justify-content-end p-0">
                <>
                  <SampleDocxButton />
                  <AddOrEditDoc
                    activeSubMainFolder={activeSubMainFolder}
                    activeMainFolder={activeMainFolder}
                    UPLOAD_DOCUMENT={props.UPLOAD_DOCUMENT}
                  />
                </>
              </div>
            ) : activeMainFolder?.document.length >= 0 ? (
              <div className="w-100 p-0">
                <div className="d-flex justify-content-end p-0">
                  <>
                    <SampleDocxButton />
                    <AddfileTofolder
                      documentFolderList={documentFolderList}
                      activeSubMainFolder={activeSubMainFolder}
                      activeMainFolder={activeMainFolder}
                      UPLOAD_DOCUMENT_IN_FOLDER={
                        props.UPLOAD_DOCUMENT_IN_FOLDER
                      }
                    />
                  </>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <Box
        sx={{
          width: "100%",
          paddingBottom: leadView === "List" ? "0px" : "0px",
        }}
      >
        <Tabs
          onChange={(event, newValue) => setLeadView(newValue)}
          value={leadView}
          className="p-1"
          // centered
          variant="scrollable"
          // scrollButtons
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-flexContainer": {
              background: "rgb(239 242 245)",
              width: "100%",
              margin: "0",

              justifyContent: "space-between",
            },
            "& .MuiTab-root": {
              color: "rgba(0, 0, 0, 0.85)",
              fontWeight: "700",
              padding: "26px",
              borderRight: "1px solid rgb(228,228,228)",
              minHeight: "85px!important",
            },
            "& .Mui-selected": {
              background: "#fff",
              color: "rgba(0, 0, 0, 0.85)!important",
              padding: "20px!important",
              borderLeft: "2px solid #ededed",
              borderRight: "2px solid #ededed",
              borderTop: "2px solid #ededed",
            },
            "& span.MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab
            value="Draft"
            label={
              <div>
                <Badge color="primary" className="cards-icons">
                  1
                  <InsertDriveFileOutlinedIcon
                    fontSize="large"
                    style={{
                      color: leadView === "Draft" ? "#eb8186" : "#878787",
                    }}
                  />
                </Badge>
                <h6 className="card-text">Drafts</h6>
              </div>
            }
          />
          <Tab
            value="Actions required"
            label={
              <div>
                <Badge color="primary" className="cards-icons">
                  1
                  <PhotoSizeSelectActualOutlinedIcon
                    fontSize="large"
                    style={{
                      color:
                        leadView === "Actions required" ? "#f9e37f" : "#878787",
                    }}
                  />
                </Badge>
                <h6 className="card-text">Actions required</h6>
              </div>
            }
          />
          <Tab
            value="Waiting for others"
            label={
              <div>
                <Badge color="primary" className="cards-icons">
                  0
                  <CheckCircleOutlineRoundedIcon
                    fontSize="large"
                    style={{
                      color:
                        leadView === "Waiting for others"
                          ? "#7cb5f5"
                          : "#878787",
                    }}
                  />
                </Badge>
                <h6 className="card-text">Waiting for others</h6>
              </div>
            }
          />
          <Tab
            value="Finalized"
            label={
              <div>
                <Badge color="primary" className="cards-icons">
                  0
                  <SendRoundedIcon
                    fontSize="large"
                    style={{
                      color: leadView === "Finalized"
                        ? "#7cb5f5"
                        : "#878787",
                    }}
                  />
                </Badge>
                <h6 className="card-text">Finalized</h6>
              </div>
            }
          />
        </Tabs>
      </Box>
      <Grid container spacing={2} className="p-0 m-0">
        {activeMainFolder === null ? (
          <Fragment>
            <Grid item sm={12} md={12} lg={12}>
              <h4>DOCUMENT TUTORIAL </h4>
              <p
                className="p-1 pr-5"
                style={{
                  background: "#eaf4fe",
                }}
              >
                Document is a powerful tool designed to allow mymember users to
                save and organize important files. Users can also create custom
                files that connect to allow the creation of custom single or
                bulk documents. Watch the videos below to use documents with
                ease!
              </p>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <Content
                hedding={"CREATE FOLDERS & UPLOAD FILES"}
                content={
                  "Learn how to create folders, subfolders and organize your importantat files.Files can be uploaded in .pdf, .doc, .docx, .xls, .xlsx "
                }
                link={"https://www.youtube.com/embed/bidOMaCs3vM"}
              />
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <Content
                hedding={"CREATE CUSTOM DOCUMENTS"}
                content={
                  "Learn how to create custom documents using mymembers powerful merge feature. Use the merge field library to create custom documents that can be merged with your contact list."
                }
                link={"https://www.youtube.com/embed/5RfLIC-3dzY"}
              />
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <Content
                hedding={"PRINT DOCUMENTS"}
                content={
                  "Print files from your saved folders or print customized documents for single or unlimited bulk contacts. Print any type of business documents in seconds."
                }
                link={"https://www.youtube.com/embed/0NFRvVdmmE4"}
              />
            </Grid>
          </Fragment>
        ) : listOfDocument !== null && listOfDocument?.length > 0 ? (
          listOfDocument?.map((items, i) => {
            return (
              <Grid item sm={6} md={3} lg={3} key={i} className="pt-1">
                <Card
                  style={{ width: "100%", height: "100%" }}
                  className="rounded"
                >
                  <CardContent style={{ padding: "8px" }}>
                    <div className="d-flex justify-content-between w-100">
                      <div></div>
                      <div className="d-flex justify-content-between">
                        <img
                          src={`/images/image-for-document-list-${items?.document
                            .split(".")
                            .pop()}.png`}
                          className="mr-1"
                          style={{ objectFit: "contain" }}
                          alt={`${items?.name}`}
                        />
                        {activeSubMainFolder === null ? (
                          <EditAnddeletFolderDoc
                            setProgress={setProgress}
                            OpenAlert={handlesweatalert}
                            item={items}
                            documentFolderList={documentFolderList}
                            userinformation={userinformation}
                            activeFolder={props.listOfDocument}
                            EDIT_DOCUMENT={props.EDIT_DOCUMENT}
                            activeSubMainFolder={activeSubMainFolder}
                            activeMainFolder={activeMainFolder}
                            data={props?.data}
                            isrecommendedOrregistered={
                              props.isrecommendedOrregistered
                            }
                            isDelete={props.isDelete}
                          />
                        ) : (
                          <EditDeletDoc
                            setProgress={setProgress}
                            OpenAlert={handlesweatalert}
                            item={items}
                            userinformation={userinformation}
                            activeFolder={props.listOfDocument}
                            EDIT_DOCUMENT={props.EDIT_DOCUMENT}
                            activeSubMainFolder={activeSubMainFolder}
                            activeMainFolder={activeMainFolder}
                            data={props?.data}
                            isrecommendedOrregistered={
                              props.isrecommendedOrregistered
                            }
                            isDelete={props.isDelete}
                          />
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center card-content">
                      <div>
                        <span>{items?.document_name} </span>
                      </div>
                      <img
                        src={"/images/download.png"}
                        alt={`${items?.document_name}`}
                        onClick={() => {
                          window.open(items.document, "_blank");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <div
            className="d-flex justify-content-center flex-column w-100">
            <img
              src={"/images/no-doc-in-file.png"}
              alt="nodata"
              style={{ height: "400px", objectFit: "contain" }}
            />
            <div className="d-flex justify-content-center" >
              <div
              ><h3>No Document In this folder</h3></div>
            </div>
            <p className="d-flex justify-content-center">Create a new documnets here or go to your documnet list to move an existing document into this folder.</p>
          </div>
        )
        }
      </Grid >
      <br />
      {progress && <LinearProgress color="secondary" />}
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={sweetAlertOpen}
        title="Delete file ?"
        onConfirm={handleDeleteDocument}
        onCancel={() => {
          setSweetAlertOpen(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you save it ?"
      />
    </div >
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.document,
  };
};

export default connect(mapStateToProps, {
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_IN_FOLDER,
  REMOVE_DOCUMENT,
  EDIT_DOCUMENT,
  REMOVE_DOCUMENT_IN_FOLDER,
})(DocumentsList);
