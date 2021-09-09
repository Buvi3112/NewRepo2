import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { CreateaccountComponent } from './admin/createaccount/createaccount.component';
import { ModifyaccountComponent } from './admin/modifyaccount/modifyaccount.component';
import { ModifydetailsComponent } from './admin/modifyaccount/modifydetails/modifydetails.component';
import { DeleteaccountComponent } from './admin/deleteaccount/deleteaccount.component';
import { CreateuserComponent } from './admin/createuser/createuser.component';
import { FreezeComponent } from './admin/freeze/freeze.component';
import { CustomerhomeComponent } from './customer/customerhome/customerhome.component';
import { WithdrawComponent } from './customer/withdraw/withdraw.component';
import { DebitComponent } from './customer/debit/debit.component';
import { TransferComponent } from './customer/transfer/transfer.component';
import { TransactionComponent } from './customer/transaction/transaction.component';
import { QueriesComponent } from './customer/queries/queries.component';
import { UserqueriesComponent } from './admin/userqueries/userqueries.component';
import { PasswordComponent } from './password/password.component';
import { HeaderComponent } from './header/header.component';
import { BalanceComponent } from './customer/balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    UserhomeComponent,
    AdminhomeComponent,
    CreateaccountComponent,
    ModifyaccountComponent,
    ModifydetailsComponent,
    DeleteaccountComponent,
    CreateuserComponent,
    FreezeComponent,
    CustomerhomeComponent,
    WithdrawComponent,
    DebitComponent,
    TransferComponent,
    TransactionComponent,
    QueriesComponent,
    UserqueriesComponent,
    PasswordComponent,
    HeaderComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
