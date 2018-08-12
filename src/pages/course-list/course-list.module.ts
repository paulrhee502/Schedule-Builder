import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseListPage } from './course-list';

@NgModule({
  declarations: [
    CourseListPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseListPage),
  ],
})
export class CourseListPageModule {}
