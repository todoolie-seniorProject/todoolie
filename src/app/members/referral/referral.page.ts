import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {NavController, AlertController, ToastController, Events } from '@ionic/angular';
import { BehaviorSubject, Observable, throwError, Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {
@Input() public userid;
public name: string;
public email: string;
public age: number;
public school: string;
subscription: Subscription;
  constructor(private authService: AuthenticationService,
      public toastController: ToastController,
      public alertCtrl: AlertController,
      private nav: NavController,
      private router: Router,
      public events: Events,
      //private data: MessageService,
      ) {
   }
  ngOnInit() {
  this.authService.currentMessage.subscribe(userid => this.userid = userid)
  }
 
  referout(){
    this.authService.referout();
  }
  payment(){
    this.nav.navigateRoot('/admin');
  }
  async display(){
    this.nav.navigateRoot('/display');

    // this.authService.display(this.userid, this.name, this.email, this.age, this.school).subscribe(res =>{
    //   if(res){
    //     this.nav.navigateRoot('/display');
    //   }
    //   else{
    //     console.log('error making request');
    //     this.nav.navigateRoot('/referral');
    //   }
    // },err =>{
    //   console.log(err);
    // });
  }

  async refer() {
    this.authService.refer(this.name, this.email, this.age, this.school).subscribe(res => {
    if (res.hasOwnProperty('code')){
      this.showAlertDuplicate(res);
        this.nav.navigateForward('/referral');
        console.log("if res has own property");
    }
    else{
      console.log('err bracket');
    
      this.showAlertSuccess(res);
      this.nav.navigateForward('/admin');
    }
    }, err => {
      console.log(err);
    });
  }
  
  async showAlert(msg){
    const alert = await this.alertCtrl.create({
      header: 'Server Message',
      message: 'Referral Cannnot be empty',
      buttons: ['OK'],
      
    });
    await alert.present();

}
async showAlertSuccess(msg){
  const alert = await this.alertCtrl.create({
    header: 'Successfull Referrral!',
    buttons: ['OK']
  });
  await alert.present();
}
async showAlertDuplicate(msg){
  const alert = await this.alertCtrl.create({
    header: 'Duplicate Referral',
    message: 'Student Referral already Exists:',
    buttons: ['OK']
  });
  await alert.present();
}

}
