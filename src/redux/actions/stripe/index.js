import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
const userData = JSON.parse(localStorage.getItem("userdata"));
const baseUrl = process.env.REACT_APP_BASE_URL;
const getUserId = () => {
  return localStorage.getItem("user_id");
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "application/json",
  };
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

export const getStripeList = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/list_of_candidate/${getUserId()}`,
        { headers: getHeaders() }
      );
      if (response?.data && response?.status === 200) {
        if (response?.data?.msg) {
        } else {
          dispatch({
            type: "GET_STRIPE_LIST",
            payload: response?.data?.data,
          });
        }
      }
    } catch (error) {
      toast.error(error?.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const STRIPE_PAYMENT_METHODS_LIST = (studentId) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/list_cards/${studentId}`,
        { headers: getHeaders() }
      );
      if (response?.data && response?.status === 200) {
        dispatch({
          type: "GET_STRIPE_PAYMENT_METHODS_LIST",
          payload: response?.data,
        });
      }
    } catch (error) {
      toast.error(error?.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const ADD_STRIPE_PAYMENT_METHOD = (payload) => {
  let syduentId = window.location.pathname.split("/")[2];
  let url = `${baseUrl}/api/add_stripe_payment_method/${getUserId()}/${syduentId}`;
  return async (dispatch) => {
    try {
      const addStudentResponse = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (addStudentResponse.data.success) {
        toast.success(addStudentResponse.data.msg, toastCSS());
        dispatch({
          type: "GET_STRIPE_PAYMENT_METHODS_LIST",
          payload: addStudentResponse.data?.data,
        });
        return true;
      } else {
        toast.error(addStudentResponse.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const SET_DEFAULT_PAYMENT_METHOD = (studentId, card_id) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/set_default_paymentMethod/${studentId}/${card_id}`,
        { headers: getHeaders() }
      );
      if (
        response?.data &&
        response?.data?.success &&
        response?.status === 200
      ) {
        dispatch({
          type: "GET_STRIPE_PAYMENT_METHODS_LIST",
          payload: response?.data?.data,
        });
        toast.success(response.data.msg, toastCSS());
      } else {
        toast.error(response.data.error, toastCSS());
      }
    } catch (error) {
      toast.error(error?.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const DELETE_STRIPE_PAYMENT_METHOD = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/delete_paymentMethod/${payload.studentId}`,
        payload,
        { headers: getHeaders() }
      );
      if (
        response?.data &&
        response?.data?.success &&
        response?.status === 200
      ) {
        dispatch({
          type: "GET_STRIPE_PAYMENT_METHODS_LIST",
          payload: response?.data?.data,
        });
        toast.success(response.data.msg, toastCSS());
      } else {
        toast.error(response.data.error, toastCSS());
      }
    } catch (error) {
      toast.error(error?.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const CREATE_STRIPES = (data) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });

  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/add_candidate/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/admin/add_candidate/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "content-type": "multipart/form-data",
        },
      });
      if (response.data && response.status === 200) {
        dispatch(getStripeList());
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error, "something went wrong", toastCSS());

      dispatch(getStripeList());
    }
  };
};

export const UPDATE_STRIPE = (data, stripeId) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/update_candidate/${getUserId()}/${stripeId}`;
  } else {
    url = `${baseUrl}/api/admin/update_candidate/${getUserId()}/${stripeId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.data && response.status === 200) {
        dispatch(getStripeList());
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      dispatch(getStripeList());
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const TrashCandidate = (id) => {
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/delete_candidate/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/admin/delete_candidate/${getUserId()}/${id}`;
  }

  return (dispatch) => {
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        dispatch(getStripeList());
        toast.success(res.data.msg, toastCSS());
      });
  };
};

export const GET_MANAGE_STRIPE = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/stripe_manage_info/${getUserId()}`,
        { headers: getHeaders() }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: "GET_MANAGE_STRIPE",
          payload: response.data,
        });
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const UPDATE_STRIPE2 = (data, stripeId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/update_candidate/${getUserId()}/${stripeId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200) {
        dispatch(getStripeList());
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      dispatch(getStripeList());
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const createStrap = (data) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/add_stripe/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/admin/add_stripe/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "content-type": "multipart/form-data",
        },
      });
      if (response.data && response.status === 200) {
        dispatch(getStripeList());
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.replace(/\\/g, ""), toastCSS());
      dispatch(getStripeList());
    }
  };
};

export const updateStripe = (data, stripeId) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/update_stripe/${getUserId()}/${stripeId}`;
  } else {
    url = `${baseUrl}/api/admin/update_stripe/${getUserId()}/${stripeId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.data && response.status === 200) {
        dispatch(getStripeList());
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      dispatch(getStripeList());
      toast.error(error.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const TrashStripe = (id) => {
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/delete_stripe/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/admin/delete_stripe/${getUserId()}/${id}`;
  }

  return (dispatch) => {
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        dispatch(getStripeList());
        toast.success(res.data.msg, toastCSS());
      });
  };
};

export const GET_STRIPE_REPORT_BY_CANDIDATE = ({ params, month, year }) => {
  return async (dispatch) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(month);
    date.setFullYear(year);
    const dateString = moment(date).format("MM-DD-YYYY");
    try {
      let response = await axios.get(
        `${baseUrl}/api/candidates/get-stripe-report-by-candidate/${getUserId()}/${dateString}`,
        { headers: getHeaders(), params }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: "GET_STRIPE_REPORT_BY_CANDIDATE",
          payload: response.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
