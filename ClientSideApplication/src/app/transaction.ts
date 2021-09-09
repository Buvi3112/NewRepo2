export interface Transaction {
    TransactionId:number;
    AccNumber:number;
    Date:Date;
    TransactionType:string;
    FromAccNumber:number;
    ToAccNumber:Number;
    FromName:string;
    ToName:string;
    Amount:number;
    Status:string;
}