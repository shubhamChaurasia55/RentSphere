import api from "../api/axios";

export const addToFavorites = async (

    propertyId

) => {

    const response = await api.post(

        `/favorite/${propertyId}`

    );

    return response.data;

};

export const removeFromFavorites = async (

    propertyId

) => {

    const response = await api.delete(

        `/favorite/${propertyId}`

    );

    return response.data;

};

export const getFavorites = async () => {

    const response = await api.get(

        "/favorite"

    );

    return response.data;

};