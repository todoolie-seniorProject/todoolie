import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authenticationState = new BehaviorSubject(false);
  public username: string;
  public password: string;
  
  constructor(private authService: AuthenticationService,
    private storage: Storage,
    private http: HttpClient,
    private nav: NavController,
    public toastController: ToastController,
    public alertCtrl: AlertController
    ) { }
  ngOnInit() {
  }
//   async login() {
//     this.authService.login(this.username, this.password).subscribe(res => {
//      if(res.status==200){
//        this.showAlert("successful")
//        this.authService.setToken()
//      } 
//      else if (res.status==210){
//        this.showAlert('error')
//      }
//   }, err => {
//     throw err;
//   });
// }

async login() {
  this.authService.login(this.username, this.password).subscribe(res => {
   if(res.status==200){
     this.showAlert("successful")
     this.authService.setToken()
   } 
   else if (res.status==210){
     this.showAlert('error')
   }
}, err => {
  throw err;
});
}




// login(username, password) {
//   if ((this.username && this.password) === '' ) {
//     // console.log(this.username);
//     // console.log(this.password);
//     let isAthorized = this.authService.login(this.username, this.password);
//     // this.authService.login(this.username, this.password);
//     console.log(isAthorized);
//     // this.authService.postCreds(this.username, this.password);
//   } else {
//     this.authService.presentAlert();
//     }
// }

// }

 async showAlert(type){
  if(type == 'error'){
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'username and password did not match',
      buttons: ['OK']
    });
    await alert.present();
  }
  else if (type == 'success'){
    const alert = await this.alertCtrl.create({
      header: 'success',
      message: 'logged in successfully',
      buttons: ['OK']
    });
    await alert.present();
  }
}
}
