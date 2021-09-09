import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private user:UserService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('userToken')!= null){
        let role = next.data["roles"] as Array<string>;
        if(role){
            var match = this.user.roleMatch(role);
            if(match){
              return true;
            }
            else{
              this.router.navigate(['/home']);
              return false;
            }
        }
        else{
          return true;
        }

      }
      else{
        this.router.navigate(["/login"]);
        return false;
        
      }
        
  }
 
  
}
