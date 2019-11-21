import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';
import { stringify } from 'querystring';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})

export class DisplayPage implements OnInit {
data: any;
public name : string;
  constructor(private authService: AuthenticationService,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private nav: NavController,
    private http: HttpClient
    ) { }

  ngOnInit() {
  }

// async deleteReferral(){
//   this.deleteName(this.name);
//   console.log(name)
//   this.authService.deleteReferral(this.name).subscribe(res =>{
//     if(res == true){
//       this.http.get(SERVER_URL+ '/display').subscribe(data=>{
//         this.data = data;
//         var myJSON = JSON.stringify(data,null,'\t');
//         console.log( myJSON);
//         for(var i = 0; i<myJSON.length; i++){
//           document.getElementById("json").innerHTML = myJSON;
//         }
//       })
//     }
//   })
// }
 
// async showReferral(){
//   this.http.get(SERVER_URL+ '/display').subscribe(data=>{
//     this.data = data;
//     var myJSON = JSON.stringify(data,null,'\t');
//     console.log( myJSON);
//     for(var i = 0; i<myJSON.length; i++){
//       document.getElementById("json").innerHTML = myJSON;
//     }
//   })
// }

// displayingData(): void{
//   this.loading = true;
//   this.http.request(SERVER_URL + '/display').subscribe((res: Response)=>{
//     this.data = res.json();
//     this.loading = false;
//   })
// }

async deleteName(msg){
  const alert = await this.alertCtrl.create({
    header: 'Delete Student!',
    message: 'Enter name of student being deleted!',
    inputs: [{name: this.name}],
    buttons: ['DELETE'],
    
  });
  await alert.present();
}

}
