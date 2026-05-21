import api from "../api/axios";

export const getProperties = async (params) => {

    const response = await api.get(

        "/property/search",

        {
            params
        }

    );

    return response.data;

};

export const getPropertyById = async (id) => {

    const response = await api.get(

        `/property/${id}`

    );

    return response.data;

};