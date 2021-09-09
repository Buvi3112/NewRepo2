import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/account';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  @Input() FirstName!:string;
  @Input() LastName!:string;
  @Input() Address!:string;
  @Input() PhoneNumber!:string;
  @Input() Age!:number;
  @Input() DOB!:Date;
  @Input() Gender!:string;

  text!:string;

  accounts:Account[] = [];
  constructor(private admin:AdminService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.FirstName || !this.LastName || !this.Address || !this.PhoneNumber || !this.DOB){
      alert("Enter the details");
    }else{

    const newAccount={
      FirstName : this.FirstName,
      LastName : this.LastName,
      Address : this.Address,
      PhoneNumber : this.PhoneNumber,
      Age : this.Age,
      DOB : this.DOB,
      Gender : this.Gender
    }

    this.admin.createAccount(newAccount).subscribe((data)=>{
      if(data!=null){
        alert("Success");
        this.router.navigate(['adminhome']);
      }
    });
    }
  }
}
