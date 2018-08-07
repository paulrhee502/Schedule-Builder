import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import { Storage } from '../../../node_modules/@ionic/storage';
import { Http } from '../../../node_modules/@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    public username;
    public password;
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public http: Http,
    public alertCtrl: AlertController) {
  }

  navigateToRegistration(){
    this.navCtrl.push(RegistrationPage);
  }
  login(){
    this.http.post('http://localhost:8080/users/session/', {
      username: this.username,
      password: this.password
    }).subscribe(
      result => {
        let token = result._body;
        this.storage.set('jwt', token);
        this.navCtrl.setRoot(HomePage);
      },
      error => {
        let alert = this.alertCtrl.create({
          title: "Registration Error",
          subTitle: error._body,
          buttons: ["Dismiss"]
        })
        alert.present();
      }
    )
  }
}
