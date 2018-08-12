import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonAlphaScrollModule } from 'ionic2-alpha-scroll';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RegistrationPage } from '../pages/registration/registration';
import { CourseListPage } from '../pages/course-list/course-list';
import { CoursesBySubjectPage } from '../pages/courses-by-subject/courses-by-subject';
import { CoursePage } from '../pages/course/course';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RegistrationPage,
    CourseListPage,
    CoursesBySubjectPage,
    CoursePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonAlphaScrollModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    RegistrationPage,
    CourseListPage,
    CoursesBySubjectPage,
    CoursePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
