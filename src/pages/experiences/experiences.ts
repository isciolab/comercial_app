import {Component} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {RestProvider} from "../../providers/rest/rest";

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

  experiences: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,
              public restProvider: RestProvider, private toastCtrl: ToastController) {
    // this.nativeStorage.setItem('experiences', this.experiences);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperiencesPage');
    this.nativeStorage.getItem('experiences')
      .then(
        data => this.renderData(data),
        error => console.error(error)
      );
  }

  renderData(data) {

    this.experiences = data;

    console.log(data);

  }

  gotoHome() {
    this.navCtrl.push(HomePage);
  }

  sendExperiences() {

    for (let experience of this.experiences) {

      this.restProvider.sendExperiences(experience);

    }

    this.presentToast();


  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Experiencias enviadas',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');

    });

    toast.present();
  }


}
