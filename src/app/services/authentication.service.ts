import { Platform, Config, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment, SERVER_URL } from '../../environments/environment';
import {NavController, AlertController} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage,
     private plt: Platform,
      private http: HttpClient,
      public alertController: AlertController,
      private nav: NavController
      ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  bankinfo( name: string, email : string, routingno: string, accountno : string, fname: string, lname: string): any {
    if(name == undefined || email == null || routingno == null || accountno == null){
      this.blankReferral();
      this.nav.navigateRoot('payment');
    }
    else {
      let user = { "name" : name, "routing_no": routingno, "account_no": accountno, "email": email, "fname": fname, "lname": lname}
      console.log(user);
      return this.http.post(SERVER_URL+'/register_bank', user);
    }
  } 

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }
  setToken() {
   return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
     this.authenticationState.next(true);
     let isAthorized = this.authenticationState.getValue();
   });
  }
  // post request for the login page.
  login(username: string, password: string): any {
    
   let user = {"username": username, "pass": password}
   console.log(user);
   return this.http.post(SERVER_URL+'/login', user);
  }
// post request for the referral page.
  refer( name: string, email : string, age: number, school : string): any{
    if(name == undefined || email == null || school == null){
      this.blankReferral();
      this.nav.navigateRoot('referral');
    }
    else {
  let user ={ "name" : name, "age": age, "email": email, "school": school}
  console.log(user);
  return this.http.post(SERVER_URL+'/referral', user);
  }}
  emailChecker( email: string):any{
    let user = {"email" : email}
    return this.http.post(SERVER_URL+ '/referral', user);
  }
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  referout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  payment(){
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
  async blankReferral(){
    const alert = await this.alertController.create({
      header: 'Empty data',
      message: 'Input information if you want to make referral',
      buttons:['ok']
    });
    await alert.present();
  }



 /* private handleError (error : HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error has occured:', error.error.message);
    }
    else {
      console.error('Backend returned code ${error.status} '+ 'body was: ${error.error}');
    }
    return throwError('something bad has happened; please try again later.');
  } */
} 

