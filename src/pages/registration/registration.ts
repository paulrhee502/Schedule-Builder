import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  public username;
  public password;
  public passwordConfirm;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {
  }

  //TODO: error messages
  register(){
    this.http.post('http://localhost:8080/users/', {
      username: this.username,
      password: this.password
    }).subscribe(
      result => {
        console.log("success");
      },
      error => {
        console.log(error);
      }
    )
  }
}
