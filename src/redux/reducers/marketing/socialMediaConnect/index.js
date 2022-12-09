const initState = {
  getFbToken: [],
  getPage: [],
  getGroup: [],
  getMeData: [],
  getPageInfo: null,
  getGroupInfo: null,
  getUplaodImage: null,
  getPageComments: null
};

export const fbReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_FB_LOGIN":
      return { ...state, getFbToken: action.payload };
    case "GET_FB_PAGE":
      return { ...state, getPage: action.payload };
    case "GET_FB_GROUP":
      return { ...state, getGroup: action.payload };
    case "GET_PAGE_INFO":
      return {...state, getPageInfo: action.payload};
    case "GET_GROUP_INFO":
      return {...state, getGroupInfo: action.payload}
    case "GET_FB_PAGE_COMMENTS":
      return {...state, getPageComments: action.payload}
    case "FB_IMAGE_UPLOAD": 
      return {...state, getUplaodImage: action.payload}
    case "GET_ME_INFO":
      return {...state, getMeData: action.payload}
    default:
      return state;
  }
};
