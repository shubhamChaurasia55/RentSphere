import api from "../api/axios";

export const addReview = async ({

    propertyId,

    reviewData

}) => {

    const response = await api.post(

        `/review/${propertyId}`,

        reviewData

    );

    return response.data;

};

export const getReviews = async (

    propertyId

) => {

    const response = await api.get(

        `/review/${propertyId}`

    );

    return response.data;

};

export const updateReview = async ({

    reviewId,

    reviewData

}) => {

    const response = await api.put(

        `/review/${reviewId}`,

        reviewData

    );

    return response.data;

};

export const deleteReview = async (

    reviewId

) => {

    const response = await api.delete(

        `/review/${reviewId}`

    );

    return response.data;

};