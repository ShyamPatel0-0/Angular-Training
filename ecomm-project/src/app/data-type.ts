export interface SignUp {
    name:string,
    password:string,
    email:string
}

export interface Login {
    email:string, 
    password:string
}

export interface Product {
    id:number;
    name: string,
    price:number, 
    category:string, 
    color:string,
    description:string,
    image:string,
    quantity:undefined | number,
    productId:undefined | number
}

export interface cart {
    id:number | undefined;
    name: string,
    price:number, 
    category:string, 
    color:string,
    description:string,
    image:string,
    quantity:undefined | number,
    userId:number,
    productId:number
}