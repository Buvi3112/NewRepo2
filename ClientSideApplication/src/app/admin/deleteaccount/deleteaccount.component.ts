import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.css']
})
export class DeleteaccountComponent implements OnInit {
  accountName!:number;
  accNumber!:number;
  constructor(private admin:AdminService) { }

  ngOnInit(): void {
  }

  onSubmitDelete(accNumber:number){
    if(confirm("Do you want to Delete this Account? "+ accNumber)){
      this.admin.deleteAccount(accNumber).subscribe((data)=>{
        if(data!=null){
          alert(data);
        }
      },(err : HttpErrorResponse)=>{
          alert("PLease check the Account Number");
      });
    }
    
  }
  


}
