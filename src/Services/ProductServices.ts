/* eslint-disable import/no-anonymous-default-export */
import { deleteRequest, getRequest, patchRequest, postRequest } from "./API_Services";

const _baseUrl = '/products';

const postProduct = async (data:any) => {
    return await postRequest(_baseUrl,data);
} 
const updateProduct = async (data:any) => {
    return await patchRequest(_baseUrl,data);
} 
const deleteProduct = async (data:any) => {
    return await deleteRequest(_baseUrl,data);
} 
const getProducts = async (params:any) => {
    if(params){
        return await getRequest(_baseUrl,params);
    }
    return await getRequest(_baseUrl);
} 
const getProductsStats = async (params:any) => {
    const _statsUrl = _baseUrl.concat('/stats')
    if(params){
        return await getRequest(_statsUrl,params);
    }
    return await getRequest(_statsUrl);
} 


export default {
    postProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsStats
}
