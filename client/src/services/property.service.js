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

export const getMyProperties = async () => {

    const response = await api.get(
        "/property/my-properties"
    );

    return response.data;

};

export const createProperty = async (formData) => {

    const response = await api.post(

        "/property",

        formData

    );

    return response.data;

};

export const deleteProperty = async (id) => {

    const response = await api.delete(
        `/property/${id}`
    );

    return response.data;

};

export const updateProperty = async ({

    id,

    formData

}) => {

    const response = await api.put(

        `/property/${id}`,

        formData

    );

    return response.data;

};