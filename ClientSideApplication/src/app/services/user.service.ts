import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})


export class UserService {


  private rootUrl ="https://localhost:44394/";

  constructor(private http:HttpClient) { }

  
  userCheck(username:string , password:string):Observable<any>{
    var data ="api/Users/UserCheck?username="+username+"&password="+password
    return this.http.get(this.rootUrl+data);
  }

  userAuthentication(username:String, password:string) {
    var data = "username=" + username + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  roleMatch(_role:string[]):boolean{
    var hasAccess=false;
    var userRole = localStorage.getItem('role');
    
    var OrinRole = "\""+_role[0].toString()+"\"";
    if(OrinRole == userRole){
      hasAccess = true;
    }
    return hasAccess;
  }

  passwordChange(username:any,password:any):Observable<any>{
    var data = "api/Customer/Password?username="+username+"&password="+password;
    return this.http.post(`${this.rootUrl}/${data}`, {observe : 'response'});
  }
  
}

