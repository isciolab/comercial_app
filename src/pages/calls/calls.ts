import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {Media, MediaObject} from '@ionic-native/media';
import {RestProvider} from "../../providers/rest/rest";

import {File} from '@ionic-native/file';
import {HomePage} from "../home/home";

/**
 * Generated class for the CallsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Llamadas',
  segment: 'calls'
})
@Component({
  selector: 'page-calls',
  templateUrl: 'calls.html',
})
export class CallsPage {
  filePath: string;

  audio: MediaObject;
  audioList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private file: File, private zone: NgZone, private media: Media,
              private toastCtrl: ToastController, public platform: Platform,
              public restProvider: RestProvider) {
    // localStorage.setItem('calllist', JSON.stringify( []));
  }

  gotoHome() {
    // this.audio.stop();
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CallsPage');
  }

  getAudioList() {

    if (localStorage.getItem("calllist")) {
      this.zone.run(() => {
        this.audioList = JSON.parse(localStorage.getItem("calllist"));
      });
      console.log(this.audioList);
    }

  }

  ionViewWillEnter() {
    this.getAudioList();
  }

  sendCalls() {

    for (let call of this.audioList) {

      this.restProvider.sendCall(call)

        .then(data => {

          console.log(data);
          //if (data['success'] == "1") {
          const index = this.audioList.indexOf(call);
          console.log(index);
          this.audioList.splice(index, 1);

          console.log(this.audioList);

          localStorage.setItem('calllist', JSON.stringify(this.audioList));
          this.presentToast("Llamada enviada");
          //}
        }).catch(e => {
        this.presentToast("Error al enviar llamada");

      });

    }


  }

  presentToast(mesage) {
    let toast = this.toastCtrl.create({
      message: mesage,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');

    });

    toast.present();
  }

  playAudio(file, idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }

  ionViewDidLeave() {

    // this.audio.stop();
  }
}
