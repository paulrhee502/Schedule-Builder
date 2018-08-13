import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseListPage } from '../course-list/course-list';
import { Http } from '../../../node_modules/@angular/http';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public addedCourses;
  public selectedCourses = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.addedCourses = [
      {
        name: 'test',
        field: 'fs'
      },
      {
        name: 'test2',
        field: 'as'
      }
    ];
    for(let i = 0; i < this.addedCourses.length; i++){
      this.selectedCourses.push(false);
    }
  }
  
  buildSchedule(){
    let scheduleArray = [];
    for(let i = 0; i < this.addedCourses.length; i++){
      if(this.selectedCourses[i] == true){
        scheduleArray.push(this.addedCourses[i]);
      }
    }
    console.log(scheduleArray);
  }
}
