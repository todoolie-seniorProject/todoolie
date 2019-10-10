import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {LoginUser} from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // variable student user declaration
  username: string;
  password: string;
  // pulled from login.model.ts to utilize an interface
  // login: LoginUser[] = [ {
    // username: '',
   // password: ''
  // }
  // ];

  constructor(private authService: AuthenticationService) {

   }
  ngOnInit() {
  }
<<<<<<< Updated upstream
  login() {
    let isAthorized = this.authService.login(this.username, this.password);
    console.log(isAthorized);
=======
  // ** I used this function to go to the dashboard page if credentials were input and
  // login button was pressed!
  // login() {
  //    let isAthorized = this.authService.login(this.username, this.password);
  //    console.log(isAthorized);




  // login() {
  //     // checks if username or password should be at least 8 chars long, contain
  //     // one number, one char, annd one special char
  //     const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  //     if (regExp.test( this.username && this.password) === true) {
  //       console.log(this.username);
  //       console.log(this.password);
  //       this.authService.login();

  // }


>>>>>>> Stashed changes
  }
