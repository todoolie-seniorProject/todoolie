import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReferralPage } from './referral.page';

const routes: Routes = [
  {
    path: '',
    component: ReferralPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReferralPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferralPageModule {}
