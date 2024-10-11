export const getTasksWithPaymentStatus = async () => {
    const response = await api.get('/tasks/payment-status');
    return response.data;  // Returns { tasks, totalPaid }
};
