import axios from "axios";
// const API_BASE_URL = process.env.REACT_APP_BASE_URL;
// const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://mymember.com";

const adminId = localStorage.getItem('user_id');

const getHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "content-type": "application/json",
    },
  };
};

export const toggle_filter_drawer = () => {
  return async (dispatch) => {
    dispatch({
      type: "TOGGLE_FILTER_DRAWER_OPEN",
      payload: {},
    });
  };
};

export const set_viewlist_selected_index = (index) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_VIEWLIST_SELECTED_INDEX",
      payload: index,
    });
  };
};

export const set_contactlist_selected_index = (index) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_CONTACTLIST_SELECTED_INDEX",
      payload: index,
    });
  };
};

export const set_message_list = (messagelist) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_MESSAGE_LIST",
      payload: messagelist,
    });
  };
};

export const add_new_message = (message) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_NEW_MESSAGE",
      payload: message,
    });
  };
};

export const add_new_customer = (customerInfo) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_NEW_CUSTOMER",
      payload: customerInfo,
    });
  };
};

export const set_customer_list = (customerList) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_CUSTOMER_LIST',
      payload: customerList,
    })
  }
}

export const set_history = () => {
  return async (dispatch) => {
    const response = await axios.get(`${API_BASE_URL}/api/livechat/channels/${adminId}`, getHeaders())
    
    console.log("response data is ", response.data);
    const messages = [];

    const customers = response.data.map((customer) => {
      customer.messages.forEach((message) => {
        const sendTime = new Date(message.createdAt);

        messages.push({
          machineId: customer.machineId,
          adminId: customer.adminId,
          userInfo: {
            username: customer.username,
            email: customer.email
          },
          createdAt: sendTime.getHours() + ":" + sendTime.getMinutes(),
          msg: message.msg,
          type: message.type,
        })
      })

      return {
        machineId: customer.machineId,
        adminId: customer.adminId,
        userInfo: {
          username: customer.username,
          email: customer.email
        },
        browserInfo: customer.browserInfo,
        locationInfo: customer.locationInfo,
      }
    })
    
    dispatch(set_customer_list(customers));
    dispatch(set_message_list(messages));

  };
};

export const save_livechat_widget_setting = async (payload) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/api/livechat/setting`, payload);
  }
  catch(e){
    console.log("save livechat setting err", e);
  }
}

export const get_livechat_widget_setting = async (payload) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/api/livechat/setting/${adminId}`);
    return response.data;
  }
  catch(e){
    console.log("Get livechat setting err", e);
    return {};
  }

}