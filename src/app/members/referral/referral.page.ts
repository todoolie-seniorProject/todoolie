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
        this.clear();

   }
  ngOnInit() {

  }

  payment() {
    this.rout.navigateByUrl('/dashboard');
    
  }

<<<<<<< HEAD

=======
  async checkEmail() {
    
  }
// 
>>>>>>> master
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
          
        }

      }, err => { // show error
        console.log(err); //
        this.showAlertSuccess('test');
        this.clear();
      });
    }
  }


//show alert 
  async showAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Error!',   // show error alert instead of server message
      message: msg,
      buttons: ['OK']
    });
    await alert.present();

}
//show alert once referral is successful.
async showAlertSuccess(msg){
  const alert = await this.alertCtrl.create({
    header: 'Successful Referral!',
    buttons: [ {
      text: 'OK',
    handler: () => {
      this.rout.navigateByUrl('/dashboard');
    }
  }
]
  });
  await alert.present();
}

// sendmail function after a  referral has been sent
async sendMail() {
  this.authService.sendMail(this.name, this.email, this.age, this.school).subscribe(res => {
    console.log('email sent!');
    
}, err => {
 // this.showAlert(err.error.text);
});
}



// clear function that clears contents once a user has input a referral
clear() {
  this.name = '';
  this.email = '';
  this.school = '';
  this.age = null;
}
}
