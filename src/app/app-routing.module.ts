import { NgModule } from '@angular/core';
import {AuthGuardService} from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ReferralPage } from './members/referral/referral.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'referral', loadChildren: './members/referral/referral.module#ReferralPageModule' },

  {
    path: 'members',
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
  // {
  //   path: 'referral;',
  //   // loadChildren: './members/referral/referral.module#ReferralPageModule',
  //   component: ReferralPage,
  //   canActivate: [AuthGuardService]
  // },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }

