import api from "../api/axios";

export const getProperties = async () => {

    const response = await api.get("/property");

    return response.data;

};