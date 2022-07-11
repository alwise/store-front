
import { ProductInt } from './ProductInterface';

export interface SalesInt{

    id?:string;
    reference?:string;
    customerId?:string;
    subTotal?:number
    balance?:number
    amountPaid?:number
    soldBy?:string;
    items?:ProductInt[];
    isCredit?:boolean;
    updatedAt?:string
    createdAt?:string

}
export interface StatsInt{
    totalAmount:number;
    salesCount:number
  }
// export interface CreditSalesInt{

//     id?:string;
//     reference?:string;
//     customerId:string;
//     productName:string;
//     productId:string;
//     amount:string | number;
//     quantity:string | number;
//     price?:string | number;
//     soldBy?:string;
//     updatedAt?:string
//     createdAt?:string

// }