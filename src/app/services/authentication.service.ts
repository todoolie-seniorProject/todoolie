import { Platform, Config } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment, SERVER_URL } from '../../environments/environment';
import {AlertController} from '@ionic/angular';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage,
     private plt: Platform,
      private http: HttpClient,
      public alertController: AlertController
      ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
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
  login(username: string, password: string): any {
    
   let user = {"username": username, "pass": password}
   return this.http.post(SERVER_URL+'/login', user);
  }
  refer( name: string, age: number, school: string, email : string): any{
  let user ={ "name" : name, "age": age, "email": email, "school": school}
  return this.http.post(SERVER_URL+'/referral', user);
  }
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

