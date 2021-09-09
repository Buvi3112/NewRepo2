import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, AccountDetails } from '../account';
import { Query } from '../query';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private rootAdminUrl = "https://localhost:44394/";
  constructor(private http:HttpClient) { }

  createAccount(account:Account):Observable<any>{
    var data = "api/Admin/CreateAccount";
    return this.http.post(this.rootAdminUrl+data , account, {observe : 'response'});
  }

  getAccount(accountName:number):Observable<any>{
    var data = "api/Admin/AccountDetails?accountNumber=";
    return this.http.get(`${this.rootAdminUrl}/${data}${accountName}`);
  }

  updateAccount(accName:number, newOne:Account):Observable<any>{
    var data = "api/Admin/UpdateAccount?accNumber="+accName;
    return this.http.put(`${this.rootAdminUrl}/${data}`, newOne , {observe : 'response'} )
  }

  deleteAccount(accName:number):Observable<any>{
    var data = "api/Admin/DeleteAccount?accNumber="+accName;
    return this.http.delete(`${this.rootAdminUrl}/${data}`, {observe : 'response'});
  }

  createUser(username:string, role:string):Observable<any>{
    var data = "api/Admin/CreateUser?username="+username+"&password="+role;
    return this.http.post(`${this.rootAdminUrl}/${data}`,  {observe : 'response'});
  }
  
  updateFreeze(accName:number, Freeze:string):Observable<any>{
    var data ="api/Admin/FreezeAccount?accNumber="+accName+"&FreezeUnfreeze="+Freeze;
    return this.http.put(`${this.rootAdminUrl}/${data}` , {observe : 'response'} )
  }

  getQueries():Observable<Query[]>{
    var data = "api/Admin/GetQuery";
    return this.http.get<Query[]>(`${this.rootAdminUrl}/${data}`);
  }

  userQuery(ticketNumber:any, answer:string , username:any):Observable<any>{
    var data= "api/Admin/Queries?ticketNumber="+ticketNumber+"&answer="+answer+"&username="+username;
    return this.http.post(`${this.rootAdminUrl}/${data}` , { observe : 'response'});
  }

}
