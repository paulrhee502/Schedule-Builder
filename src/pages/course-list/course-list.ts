import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { CoursesBySubjectPage } from '../courses-by-subject/courses-by-subject';
import { BreakPage } from '../break/break';


@IonicPage()
@Component({
  selector: 'page-course-list',
  templateUrl: 'course-list.html',
})
export class CourseListPage {
  public courses = [];
  currentPageClass = this;
  triggerAlphaScrollChange: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public modalCtrl: ModalController) {
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

  addBreak(){
    let breakModal = this.modalCtrl.create(BreakPage);
    breakModal.present();
  }
}
