import {
  Card,
  Divider,
  Fab,
  Grid,
  InputBase,
  List,
  ListItemButton,
  Popover,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { Col } from "reactstrap";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ChatClientButton from "./components/ChatClientButton";
import { mockMsgs, mockUsers } from "./const";
import {
  set_contactlist_selected_index,
  set_message_list,
  add_new_message,
  add_new_customer,
  set_history,
} from "../../../../redux/actions/marketing/livechat";
import Message from "./components/Message";
import {
  Alarm,
  EmojiEmotions,
  AttachFile,
  Directions,
  Search,
  MenuBook,
  Menu,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { LocationOn } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { SOCKET_CONNECTER_IO } from "../../../../redux/actions/socket.io";
import { PreChatMessage } from "./components/PrepostMessage";
import AddNewTicketModal from "../ticket/AddNewTicketModal";
import {
  add_new_ticket,
  get_all_tickets,
} from "../../../../redux/actions/marketing/ticket";
import { Rate } from "antd";
import MemberInfo from "./components/MemberInfo";

import { GET_ACTIVE_STUDENT } from "../../../../redux/actions/newstudent";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  root: {
    border: "1px solid lightgray !important",
    borderRadius: "4px",
  },
  messageBody: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
    border: "1px solid lightgray",
    borderBottom: "0px",
    borderTop: "0px",
  },
  infoGroup: {
    marginTop: "3rem",
    display: "flex",
    flexDirection: "column",
  },
});

