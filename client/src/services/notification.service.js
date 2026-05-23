import api from "../api/axios";

export const getNotifications = async () => {

    const response = await api.get(
        "/notification"
    );

    return response.data;

};

export const markAsRead = async (id) => {

    const response = await api.patch(
        `/notification/${id}/read`
    );

    return response.data;

};