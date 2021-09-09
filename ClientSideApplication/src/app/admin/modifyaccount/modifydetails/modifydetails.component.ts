import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Account } from 'src/app/account';

@Component({
  selector: 'app-modifydetails',
  templateUrl: './modifydetails.component.html',
  styleUrls: ['./modifydetails.component.css']
})
export class ModifydetailsComponent implements OnInit {
  @Input() acc!:Account;
  private rootAdminUrl = "https://localhost:44394/";
  //acc:Account[]=[];
  details!:any;
  constructor(public http:HttpClient) { }

  ngOnInit(): void {
  }

  fetchData(accountNumber:any){
    // var data = "api/Admin/AccountDetails?accountNumber=";
    //   const promise = this.http.get<Account[]>(`${this.rootAdminUrl}/${data}${accountNumber}`).toPromise();
    //    console.log(promise);
    //    promise.then((data)=>{
    //      this.details= JSON.stringify(data);
    //      this.acc = JSON.parse(this.details);
    //      console.log(this.account.FirstName);
    //    }).catch((error)=>{
    //      this.details= JSON.stringify(console.error());
    //  });
  }

}
