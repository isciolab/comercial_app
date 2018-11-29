import {Component, forwardRef, Inject, Input, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Media, MediaObject} from '@ionic-native/media';
import {File} from '@ionic-native/file';
import {ExperienciaPage} from '../experiencia/experiencia';

/**
 * Generated class for the Audio1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audio1',
  templateUrl: 'audio1.html',
})
export class Audio1Page {
  @Input() parent;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  experience = <any>{};

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private media: Media,
              private file: File,
              public platform: Platform, private zone: NgZone,
              @Inject(forwardRef(() => ExperienciaPage)) private _parent: ExperienciaPage,) {
    this.experience = _parent.experience;
  }

  ionViewDidLoad() {
    //this.getAudioList();
    console.log('ionViewDidLoad Audio1Page');
  }

  getAudioList() {

    this.zone.run(() => {
      this.audioList = this.audioList;
    });
    /*if (localStorage.getItem("audiolist")) {

      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }*/
  }

  startRecord() {
    console.log(this.platform.is('android'));
    if (this.platform.is('ios')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.wav';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.wav';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }

    try {
      console.log('grabando');
      this.audio.startRecord();
      this.zone.run(() => {
        this.recording = true;
      });
    }
    catch (e) {
      console.log('Could not start recording.');
    }

  }

  /*ionViewWillEnter() {
    this.getAudioList();
  }*/
  stopRecord() {
    this.audio.stopRecord();



    let data = {filename: this.fileName, filepath: this.filePath, file: this.audio};
    this.audioList = [];
    this.experience.audio1 = data;
    this.audioList.push(data);

    //localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.zone.run(() => {
      this.recording = false;
    });

    this.getAudioList();
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
