import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    public username;
    public password;
  constructor(public navCtrl: NavController) {
  }

  navigateToRegistration(){
    this.navCtrl.push(RegistrationPage);
  }
  login(){
    this.navCtrl.push(HomePage);
  }
}
