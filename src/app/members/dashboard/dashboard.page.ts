import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private authService: AuthenticationService,private storage: Storage,
    private http: HttpClient,
    private nav: NavController,
    public toastController: ToastController,
    public alertCtrl: AlertController) { }
  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
  referout() {
    this.nav.navigateRoot('/referral');
  }

}
