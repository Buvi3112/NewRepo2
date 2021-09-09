import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balance:any;
  user:any=localStorage.getItem('user');
  constructor(private admin:AdminService) { }

  ngOnInit(): void {
    this.admin.getAccount(this.user).subscribe((data)=>
      {
        this.balance = data.CurrentBalance;
        },(err : HttpErrorResponse)=>{
          alert("Couldn't get Data");
        }
       
      );
  }

}
