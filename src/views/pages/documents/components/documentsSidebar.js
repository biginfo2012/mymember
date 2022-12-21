import NewFolder from "./createFolderModal";
import NewSubFolder from "./createSubFolderModal";
import React, { Fragment, useState } from "react";
import { Collapse } from "reactstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  GET_DOCUMENT_FOLDER_LIST,
  SET_FOLDER_ID,
  REMOVE_FOLDER,
  REMOVE_SUB_FOLDER,
} from "../../../../redux/actions/document/document";
import EditFolder from "./editFolderModal";
import { connect } from "react-redux";
import { List, ListItem, Button, makeStyles } from "@material-ui/core";
import EditSubFolder from "./editSubFolderModal";
import EditDeleteFolder from "./EditAndDeleteFolder";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import ConfirmationModal from "../../../../components/gloabal/confirmation";
import classnames from "classnames";
import { Divider } from "@mui/material";
// import EdiztFolder
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


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
    width: "100%",
    background: "#fff",
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

function DocumentSidebar(props) {
  const classes = useStyles();
  const {
    userinformation,
    activeMainFolder,
    setActiveMainFolder,
    activeSubMainFolder,
    setActiveSubMainFolder,
  } = props;
  const [openFolder, setOpenFolder] = useState(false);
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [type, setType] = useState("");

  const [activeTab, setActiveTab] = useState(1)
  const toggle = (tab) => {
    setActiveTab({
      activeTab: tab,
    });
  };
  const handleMainFolder = (folder) => {
    setOpenFolder(!openFolder);
    setActiveMainFolder(folder);
    setActiveSubMainFolder(null);
  };
  const handleSubFolder = (mainFolder, subFolder) => {
    setActiveSubMainFolder(subFolder);
    setActiveMainFolder(mainFolder);
  };

  const handleDeleteFolder = () => {
    if (type === "folder") {
      props.REMOVE_FOLDER(activeMainFolder?._id);
    } else {
      props.REMOVE_SUB_FOLDER(activeSubMainFolder?._id);
    }
    setSweetAlertOpen(false);
  };

  const handleDeleteId = (type,) => {
    setSweetAlertOpen(true);
    setType(type);
  };
  return (
    <Fragment>
      <List className={classes.listWrapper} dense>
        <NewFolder />
        <Divider className="mt-0" />
        {props?.documentFolderList?.map((item) => {
          return (
            <Fragment key={item?._id}>
              <ListItem
                style={{
                  padding: "0"
                }}
                className={
                  activeSubMainFolder === null &&
                  `${activeSubMainFolder === null &&
                    activeMainFolder?._id === item?._id
                    ? classes.activeMainFolder
                    : classes.inActiveFolder}`
                }
                // button
                onClick={() => {
                  setActiveMainFolder(item);
                }}
              >

                <Button
                  className={classes.folderBtn}
                  fullWidth
                  onClick={() => {
                    handleMainFolder(item);
                  }}
                >
                  {item?.subFolder?.length > 0 ? (
                    !openFolder ?
                      <ExpandMoreIcon fontSize="small" onClick={() => {
                        handleMainFolder(item);
                      }} />
                      :
                      <ExpandLessIcon fontSize="small" />
                  ) : (
                    <div className="ml-1"></div>
                  )}
                  {/* {item?.subFolder?.length > 0 ? (
                    <ExpandMoreIcon fontSize="small"
                      className="action_fontcolor" />
                  ) : (
                    <div className="ml-1 mr-1" />
                  )} */}
                  <img
                    src={`/images/FolderM.png`}
                    alt={`${item?.folderName}`}
                  />
                  <span className="f-subname text-capitalize">
                    {item?.folderName}
                  </span>
                </Button>

                {userinformation?.role === 1 ? (
                  <EditDeleteFolder
                    // editfolder={<EdiztFolder folder={item} />}
                    OpenAlert={handleDeleteId}
                    item={item}
                    FolderType="folder"
                  />
                ) : item?.adminId !== undefined ? (
                  <HttpsOutlinedIcon
                    fontSize="small"
                    style={{ color: "#757575" }}
                  />
                ) : (
                  <EditDeleteFolder
                    editfolder={<EditFolder folder={item} />}
                    OpenAlert={handleDeleteId}
                    item={item}
                    FolderType="folder"
                  />
                )}
              </ListItem>
              <Collapse
                isOpen={openFolder && item?._id === activeMainFolder?._id}
              >
                <List>
                  {item?.subFolder?.map((subFolder) => {
                    return (
                      <ListItem
                        button
                        onClick={() => {
                          handleSubFolder(item, subFolder);
                        }}
                        key={subFolder?._id}
                        className={
                          `${activeSubMainFolder?._id === subFolder?._id
                            ? classes.activeMainFolder
                            : classes.inActiveFolder}`
                        }
                      >
                        <Button className={classes.folderBtn} fullWidth>
                          <div className="f-subname">
                            <img
                              src="/images/FolderS.png"
                              alt={`${subFolder?.subFolderName}`}
                            />
                            <span className="f-subnam text-capitalize">
                              {subFolder?.subFolderName}
                            </span>
                          </div>
                        </Button>
                        {userinformation?.role === 1 ? (
                          <EditDeleteFolder
                            editfolder={
                              <EditSubFolder
                                mainFolder={item}
                                subFolder={subFolder}
                              />
                            }
                            OpenAlert={handleDeleteId}
                            item={subFolder}
                            FolderType="subfolder"
                          />
                        ) : subFolder?.adminId !== undefined ? (
                          <HttpsOutlinedIcon
                            fontSize="small"
                            style={{ color: "#757575" }}
                          />
                        ) : (
                          <EditDeleteFolder
                            editfolder={
                              <EditSubFolder
                                mainFolder={item}
                                subFolder={subFolder}
                              />
                            }
                            OpenAlert={handleDeleteId}
                            item={subFolder}
                            FolderType="subfolder"
                          />
                        )}
                      </ListItem>
                    );
                  })}
                  <div>
                    <NewSubFolder
                      isSubFolder={true}
                      mainFolder={item}
                      activeMainFolder={activeMainFolder}
                      userinformation={props.userinformation}
                    />
                  </div>
                </List>
              </Collapse>
            </Fragment>
          );
        })}
        <ConfirmationModal
          primaryColor="#0483fd"
          secondaryColor="#fff"
          imagePath="/images/delete.png"
          open={sweetAlertOpen}
          title="Delete file ?"
          onConfirm={handleDeleteFolder}
          onCancel={() => {
            setSweetAlertOpen(false);
          }}
          onCancelButtonTitle={"Cancel"}
          contiunuebuttonTitle={"Delete"}
          description=" Are you sure you want to delete?"
        />
      </List>

    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo.userinformation,
  };
};
export default connect(mapStateToProps, {
  GET_DOCUMENT_FOLDER_LIST,
  SET_FOLDER_ID,
  REMOVE_FOLDER,
  REMOVE_SUB_FOLDER,
})(DocumentSidebar);
