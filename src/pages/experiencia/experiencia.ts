import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ExperienciaPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'Experiencia',
    segment: 'experience'
  }
)
@Component({
  selector: 'page-experiencia',
  templateUrl: 'experiencia.html'
})
export class ExperienciaPage {

  generalRoot = 'GeneralPage'
  audio1Root = 'Audio1Page'
  audio2Root = 'Audio2Page'


  constructor(public navCtrl: NavController) {}

}
