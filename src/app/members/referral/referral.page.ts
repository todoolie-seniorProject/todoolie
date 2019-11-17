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
      private http: HttpClient,
      private nav: NavController) {

   }
  ngOnInit() {

  }
  referout() {
    this.authService.referout();
  }
  payment() {
    this.nav.navigateRoot('/admin');
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
          this.nav.navigateBack('/referral');
        }
        else{
        console.log(res); //fariha
        this.showAlertSuccess(res);
        this.authService.sendMail(this.name, this.email, this.age, this.school);
          this.nav.navigateForward('/admin'); //temporary remove
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


  async showAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Server Message',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();

}
async showAlertSuccess(msg){
  const alert = await this.alertCtrl.create({
    header: 'Successful Referral!',
    buttons: ['OK']
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






// sendMail function
// sendMail( name: string, email: string, age: number, school: string): any {
//   const user = { "name" : name, "age": age, "email": email, "school": school}
//   this.http.post('http://localhost:3000/sendmail', user).subscribe(
//     data => {
//       const res: any = data;
//       console.log(
//         `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
//       );
//     },
//     err => {
//       console.log(err);
//       console.log("failed to send email to student referral")
//     }
//   );
// }


clear(){
  this.name = '';
  this.email = '';
  this.school = '';
  this.age = null;
}
}
