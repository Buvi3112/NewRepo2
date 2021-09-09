import { Component, OnInit } from '@angular/core';
import { Query } from 'src/app/query';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-userqueries',
  templateUrl: './userqueries.component.html',
  styleUrls: ['./userqueries.component.css']
})
export class UserqueriesComponent implements OnInit {
  one!:string;
  user:any = localStorage.getItem('user');
  queue:Query[]=[];
  queries!:Query;
  show:boolean=false;
  showtable:boolean=false;
  ticket:any;

  constructor(private admin:AdminService) { }

  ngOnInit(): void {
    this.admin.getQueries().subscribe((data)=>{
      if(data != null){
        this.showtable=true;
        this.queue = data;
      }
      
    });
  }

  onSubmitAns(queries:Query){
    this.show = true;
    this.ticket =queries.TicketNumber;

  }

  onSubmitEdit(ticket:any,one:string){
    this.admin.userQuery(ticket,one,this.user).subscribe((data)=>{
      if(data!=null){
        alert("Success");
      }
    })
  }

}
