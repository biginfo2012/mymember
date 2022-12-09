import axios from "axios";
import { toast } from "react-toastify";
//const baseUrl = process.env.REACT_APP_BASE_URL + "/api/email_compose";
const domain = process.env.REACT_APP_BASE_URL;
//const baseUrl2 = process.env.API_BASE_URL;
const userData = JSON.parse(localStorage.getItem("userdata"));

const getUserId = () => {
    return localStorage.getItem("user_id");
};

const getHeaders = () => {
    return {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "content-type": "application/json",
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

export const GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN = () => {
  let url = `${domain}/api/builder/template_category/types/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, { headers: getHeaders() });
      if (res.data.success === true) {
        dispatch({
          type: "GET_TEMPLATE_CATEGORY_TYPE_LIST",
          payload: res?.data?.types,
        });
      }
    } catch (error) {

      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN = () => {
  let url = `${domain}/api/builder/template_category/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, { headers: getHeaders() });
      if (res.data.success === true) {
        dispatch({
          type: "GET_TEMPLATE_CATEGORY_LIST",
          payload: res?.data?.categories,
        });
      }
    } catch (error) {

      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};


export const CREATE_TEMPLATE_CATEGORY_FOR_ADMIN = (payload) => {
  let url = `${domain}/api/builder/template_category/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.post(url, payload, { headers: getHeaders() });
      if (res.data.success === true) {
        toast.success(res.data?.msg, toastCSS());
      }
    } catch (error) {

      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_TEMPLATE_CATEGORY_DETAIL_FOR_ADMIN = (id) => {
  let url = `${domain}/api/builder/template_categories/${id}/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, { headers: getHeaders() });
      if (res.data.success === true) {
        return res.data;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const EDIT_TEMPLATE_CATEGORY_FOR_ADMIN = (payload, id) => {
  let url = `${domain}/api/builder/template_category/${id}/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.patch(url, payload,{ headers: getHeaders() });
      if (res.data.success === true) {
        toast.success(res.data?.msg, toastCSS());
      }
    } catch (error) {

      toast.error(error.message.replace(/\\/g, ""), toastCSS());

    }
  };
};
export const DELETE_TEMPLATE_CATEGORY_FOR_ADMIN = (id) => {
  let url = `${domain}/api/builder/template_category/${id}/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.delete(url, { headers: getHeaders() });
      if (res.data.success === true) {
        toast.success(res.data?.msg, toastCSS());
      }
    } catch (error) {

      toast.error(error.message.replace(/\\/g, ""), toastCSS());

    }
  };
};


export const GET_TEMPLATES = () => {
  let url = `${domain}/api/forms`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, { headers: getHeaders() });
      if (res.data.success === true) {
        dispatch({
          type: "GET_TEMPLATES",
          payload: res?.data?.uforms,
        });
      }
    } catch (error) {

      toast.error(error.message.replace(/\\/g, ""), toastCSS());

      dispatch({
        type: "CREATE_TEMPLATE_FAIL",
        payload: error.response
      })
    }
  };
};

export const GET_FORMS = () => {
    let url = `${domain}/api/forms`;
    return async (dispatch) => {
        try {
            let res = await axios.get(url, { headers: getHeaders() });
            if (res.data.success === true) {
                dispatch({
                    type: "GET_FORMS",
                    payload: res?.data?.uforms,
                });
            }
        } catch (error) {

            toast.error(error.message.replace(/\\/g, ""), toastCSS());

            dispatch({
                type: "CREATE_FORM_FAIL",
                payload: error.response
            })
        }
    };
};



export const GET_FORM = (id) => {
    let url = `${domain}/api/forms/${id}`;
    return async (dispatch) => {
        try {
            let res = await axios.get(url, { headers: getHeaders() });
            return res.data.uform
            /*
               if (res.data.success === true) {

                  dispatch({
                    type: "GET_FORM_SUCCESS",
                    payload: res.data.uform,
                  });
            }*/

        } catch (error) {

            toast.error(error.message.replace(/\\/g, ""), toastCSS());

            dispatch({
                type: "GET_FORM_FAIL",
                payload: error.response
            })
        }
    }
}

