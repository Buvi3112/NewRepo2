import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  amount!:number;
  accNumber:any= localStorage.getItem("user");
  constructor(private customer:CustomerService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmitWithdraw(amount:number){
      this.customer.withdrawAmount(this.accNumber,amount).subscribe((data)=>
      {
        if(data!=null){
          alert("Success");
        }
      },(err : HttpErrorResponse)=>{
        alert("Please check the Details and Balance");
        //this.router.navigate(['/customer']);
      });
     
      //this.router.navigate(['/customer']);
  }

}
