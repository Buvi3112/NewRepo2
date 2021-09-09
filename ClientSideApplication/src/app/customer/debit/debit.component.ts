import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent implements OnInit {
  amount!:number;
  accNumber:any= localStorage.getItem("user");
  constructor(private customer:CustomerService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmitDeposit(amount:number){
    this.customer.depositAmount(this.accNumber,amount).subscribe((data)=>
    {
      if(data!=null){
        alert("Success");
        this.router.navigate(['/customer']);
      }
    },(err : HttpErrorResponse)=>{
      alert("Please check the Details and Balance");
      
      //this.router.navigate(['/customer']);
    });
}

}
