import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {NavController, AlertController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';
import { Router } from '@angular/router';


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
data: any;

  constructor(private authService: AuthenticationService,
      public toastController: ToastController,
      public alertCtrl: AlertController,
      private http: HttpClient,
      private nav: NavController
      ,private rout: Router) {

   }
  ngOnInit() {

  }
  referout() {
    this.authService.referout();
  }
  payment() {
    this.rout.navigateByUrl('/dashboard');
    
  }

  async checkEmail() {
    
  }

  async refer() {
    // the regex that checks the input email if its in format and is a valid email
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.email)) { //testing the email on the above regex
      this.showAlert("Please enter a valid email"); //show message if email is invalid
      this.nav.navigateBack('/referral'); // stay on referral page if email is invalid
    }
    else { // if email is valid then this will run
      this.authService.refer(this.name, this.email, this.age, this.school).subscribe(res => {
        if (res.hasOwnProperty('code')) {
          this.showAlert("The email already exists with this email! ");
        }
        else{
          console.log(res); //fariha
          //this.authService.sendMail(this.name, this.email, this.age, this.school);
          //this.sendMail();
        }

      }, err => {
        console.log(err); //
      });
    }
  }

  // async refer() {
  //   this.authService.refer(this.name, this.email, this.age, this.school).subscribe(res => {
  //     this.showAlertSuccess(res);
  //     this.authService.sendMail(this.name, this.email, this.age, this.school);
  // }, err => {
  //   this.showAlert(err.error.text);
  // });
  // }


  async display() {
    this.nav.navigateRoot('/display');
    this.http.get(SERVER_URL+ '/display').subscribe(data=>{
      this.data = data;
      var myJSON = JSON.stringify(data,null,'\t');
      console.log( myJSON);
      for(var i = 0; i<myJSON.length; i++){
        document.getElementById("json").innerHTML = myJSON;
      }
    })
  }




  async showAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Error!',   // show error alert instead of server message
      message: msg,
      buttons: ['OK']
    });
    await alert.present();

}
async showAlertSuccess(msg){
  const alert = await this.alertCtrl.create({
    header: 'Successful Referral!',
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

// sendmail function for referral
async sendMail() {
  this.authService.sendMail(this.name, this.email, this.age, this.school).subscribe(res => {
    console.log('email sent!');
    
}, err => {
  this.showAlert(err.error.text);
});
}




clear() {
  this.name = '';
  this.email = '';
  this.school = '';
  this.age = null;
}
}
