import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NameAvatar from "./NameAvatar";
import { Chip } from "@mui/material";

const useStyle = makeStyles({
  nameAndMsg: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "start",
    paddingLeft: "12px",
    paddingRight: "12px",
    fontSize: "14px",
    color: "#424d57",
    lineHeight: "1.4",
  },
  timeDiffAndUnread: {
    fontSize: "12px",
    color: "#424d57",
    justifyContent: "space-around",
    display:'flex',
    flexDirection:'column',
    alignItems: 'end',
  },
  chatClientButton: {
    display: "flex",
    flexDirection: "row",
    padding: "12px 16px",
    width: "100%",
    minWidth: "300px",
  },
  chatInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  message: {
    textOverflow: "ellipsis",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "160px",
  },
});

const ChatClientButton = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.chatClientButton}>
      <NameAvatar displayName={props.clientName} />
      <div className={classes.chatInfo}>
        <div className={classes.nameAndMsg}>
          <div style={{ fontWeight: "bold" }}>{props.clientName}</div>
          <div className={classes.message}>{props.msg}</div>
        </div>
        <div className={classes.timeDiffAndUnread}>
            
        <div>{props.timeDiff}</div>
          {props.unread ? (
            <div
              style={{
                padding: "2.6px 6.8px 3.8px",
                width: '20px',
                height: '20px',
                borderRadius: "50%",
                backgroundColor: "#25D366",
                fontSize: "0.7rem",
                color: "white",
              }}
            >
              <span>{props.unread}</span>
            </div>
          ) : null 
          }
        </div>
      </div>
    </div>
  );
};

export default ChatClientButton;
