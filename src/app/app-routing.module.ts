import { NgModule } from '@angular/core';
import {AuthGuardService} from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  
  //{ path: 'login', loadChildren: './payment/payment.module#PaymentPageModule' },
  { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },
  {
    path: 'members',
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
  { path: 'admin', loadChildren: './members/admin/admin.module#AdminPageModule' },
  { path: 'referral', loadChildren: './members/referral/referral.module#ReferralPageModule' },
  { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }

