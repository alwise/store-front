/* eslint-disable import/no-anonymous-default-export */
import { getRequest, postRequest } from "./API_Services";

const _baseUrl = '/pos';

const postSales = async (data:any) => {
    return await postRequest(_baseUrl,data);
} 

const getPosData = async (params:any) => {
    if(params){
        return await getRequest(_baseUrl,params);
    }
    return await getRequest(_baseUrl);
} 

const getPosStats = async (params:any) => {
    const _statsUrl = _baseUrl.concat('/stats')
    if(params){
        return await getRequest(_statsUrl,params);
    }
    return await getRequest(_statsUrl);
} 


export default {
    postSales,
    getPosData,
    getPosStats
}

