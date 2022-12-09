import React, { Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";

import CloseIcon from "@material-ui/icons/Close";
import {
  Checkbox,
  Chip,
  DialogContent,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  selectBtn: {
    borderRadius: "6px !important",
    padding: "2px",
    display: "column",
    alignItems: "center",
    overflow: "scroll",
    height: "32px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  listItem: {
    "&:hover": {
      background: "#eaf4fe",
      color: "#2796f3",
    },
  },
  SelectSmList: {
    borderRadius: "6px",
    background: "#eaf4fe",
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "6px",
    cursor: "pointer",
  },
  inputWrapper: {
    textAlign: "left",
    height: "40px",
    verticalAlign: "center",
  },
}));
export default function MultiSourceSelector(props) {
  const classes = useStyles();
  const { changeHandlerforleads, studentinfo, isEdit } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.inputWrapper}>
      <div
        className={classes.selectBtn}
        onClick={!isEdit ? () => {} : handleClickOpen}
      >
        <Fragment>
          {studentinfo?.length === 0 && (
            <Chip
              size="medium"
              className={classes.SelectSmList}
              label={"Select Source"}
            />
          )}
        </Fragment>
        {studentinfo !== null
          ? studentinfo?.map((item) => {
              return (
                <Chip
                  size="small"
                  className={classes.SelectSmList}
                  label={item}
                  key={item}
                />
              );
            })
          : null}
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="p-1" style={{ color: "#2196f4" }}>
                Source
              </h4>
            </div>
            <div className="d-flex justify-content-end">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <DialogContent style={{ width: "400px" }}>
          <List dense>
            {props.getLeadTrackingList !== null
              ? props.getLeadTrackingList?.map((item, i) => {
                  return (
                    <ListItem
                      key={item?._id}
                      button
                      onClick={() => {
                        changeHandlerforleads(item?.leads_category);
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={studentinfo?.includes(item?.leads_category)}
                        />
                      </ListItemIcon>
                      <ListItemText>{item?.leads_category}</ListItemText>
                    </ListItem>
                  );
                })
              : null}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