const LiveChat = (props) => {
  // internal state Variables
  const [anchorEl, setAnchorEl] = useState(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);
  const history = useHistory();
  // External State Variables and actions
  const {
    contactlistSelectedIndex,
    set_contactlist_selected_index,
    set_message_list,
    messages,
    add_new_message,
    add_new_customer,
    customers,
    set_history,
    tickets,
    add_new_ticket,
    get_all_tickets,
    GET_ACTIVE_STUDENT,
    listofStudentdata,
  } = props;

  const locationInfo = useMemo(() => {
    if (
      customers &&
      customers.length > 0 &&
      customers[contactlistSelectedIndex].locationInfo
    ) {
      return JSON.parse(customers[contactlistSelectedIndex].locationInfo);
    }
  }, [customers, contactlistSelectedIndex]);

  const browserInfo = useMemo(() => {
    if (
      customers &&
      customers.length > 0 &&
      customers[contactlistSelectedIndex].browserInfo
    ) {
      return JSON.parse(customers[contactlistSelectedIndex].browserInfo);
    }
  }, [customers, contactlistSelectedIndex]);

  const studentId = useMemo(() => {
    
    if (
      listofStudentdata &&
      listofStudentdata.length > 0 &&
      customers &&
      customers.length > 0
    ) {
      console.log("studentId updated");

      const student = listofStudentdata.find(
        (item) =>
          item.email === customers[contactlistSelectedIndex].userInfo.email
      );

      if (student) return student._id;
      else return "";
    }
    return "";
  }, [customers, contactlistSelectedIndex, listofStudentdata]);

  // BreakPoints
  const lgMatch = useMediaQuery("(min-width:1024px)");

  const messagesEndRef = useRef(null);

  const classes = useStyle(props);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Rendering hook functions
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Fetch chat history and channels.
    set_history();
    get_all_tickets();

    scrollToBottom();
    // set_message_list(mockMsgs);
    SOCKET_CONNECTER_IO().on("customerMessage", (data) => {
      // if (data.source === customers[contactlistSelectedIndex].email || data.source == "1234")
      //   add_new_message({ ...data, isRead: true });
      // else add_new_message({ ...data, isRead: false });
    });
    SOCKET_CONNECTER_IO().on("clientMessage", (data) => {
      // if (data.source === customers[contactlistSelectedIndex].email || data.source == "1234")
      //   add_new_message({ ...data, isRead: true });
      // else add_new_message({ ...data, isRead: false });
    });
    SOCKET_CONNECTER_IO().on("startChat", ({ machineId, userInfo }) => {
      // setSocketInfoData(notificationData)
      // props.GET_NOTIFICATION_DATA(notificationData);
      set_history();
      SOCKET_CONNECTER_IO().emit("adminMsgSend", {
        adminId: localStorage.getItem("user_id"),
        machineId: machineId,
        msg: "How may I help you?",
        userInfo: userInfo,
      });
    });

    SOCKET_CONNECTER_IO().on("clientMsgRev", (data) => {
      add_new_message({ ...data, type: "clientMessage" });
    });

    SOCKET_CONNECTER_IO().on("adminMsgRev", (data) => {
      add_new_message({ ...data, type: "adminMessage" });
    });

    GET_ACTIVE_STUDENT();

    return function cleanup() {
      SOCKET_CONNECTER_IO().removeAllListeners();
    };
  }, []);

  // Action listeners
  const handleEmojiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(scrollToBottom);

  const handleListItemClick = (event, index) => {
    set_contactlist_selected_index(index);
  };

  const keypress = (e) => {
    if (e.keyCode == 13) {
      SOCKET_CONNECTER_IO().emit("adminMsgSend", {
        adminId: localStorage.getItem("user_id"),
        machineId: customers[contactlistSelectedIndex].machineId,
        msg: messageInput,
        userInfo: customers[contactlistSelectedIndex].userInfo,
      });
      // add_new_message({
      //   source: "1234",
      //   destination: customers[contactlistSelectedIndex].email,
      //   type: 'clientMessage',
      //   sendTime: new Date(),
      //   content: messageInput,
      // });
      setMessageInput("");
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setAnchorEl(null);
    setMessageInput(messageInput.concat(emojiObject.emoji));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Live Chat"
        breadCrumbParent="Marketing"
        breadCrumbActive="Chat"
      />
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          height: "calc(100vh - 233px)",
        }}
      >
        <div style={{ width: "400px" }}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: 400,
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <Menu />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, width: "auto" }}
              placeholder="Search chat history"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </Paper>
          <List component="nav" aria-label="main mailbox folders">
            {customers.map((customer, index) => {
              const filteredMessages = messages.filter(
                (message) => message.machineId === customer.machineId
              );
              const latestMessageTime = filteredMessages[filteredMessages.length - 1].createdAt;
                // todo: latest chat time
              return (
                <ListItemButton
                  selected={contactlistSelectedIndex === index}
                  key={index}
                  onClick={(event) => handleListItemClick(event, index)}
                >
                  <ChatClientButton
                    clientName={customer.userInfo.username}
                    msg={
                      filteredMessages && filteredMessages.length > 0
                        ? filteredMessages[filteredMessages.length - 1].msg
                        : ""
                    }
                    timeDiff={filteredMessages[filteredMessages.length - 1].createdAt}
                    unread={1}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </div>
        <div className={classes.messageBody}>
          <div
            style={{
              flex: "1 1 auto",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Divider sx={{ alignItems: "center" }}>
              Chat started Dec 07 2022{" "}
            </Divider>
            {/* <Message
              content="Hello, how may I help you"
              send={true}
              sendTime="8.00 am"
            /> */}
            {messages &&
              messages.length > 0 &&
              messages.map((item, index) => {
                const selectedMachineId =
                  customers[contactlistSelectedIndex].machineId;
                if (item.machineId !== selectedMachineId) return null;
                if (item.type === "PreChatForm") {
                  const userInfo = JSON.parse(item.msg);
                  return (
                    <div key={index}>
                      <PreChatMessage
                        username={userInfo.username}
                        email={userInfo.email}
                      />
                    </div>
                  );
                }
                if (item.type === "PostChatForm") {
                  const postFormData = JSON.parse(item.msg);
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        {customers[contactlistSelectedIndex].userInfo.username}{" "}
                        &nbsp; closed chat with rate: {postFormData.rate}
                      </p>
                      <Rate disabled defaultValue={postFormData.rate} />
                      <Divider />
                    </div>
                  );
                }
                return (
                  <Message
                    content={item.msg}
                    send={item.type === "adminMessage"}
                    sendTime={item.createdAt}
                    key={index}
                  />
                );
              })}
            <div ref={messagesEndRef} />
          </div>
          <div
            style={{
              padding: "20px",
              display: "flex",
              flex: "0 0 auto",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="delete"
              size="large"
              disabled={messages.length === 0}
              onClick={(e) => handleEmojiClick(e)}
            >
              <EmojiEmotions />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Picker
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                native
              />
            </Popover>
            <IconButton
              aria-label="delete"
              size="large"
              disabled={messages.length === 0}
            >
              <AttachFile />
            </IconButton>
            <TextField
              placeholder="Type your message"
              id="outlined-basic"
              style={{ width: "calc(100% - 90px)" }}
              variant="outlined"
              className={classes.root}
              value={messageInput}
              disabled={messages.length === 0}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={keypress}
            />
          </div>
          {/* <Grid container>
            <Grid xs={1}>
              <IconButton aria-label="delete">
                <EmojiEmotions />
              </IconButton>
            </Grid>
            <Grid xs={1}>
              <IconButton aria-label="delete">
                <AttachFile />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <TextField placeholder="Type your message" id="outlined-basic" variant="outlined" className={classes.root} fullWidth value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={keypress} />
            </Grid>
            <Grid xs={1} align="right">
              <IconButton aria-label="delete" onClick={(e) => handleSend()}>
                <SendRounded style={{backgroundColor:'#427fe1', color: 'white', width: '40px', height: '40px', padding: '5px', borderRadius:'50%'}} />
              </IconButton>
            </Grid>
          </Grid> */}
        </div>
        {lgMatch && customers.length > 0 ? (
          <div
            style={{
              width: "600px",
              marginLeft: "2rem",
              marginRight: "2rem",
              maxHeight: "100%",
              overflowY: "auto",
            }}
          >
            <div className={classes.infoGroup}>
              <h3>General Info</h3>
              <ChatClientButton
                clientName={
                  customers[contactlistSelectedIndex].userInfo.username
                }
                msg={customers[contactlistSelectedIndex].userInfo.email}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Alarm sx={{ marginRight: "20px" }}></Alarm>10:30 am local time
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "3px",
                }}
              >
                <LocationOn sx={{ marginRight: "20px" }}></LocationOn>
                {locationInfo?.city + "(" + locationInfo.countryName + ")"}
              </div>
            </div>
            <Divider sx={{ margin: "20px" }} />
            <div className={classes.infoGroup}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h3>Ticket Properties</h3>
                <a onClick={(e) => setIsAddTicketModalOpen(true)}>+ Add</a>
              </div>
              {tickets &&
                tickets.map((ticket) => {
                  if (
                    ticket.reqEmail ===
                    customers[contactlistSelectedIndex].userInfo.email
                  ) {
                    return (
                      <a
                        style={{ lineHeight: "1.7", marginLeft: "10px" }}
                        href={`/app/ticket/ticketview/${ticket._id}`}
                      >
                        {ticket.ticketName}
                      </a>
                    );
                  }
                })}
              {/* <div style={{ marginTop: "10px" }}>
                <p>
                  Agent assigned: <b>Xing Liao (you)</b>
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <p>
                  Ticket Type: <b>Question</b>
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <p>
                  Priority: <b>High</b>
                </p>
              </div> */}
            </div>
            <Divider sx={{ margin: "20px" }} />
            <div className={classes.infoGroup}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {studentId !== "" ? (
                  <div>
                    <h3>Member Info</h3>
                    <MemberInfo studentId={studentId} />
                  </div>
                ) : (
                  <div>
                    <h3>Add member</h3>
                    <a onClick={(e) => history.push("/data-list/add-new-student/")}>+ Add</a>
                  </div>
                )}
              </div>
            </div>
            <Divider sx={{ margin: "20px" }} />
            <div className={classes.infoGroup}>
              <h3>Additional Info</h3>
              <p>
                IP Address: <b>{locationInfo.ipAddress}</b>
              </p>
              <p>
                OS/Device:{" "}
                <b>{browserInfo.os + "(" + browserInfo.osVersion + ")"}</b>
              </p>
              <p>
                Browser:{" "}
                <b>
                  {browserInfo.browser + "(" + browserInfo.browserVersion + ")"}
                </b>
              </p>
              <p>
                Mobile: <b>{browserInfo.mobile.toString()}</b>
              </p>
            </div>
            <AddNewTicketModal
              open={isAddTicketModalOpen}
              onCancel={(e) => setIsAddTicketModalOpen(false)}
              userInfo={customers[contactlistSelectedIndex].userInfo}
              saveFromlivechat={true}
            />
          </div>
        ) : null}
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    contactlistSelectedIndex: state.livechat.contactlistSelectedIndex,
    messages: state.livechat.messages,
    customers: state.livechat.customers,
    tickets: state.ticket.tickets,
    listofStudentdata: state.student.listofStudentdata,
  };
};

export default connect(mapStateToProps, {
  set_contactlist_selected_index,
  set_message_list,
  add_new_message,
  add_new_customer,
  add_new_ticket,
  get_all_tickets,
  set_history,
  GET_ACTIVE_STUDENT,
})(LiveChat);
