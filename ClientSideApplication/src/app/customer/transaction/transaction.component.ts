import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Transaction } from 'src/app/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  user:any=localStorage.getItem('user');
  trans:Transaction[]=[];
  transaction!:Transaction;
  s!:string;
  constructor(private customer:CustomerService, private router:Router) { }

  ngOnInit(): void {
      this.customer.transactions(this.user).subscribe((data)=>{
        this.trans = data;
          console.log(this.trans);
      });

  }

}
