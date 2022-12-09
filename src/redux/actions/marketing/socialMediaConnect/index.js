import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

const getUserId = () => {
  return localStorage.getItem("user_id");
};

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
const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 2000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "application/json",
  };
};

export const GET_FB_LOGIN = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_FB_LOGIN",
        payload: token?.authResponse,
      });
    } catch (error) {
      console.log(error, "something error");
    }
  };
};

export const FB_LOGIN = () => {
  return async (dispatch) => {
    try {
      window.FB.login((response) => {
        dispatch(GET_FB_LOGIN(response));
      });
    } catch (err) {
      console.log(err, "something err!");
    }
  };
};

// get the page id and token here
export const GET_FB_PAGE = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_FB_PAGE",
        payload: data?.data
      });
    } catch (error) {
      console.log(error, "something error");
    }
  };
};

export const GET_PAGE_DATA = (userID, accessToken) => {
  return async (dispatch) => {
    try {
      window.FB.api(
        `/${userID}/accounts?access_token=${accessToken}`,
        "GET",
        function (response) {
          dispatch(GET_FB_PAGE(response));
          // dispatch({
          //   type: "GET_PAGE_DATA",
          //   payload: response?.data
          // });
        }
      );
    } catch (error) {
      console.log(error, "something error");
    }
  };
};

export const GET_FB_GROUP = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_FB_GROUP",
        payload: data
      });
    } catch (error) {
      console.log(error, "something error");
    }
  };
};

//get the group id and token here
export const GET_GROUP_DATA = (userID, accessToken) => {
  return async (dispatch) => {
    try {
      window.FB.api(
        `/${userID}/groups?access_token=${accessToken}`,
        "GET",
        function (response) {
          dispatch(GET_FB_GROUP(response));
        }
      );
    } catch (error) {
      console.log(error, "something error");
    }
  };
};

export const GET_ME_DATA = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_ME_INFO",
        payload: data
      })
    } catch (error) {
      console.log(error, "something error");
    }
  }
}

//get the page id and token here
export const GET_ME_INFO = (userId, accessToken) => {
  return async (dispatch) => {
    try {
      window.FB.api(
        `/${userId}`,
        'GET',
        {},
        function (response) {
          dispatch(GET_ME_DATA(response))
        }
      );
    } catch (error) {
      console.log(error, "something error");
    }
  };
};

export const GET_PAGE_INFO = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_PAGE_INFO",
        payload: data
      })
    } catch (error) {
      console.log(error, "something error")
    }
  }
}

export const GET_PAGE_INFO_DATA = (id, access_token) => {
  return async (dispatch) => {
    try {
      window.FB.api(
        `/${id}/feed?fields=full_picture%2Cmessage%2Ccreated_time&access_token=${access_token}`,
        'GET',
        function (response) {
          dispatch(GET_PAGE_INFO(response))
        }
      );
    } catch (error) {
      console.log(error, "something error")
    }
  }
}

export const GET_GROUP_INFO = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_GROUP_INFO",
        payload: data
      })
    } catch (error) {
      console.log(error, "something error")
    }
  }
}

export const GET_GROUP_INFO_DATA = (id, accessToken) => {
  return async (dispatch) => {
    try {
      window.FB.api(
        `/${id}/feed?fields=full_picture,message&access_token=${accessToken}`,
        'GET',
        function (response) {
          dispatch(GET_GROUP_INFO(response))
        }
      );
    } catch (error) {
      console.log(error, "something error")
    }
  }
}


export const FB_POST_DATA = (PageOrGroupId, pageOrGroupAccessToken, postImage, postText, timeSchedule) => {
  return async (dispatch) => {
    try {
      axios.post(
        `https://graph.facebook.com/v15.0/${PageOrGroupId}/photos?published=false&message=${postText}&scheduled_publish_time=${timeSchedule}&url=${postImage}&access_token=${pageOrGroupAccessToken}`
      );
    } catch (error) {
      console.log(error, "something error")
    }
  }
}

export const FB_GROUP_DATA = (PageOrGroupId, pageOrGroupAccessToken, postImage, postText) => {
  return async (dispatch) => {
    try {
      axios.post(
        `https://graph.facebook.com/v15.0/${PageOrGroupId}/photos?message=${postText}&url=${postImage}&access_token=${pageOrGroupAccessToken}`
      );
    } catch (error) {
      console.log(error, "something error")
    }
  }
}

export const FB_POST_TEXT_DATA = (PageOrGroupId, pageOrGroupAccessToken, postText) => {
  return async (dispatch) => {
    try {
      axios.post(
        `https://graph.facebook.com/${PageOrGroupId}/feed`,
        { "access_token": pageOrGroupAccessToken, "message": postText },
      );
    } catch (error) {
      console.log(error, "something error")
    }
  }
}

export const FB_POST_COMMENT = (id, access_token, postText) => {
  return async (dispatch) => {
    try {
      axios.post(`https://graph.facebook.com/v15.0/${id}/comments?access_token=${access_token}&message=${postText}`)
    } catch (err) {
      console.log(err, "something error")
    }
  }
}

//comments access
export const GET_FB_PAGE_COMMENTS = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_FB_PAGE_COMMENTS",
        payload: data?.data
      })
    } catch (err) {
      console.log(err, "something error!")
    }
  }
}

export const FB_COMMENT = (id, access_token) => {
  return async (dispatch) => {
    try {
      window.FB.api(
        `/${id}/comments?access_token=${access_token}`,
        'GET',
        function (response) {
          dispatch(GET_FB_PAGE_COMMENTS(response))
        }
      );
    } catch (err) {
      console.log(err, "something error!")
    }
  }
}

export const FB_IMAGE_UPLOAD = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/email/eventManager`, data, {
        headers: getHeaders(),
      }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: "FB_IMAGE_UPLOAD",
          payload: response?.data
        })
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

