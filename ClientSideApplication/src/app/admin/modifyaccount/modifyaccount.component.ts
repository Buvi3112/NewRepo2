import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/account';
import { AdminService } from 'src/app/services/admin.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-modifyaccount',
  templateUrl: './modifyaccount.component.html',
  styleUrls: ['./modifyaccount.component.css']
})
export class ModifyaccountComponent implements OnInit {
  name:Account[]=[];
  accountName!:number;
  accNumber!:number;
  firstName!:string;
    LastName!:string;
    Address!:string;
    PhoneNumber!:string;
    Age!:number;
    DOB!:Date;
    dateofbirth!:String;
    Gender!:string;
    CurrentBalance!:number;
    show:boolean=false;
    isError:boolean=false;

  constructor(private admin:AdminService,private router:Router, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    
  }
  
  onSubmitAccount(accountName:number){
    
    this.admin.getAccount(this.accountName).subscribe((data)=>
      {
        this.show=true;
        this.accNumber = data.AccNumber;
        this.firstName = data.FirstName;
        this.LastName = data.LastName;
        this.Address = data.Address;
        this.PhoneNumber = data.PhoneNumber;
        this.Age = data.Age;
        this.DOB = data.DOB;
        this.Gender = data.Gender;
        this.CurrentBalance = data.CurrentBalance;
        },(err : HttpErrorResponse)=>{
          this.isError=true;
          this.show=false;
        }
       
      );
  }

  toEdit(){
     const newOne = {
       FirstName:this.firstName,
       LastName:this.LastName,
       Address:this.Address,
       PhoneNumber:this.PhoneNumber,
       Age:this.Age,
       DOB:this.DOB,
       Gender:this.Gender
     }
     this.admin.updateAccount(this.accNumber,newOne).subscribe((data)=>{
      if(data!=null){
        alert("Success");
      }
        this.router.navigate(['adminhome'])});
    
    
  }

  

    
}
  






