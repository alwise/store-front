
interface ErrorInt {
    error?:any,
    message:any
}

export interface ApiResponseInt {
    status?:boolean | undefined;
    statusCode:number | string | undefined;
    data?:any;
    message?:string | undefined;
    error?:ErrorInt

}