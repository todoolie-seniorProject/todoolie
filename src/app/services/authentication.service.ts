import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
const TOKEN_KEY = 'auth-token';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import {LoginUser} from '../public/login/login-model';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loading: any;
  authenticationState = new BehaviorSubject(false);
  constructor(public alertController: AlertController,public navCtrl: NavController, private storage: Storage, private plt: Platform, private authService: AuthenticationService, private http: HttpClient) {
    // this.plt.ready().then(() => {
    //   this.checkToken();
    // });
  }
  // checkToken() {
  //   this.storage.get(TOKEN_KEY).then(res => {
  //     if (res) {
  //       this.authenticationState.next(true);
  //     }
  //   });
  // }

  // login(username: string, password: string) {
  //   // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
  //     this.authenticationState.next(true);
  //     let isAthorized = this.authenticationState.getValue();
  //     console.log(isAthorized);
  //   }
  // }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login Failed!',
      message: 'Incorrect Username/Password, Please Try Again!',
      buttons: ['OK']
    });
    await alert.present();
  }

  login(username, password) {
    const loginUser: LoginUser = {username: '', password: '' };
    this.http.post('http://localhost:3000' + '/login/', loginUser).subscribe((results) => {
     if (results) {
      this.navCtrl.navigateForward('/dashboard');
      } else { // invalid login
        this.presentAlert();
      }
    },
    error => {
        this.loading.dismiss();
        this.failAlert('Unable to connect to Toddolie!');

    //  console.log(results);
      // const isAthorized = this.authenticationState.getValue();
      // console.log(isAthorized);
    //  this.authenticationState.next(true);
    });
  }

// login(username, password) {
//   this.http.post('http://localhost:8100/login', {
//     username: 'randy',
//     password: '1221'
// }).subscribe((response) => {
//     console.log(response);
//     const isAthorized = this.authenticationState.getValue();
//     console.log(isAthorized);
//     this.authService.login(username, password);
// });
// }



//   login(username: string, password: string) {
//     return this.http.post('http://localhost:8100', { username, password })
//         .pipe( map(user => {
//             // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
//             user = window.btoa(username + ':' + password);
//             localStorage.setItem('currentUser', JSON.stringify(user));
//             this.currentUserSubject.next(user);
//             return user;
//           }));
// }

async failAlert(alertMessage) {
  this.loading.dismiss();
  const alert = await this.alertController.create({
    header: 'Alert',
    message: alertMessage,
    buttons: [{
      text: 'Cancel',
      handler: () => {
        alert.dismiss();

      }
    },

    ]
  });
  await alert.present();
}


}
