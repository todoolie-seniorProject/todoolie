import { NgModule } from '@angular/core';
import {AuthGuardService} from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';

// top routing allows us to navigate to the login pag without any checks
// but behind the members path every page will go through the canActivate check
// so they can only be acccessed once a user is authenticated
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule', },
  {
    path: 'members',
    canActivate: [AuthGuardService],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
