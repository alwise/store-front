import axios from "axios";
import { ApiResponseInt } from "../Interfaces";
import { currentUser } from "./LocalStore";
// import env from "react-dotenv";
let _apiHandler = axios.create();

const _initializeAxios = () => {
  _apiHandler = axios.create({
    baseURL: 'http://192.168.1.2:3200/v1',
    headers: {
      Authorization: `${currentUser()?.token}`?.trim(),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const localErrorHandler = (error: any) => {
  return {
    status: false,
    statusCode: 303,
    data: undefined,
    message: "Slow or bad network.",
    error: {
      error: error,
      message: error?.message,
    },
  };
};

export const postRequest = async (endPoint: string, data: any) => {
  try {
    _initializeAxios();
    const result: Partial<ApiResponseInt> = await (
      await _apiHandler.post(endPoint, data)
    )?.data;
    return result;
  } catch (error) {
    return localErrorHandler(error);
  }
};

export const patchRequest = async (endPoint: string, data: any) => {
  try {
    _initializeAxios();
    const result: Partial<ApiResponseInt> = await (
      await _apiHandler.patch(endPoint, data)
    )?.data;
    return result;
  } catch (error) {
    return localErrorHandler(error);
  }
};

export const getRequest = async (
  endPoint: string,
  params?: any
) => {
  try {
    _initializeAxios();
    const result: Partial<ApiResponseInt> = await (
      await _apiHandler.get(endPoint, { params: params || {} })
    )?.data;
    return result;
  } catch (error) {
    return localErrorHandler(error);
  }
};

export const deleteRequest = async (
  endPoint: string,
  data: any
) => {
  try {
    _initializeAxios();
    const result: Partial<ApiResponseInt> = await (
      await _apiHandler.delete(endPoint, { data })
    )?.data;
    return result;
  } catch (error) {
    return localErrorHandler(error);
  }
};
