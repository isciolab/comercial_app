import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallDiallerPage } from './call-dialler';

@NgModule({
  declarations: [
    CallDiallerPage,
  ],
  imports: [
    IonicPageModule.forChild(CallDiallerPage),
  ],
})
export class CallDiallerPageModule {}
