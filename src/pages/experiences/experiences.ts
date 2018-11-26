import {Component} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the ExperiencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({

  name: 'Experiencias',
  segment: 'experiencias'

})
@Component({
  selector: 'page-experiences',
  templateUrl: 'experiences.html',
})
export class ExperiencesPage {

  experiences = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperiencesPage');
    this.nativeStorage.getItem('experiences')
      .then(
        data => this.renderData(data),
        error => console.error(error)
      );


  }

  renderData(data){
    this.experiences=data;
    console.log(this.experiences);
  }
  gotoHome(){
    this.navCtrl.push(HomePage);
  }
}
