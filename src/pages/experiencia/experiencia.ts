import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {HomePage} from "../home/home";
import * as firebase from 'firebase';
import {RestProvider} from "../../providers/rest/rest";

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
  experience = <any>{};
  user: any = [];

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage,
              private toastCtrl: ToastController, public restProvider: RestProvider) {
    this.user = firebase.auth().currentUser;
  }

  saveExperience() {

    this.sendExperience();


  }


  sendExperience() {


    this.experience.user = this.user.email;
    this.experience.fecha=  new Date().toISOString();


    this.restProvider.sendExperiences(this.experience)
      .then(data => {
        this.presentToast("Experiencia enviada a servidor");
      }).catch(e => {
      this.addItem()
      this.presentToast("Error al enviar la experiencia, se ha guardado en el dispositivo");

    });

  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.gotoHome()
    });

    toast.present();
  }

  gotoHome() {

    this.navCtrl.push(HomePage);
  }

  saveSuccess() {
    console.log('Stored item!');


  }

  addItem() {

    this.nativeStorage.getItem('experiences')
      .then(
        data => function (data) {
          if (data == null) {
            this.experiences = new Array();
          } else {
            this.experiences = data;
          }

          this.experiences.push(this.experience);

          this.nativeStorage.setItem('experiences', this.experiences).then(
            () => this.saveSuccess(),
            error => console.error('Error storing item', error)
          );
        });
  }
}
