import api from "../api/axios";

export const getProperties = async () => {

    const response = await api.get("/property");

    return response.data;

};

export const getPropertyById = async (id) => {
    const response = await api.get(`/property/${id}`)
    return response.data;
}