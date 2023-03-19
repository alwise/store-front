
import { ProductInt } from './ProductInterface';

export interface SalesInt {
  id?: string;
  reference?: string;
  customerId?: string;
  subTotal?: number
  balance?: number
  amountPaid?: number
  soldBy?: string;
  items?: Array<ProductInt>;
  isCredit?: boolean;
  updatedAt?: string
  createdAt?: string
}


export interface StatsInt {
  totalAmount: number;
  salesCount: number
}

export type PaymentType = {
  id: string;
  customerId: string;
  previousAmount: number;
  paidAmount: number;
  newBalance: number;
  reference: number;
  paidTo: string;
  updatedAt?: string;
  createdAt?: string
}

export type SalesItemInt = {
  id?: string;
  productName?: string;
  price?: number;
  quantity?: number;
  salesId: string | undefined;
  date: string;
}

export type SalesType = {
  id?: string;
  reference?: string;
  soldBy?: string;
  customerId?: string;
  subTotal: number;
  balance: number;
  amountPaid: number;
  isCredit: boolean;
  date?: Date
  yearMonth?: string
  items?: Array<SalesItemInt>;
  createdAt?: string;
  updatedAt?: string;
}