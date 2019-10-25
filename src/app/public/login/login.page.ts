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
    public alertCtrl: AlertController,
    public NavController: NavController
    ) { }
  ngOnInit() {
  }


async login() {
  this.authService.login(this.username, this.password).subscribe(res => {
    // randy
    if (res  == true){
      // this.showAlert(res); //show in alert message box whetever result comes
      this.NavController.navigateForward('/referral');
    }
    else 
    {
      this.showAlert(res);
    }
}, err => {
  //shows alert that the username and password is incorrect
  this.showAlert(err.error.text);
});
}

 async showAlert(msg){
    const alert = await this.alertCtrl.create({
      header: 'Server Message',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();

}
}
