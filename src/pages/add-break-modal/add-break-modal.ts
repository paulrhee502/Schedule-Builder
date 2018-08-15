import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { Storage } from '../../../node_modules/@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add-break-modal',
  templateUrl: 'add-break-modal.html',
})
export class AddBreakModalPage {
  public inactive = "whitesmoke";
  public active = "#001A57"
  public colorArray = [];
  public newBreakStartTime
  public newBreakEndTime;
  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public http: Http, public storage: Storage) {
    for(var i = 0; i < 5; i++){
      this.colorArray.push(this.inactive); 
    }
  }

  closeModal(){
    this.viewCtrl.dismiss(null);
  }

  toggleColor(index){
    if(this.colorArray[index] == this.inactive){
      this.colorArray[index] = this.active;
    }
    else{
      this.colorArray[index] = this.inactive;
    }
  }

  addBreak(){
    let alert;
    if(this.colorArray.indexOf(this.active) == -1){
      alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please select a day of the week to add a break to",
        buttons: ['Dismiss']
      })
      alert.present();
      return;
    }
    else if(this.newBreakStartTime == undefined || this.newBreakEndTime == undefined){
      alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please add a valid start and/or end time",
        buttons: ['Dismiss']
      })
      alert.present();
      return;
    }
    else if(this.timeToNum(this.newBreakStartTime) >= this.timeToNum(this.newBreakEndTime)){
      alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Start time cannot be later than the end time",
        buttons: ['Dismiss']
      })
      alert.present();
      return;
    }
    if(this.newBreakStartTime.charAt(0) == '0'){
      this.newBreakStartTime = this.newBreakStartTime.substring(1);
    }
    if(this.newBreakEndTime.charAt(0) == '0'){
      this.newBreakEndTime = this.newBreakEndTime.substring(1);
    }
    let newBreak = {
      timeStart: this.newBreakStartTime,
      timeEnd: this.newBreakEndTime,
      days: this.populateDays()
    }
    this.storage.get('jwt').then((token) => {
      this.http.get(`http://localhost:8080/users?token=${token}`).subscribe((user) =>{
        let loggedInUser = JSON.parse(user._body);
        loggedInUser.breaks.push(newBreak);
        this.http.put(`http://localhost:8080/users/${loggedInUser._id}`, loggedInUser).subscribe((updatedUser) => {
          let alert = this.alertCtrl.create({
            title: "Break created",
            subTitle: "Break was successfully added",
            buttons: ['Dismiss']
          })
          alert.present();
          this.viewCtrl.dismiss(newBreak);
        })
      }, (err) => {
        console.log(err);
      })
    })
  }

  timeToNum(time){
    let index = time.indexOf(":");
    return (Number(time.substring(0,index) * 60)) + Number(time.substring(index + 1));
  }

  populateDays(){
    let breakDays = "";
    if(this.colorArray[0] == this.active){
      breakDays += "M"
    }
    if(this.colorArray[1] == this.active){
      breakDays += "Tu"
    }
    if(this.colorArray[2] == this.active){
      breakDays += "W"
    }
    if(this.colorArray[3] == this.active){
      breakDays += "Th"
    }
    if(this.colorArray[4] == this.active){
      breakDays += "F"
    }
    return breakDays;
  }
}
