/* eslint-disable import/no-anonymous-default-export */
import { deleteRequest, getRequest, patchRequest, postRequest } from "./API_Services";

const _baseUrl = '/customers';

const postCustomer = async (data:any) => {
    return await postRequest(_baseUrl,data);
} 
const makePayment = async (data:any) => {
    return await postRequest(_baseUrl.concat('/pay'),data);
} 

const updateCustomer = async (data:any) => {
    return await patchRequest(_baseUrl,data);
} 
const deleteCustomer = async (data:any) => {
    return await deleteRequest(_baseUrl,data);
} 
const getCustomers = async (params:any) => {
    if(params){
        return await getRequest(_baseUrl,params);
    }
    return await getRequest(_baseUrl);
} 


export default {
    postCustomer,
    makePayment,
    updateCustomer,
    deleteCustomer,
    getCustomers
}