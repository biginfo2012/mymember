import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
    SOCKET_CONNECTER_IO,
    SOCKET_GET_MEMBER_CHAT,
    SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE
} from "../../../../../redux/actions/socket.io";
import { V2_GET_TEXT_MESSAGES } from "../../../../../redux/actions/marketing/V2TextChat";
//import { Alert } from "@material-ui/lab";
import Alert from '@mui/lab/Alert';
import './ChatRoom.scss'

const getUserId = () => {
    return localStorage.getItem("user_id");
};
const Quickchatroom = (props) => {
    const chatContainer = React.createRef(null);
    const [data, setdata] = useState([])
    const [Daywisedata, setDayWisedata] = useState([])
    const {
        student,
        V2_GET_TEXT_MESSAGES,
        recallAlert
    } = props
    let scrollToBottom = () => {
        const scroll =
            chatContainer.current.scrollHeight -
            chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll);


    };
    let timeFormat = (time) => {
        let dt = time?.split(".")[0];
        return moment(dt).format("LT");
    }
    useEffect(() => {
        scrollToBottom();
    });
    const callSoket = async () => {
        try {
            await SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE(getUserId())
            await SOCKET_GET_MEMBER_CHAT({ uid: student?._id, userId: getUserId() })
            await SOCKET_CONNECTER_IO().on("memberTextList", (data) => {
                V2_GET_TEXT_MESSAGES(data)
                setdata(data)
            });
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        callSoket()
    }, [recallAlert])

    const handleScroll = event => {
        // console.log(event.target)
    };
    const getdata = () => {
        let modifydata = []
        if (data?.length > 0) {
            let list = []
            let time = data[0]['time']
            for (var i of data) {
                if (moment(i?.time).format("MM/DD/YYYY") !== moment(time).format("MM/DD/YYYY")) {
                    time = moment(i?.time).format("MM/DD/YYYY")
                    list.push(time)
                }
            }
            let uniqueChars = [...new Set(list)];
            for (var date of uniqueChars) {
                const filterdata = data.filter((item) => date === moment(item?.time).format("MM/DD/YYYY"))
                modifydata.push({ time: date, item: filterdata })

            }


        }
        setDayWisedata(modifydata)

    }
    useEffect(() => {
        getdata()
    }, [data])
    return (
        <div className="chats"
            ref={chatContainer}
            style={{
                height: "40vh", overflowY: "scroll",
                overflowX: "hidden", width: "50vh"
            }}
            onScroll={handleScroll}
        >
            <Alert
                severity="info"
                className="m-1 w-100 d-flex justify-content-center"
            >we secure your conversation with end-to-end encryption</Alert>
            {Daywisedata.map(({ item, time }) => (
                <div className="flex flex-col">
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
                                id={i === item.length - 1 ? "last_message" : null}
                                className={`chat ${chat.isSent ? "chat-right" : "chat-left"}`}
                            >
                                <div
                                    className="chat-body">

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
            {/* {Daywisedata?.map((chat, i) => {
                return (
                    <div
                        key={i}
                        id={i === Daywisedata.length - 1 ? "last_message" : null}
                        className={`chat ${chat.isSent ? "chat-right" : "chat-left"}`}

                    >
                        {console.log(chat)}
                        <div
                            className="chat-body">
                            <div className=" d-flex justify-content-center">
                                <span
                                    className="text-sm border px-2 rounded-full bg-white border-gray-300">
                                    {moment(chat.time).format("MM/DD/YYYY")}
                                </span>
                            </div>
                            <div style={{ maxWidth: "50%" }} className="chat-content">
                                <p>{chat.textContent}</p>
                            </div>
                            <div className="chat-time">
                                <p>{`${moment(chat.time).format("MM/DD/YYYY")} ${timeFormat(chat.time)}`}</p>
                            </div>
                        </div>
                    </div>
                );
            })} */}
        </div >
    );
};

const mapStateToProps = (state) => ({
    userinfo: state.userinfo,
    getMessages: state.V2textChat?.getMessages,

});

export default connect(
    mapStateToProps, {
    V2_GET_TEXT_MESSAGES,

})(Quickchatroom);
