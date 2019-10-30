import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authenticationState = new BehaviorSubject(false);
  public username: string;
  public password: string;
  private loginSub: Subscription;

  constructor(private authService: AuthenticationService,
              private storage: Storage,
              private http: HttpClient,
              private nav: NavController,
              public toastController: ToastController,
              public alertCtrl: AlertController
    ) { }
  ngOnInit() {
  }

  async login() {
    this.authService.login(this.username, this.password).subscribe(res => {
      // randy
      if (res  == true){
        this.showSuccess(res);  // this alert shows a successful login after authentication is true, and then navigates to the dashboard
      }
  }, err => {
    {
    // shows alert that the username and password is incorrect
    this.showAlert(err.error.text);
    this.nav.navigateBack('login');
    }
  });
  }
// successful login alert
async showSuccess(msg){
  const alert = await this.alertCtrl.create({
    header: 'Successful Login!',
    message: '',
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

//f ailed login alert
 async showAlert(msg){
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      message: 'Wrong username or password.',
      buttons: ['OK']
    });
    await alert.present();

}
}
// ngOnDestroy() {
//   this.loginSub.unsubscribe();
// }


