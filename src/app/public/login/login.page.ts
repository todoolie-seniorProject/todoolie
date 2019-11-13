import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  authenticationState = new BehaviorSubject(false);
  userInfo: { username: any[]; password: any[]; };
  public username: string;
  public password: string;
   todoolieUser = {
    username: this.username,
    password: this.password
  }
  constructor(private authService: AuthenticationService,
    private storage: Storage,
    private http: HttpClient,
    private nav: NavController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private router: Router
    ) { }

   openDetailsWithState(){
     let navigationExtras : NavigationExtras = {
       state : {
         todoolieUser: this.todoolieUser
       }
     };
     this.router.navigate(['referral'],navigationExtras);
      }
    // setUsername(username){
    //   this.username = username;
    // }
    // getUsername(){
    //   return this.username;
    // }
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
    // randy
    if (res  == true){
      // this.showAlert(res); //show in alert message box whetever result comes
      localStorage.setItem('userLogin', this.username);
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
 async showAlert(msg){
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      message: 'Wrong username or password.',
      buttons: ['OK']
    });
    await alert.present();

}

}
