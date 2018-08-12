import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesBySubjectPage } from './courses-by-subject';

@NgModule({
  declarations: [
    CoursesBySubjectPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursesBySubjectPage),
  ],
})
export class CoursesBySubjectPageModule {}
