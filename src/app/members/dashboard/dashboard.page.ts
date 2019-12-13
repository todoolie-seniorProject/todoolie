import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // this data will have all referrals stored, obtained from our api get_user_referrals
  public data: any; 

  constructor(private authService: AuthenticationService,private storage: Storage,
    private http: HttpClient,
    private nav: NavController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public rout: Router) {
      this.http.get(SERVER_URL + '/get_user_referrals/' + localStorage.getItem('userLogin')).subscribe(data=>{
        this.data = data;
        console.log(this.data);
      });
      

     }
  ngOnInit() {
    
    // this gets user referrals and the user login information
    this.http.get(SERVER_URL + '/get_user_referrals/' + localStorage.getItem('userLogin')).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
    
  }

  logout() {
    this.authService.logout();
  }
  referout() {
    this.nav.navigateRoot('/referral');
  }

  async storeBankInfo(){
    this.authService.checkBankAcc().subscribe(data => {
      if(data['res'] == 1) { 
        // if bank account already exist, show message that already exist and take it to dashboard
        this.showAlreadyAlert();
      }
      else {
        this.nav.navigateForward('/payment'); // otherwise take to payment page
      }
   });
 }

 async showAlreadyAlert() {
  const alert = await this.alertCtrl.create({
    header: 'Alert',
    message: 'You already have bank info stored!',
    buttons: [ 'OK' ]
  });
  await alert.present();
}

  goDash() {
    //location.reload(); //refresh current page;
    this.rout.navigateByUrl('/admin');
  }

  async showNoBank() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'You dont have bank info stored!',
      buttons: [ {
        text: 'OK',
      handler: () => {
        this.rout.navigateByUrl('/dashboard');
      }
    }
  ]
    });
    await alert.present();
  }

  getPaid(email: string) { //function to call pay_referral api to get paid for that referral with that email

    this.authService.checkBankAcc().subscribe(data => {
      if(data['res'] != 1) { 
        // if bank account already exist, show message that already exist and take it to dashboard
        this.showNoBank();
      }
      else {
        this.authService.getPaid(email).subscribe(data => {
          this.showSuccessAlert("Successfully sent request to get paid!");
          this.rout.navigateByUrl('/admin');
        });
      }
   });

    
  }

  ionViewWillEnter() { //this function refreshes referrals on dashboard each time page loads
    //this api call will load all current logged in users referrals from database using our api
    this.http.get(SERVER_URL + '/get_user_referrals/' + localStorage.getItem('userLogin')).subscribe(data=>{
      this.data = data;
      console.log(this.data);
    });
  }

  async showSuccessAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Successful!',
      message: msg,
      buttons: [ {
        text: 'OK',
      handler: () => {
        this.rout.navigateByUrl('/admin');
      }
    }
  ]
    });
    await alert.present();
  }

}
