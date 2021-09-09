import { Component, OnInit } from '@angular/core';
import { Query } from 'src/app/query';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  query!:string;
  user:any = localStorage.getItem('user');
  queue:Query[]=[];
  queries!:Query;
  constructor(private customer:CustomerService) { }

  ngOnInit(): void {
    this.customer.getQueries(this.user).subscribe((data)=>{
      this.queue = data;
        console.log(this.queue);
    });
  }

  onSubmitQuery(){
    this.customer.userQuery(this.user,this.query).subscribe((data)=>{
      if(data!=null){
        alert("Success");
      }
    })
  }

}
