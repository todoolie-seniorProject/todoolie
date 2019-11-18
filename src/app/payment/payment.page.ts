import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {NavController, AlertController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  public name: string;
  public email: string;
  public routing: string;
  public acc: string;
  public fname: string;
  public lname: string;
  isenabled:boolean = true;
  constructor(
    private authService: AuthenticationService,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private nav: NavController) {
 }

  ngOnInit() {
  }

  bank_info_submit() { //on bank info gets submitted check email if valid
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.email)) { //testing the email on the above regex
      this.showAlert("Please enter a valid email"); //show message if email is invalid
      this.nav.navigateBack('/payment'); // stay on payment page if email is invalid
    } else {
      this.isenabled=false; //turn button disabled so user wont create duplicate accounts
      this.authService.bankinfo(this.name, this.email, this.routing, this.acc, this.fname, this.lname).subscribe(res => {
        if(res === 'already bank account exist') { //if bank account already exist show message
          this.showSuccessAlert('You already have a bank account saved!');
        }
        else if (res.hasOwnProperty('code')) { //if has attribute of code, means its error code and give message that enter valid info
          this.showAlert('Please enter valid information in the form!');
          this.nav.navigateBack('/payment');
        } else {
          console.log(res); //otherwise mean successfully created account on stripe
          this.showSuccessAlert('Successfully created an account on Stripe!');
        }
      }, err => {
        console.log(err);
      });
    }
  }

  async showSuccessAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Successful!',
      message: msg,
      buttons: [ {
        text: 'OK',
      handler: () => {
        this.nav.navigateForward('/dashboard');
      }
    }
  ]
    });
    await alert.present();
  }

  async showAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Server Message',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
