import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')?.replace(/"/g, '');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const ApiService = {
    fetchAllTasks: async () => {
        try {
            const response = await api.get('/task/getTask/all');
            return response;
        } catch (error) {
            throw error;
        }
    },

    fetchUsersTask: async () => {
        try {
            const response = await api.get('/task/getTask/all/users');
            return response;
        } catch (error) {
            throw error;
        }
    },

    confirmationTasks: async (taskId) => {
        try {
            const response = await api.put(`/task/confirm/${taskId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    completionTask: async (taskId) => {
        try {
            const response = await api.put(`/task/complete/${taskId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },


    confirmationPayment: async (taskId) => {
        try {
            const response = await api.put(`/task/confirm/payment/${taskId}`);
            return response;
        } catch (error) {
            throw error;
        };
    },

    getTasksWithPaymentStatus: async () => {
        try {
            const response = await api.get('/task/payment-status');
            return response.data;
        } catch (error) {
            throw error;
        };
    },

    getTasksDetails: async () => {
        try {
            const response = await api.get('/task/totalTaskDetail');
            return response.data;
        } catch (error) {
            throw error;
        };
    },


    getUsers: async () => {
        try {
            const response = await api.get('/user/allusers');
            return response.data;
        } catch (error) {
            throw error;
        };
    },


};

export default ApiService;
