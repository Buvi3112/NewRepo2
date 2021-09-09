import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, AccountDetails } from '../account';
import { Injectable } from '@angular/core';
import { Transaction } from '../transaction';
import { Query } from '../query';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private rootAdminUrl = "https://localhost:44394/";
  constructor(private http:HttpClient) { }



  withdrawAmount(accNumber:any,amt:number):Observable<any>{
    var data = "api/Customer/WithDraw?accountNumber="+accNumber+"&amount="+amt;
    return this.http.post(`${this.rootAdminUrl}/${data}`, {observe : 'response'});
  }

  depositAmount(accNumber:any,amt:number):Observable<any>{
    var data = "api/Customer/Deposit?accountNumber="+accNumber+"&amount="+amt;
    return this.http.post(`${this.rootAdminUrl}/${data}`, {observe : 'response'});
  }

  transferAmount(accNumber:any,toAcc:any,amt:number):Observable<any>{
    var data = "api/Customer/Transfer?FromaccountNumber="+accNumber+"&ToaccountNumber="+toAcc+"&amount="+amt;
    return this.http.post(`${this.rootAdminUrl}/${data}`, {observe : 'response'});
  }

  transactions(accNumber:any):Observable<Transaction[]>{
    var data = "api/Customer/Transactions?accountNumber="+accNumber;
    return this.http.get<Transaction[]>(`${this.rootAdminUrl}/${data}`);
  }

  userQuery(accNumber:any, query:string):Observable<any>{
    var data= "api/Customer/Queries?accountNumber="+accNumber+"&query="+query;
    return this.http.post(`${this.rootAdminUrl}/${data}` , { observe : 'response'});
  }

  getQueries(accNumber:any):Observable<Query[]>{
    var data = "api/Customer/GetQuery?accountNumber="+accNumber;
    return this.http.get<Query[]>(`${this.rootAdminUrl}/${data}`);
  }

  
}
