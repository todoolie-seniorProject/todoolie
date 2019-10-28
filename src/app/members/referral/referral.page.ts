import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {NavController, AlertController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {

private showData;
public name: string;
public email: string;
public age: number;
public school: string;

  constructor(private authService: AuthenticationService,
      public toastController: ToastController,
      public alertCtrl: AlertController,
      private nav: NavController) {
   
   }
  ngOnInit() {
    
  }
  referout(){
    this.authService.referout();
  }
  payment(){
    this.nav.navigateRoot('/admin');
  }

  async refer() {
    this.authService.refer(this.name, this.email,this.age, this.school).subscribe(res => {
     if(res.name == '', res.age == null){
      this.nav.navigateForward('/dashboard');

     }
  }, err => {
    this.showAlert(err.error.text);
    this.nav.navigateRoot('/referral');

  });
  }
  async showAlert(msg){
    const alert = await this.alertCtrl.create({
      header: 'Server Message',
      message: 'Referral Cannnot be empty',
      buttons: ['OK']
    });
    await alert.present();

}
clear(){
  this.name='';
  this.email='';
  this.school='';
  this.age= null;
}
}
