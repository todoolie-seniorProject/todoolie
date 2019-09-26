import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string;
  public password: string;

  constructor(private authService: AuthenticationService) { }
  ngOnInit() {
  }
  login() {
    let isAthorized = this.authService.login(this.username, this.password);
    console.log(isAthorized);
  }
}
