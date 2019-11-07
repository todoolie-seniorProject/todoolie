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
<<<<<<< HEAD

  constructor(private authService: AuthenticationService,
      public toastController: ToastController,
      public alertCtrl: AlertController) {

=======

  constructor(private authService: AuthenticationService,
      public toastController: ToastController,
      public alertCtrl: AlertController,
      private nav: NavController) {
   
>>>>>>> master
   }
  ngOnInit() {
    
  }
  referout(){
    this.authService.referout();
  }
  payment(){
    this.nav.navigateRoot('/admin');
  }

  async checkEmail() {
    
  }
<<<<<<< HEAD
  referout(){
    this.authService.referout();
  }
  async refer() {
    this.authService.refer(this.name, this.email, this.age, this.school).subscribe(res => {
      this.showAlert(res);
  }, err => {
    this.showAlert(err.error.text);
  });
=======

  async refer() {
    // the regex that checks the input email if its in format and is a valid email
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.email)) { //testing the email on the above regex
      this.showAlert("Please enter a valid email"); //show message if email is invalid
      this.nav.navigateBack('/referral'); // stay on referral page if email is invalid
    }
    else { // if email is valid then this will run
      this.authService.refer(this.name, this.email,this.age, this.school).subscribe(res => {
        if(res.hasOwnProperty('code')) {
          this.showAlert("The email already exists with this email! ");
          this.nav.navigateBack('/referral');
        }
        else {
        console.log(res);//fariha
        this.showAlertSuccess(res);
          this.nav.navigateForward('/admin'); //temporary remove
        }
    
      }, err => {
        console.log(err); //f
      });
    }
>>>>>>> master
  }
  async showAlert(msg){
    const alert = await this.alertCtrl.create({
      header: 'Server Message',
<<<<<<< HEAD
      message: 'succesfull referral',
=======
      message: msg,
>>>>>>> master
      buttons: ['OK']
    });
    await alert.present();

}
<<<<<<< HEAD
=======
async showAlertSuccess(msg){
  const alert = await this.alertCtrl.create({
    header: 'Successfull Referrral!',
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
>>>>>>> master
}
