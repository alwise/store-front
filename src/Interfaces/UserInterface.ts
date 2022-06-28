
export type UserRoles = 'cashier' | 'stock keeper' | 'credit sales' | 'admin'

export interface UserInt {
    id?: string | undefined;
    name?:string | undefined;
    phoneNumber?:string | undefined;
    password?:string | undefined;
    role?:UserRoles;
    token?:string | undefined;
    isDeleted?: boolean | undefined
    createdAt?:string | undefined;
    updatedAt?:string | undefined
}
