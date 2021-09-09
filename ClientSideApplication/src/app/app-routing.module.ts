import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { CreateaccountComponent } from './admin/createaccount/createaccount.component';
import { CreateuserComponent } from './admin/createuser/createuser.component';
import { DeleteaccountComponent } from './admin/deleteaccount/deleteaccount.component';
import { FreezeComponent } from './admin/freeze/freeze.component';
import { ModifyaccountComponent } from './admin/modifyaccount/modifyaccount.component';
import { ModifydetailsComponent } from './admin/modifyaccount/modifydetails/modifydetails.component';
import { UserqueriesComponent } from './admin/userqueries/userqueries.component';
import { BalanceComponent } from './customer/balance/balance.component';
import { CustomerhomeComponent } from './customer/customerhome/customerhome.component';
import { DebitComponent } from './customer/debit/debit.component';
import { QueriesComponent } from './customer/queries/queries.component';
import { TransactionComponent } from './customer/transaction/transaction.component';
import { TransferComponent } from './customer/transfer/transfer.component';
import { WithdrawComponent } from './customer/withdraw/withdraw.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
 // {path:'adminhome',component:AdminhomeComponent},
  {path:'adminhome',component:AdminhomeComponent, canActivate:[AuthGuard], data:{ roles:['admin']}},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'logout',component:LogoutComponent},
  {path:'password',component:PasswordComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'customer',component:CustomerhomeComponent, canActivate:[AuthGuard], data:{ roles:['customer']}},
  {path:'create',component:CreateaccountComponent, canActivate:[AuthGuard], data:{ roles:['admin']}},
  {path:'modify',component:ModifyaccountComponent, canActivate:[AuthGuard], data:{ roles:['admin']}},
  {path:'withdraw',component:WithdrawComponent, canActivate:[AuthGuard], data:{ roles:['customer']}},
  {path:'transfer',component:TransferComponent, canActivate:[AuthGuard], data:{ roles:['customer']}},
  {path:'queries',component:QueriesComponent, canActivate:[AuthGuard], data:{ roles:['customer']}},
  {path:'delete',component:DeleteaccountComponent, canActivate:[AuthGuard] , data:{ roles:['admin']}},
  {path:'userqueries',component:UserqueriesComponent, canActivate:[AuthGuard] , data:{ roles:['admin']}},
  {path:'transaction',component:TransactionComponent, canActivate:[AuthGuard], data:{ roles:['customer']}},
  {path:'balance',component:BalanceComponent, canActivate:[AuthGuard], data:{ roles:['customer']}},
  {path:'deposit',component:DebitComponent, canActivate:[AuthGuard], data:{ roles:['customer']}},
  {path:'freeze',component:FreezeComponent, canActivate:[AuthGuard] , data:{ roles:['admin']}},
  {path:'createuser',component:CreateuserComponent, canActivate:[AuthGuard] , data:{ roles:['admin']}},
  
  { path : '', redirectTo:'/login', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
