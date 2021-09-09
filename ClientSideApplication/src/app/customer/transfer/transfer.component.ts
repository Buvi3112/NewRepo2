import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  amount!:number;
  accNumber:any= localStorage.getItem("user");
  toAcc!:any;
  constructor(private customer:CustomerService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmitWithdraw(){
    this.customer.transferAmount(this.accNumber,this.toAcc,this.amount).subscribe((data)=>
    {
      if(data!=null){
        alert("Success");
        this.router.navigate(['/customer']);
      }
    },(err : HttpErrorResponse)=>{
      alert("Please check the Details and Balance");
      //this.router.navigate(['/customer']);
    });
    //this.router.navigate(['/customer']);
}


}