export const GET_FORM_DATA = (id) => {
    let url = `${domain}/api/forms/${id}`;
    return async (dispatch) => {
        try {
            let res = await axios.get(url, { headers: getHeaders() });

            if (res.data.success === true) {

                dispatch({
                    type: "GET_FORM_SUCCESS",
                    payload: res.data.uform,
                });
            }
        } catch (error) {

            toast.error(error.message.replace(/\\/g, ""), toastCSS());

            dispatch({
                type: "GET_FORM_FAIL",
                payload: error.response
            })
        }
    }
}



export const CREATE_FORM = (payload) => {
    let url = `${domain}/api/forms/new/${getUserId()}`;
    return async (dispatch) => {
        try {
            let response = await axios.post(url, payload, { headers: getHeaders() });
            return response
        }
        catch (error) {

            toast.error(error.message.replace(/\\/g, ""), toastCSS());

            dispatch({
                type: "CREATE_FORM_FAIL",
                payload: error.response
            })
        }
    }
}

export const UPDATE_FORM_DATA = (id, html, css, js, data) => {
    let url = `${domain}/api/forms/update/data/${id}`;
    return async (dispatch) => {
        try {

            let res = await axios.patch(url, { html: html, css: css, js: js, data: data }, { headers: getHeaders() });
            if (res.data.success) {
                dispatch({
                    type: "UPDATE_FORM_SUCCESS",
                    payload: res.data.data,
                });
            }
        } catch (error) {

            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    }
}

export const UPDATE_FORM_SETTING = async (id, title, enabled) => {
    let url = `${domain}/api/forms/update/settings/${id}`;
    try {

        let formData = {
            title: title,
            enabled: enabled
        }
        let res = await axios.patch(url, { title: title, enabled: enabled }, { headers: getHeaders() });

        if (res.data.success) {
            /*dispatch({
                type: "UPDATE_FORM_SUCCESS",
                payload: res.data.data,
            });*/
        }
    }
    catch (error) {

        toast.error(error.message.replace(/\\/g, ""), toastCSS());

        /*dispatch({
          type: "UPDATE_FORM_FAIL",
          payload: error.response
      })*/
    }

    //}
}

export const DELETE_FORM = (id) => {
    let url = `${domain}/api/forms/delete/${id}`;
    return async (dispatch) => {
        try {
            let res = await axios.delete(url, { headers: getHeaders() });
            // if (res.data.success) {
            //     dispatch({
            //         type: "DELETE_FORM_SUCCESS",
            //         payload: res.data.data,
            //     });
            // }
            return res;
        } catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    }
}

export const PROCESS_FORM = (id) => {
    let url = `${domain}/api/forms/process/${id}`;
    return async (dispatch) => {
        try {
            let res = await axios.post(url, { headers: getHeaders() });
            if (res.data.success) {
                dispatch({
                    type: "PROCESS_FORM_SUCCESS",
                    payload: res.data.data,
                });
            }
        }
        catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    }
}

export const SUBMIT_FORM = (id) => {
  let url = `${domain}/api/forms/contact/${id}`;
  return async (dispatch) => {
    try {
      let res = await axios.post(url, { headers: getHeaders() });
      return res
    }
    catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  }
}

export const DELETE_FUNNEL = (id, page, perpage) => {
    let url = `${domain}/api/builder/view/funnel/${id}/${getUserId()}`;
    return async (dispatch) => {
        try {
            let res = await axios.delete(url, getHeaders());
            if (res.data.success === true) {
                toast.success("Form is Deleted! successfully", toastCSS());
                dispatch(
                    GET_FUNNEL(page, perpage)
                )
            }
        }
        catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    }
}


export const GET_FUNNEL = (page, perpage) => {
    let url = `${domain}/api/builder/view/funnel/${getUserId()}/${page}/${perpage}`;
    return async (dispatch) => {
        try {
            let res = await axios.get(url, { headers: getHeaders() });
            if (res.data.success === true) {
                dispatch({
                    type: "GET_FUNNEL",
                    payload: res?.data,
                });
            }
        } catch (error) {

            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    };
};


export const GET_TRASH = (page, perpage) => {
    let url = `${domain}/api/builder/view/funnel/trash/${getUserId()}/${page}/${perpage}`;
    return async (dispatch) => {
        try {
            let res = await axios.get(url, { headers: getHeaders() });
            if (res.data.success === true) {
                dispatch({
                    type: "GET_FUNNEL",
                    payload: res?.data,
                });
            }
        } catch (error) {

            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    };
};

export const GET_SINGLE_FUNNLE = (id) => {
    let url = `${domain}/api/builder/view/funnel/${id}`;
    return async (dispatch) => {
        try {
            let res = await axios.get(url, { headers: getHeaders() });
            if (res.data.success === true) {
                return res.data
            }
        } catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());


        }
    };
};

export const CREATE_FUNNEL = (payload) => {
    let url = `${domain}/api/builder/view/funnel/${getUserId()}`;
    return async (dispatch) => {
        try {
            let response = await axios.post(url, payload, { headers: getHeaders() });
            if (response.data.success) {
                return response?.data
            }
        }
        catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());

        }
    }
}
export const UPDATE_FUNNEL = (payload, id) => {
    let url = `${domain}/api/builder/view/funnel/${id}/${getUserId()}`;
    return async (dispatch) => {
        try {
            let response = await axios.put(url, payload, { headers: getHeaders() });
            if (response.data.success) {
                toast.success("Form Update successfully", toastCSS());
            }
        }
        catch (error) {
            toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    }
}

export const UPDATE_FUNNEL_FIELD = (payload, id, name, page, perpage) => {
    let url = `${domain}/api/builder/view/funnel/${id}/${getUserId()}`;
    return async (dispatch) => {
        try {
            let response = await axios.put(url, payload, { headers: getHeaders() });
            if (response.data.success) {
                toast.success(`${name} successfully`, toastCSS());
                dispatch(GET_FUNNEL(page, perpage))

            }
        }catch (error) {
          toast.error(error.message.replace(/\\/g, ""), toastCSS());
        }
    }
}






export const GET_TEMPLATE = (page, perpage) => {
  let url = `${domain}/api/builder/template/${getUserId()}/${page}/${perpage}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, { headers: getHeaders() });
      if (res.data.success === true) {
        dispatch({
          type: "GET_TEMPLATE",
          payload: res?.data,
        });
      }
    } catch (error) {

      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};


export const GET_TEMPLATE_DETAIL = (id) => {
  let url = `${domain}/api/builder/template/${id}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, { headers: getHeaders() });
      if (res.data.success === true) {
        return res.data
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());


    }
  };
};

