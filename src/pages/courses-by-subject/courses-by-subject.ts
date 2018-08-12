import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { CoursePage } from '../course/course';

/**
 * Generated class for the CoursesBySubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-courses-by-subject',
  templateUrl: 'courses-by-subject.html',
})
export class CoursesBySubjectPage {
  public subject;
  public courses;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public modalCtrl: ModalController) {
    this.subject = this.navParams.get('subject')
    this.http.get('http://localhost:8080/courses?subject=' + this.subject).subscribe((result) => {
      this.courses = JSON.parse(result._body);
    }, (err) => {
      console.log(err);
    })
  }
  openDetails(course){
    let courseModal = this.modalCtrl.create(CoursePage, {course: course});
    courseModal.present();
  }
}
