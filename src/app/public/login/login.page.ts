import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError, Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
//import { MessageService } from '../../message.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  authenticationState = new BehaviorSubject(false);
  @Output() public userid :any ;
  public username: string;
  public password: string ;

  subscription: Subscription;
  constructor(private authService: AuthenticationService,
    private storage: Storage,
    private http: HttpClient,
    private nav: NavController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private router: Router,
    ) { }
  
  ngOnInit() {
   this.authService.currentMessage.subscribe(userid => this.userid =userid);
  }
  sendUserid(userid){
this.router.navigate(['/referral', userid]);
  }
async login() {
  this.authService.login(this.username, this.password).subscribe(res => {
    // randy
    if (res  == true){
      // this.showAlert(res); //show in alert message box whetever result comes
      this.showSuccess(res);
    }
}, err => {
  {
  // shows alert that the username and password is incorrect
  this.showAlert(err.error.text);
  this.nav.navigateBack('login');
  }
});
}

async showSuccess(msg){
  const alert = await this.alertCtrl.create({
    header: 'Successful Login!',
    message: '',
    buttons: [ {
      text: 'OK',
    handler: () => {
      this.nav.navigateForward('/referral');
    }
  }
]
  });
  await alert.present();
}
 async showAlert(msg){
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      message: 'Wrong username or password.',
      buttons: ['OK']
    });
    await alert.present();

}
// async saveUsernameToFile() {
//   var userInput = document.getElementById('username');
//   var blob = new blob([userInput], {type: "text/plain;charset=utf-8"});
//   saveAs(blob, "username.txt");
//   console.log(this.username, "bird brain");
// }

}