export const CREATE_TEMPLATE_FORM = (payload) => {
  let url = `${domain}/api/builder/template/form/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      return response
    }
    catch (error) {

      toast.error(error.message.replace(/\\/g, ""), toastCSS());

      dispatch({
        type: "CREATE_TEMPLATE_FORM_FAIL",
        payload: error.response
      })
    }
  }
}

export const DELETE_TEMPLATE_FORM = (id) => {
  let url = `${domain}/api/builder/template/form/${id}`;
  return async (dispatch) => {
    try {
      let res = await axios.delete(url, { headers: getHeaders() });
      console.log(res);
      return res;
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  }
}

export const CREATE_TEMPLATE = (payload) => {
  let url = `${domain}/api/builder/template/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeadersForFile() });
      if (response.data.success) {
        return response.data
      }
    }
    catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  }
}
export const UPDATE_TEMPLATE = (payload, id, page, perpage) => {
  let url = `${domain}/api/builder/template/${id}/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, { headers: getHeaders() });
      if (response.data.success) {
        toast.success("Template Update successfully", toastCSS());
        dispatch(
          GET_TEMPLATE(page, perpage)
        )
      }
    }
    catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  }
}

export const DELETE_TEMPLATE = (id, page, perpage) => {
  let url = `${domain}/api/builder/template/${id}/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.delete(url, getHeaders());
      if (res.data.success === true) {
        toast.success("Template is Deleted! successfully", toastCSS());
        dispatch(
          GET_TEMPLATE(page, perpage)
        )
      }
    }
    catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  }
}

export const GET_BORDER_COLOR_FOR_CHECKBOX = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "GET_BORDER_COLOR_FOR_CHECKBOX",
            payload: value
        });
    }
}
