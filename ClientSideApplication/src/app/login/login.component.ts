import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  username!: string;

  password!:string;
  role!:string;
  access_token!:any;
  isLoginError!: boolean;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.username || !this.password){
      alert("Please enter credentials");
    }
    this.userService.userAuthentication(this.username,this.password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token),
      localStorage.setItem('role',data.role);
      localStorage.setItem('user',this.username);
      console.log(localStorage.getItem('role'));
      
      if(localStorage.getItem('role')=="\"admin\""){
        this.router.navigate(['/adminhome']);
      }
      else if(localStorage.getItem('role')=="\"customer\""){
        this.router.navigate(['/customer']);
      }
      else{
        this.router.navigate(['/login']);
      }
      
    },
    (err : HttpErrorResponse)=>{
      if(this.username || this.password)
        alert("Please check your credentials");
      this.isLoginError = true;
      this.username="";
      this.password="";
      this.router.navigate(['/login']);
    });
    
  }

}

