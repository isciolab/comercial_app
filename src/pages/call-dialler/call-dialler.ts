import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CallNumber} from "@ionic-native/call-number";
import {Media, MediaObject} from '@ionic-native/media';
import {File} from '@ionic-native/file';

/**
 * Generated class for the CallDiallerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Llamar',
  segment: 'call-dialler'
})
@Component({
  selector: 'page-call-dialler',
  templateUrl: 'call-dialler.html',
})
export class CallDiallerPage {

  phoneNumber: number;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private callNumber: CallNumber, private media: Media,
              public platform: Platform,
              private file: File, private zone: NgZone) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallDiallerPage');
  }

  llamar() {


    this.callNumber.callNumber(String(this.phoneNumber), false)
      .then(res => this.startRecord())
      .catch(err => console.log('Error launching dialer', err));


  }

  startRecord() {
    console.log(this.platform.is('android'));
    if (this.platform.is('ios')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }

    try {
      console.log('grabando');
      this.audio.startRecord();
      this.recording = true;
    }
    catch (e) {
      console.log('Could not start recording.');
    }

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

  stopRecord() {
    try {
      console.log('stoping ...');
      this.audio.stopRecord();
      let duration = this.audio.getDuration();

      let data = {filename: this.fileName, filepath: this.filePath, file: this.audio,
        phonenumber:this.phoneNumber, duration:duration,  pathshort:this.file.externalDataDirectory};

      console.log(data);
      this.audioList.push(data);

      localStorage.setItem("calllist", JSON.stringify(this.audioList));
      this.zone.run(() => {
        this.recording = false;
      });

      this.getAudioList();
    }
    catch
      (e) {
      console.log('Error stoping.');
    }
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
}
