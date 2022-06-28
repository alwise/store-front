/* eslint-disable import/no-anonymous-default-export */
import { Cookies } from "react-cookie";
import { UserInt } from "../Interfaces";

export const COOKIES_KEYS = {
    user:'user',
}
const cookies = new Cookies();

 const put = (key:string,value:any) =>{
   return  cookies.set(key,value);
}

 const get = (key:string) =>{
   return  cookies.get(key);
}

 const getAll = (key:string) =>{
   return  cookies.getAll();
}
 const remove = (key:string) =>{
   return cookies.remove(key);
}


export const currentUser = () => {
    const user:Partial<UserInt> = JSON.parse(JSON.stringify(get(COOKIES_KEYS.user)|| {}));
    return user;
}



export default {
    put,
    get,
    getAll,
    remove,
    currentUser
}



