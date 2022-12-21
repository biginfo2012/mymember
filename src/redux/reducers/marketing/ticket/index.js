import actions from "../../../../views/apps/user/list/components/actions";

const initialState = {
    isAddNewTicketModalOpen: false,
    tickets: [],
}

export const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CHAT_USERS_LIST_LOADING": {
          return { ...state, isLoading: true, chatUsersList: [] };
        }
        case "TOGGLE_OPEN_ADD_MODAL": {
            return { ...state, isAddNewTicketModalOpen: action.payload}
        }
        case "SET_TICKET_LIST": {
            return {...state, tickets: action.payload}
        }
        case "ADD_NEW_TICKET": {
            const newTickets = [...state.tickets, action.payload];
            return {...state, tickets: newTickets};
        }
        default:
          return state;
      }
}