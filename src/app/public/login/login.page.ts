import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // variable student user declaration
  username: string;
  password: string;
  result: any = [];
  data: any;

  // pulled from login.model.ts to utilize an interface
  // login: LoginUser[] = [ {
    // username: '',
   // password: ''
  // }
  // ];


  constructor(private authService: AuthenticationService, public alertController: AlertController, private http: HttpClient) {

   }
  ngOnInit() {
  }
  // ** I used this function to go to the dashboard page if credentials were input and
  // login button was pressed!

  // login() {
  //    let isAthorized = this.authService.login(this.username, this.password);
  //    console.log(isAthorized);

  login(username, password) {
      if ((this.username && this.password) === '' ) {
        // console.log(this.username);
        // console.log(this.password);
        let isAthorized = this.authService.login(this.username, this.password);
        // this.authService.login(this.username, this.password);
        console.log(isAthorized);
        // this.authService.postCreds(this.username, this.password);
      } else {
        this.authService.presentAlert();
        }
    }

}
