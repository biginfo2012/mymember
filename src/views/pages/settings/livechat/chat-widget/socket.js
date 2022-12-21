import io from "socket.io-client";
import { getBrowserInfo, getMachineId, getUserInfoFromLocalStorage } from "./utils";

const adminId = localStorage.getItem('user_id');

export const socketIo = io("https://mymember.com", {
  transports: ["websocket"],
  secure: true,
});

socketIo.connect();

socketIo.on("connect", () => {
  console.log("connected to socket server");
  setTimeout(() => {
    socketIo.emit("clientRegister", {
      adminId,
      machineId: getMachineId(),
    });    
  }, 500);

});

socketIo.on("connect_error", (err) => {
  console.log(`connect_error due to - ${err.message}`);
});

export const SOCKET_CONNECTER_IO = () => {
  return socketIo;
};

export const sendMessage = (message) => {
  socketIo.emit("clientMsgSend", {
    machineId: getMachineId(),
    adminId: adminId,
    userInfo: getUserInfoFromLocalStorage(),
    msg: message,
  });
};

export const startChat = (userInfo) => {
  socketIo.emit("startChat", {
    adminId: adminId,
    machineId: getMachineId(),
    userInfo: userInfo,
    locationInfo: localStorage.getItem("locationInfo"),
    browserInfo: JSON.stringify(getBrowserInfo()),
  });
};

export const endChat = () => {
  socketIo.emit("endChat", {
    adminId: adminId,
    machineId: getMachineId(),
  });
}


// window.jscd = {
//   screen: screenSize,
//   browser: browser,
//   browserVersion: version,
//   browserMajorVersion: majorVersion,
//   mobile: mobile,
//   os: os,
//   osVersion: osVersion,
//   cookies: cookieEnabled,
//   flashVersion: flashVersion
// };
// }