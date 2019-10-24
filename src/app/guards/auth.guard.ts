import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DashboardPage } from '../members/dashboard/dashboard.page';
import {ReferralPage} from '../members/referral/referral.page';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, private router: Router ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   console.log(route);
  //   let authInfo = {
  //     isAuthenticated: false
  //   };
  //   if(!authInfo.isAuthenticated){
  //     this.router.navigate([ReferralPage]);
  //     return false;
  //   }
  //   return this.auth.isAuthenticated();
  // }

    const loggedIn = Math.random() > 0.5 ? true : false;
    if (!loggedIn){
      this.router.navigate(['/referral']);
    }
    return loggedIn;
  }

}
