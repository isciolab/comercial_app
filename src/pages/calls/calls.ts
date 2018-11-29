import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Media, MediaObject} from '@ionic-native/media';

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
              private file: File, private zone: NgZone, private media: Media) {
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


}
