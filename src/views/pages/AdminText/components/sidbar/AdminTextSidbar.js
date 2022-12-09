import React, { Fragment, useEffect, useState } from "react";
import { Collapse } from "reactstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { List, ListItem, Button, makeStyles } from "@material-ui/core";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import CreateFolderModal from "./CreateOrEditFolder/createFolderModal";
import SubFolder from "./SubFolder/index";
import EditAndDeleteFolder from "../../EditAndDeleteFolder";
import {
  GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN,
  REMOVE_FOLDER_TEXT_FOR_ADMIN,
  REMOVE_TEXT_SUB_FOLDER_FOR_ADMIN,
  GET_TEMPLATES_LIST_FOR_ADMIN,
  SET_FOLDER_ID,
} from "../../../../../redux/actions/admin/Text";
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
    width: "360px",
    maxWidth: "100%",
    background: "#fff",
    paddingTop: "0px",
    position: "relative",
    overflow: "scroll",
    minHeight: "90vh",
    borderRight: "2px solid #f8f8f8",
  },
  addMianFOlder: {
    color: "#fff",
    background: "#2796f3",
    fontWeight: "bold !important",
  },
}));

function TextTemplateSidebar(props) {
  const classes = useStyles();
  const { templateFolderListForAdmin, GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN } =
    props;
  const [activeMainFolder, setActiveMainFolder] = useState(null);
  const [activeSubMainFolder, setActiveSubMainFolder] = useState(null);
  const [openFolder, setOpenFolder] = useState(null);
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [type, setType] = useState("");

  const handleMainFolder = (folder) => {
    setOpenFolder(!openFolder);
    setActiveMainFolder(folder);
    setActiveSubMainFolder(null);
  };
  const handleSubFolder = (mainFolder, subFolder) => {
    setActiveSubMainFolder(subFolder);
    setActiveMainFolder(mainFolder);
    props.GET_TEMPLATES_LIST_FOR_ADMIN(subFolder?.template);
    props.SET_FOLDER_ID(mainFolder?._id, subFolder?._id);
  };

  const handleDeleteFolder = () => {
    if (type === "folder") {
      props.REMOVE_FOLDER_TEXT_FOR_ADMIN(null, activeMainFolder);
    } else {
      props.REMOVE_TEXT_SUB_FOLDER_FOR_ADMIN(null, activeSubMainFolder);
    }
    setSweetAlertOpen(false);
  };

  const handleDeleteId = (type, folderid) => {
    setSweetAlertOpen(true);
    setType(type);
  };
  useEffect(() => {
    GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN();
  }, [GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN]);
  useEffect(() => {
    if (activeSubMainFolder) {
      let findActiveMainFolder = templateFolderListForAdmin?.data?.filter(
        (item) => item?._id === activeMainFolder?._id
      );
      let findActiveSubFolder = findActiveMainFolder[0]?.subFolder?.filter(
        (item) => item?._id === activeSubMainFolder?._id
      );
      if (findActiveSubFolder?.length > 0) {
        props.GET_TEMPLATES_LIST_FOR_ADMIN(findActiveSubFolder[0]?.template);
      }
    }
  }, [activeSubMainFolder, templateFolderListForAdmin, activeMainFolder]);
  return (
    <Fragment>
      <List className={classes.listWrapper} dense>
        <CreateFolderModal />
        {templateFolderListForAdmin?.data?.map((item) => {
          return (
            <Fragment key={item?._id}>
              <ListItem
                className={
                  activeSubMainFolder === null &&
                  activeMainFolder?._id === item?._id
                    ? classes.activeMainFolder
                    : classes.inActiveFolder
                }
                button
              >
                <Button
                  className={classes.folderBtn}
                  fullWidth
                  onClick={() => {
                    handleMainFolder(item);
                    setActiveMainFolder(item);
                  }}
                >
                  <img
                    src={`/images/FolderM.png`}
                    alt={`${item?.folderName}`}
                  />
                  <span className="f-subname text-capitalize">
                    {item?.folderName}
                  </span>
                </Button>
                {item?.subFolder?.length > 0 ? (
                  <ExpandMoreIcon fontSize="small" />
                ) : (
                  <div className="ml-1"></div>
                )}
                <EditAndDeleteFolder
                  editfolder={<CreateFolderModal item={item} />}
                  OpenAlert={handleDeleteId}
                  item={item}
                  FolderType="folder"
                />
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
                          activeSubMainFolder?._id === subFolder?._id
                            ? classes.activeMainFolder
                            : classes.inActiveFolder
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
                        <EditAndDeleteFolder
                          editfolder={
                            <SubFolder item={subFolder} subFolder={subFolder} />
                          }
                          OpenAlert={handleDeleteId}
                          item={subFolder}
                          FolderType="subfolder"
                        />
                      </ListItem>
                    );
                  })}
                  <div>
                    <SubFolder
                      isSubFolder={true}
                      mainFolder={item}
                      activeMainFolder={activeMainFolder}
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
    templateFolderListForAdmin:
      state.templateReducerAdmin?.templateFolderListForAdmin,
  };
};
export default connect(mapStateToProps, {
  GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN,
  REMOVE_FOLDER_TEXT_FOR_ADMIN,
  REMOVE_TEXT_SUB_FOLDER_FOR_ADMIN,
  GET_TEMPLATES_LIST_FOR_ADMIN,
  SET_FOLDER_ID,
})(TextTemplateSidebar);
