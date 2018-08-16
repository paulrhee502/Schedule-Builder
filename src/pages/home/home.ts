import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseListPage } from '../course-list/course-list';
import { Http } from '../../../node_modules/@angular/http';
import { Storage } from '../../../node_modules/@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public addedCourses;
  public addedSections;
  public selectedCourses = [];
  public selectedSections = [];
  public breaks;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
    this.storage.get('jwt').then((token) => {
      this.http.get(`http://localhost:8080/users?token=${token}`).subscribe((user) => {
        let loggedInUser = JSON.parse(user._body);
        this.addedCourses = loggedInUser.courses;
        this.addedSections = loggedInUser.sections;
        this.breaks = loggedInUser.breaks;
        for(let i = 0; i < this.addedCourses.length; i++){
          this.selectedCourses.push(false);
        }
        for(var i = 0; i < this.addedSections.length; i++){
          this.selectedSections.push(false);
        }
      }, (err) => {
        console.log(err);
      })
    })
  }
  
  openCourseList(){
    this.http.get('http://localhost:8080/courses/all').subscribe((result) => {
      this.navCtrl.push(CourseListPage, {courseList: result._body});
    }, (error) => {
      console.log(error);
    })
  }

  buildSchedule(){
    let courseArray = [];
    let sectionArray = [];
    for(var i = 0; i < this.addedCourses.length; i++){
      if(this.selectedCourses[i] == true){
        courseArray.push(this.addedCourses[i]);
      }
    }
    console.log("CourseArray: ", courseArray);
    for(var i = 0; i < this.addedSections.length; i++){
      if(this.selectedSections[i] == true){
        sectionArray.push(this.addedSections[i]);
      }
    }
    console.log("SectionArray: ", sectionArray);
    console.log("Breaks: ", this.breaks);
  }
}
