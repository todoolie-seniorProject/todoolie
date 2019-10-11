import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {
private referral : FormGroup;
private showData;

  constructor(private authService: AuthenticationService, private fb: FormBuilder, public toastController: ToastController) {
    this.referral=fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      age: ["", Validators.required],
      school: ["",Validators.required]
    });
    this.showData = {
      name:"",
      email:"",
      age:"",
      school:""
    }
   }
async referralForm()
{
  this.showData= this.referral.value
  const toast = await this.toastController.create({
    message: 'your profile has been updated.',
    duration:4000
  });
}
clearReferral(){
  this.referral.reset()
  this.showData= {
    name: '',
    email: '',
    age: '',
    school: ''
  }
}
  ngOnInit() {
  }
  logout(){
    this.authService.logout();
  }

}
