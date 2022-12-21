import axios from 'axios';

// const base_url = "http://localhost:3001"; // TODO: change to mymember.com
const base_url = "https://mymember.com";
const userId = localStorage.getItem('user_id');

export const toggle_add_new_ticket_modal_open = (isOpen) => {
    return (dispatch) => {
        dispatch({
            type: "TOGGLE_OPEN_ADD_MODAL",
            payload: isOpen,
        })
    }
}

export const add_new_ticket = (ticket) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${base_url}/api/ticket/new/`, ticket);
            if(response.status === 200 && response.data.success == true){
                dispatch({
                    type: "ADD_NEW_TICKET",
                    payload: response.data,
                })
                dispatch({
                    type: "TOGGLE_OPEN_ADD_MODAL",
                    payload: false,
                })
            }
            return response.data;
            
        }
        catch(err){
            console.log(err);
        }
    }
}



export const get_ticket_by_id = async (ticketId) => {
    try{
        const response = await axios.get(`${base_url}/api/ticket/${ticketId}`);
        return response.data;    
    }
    catch(err){
        return {};
    }
}

export const send_message = async ({ticketId, message, ticketStatus}) => {
    try {
        const response = await axios.post(`${base_url}/api/ticket/message`, {
            ticketId,
            message,
            status: ticketStatus,
            sender: "agent_msg"
        });
        return response.data;
    }
    catch(err){
        return {}; // Todo: error checking handler
    }
}

export const get_all_tickets = (filterTicketStatus) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${base_url}/api/ticket/all/${userId}`);

            dispatch({
                type: "SET_TICKET_LIST",
                payload: response.data,
            });
        }
        catch(err){
            return {}; // Todo: error checking handler
        }
    }

}