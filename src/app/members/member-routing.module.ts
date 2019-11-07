import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'referral', loadChildren: './referral/referral.module#ReferralPageModule' },
<<<<<<< HEAD
  { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule' }
=======
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' }
>>>>>>> master
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
