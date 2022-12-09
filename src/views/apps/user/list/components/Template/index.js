import React, { useEffect, useState } from "react";
//import { makeStyles } from "@material-ui/styles";
import makeStyles from "@mui/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { ReorderOutlined } from "@material-ui/icons";
import { Button, DialogActions, IconButton, } from "@material-ui/core";
import TextTemplateSidebar from "./Sidebar/index";
import TextTemplateListing from "./TamplateListing/TextTemplateListing";
import { GET_TEMPLATE_FOLDER_LIST } from "../../../../../../redux/actions/marketing/text";
import { X } from "react-feather";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TextTemplate = (props) => {
  const { templateFolderList, GET_TEMPLATE_FOLDER_LIST, insertData } = props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    GET_TEMPLATE_FOLDER_LIST();
  }, []);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInsert = (data) => {
    insertData(data?.text)
    setOpen(!open)
  }
  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        size="small"
        className="rounded-circle text-primary"
      >
        <ReorderOutlined />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogActions>
          <IconButton onClick={handleClickOpen}>
            <X />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <div className="d-flex w-100">
            <TextTemplateSidebar data={templateFolderList} />
            <TextTemplateListing data={templateFolderList}
              handleInsert={handleInsert} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    templateFolderList: state.template.templateFolderList,
  };
};

export default connect(mapStateToProps, { GET_TEMPLATE_FOLDER_LIST })(
  TextTemplate
);
