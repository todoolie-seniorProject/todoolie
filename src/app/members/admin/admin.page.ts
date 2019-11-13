import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  loginPage: any;

  constructor(private authService: AuthenticationService,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private nav: NavController,
    private http: HttpClient) { }

  ngOnInit() {
  }

  async payment(){
        // this.showAlert(res); //show in alert message box whetever result comes
        this.authService.payment();
      }
      showReferral(){
      this.http.get(SERVER_URL+'/referral').subscribe(data=>{
        console.log(data)
      })
    }
    logout() {
      this.authService.logout();
    }
   async showAlert(){
      this.nav.navigateRoot('/payment');
    }

}
