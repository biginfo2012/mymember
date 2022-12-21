import axios from "axios";
// const baseUrl = "http://localhost:3001";
const baseUrl = "https://mymember.com";
export const startWork = async (userId, description) => {
    const response = await axios.post(`${baseUrl}/api/workhistory/startwork`, {
        userId: userId,
        description: description
    })
    return response;
}

export const updateWork = async (historyId, screenshot) => {
    const response = await axios.post(`${baseUrl}/api/workhistory/updatework`, {
        historyId: historyId,
        screenshot: screenshot
    })
    return response;
}

export const endWork = async (historyId) => {
    const response = await axios.post(`${baseUrl}/api/workhistory/endwork`, {
        historyId: historyId
    })
    return response;
}

export const getCurrentWork = () => {
    const currentWork = localStorage.getItem('currentWork');
    if(currentWork) return JSON.parse(currentWork);
    return null;
}

export const formatDuration = (duration) => {
    let result = '';
    const hour = Math.floor(duration / 3600);
    result += hour >= 10 ? hour : '0' + hour;

    result += ':';
    const minute = Math.floor(Math.floor((duration % 3600) / 60));
    result += minute >= 10 ? minute : '0' + minute;

    result += ':';
    const second = duration % 60;
    result += second >= 10 ? second : '0' + second;

    return result;
};
