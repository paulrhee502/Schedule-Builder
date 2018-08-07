import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { HomePage } from '../home/home';

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

  register(){
    if(this.password == this.passwordConfirm){
      this.http.post('http://localhost:8080/users/', {
      username: this.username,
      password: this.password
    }).subscribe(
      result => {
        console.log("Token: ", result._body);
        this.navCtrl.setRoot(HomePage);
      },
      error => {
        console.log("Error: ", error);
        let alert = this.alertCtrl.create({
          title: "Registration Error",
          subTitle: error._body,
          buttons: ["Dismiss"]
        })
        alert.present();
      }
    )
    }
    else{
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Passwords do not match.",
        buttons: ["Dismiss"]
      })
      alert.present();
    }
  }
}
