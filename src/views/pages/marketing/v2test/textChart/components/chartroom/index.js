import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  TEXT_CHAT_ALERT,
} from "../../../../../../../redux/actions/marketing/V2TextChat";
import {
  SOCKET_GET_TEXT_MESSAGES,
  getUserId,
} from "../../../../../../../redux/actions/socket.io";
import { Alert } from "reactstrap";

const ChatRoom = (props) => {
  const { getMessages, activeStudent2sendtextChat } = props;
  const [Daywisedata, setDayWisedata] = useState([])
  const chatContainer = React.createRef(null);

  useEffect(() => {
    if (Object.keys(activeStudent2sendtextChat).length) {
      let { uid } = activeStudent2sendtextChat;
      let getSocketFormat = { uid, userId: getUserId() };
      SOCKET_GET_TEXT_MESSAGES(getSocketFormat);
    }
  }, [activeStudent2sendtextChat]);

  useEffect(() => {
    chatContainer.current.scrollIntoView();
  }, [getMessages]);

  const getLogedInUser = () => {
    return JSON.parse(localStorage.getItem("userdata"))?.data;
  };

  let scrollToBottom = () => {
    const section = document.querySelector("#last_message");
    const scroll =
      chatContainer.current.scrollHeight -
      chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
    if (section) {
      section.scrollIntoView({ overscrollBehavior: 'none' });
    }
  };

  useEffect(() => {
    scrollToBottom()
  })
  let timeFormat = (time) => {
    let dt = time.split(".")[0];
    return moment(dt).format("LT");
  }
  const getdata = () => {
    let modifydata = []
    if (getMessages?.length > 0) {
      let list = []
      let time = getMessages[0]['time']
      for (var i of getMessages) {
        if (moment(i?.time).format("MM/DD/YYYY") !== moment(time).format("MM/DD/YYYY")) {
          time = moment(i?.time).format("MM/DD/YYYY")
          list.push(time)
        }
      }
      let uniqueChars = [...new Set(list)];
      for (var date of uniqueChars) {
        const filterdata = getMessages.filter((item) => date === moment(item?.time).format("MM/DD/YYYY"))
        modifydata.push({ time: date, item: filterdata })

      }
    }
    setDayWisedata(modifydata)

  }
  useEffect(() => {
    getdata()
  }, [getMessages])

  return (
    <div
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        paddingBottom: "10vh"
      }}
      id={"chats"}
      className="chats" >
      <Alert
        severity="info"
        className="m-1 w-100 d-flex justify-content-center"
      >We secure your conversation with end-to-end encryption</Alert>
      {Daywisedata.map(({ item, time }, i) => (
        <div
          // id={i === item.length - 1 ? "last_message" : null}
          className="flex flex-col" key={time}>
          <div className=" d-flex justify-content-center">
            <span
              style={{
                padding: "0.5em",
                background: "#F5F5F5	"
              }}
              className="shadow-sm bg-red rounded">
              {time}
            </span>
          </div>
          {item?.map((chat, i) => {
            return (
              <div
                key={i}
                className={`chat ${chat.isSent ? "chat-right" : "chat-left"}`}
              >

                <div className="chat-avatar">
                  <div className="avatar m-0">
                    <Avatar
                      src={
                        chat.isSent
                          ? getLogedInUser()?.logo
                            ? getLogedInUser()?.logo
                            : "http://"
                          : activeStudent2sendtextChat?.memberprofileImage
                      }
                      alt={getLogedInUser()?.username}
                    />
                  </div>
                </div>
                <div className="chat-body">
                  <div style={{ maxWidth: "50%" }} className="chat-content">
                    <p>{chat.textContent}</p>
                  </div>
                  <div className="chat-time">
                    <p>{`${timeFormat(chat.time)}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))
      }
      <div ref={chatContainer} id={"last_message"} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getMessages: state.V2textChat?.getMessages,
    activeStudent2sendtextChat: state.V2textChat?.activeStudent2sendtextChat,
  };
};

export default connect(mapStateToProps, {
  TEXT_CHAT_ALERT,
})(ChatRoom);
