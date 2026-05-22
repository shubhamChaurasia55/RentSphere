import api from "../api/axios";

export const createBooking = async (propertyId) => {

    const response = await api.post(

        `/booking/${propertyId}`

    );

    return response.data;

};

export const getMyBookings = async () => {

    const response = await api.get(

        "/booking/my-bookings"

    );

    return response.data;

};

export const getBookingRequests = async () => {

    const response = await api.get(

        "/booking/requests"

    );

    return response.data;

};

export const acceptBooking = async (id) => {

    const response = await api.patch(

        `/booking/${id}/accept`

    );

    return response.data;

};

export const rejectBooking = async (id) => {

    const response = await api.patch(

        `/booking/${id}/reject`

    );

    return response.data;

};