import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  List,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItem,
  ListItemAvatar,
  Typography,
  Card,
  Button,
  InputBase,
} from "@material-ui/core";
import {
  Attachment,
  InsertEmoticonOutlined,
  Send,
} from "@material-ui/icons";
import { MessageSquare } from "react-feather";
import Badge from '@material-ui/core/Badge';
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  SEND_TEXT_MESSAGE_V2,
  UPDATE_MEMBER_CONTACTS_DETAILS,
  GET_TEXT_USER_CHAT_LIST,
  V2_ADD_TEXT_CONTACTS,
  GET_CONTACTS_DETAILS
} from "../../../../../redux/actions/marketing/V2TextChat";
import Quickchatroom from "./Quickchatroom"
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react"
import Template from "./Template/index";

// ----------------------------------------------------------------------
const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};
const QuickSendSMS = (props) => {
  const { item, badgeContent,
    SEND_TEXT_MESSAGE_V2,
    contacts,
    GET_CONTACTS_DETAILS,
    StudentTypeOrInterest
  } = props;
  const [open, setOpen] = useState(false)
  const [inputTextValue, setTextInputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [Alert, setAlert] = useState('0')

  const onEmojiClick = (e, emojiObject) => {
    setTextInputValue(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(true)
  }

  const insertData = (value) => {
    setTextInputValue(prevInput => prevInput + value);
  }
  const OpenSMS = () => {
    setOpen(!open)
  }
  const handaleSendingText = async (e) => {
    e.preventDefault();
    await props.GET_TEXT_USER_CHAT_LIST(StudentTypeOrInterest);
    const msgSend = async (message) => {
      let result = await SEND_TEXT_MESSAGE_V2(message);
      if (!result.success) {
        toast.error(result.message, toastCSS());
      } else {
        props.UPDATE_MEMBER_CONTACTS_DETAILS(contacts, {
          uid,
          textContent: inputTextValue,
          time: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
        });
        toast.success(result?.msg, toastCSS());
        setAlert(Alert + 1)
      }
    }
    let getdata = await GET_CONTACTS_DETAILS(StudentTypeOrInterest)
    if (inputTextValue.length) {
      if (getdata.length) {
        var uid = item._id;
        var found = false;
        getdata.forEach(function (item) {
          if (item._id === uid) {
            found = true;
          }
        });
        if (found) {
          let message = {
            userId: localStorage.getItem("user_id"),
            uid: uid,
            textContent: inputTextValue,
            isSent: true,
          }
          msgSend(message)
        } else {
          let memberValue = {
            uid: uid,
            from: localStorage.getItem("user_id")
          }
          let { success, msg } = await props.V2_ADD_TEXT_CONTACTS(memberValue);
          if (success) {
            let message = {
              userId: localStorage.getItem("user_id"),
              uid: uid,
              textContent: inputTextValue,
              isSent: true,
            }
            msgSend(message)
          } else {
            toast.error(msg, toastCSS());
          }
        }
        setTextInputValue("")
      } else {
        toast.error("Please try again!", toastCSS());
      }
    }
  };
  return (
    <div>
      <IconButton onClick={OpenSMS}>
        <Badge overlap="rectangular"
          badgeContent={badgeContent}
          color="primary">
          <MessageSquare size={20} />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
      >
        <DialogActions className="d-flex justify-content-between align-items-center">
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={item?.memberprofileImage} alt={item?.firstName} />
              </ListItemAvatar>
              <Typography>
                {item?.firstName} {item?.lastName}
              </Typography>
            </ListItem>
          </List>
          <div className="x">
            <IconButton onClick={OpenSMS} size="small" className="shadow-none">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogActions>
        <DialogContent>
          <Card>
            <Quickchatroom student={item} recallAlert={Alert} />
            <form onSubmit={handaleSendingText}>
              <div className="d-flex justify-content-between mt-0 mb-1 ml-1 mr-1">
                <div
                  style={{
                    border: "1.5px solid #E0E0E0",
                    padding: 2,
                    borderRadius: 20,
                    background: "#EEEEEE",
                  }}
                  className="mt-1 d-flex justify-content-start align-items-center w-100"
                >
                  <div className="d-flex justify-content-start align-items-center pl-1 pr-1 w-100">
                    <IconButton size="small" className="rounded-circle text-primary">
                      <Template insertData={insertData} />
                    </IconButton>
                    <IconButton size="small" className="rounded-circle text-primary"
                      onClick={() => setShowPicker(val => !val)}>
                      <InsertEmoticonOutlined
                      />
                    </IconButton>
                    <IconButton size="small" className="rounded-circle text-primary">
                      <Attachment />
                    </IconButton>
                    <InputBase
                      className="w-100"
                      type="text"

                      placeholder="Type a message here..."
                      value={inputTextValue}
                      onChange={(e) => {
                        setTextInputValue(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    style={{
                      background: "#00a6e1",
                      borderRadius: 20,
                      marginTop: '1em',
                      marginLeft: "0.5em"
                    }}
                    onClick={handaleSendingText}
                    variant="contained"
                  >
                    <Send color="primary" />
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showPicker}
        onClose={() => {
          setShowPicker(!showPicker)
        }}
      >
        <DialogActions>
          <div>
            <IconButton onClick={() => {
              setShowPicker(!showPicker)
            }} size="small" className="shadow-none">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogActions>
        <DialogContent>
          <Picker skinTone={SKIN_TONE_MEDIUM_DARK} onEmojiClick={onEmojiClick} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.V2textChat?.contacts,
  };
};


export default connect(mapStateToProps, {
  SEND_TEXT_MESSAGE_V2,
  UPDATE_MEMBER_CONTACTS_DETAILS,
  GET_TEXT_USER_CHAT_LIST,
  V2_ADD_TEXT_CONTACTS,
  GET_CONTACTS_DETAILS
})(QuickSendSMS);