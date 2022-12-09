import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getUserId = () => {
    return localStorage.getItem("user_id");
};

const getHeaders = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "content-type": "application/json",
        },
    };
};
const getHeadersForFile = () => {
    return {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "content-type": "multipart/form-data",
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

export const GET_MEMBER_STATISTICS = (perPage, pageNumber, type) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${baseUrl}/api/Admin/Member_Statistics/${getUserId()}/${perPage}/${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                params: { type }
            });
            if (res.data?.success) {
                dispatch({
                    type: "GET_MEMBER_STATISTICS",
                    payload: res.data?.data,
                });
            }
        } catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    };
};

export const GET_INCOME_STATISTICS = (perPage, pageNumber, monthOrYear, month, year) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${baseUrl}/api/Admin/Income_Statistics/${getUserId()}/${monthOrYear}/${perPage}/${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                params: {
                    month,
                    year
                }
            })
            if (res.data?.success) {
                dispatch({
                    type: "GET_INCOME_STATISTICS",
                    payload: res.data?.data,
                });
            }
        } catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    };
};

export const GET_RANK_STATISTICS = (perPage, pageNumber) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${baseUrl}/api/Admin/Rank_Statistics/${getUserId()}/${perPage}/${pageNumber}`, getHeaders());
            if (res.data?.success) {
                dispatch({
                    type: "GET_RANK_STATISTICS",
                    payload: res.data?.data,
                });
            }
        } catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    };
};
export const GET_RETENTION_STATISTICS = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${baseUrl}/api/Admin/Retention_Statics/${getUserId()}`, getHeaders());
            if (res.data?.success) {
                dispatch({
                    type: "GET_RETENTION_STATISTICS",
                    payload: res.data?.data,
                });
            }
        } catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    };
};