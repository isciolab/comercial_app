import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {HomePage} from "../home/home";

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
  experiences = new Array();
  experience = {};

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {
  }

  saveExperience() {
    console.log(this.experience);

    this.nativeStorage.getItem('experiences')
      .then(
        data => this.addItem(data),
        error => this.addItem(new Array())
      );


  }

  saveSuccess() {
    console.log('Stored item!');
    this.navCtrl.push(HomePage);
  }

  addItem(data) {

    this.experiences = data;
    this.experiences.push(this.experience);

    this.nativeStorage.setItem('experiences', this.experiences)
      .then(
        () => this.saveSuccess(),
        error => console.error('Error storing item', error)
      );
  }
}
