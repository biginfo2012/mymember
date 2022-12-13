import { Card, Grid, CardContent, DialogContentText } from "@material-ui/core";
import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core";
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
import { Tabs, Tab, Box, Select, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Badge from "@mui/material/Badge";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./style.css";
import moment from "moment";
import DocumentTutorial from "./DocumentTutorial";
import { Article, CircleSharp, Description, Image, InsertDriveFile, PictureAsPdf, TextSnippet, Wallpaper } from "@mui/icons-material";
import DocumentViewer from "./component/DocumentViewer";

const useStyles = makeStyles(() => ({
  cardStyle: {
    boxShadow: "0 5px 10px #e4e0e0",
    borderRadius: "8px",
  },
  avtStyle: {
    height: "30px",
    width: "30px",
  },
  inputStyle: {
    height: "3em",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  row: {
    display: "grid",
    gridTemplateColumns: " 40% 15% 15% 15% 15%",
  },
}));

const DocumentsList = (props) => {
  const classes = useStyles();

  const {
    REMOVE_DOCUMENT,
    listOfDocument,
    userinformation,
    activeMainFolder,
    activeSubMainFolder,
    documentFolderList,
    documentTuto
  } = props;

  console.log(activeSubMainFolder)

  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false)
  const [progress, setProgress] = React.useState(false);
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [leadView, setLeadView] = useState("Draft");

  const handlesweatalert = (item, type) => {
    setSweetAlertOpen(true);
    setId(item?._id);
    setType(type);
  };

  const handleDocumentView = () => {
    setModelOpen(true)
  }

  const handleClose = () => {
    setModelOpen(false)
  }

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
        className="mt-1"
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
      {
        props.documentTutoOrTable ?
          <div>
            <div className="pl-1 pr-1 pt-0 mt-2" >
              <div className={`p-1 pt-0 ${classes.row} border-bottom`} style={{ boder: "1px solid" }}>
                <div className="d-flex justify-content-start">
                  <b>Title </b>
                </div>
                <div className="d-flex justify-content-center ml-2">
                  <b>Type</b>
                </div>
                <div className="d-flex justify-content-center">
                  <b>Status</b>
                </div>
                <div className="d-flex justify-content-center">
                  <b>Modified</b>
                </div>
                <div className="d-flex justify-content-center">
                  <b>Action</b>
                </div>
              </div>
            </div>
            <div
              style={{ borderBottom: "1px solid #dddddd" }}
              className="p-1"
            >
              {
                listOfDocument !== null && listOfDocument?.length > 0 ? (
                  listOfDocument?.map((items, i) => {
                    let lastPdf = items?.document.substr(items?.document.length - 4)
                    return (
                      <>
                        <div className={classes.row} key={items?._id}>
                          <div className="d-flex justify-content-start align-items-center ml-1">
                            {
                              lastPdf === ".png" ?
                                <div className="d-flex" onClick={handleDocumentView}>
                                  <Wallpaper style={{ color: "#afe8ff", fontSize: "24px", marginTop: "10px" }} />
                                  <p className="ml-1" style={{ marginTop: "10px" }}>{items?.document_name}</p>
                                </div>
                                :
                                lastPdf === "docx" ?
                                  <div className="d-flex" onClick={handleDocumentView}>
                                    <Description style={{ color: "#0787ba", fontSize: "24px", marginTop: "10px" }} />
                                    <p className="ml-1" style={{ marginTop: "10px" }}>{items?.document_name}</p>
                                  </div>
                                  :
                                  lastPdf === "doc" ?
                                    <div className="d-flex" onClick={handleDocumentView}>
                                      <TextSnippet style={{ color: "#211aef", fontSize: "24px", marginTop: "10px" }} />
                                      <p className="ml-1" style={{ marginTop: "10px" }}>{items?.document_name}</p>
                                    </div>
                                    :
                                    lastPdf === "jpeg" ?
                                      <div className="d-flex" onClick={handleDocumentView}>
                                        <Image style={{ color: "#d8d8d8", fontSize: "24px", marginTop: "10px" }} />
                                        <p className="ml-1" style={{ marginTop: "10px" }}>{items?.document_name}</p>
                                      </div>
                                      :
                                      lastPdf === ".txt" ?
                                        <div className="d-flex" onClick={handleDocumentView}>
                                          <Article style={{ color: "#000", fontSize: "24px", marginTop: "10px" }} />
                                          <p className="ml-1" style={{ marginTop: "10px" }}>{items?.document_name}</p>
                                        </div>
                                        :
                                        <div className="d-flex" onClick={handleDocumentView}>
                                          <PictureAsPdf style={{ color: "red", fontSize: "24px", marginTop: "10px" }} />
                                          <p className="ml-1" style={{ marginTop: "10px" }}>{items?.document_name}</p>
                                        </div>

                            }

                            <Dialog
                              open={modelOpen}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogContent>
                                <DocumentViewer lastPdf={lastPdf} items={items} />
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <p>
                              {lastPdf === ".png" ?
                                <div className="d-flex">
                                  <p className="ml-1">PNG</p>
                                </div>
                                : lastPdf === "docx" ?
                                  <div className="d-flex">
                                    <p className="ml-1">DOCX</p>
                                  </div>
                                  :
                                  lastPdf === "doc" ?
                                    <div className="d-flex">
                                      <p className="ml-1">DOC</p>
                                    </div>
                                    :
                                    lastPdf === "jpeg" ?
                                      <div className="d-flex">
                                        <p className="ml-1">JPEG</p>
                                      </div>
                                      :
                                      lastPdf === ".txt" ?
                                        <div className="d-flex">
                                          <p className="ml-1">TXT</p>
                                        </div>
                                        :
                                        <div className="d-flex">
                                          <p className="ml-1">PDF</p>
                                        </div>
                              }
                            </p>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <CircleSharp style={{ color: "gray", fontSize: "15px" }} />
                            <p style={{ marginTop: "10px", marginLeft: "10px" }}>Draft</p>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <p>
                              {items?.updatedAt ? moment(items?.updatedAt).format("MM/DD/YYYY") : "N/A"}
                            </p>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              src={"/images/download.png"}
                              alt={`${items?.document_name}`}
                              onClick={() => {
                                window.open(items.document, "_blank");
                              }}
                              style={{ cursor: "pointer" }}
                            />
                            <div>
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
                        </div>
                        <hr />
                      </>
                    )
                  })
                ) : <div className="d-flex justify-content-center"><h3>No Document!</h3></div>
              }
            </div>
          </div>
          :
          <DocumentTutorial />
      }

      {/* <Grid container spacing={2} className="p-0 m-0">
        { listOfDocument !== null && listOfDocument?.length > 0 ? (
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
        )}
      </Grid> */}
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
