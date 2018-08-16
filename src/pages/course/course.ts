import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Alert } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { Storage } from '../../../node_modules/@ionic/storage';

/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {
  public course;
  public itemExpandHeight = [230, 340];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public http: Http, public storage: Storage) {
    this.course = this.navParams.get('course');
    this.course.sections.forEach((section) => {
      section.expanded = false;
      if(section.discussions.length == 0){
        this.itemExpandHeight.push(90);
      }
      else{
        this.itemExpandHeight.push(140 + (90 * section.discussions.length));
      }
    })
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
  expandItem(section){
    this.course.sections.map((sectionItem) => {
      if(section == sectionItem){
        sectionItem.expanded = !sectionItem.expanded;
      }
      else{
        sectionItem.expanded = false;
      }
      return sectionItem;
    })
  }
  addCourse(){
    let alert = this.alertCtrl.create();
    alert.setTitle("Add Course");
    alert.setSubTitle("Please select the section that you would like to add to your schedule");
    if(this.course.sections.length > 1){
      alert.addInput({
        type: 'radio',
        label: "Any Section",
        value: "any"
      })
    }
    this.course.sections.forEach((section) => {
      alert.addInput({
        type: 'radio',
        label: section.number,
        value: section
      })
    })
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Add',
      handler: data => {
        if(data == undefined){
          let errorAlert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Please select a section",
            buttons: [{
              text: 'Dismiss',
              handler: h => {
                alert.present();
              }
            }]
          })
          errorAlert.present();
        }
        else if(data == "any"){
          this.storage.get('jwt').then((token) => {
            this.http.get(`http://localhost:8080/users?token=${token}`).subscribe((user) => {
              let loggedInUser = JSON.parse(user._body);
              loggedInUser.courses.push(this.course._id);
              this.http.put(`http://localhost:8080/users/${loggedInUser._id}`, loggedInUser).subscribe((updatedUser) => {
                let successAlert = this.alertCtrl.create({
                  title: "Success",
                  subTitle: `${this.course.name} added to your schedule`,
                  buttons: [{
                    text: 'Close',
                    handler: h => {
                      this.viewCtrl.dismiss();
                    }
                  }]
                })
                successAlert.present();
              }, (error) => {
                console.log(error);
              })
            }, (err) => {
              console.log(err);
            })
          })
        }
        else{
          let discussionAlert = this.alertCtrl.create();
          discussionAlert.setTitle("Add Course");
          discussionAlert.setSubTitle("Please select the discussion that you would like to add to your schedule");
          if(data.discussions.length > 1){
            discussionAlert.addInput(
              {
                type: 'radio',
                label: "Any discussion",
                value: "any"
              }
            )
          }
          data.discussions.forEach((discussion) => {
            discussionAlert.addInput(
              {
                type: 'radio',
                label: discussion.number,
                value: discussion
              }
            )
          })
          discussionAlert.addButton('Cancel');
          discussionAlert.addButton(
            {
              text: 'Add',
              handler: discussion => {
                if(discussion == undefined){
                  let errorAlert = this.alertCtrl.create({
                    title: "Error",
                    subTitle: "Please select a discussion",
                    buttons: [{
                      text: 'Dismiss',
                      handler: error => {
                        alert.present();
                      }
                    }]
                  })
                  errorAlert.present();
                }
                else if(discussion == "any"){
                  let sectionAnyDiscussions = {
                    courseID: this.course._id,
                    timeStart: data.timeStart,
                    timeEnd: data.timeEnd,
                    discussions: []
                  };
                  data.discussions.forEach((d) => {
                    sectionAnyDiscussions.discussions.push(
                      {
                        timeStart: d.timeStart,
                        timeEnd: d.timeEnd,
                        days: d.days
                      }
                    )
                  })
                  this.storage.get('jwt').then((token) => {
                    this.http.get(`http://localhost:8080/users?token=${token}`).subscribe((user) => {
                      let loggedInUser = JSON.parse(user._body);
                      loggedInUser.sections.push(sectionAnyDiscussions);
                      this.http.put(`http://localhost:8080/users/${loggedInUser._id}`, loggedInUser).subscribe((updatedUser) => {
                        let successAlert = this.alertCtrl.create({
                          title: "Success",
                          subTitle: `${this.course.name} added to your schedule`,
                          buttons: [{
                            text: 'Close',
                            handler: h => {
                              this.viewCtrl.dismiss();
                            }
                          }]
                        })
                        successAlert.present();
                      }, (error) => {
                        console.log(error);
                      })
                    }, (err) => {
                      console.log(err);
                    })
                  })
                }
                else{
                  let section = {
                    courseID: this.course._id,
                    timeStart: data.timeStart,
                    timeEnd: data.timeEnd,
                    discussions: [
                      {
                        timeStart: discussion.timeStart,
                        timeEnd: discussion.timeEnd,
                        days: discussion.days
                      }
                    ]
                  }
                  this.storage.get('jwt').then((token) => {
                    this.http.get(`http://localhost:8080/users?token=${token}`).subscribe((user) => {
                      let loggedInUser = JSON.parse(user._body);
                      loggedInUser.sections.push(section);
                      this.http.put(`http://localhost:8080/users/${loggedInUser._id}`, loggedInUser).subscribe((updatedUser) => {
                        let successAlert = this.alertCtrl.create({
                          title: "Success",
                          subTitle: `${this.course.name} added to your schedule`,
                          buttons: [{
                            text: 'Close',
                            handler: h => {
                              this.viewCtrl.dismiss();
                            }
                          }]
                        })
                        successAlert.present();
                      }, (error) => {
                        console.log(error);
                      })
                    }, (err) => {
                      console.log(err);
                    })
                  })
                }
              }
            }
          )
          discussionAlert.present();
        }
      }
    })
    alert.present();
  }
}
