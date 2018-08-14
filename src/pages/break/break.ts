import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';

/**
 * Generated class for the BreakPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-break',
  templateUrl: 'break.html',
})
export class BreakPage {
  public days = ["M", "Tu", "W", "Th", "F"];
  public breaks;
  public times;
  public breakArray = new Array(5);
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: Http) {
    this.breaks = [
      {
        timeStart: "10:00",
        timeEnd: "11:00",
        days: "M"
      },
      {
        timeStart: "12:00",
        timeEnd: "12:30",
        days: "Tu"
      },
      {
        timeStart: "13:00",
        timeEnd: "14:00",
        days: "M"
      }
    ]
    let temp = new Array(168);
    for(var i = 0; i < 168; i++){
      temp[i] = false;
    }
    for(var i = 0; i < 5; i++){
      this.breakArray[i] = temp.slice(0);
    }
    console.log(this.breakArray);
    this.times = [
      "8:00", "8:05", "8:10", "8:15", "8:20", "8:25", "8:30", "8:35", "8:40", "8:45", "8:50", "8:55",
      "9:00", "9:05", "9:10", "9:15", "9:20", "9:25", "9:30", "9:35", "9:40", "9:45", "9:50", "9:55",
      "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55",
      "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55",
      "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55",
      "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55",
      "14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55",
      "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55",
      "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55",
      "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55",
      "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55",
      "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55",
      "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55",
      "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55",
    ]
    this.populateBreaks();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  populateBreaks(){
    this.breaks.forEach((b) => {
      if(b.days.includes("M")){
       for(var i = this.times.indexOf(b.timeStart); i < this.times.indexOf(b.timeEnd); i++){
         this.breakArray[0][i] = true;
       }
      }
      if(b.days.includes("Tu")){
        for(var i = this.times.indexOf(b.timeStart); i < this.times.indexOf(b.timeEnd); i++){
          this.breakArray[1][i] = true;
        }
      }
      if(b.days.includes("W")){
        for(var i = this.times.indexOf(b.timeStart); i < this.times.indexOf(b.timeEnd); i++){
          this.breakArray[2][i] = true;
        }
      }
      if(b.days.includes("Th")){
        for(var i = this.times.indexOf(b.timeStart); i < this.times.indexOf(b.timeEnd); i++){
          this.breakArray[3][i] = true;
        }
      }
      if(b.days.includes("F")){
        for(var i = this.times.indexOf(b.timeStart); i < this.times.indexOf(b.timeEnd); i++){
          this.breakArray[4][i] = true;
        }
      }
    })
  }

  hasBreak(day, time){
    if(day == "M"){
      return this.breakArray[0][this.times.indexOf(time)];
    }
    else if(day == "Tu"){
      return this.breakArray[1][this.times.indexOf(time)];
    }
    else if(day == "W"){
      return this.breakArray[2][this.times.indexOf(time)];
    }
    else if(day == "Th"){
      return this.breakArray[3][this.times.indexOf(time)];
    }
    else{
      return this.breakArray[4][this.times.indexOf(time)];
    }
  }

  addBreak(){

  }
}
