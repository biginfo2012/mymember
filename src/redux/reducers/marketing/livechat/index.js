const initialState = {
    isOpen: false,
    viewlistSelectedIndex: 0,
    contactlistSelectedIndex: 0,
    messages: [],
    customers: [],
}

export const livechatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CHAT_USERS_LIST_LOADING": {
          return { ...state, isLoading: true, chatUsersList: [] };
        }
        case "GET_CHAT_USERS_LIST": {
          return {
            ...state,
            isLoading: false,
            chatUsersList: action.payload,
          };
        }
        case "TOGGLE_FILTER_DRAWER_OPEN": {
            console.log("old state isOpen", state.isOpen)
            return {...state, isOpen:!state.isOpen}
        }
        case "SET_VIEWLIST_SELECTED_INDEX": {
            return {...state, viewlistSelectedIndex: action.payload}
        }
        case "SET_CONTACTLIST_SELECTED_INDEX": {
          return {...state, contactlistSelectedIndex: action.payload}
        }
        case "SET_MESSAGE_LIST": {
          return {...state, messages: action.payload}
        }
        case "ADD_NEW_CUSTOMER": {
          const newCustomers = [...state.customers, action.payload];
          return {...state, customers: newCustomers};
        }

        case "ADD_NEW_MESSAGE": {
          const newMessages = [...state.messages, action.payload];
          return {...state, messages: newMessages};
        }
        case "SET_CUSTOMER_LIST": {
          return {...state, customers: action.payload};
        }
        default:
          return state;
      }
}