import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DashboardPage } from '../members/dashboard/dashboard.page';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, private router: Router ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);
    let authInfo = {
      isAuthenticated: false
    };
    if(!authInfo.isAuthenticated){
      this.router.navigate([DashboardPage]);
      return false;
    }
    return this.auth.isAuthenticated();
  }

}
