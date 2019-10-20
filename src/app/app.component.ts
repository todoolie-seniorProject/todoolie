import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http: HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // we subscribe to own authenctication state if user becomes authenticated
      // authomcatically switch to the inside area or otherwise for a logged out user
      // back to login
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }
}
