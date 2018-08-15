import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBreakModalPage } from './add-break-modal';

@NgModule({
  declarations: [
    AddBreakModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBreakModalPage),
  ],
})
export class AddBreakModalPageModule {}
