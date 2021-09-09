import { HttpErrorResponse } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-freeze',
  templateUrl: './freeze.component.html',
  styleUrls: ['./freeze.component.css']
})
export class FreezeComponent implements OnInit {
  accountName!:number;
  accNumber!:number;
  freeze!:string;
  Freeze!:any;
  show:boolean=false;
  UnFreeze!:any;
  status!:any;
  constructor(private admin:AdminService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmitFreeze(accountName:number){
    
    this.admin.getAccount(this.accountName).subscribe((data)=>
      {
        this.show=true;
        this.accNumber = data.AccNumber;
        this.freeze = data.Freeze_UnFreeze;
      },(err : HttpErrorResponse)=>{
        alert("PLease check the Account Number");
    }
    );
  }

  toUpdate(){
    
    if(this.Freeze!=null){
      this.admin.updateFreeze(this.accNumber,this.Freeze).subscribe((data)=>{
        if(data!=null){
          alert("Success");
        }
       this.router.navigate(['adminhome'])});
    }
    else{
      this.admin.updateFreeze(this.accNumber,this.UnFreeze).subscribe((data)=>{
        if(data!=null){
          alert("Success");
        }
       this.router.navigate(['adminhome'])});
    }
    

    

        
  }


}
