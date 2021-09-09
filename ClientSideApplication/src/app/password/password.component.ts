import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  password:any;
  username:any=localStorage.getItem('user');
  constructor(private user:UserService) { }

  ngOnInit(): void {
  }

  onSubmitPassword(){
    this.user.passwordChange(this.username,this.password).subscribe((data)=>{
      if(data!=null){
        alert("Success");
      }
    })
  }

}
