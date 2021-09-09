export interface Account {
    FirstName:string;
    LastName:string;
    Address:string;
    PhoneNumber:string;
    Age:number;
    DOB:Date;
    Gender:string;
}
  
export interface AccountDetails {
  AccNumber:number;
  CurrentBalance:number;
  AccountCreationDate:Date;
  Freeze_UnFreeze:string;
  MaxTransactionLimit:number;
}