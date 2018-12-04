import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {Media, MediaObject} from '@ionic-native/media';
import {RestProvider} from "../../providers/rest/rest";

import {File} from '@ionic-native/file';
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
  audioList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private file: File, private zone: NgZone, private media: Media ,
    private toastCtrl: ToastController,
              public restProvider: RestProvider) {
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
          const index = this.audioList.indexOf(call);
          console.log(index);
          this.audioList.splice(index, 1);

          console.log(this.audioList);

          localStorage.setItem('calllist', JSON.stringify(this.audioList));

        });

    }

    this.presentToast();


  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Llamadas enviadas',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');

    });

    toast.present();
  }


}
