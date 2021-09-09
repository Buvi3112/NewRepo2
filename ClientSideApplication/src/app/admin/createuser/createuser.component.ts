import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
 @Input() username!:string;
 role:string = "admin";
  constructor(private admin:AdminService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmitUser(){
    if(!this.username){
      alert("Enter the details");
    }

    const newAccount={
      username:this.username,
      role:this.role
    }

    this.admin.createUser(this.username,this.role).subscribe((data)=>{
      if(data!=null){
        alert("Success");
        this.router.navigate(['adminhome']);
      }
    });

  }
}
