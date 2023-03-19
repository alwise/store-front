/* eslint-disable import/no-anonymous-default-export */
import { deleteRequest, getRequest, patchRequest, postRequest } from "./API_Services";

const _baseUrl = '/users';

const postUser = async (data: any) => {
    return await postRequest(_baseUrl, data);
}
const login = async (data: any) => {

    return await postRequest(_baseUrl.concat('/login'), data);
}
const updateUser = async (data: any) => {
    return await patchRequest(_baseUrl, data);
}
const deleteUser = async (data: any) => {
    return await deleteRequest(_baseUrl, data);
}
const getUsers = async (params: any) => {
    if (params) {
        return await getRequest(_baseUrl, params);
    }
    return await getRequest(_baseUrl);
}

const getUserById = async (id: any) => {
    return await getRequest(_baseUrl.concat(`/find-by-id/${id}`));
}


export default {
    postUser,
    login,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
}