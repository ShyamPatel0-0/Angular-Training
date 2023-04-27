export interface members {
    id:number,
    name:string
}

export interface people {
    name:string,
    amount:number,
    isSelect:boolean
}

export interface dataObject {
    name:string,
    paidBy:{
        name:string,
        id:number
    },
    distribute:dist[],
    totalAmount:number,
    date:string,
    id:number
}

export interface dist {
    name:string,
    amount:number
}

export interface settle {
    name:string,
    userId:number,
    amount:number;
}

export interface settle2 {
    userId:number,
    amount:number
}