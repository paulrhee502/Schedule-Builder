import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { CoursesBySubjectPage } from '../courses-by-subject/courses-by-subject';


@IonicPage()
@Component({
  selector: 'page-course-list',
  templateUrl: 'course-list.html',
})
export class CourseListPage {
  public courses = [];
  currentPageClass = this;
  triggerAlphaScrollChange: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.get('http://localhost:8080/courses/all').subscribe((result) => {
      this.courses = JSON.parse(result._body);
    }, (err) => {
      console.log(err);
    })
  }

  onItemClick(item) {
    this.triggerAlphaScrollChange++;
    this.navCtrl.push(CoursesBySubjectPage, {subject: item.subject});
  }
}
