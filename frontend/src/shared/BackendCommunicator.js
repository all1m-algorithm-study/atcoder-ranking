import axios from "axios"

export async function getEventInfo() {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/event`, {}, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(`In getEventInfo: ${err?.response?.data}`);
        throw err;
    }
}

export async function setEventInfo(startTime, endTime, hideName) {
    const body = {
        startTime: startTime,
        endTime: endTime,
        hideName: hideName
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/event`, body, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(`In setEventInfo: ${err?.response?.data}`);
        throw err;
    }
}

export async function getParticipants() {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/participants`, {}, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(`In getParticipants: ${err?.response?.data}`);
        throw err;
    }
}

export async function setParticipants(participants) {
    const body = {
        participants: participants
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/participants`, body, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(`In setParticipants: ${err?.response?.data}`);
        throw err;
    }
}

export async function tryLogin(password) {
    const body = {
        password: password
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/login`, body, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(`In tryLogin: ${err?.response?.data}`);
        throw err;
    }
}

export async function tryLogout() {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/logout`, {}, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error(`In tryLogout: ${err?.response?.data}`);
        throw err;
    }
}