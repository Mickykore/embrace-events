import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const createTicket = async (ticketData) => {
    try {
        const response = await axios.post(`${API_URL}/tickets`, ticketData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getTickets = async () => {
    try {
        console.log(API_URL);
        const response = await axios.get(`${API_URL}/tickets`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getTicketById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/tickets/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateTicket = async (id, ticketData) => {
    try {
        const response = await axios.put(`${API_URL}/tickets/${id}`, ticketData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteTicket = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/tickets/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
