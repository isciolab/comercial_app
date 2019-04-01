import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, AlertController, ToastController} from 'ionic-angular';
import {CallNumber} from "@ionic-native/call-number";
import {Media, MediaObject} from '@ionic-native/media';
import {File} from '@ionic-native/file';
import * as firebase from 'firebase';
import {PhoneCallTrap} from 'io.gvox.plugin.phonecalltrap/www/PhoneCallTrap';
import {Contacts, Contact, ContactField, ContactName} from '@ionic-native/contacts';
import {HomePage} from "../home/home";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the CallDiallerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var PhoneCallTrap: any;
export var audio: MediaObject;
export var audioList: any[];
export var currentAudio: any;
export var currentState: any;
export var recording: boolean = false;

export var phoneNumber: number;

export var filePath: string;
export var fileName: string;
export var user: any = [];

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
  listaContactos: any[] = [];
  avatar: string = "./assets/icon/avatar.png";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private callNumber: CallNumber, private media: Media,
              public platform: Platform, private contacts: Contacts, private toastCtrl: ToastController,
              private file: File, private zone: NgZone, public restProvider: RestProvider, private alertCtrl: AlertController) {
    user = firebase.auth().currentUser;
    audioList = [];
    this.cargarListaContactos();

    function presentToast(essage) {
      let toast = toastCtrl.create({
        message: essage,
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        //this.gotoHome()
      });

      toast.present();
    }

    function sendCall() {

      if (currentAudio.filename != undefined) {

        presentToast("Llamada finalizada, se enviará al servidor");
        restProvider.sendCall(currentAudio)
          .then(data => {
            console.log(data);
            currentAudio = {};

          }).catch(e => {

          presentToast("Error al enviar llamada");
          audioList.push(currentAudio);
          localStorage.setItem("calllist", JSON.stringify(audioList));
        });
      }


    }

    function stopRecord() {
      try {
        console.log('stoping ...');

        audio.stopRecord();
        let duration =0;
        audio.setVolume(0.0);
        audio.play();
        setTimeout(function(){ 

        audio.stop();
        audio.setVolume(1.0);
        duration = audio.getDuration();
        

        let data = {
          filename: fileName,
          filepath: filePath,
          file: audio,
          phonenumber: phoneNumber,
          duration: duration,
          pathshort: file.externalDataDirectory,
          user: user.email,
          fecha: new Date().toISOString()
        };
        currentAudio = data;
        console.log(data);

        zone.run(() => {
          recording = false;
        });
        sendCall();

         }, 500);
        
        // presentToast();
        //this.getAudioList();
      }
      catch (e) {
        console.log('Error stoping.', e);
      }
      // (this).stopRecord();
    }

    PhoneCallTrap.onCall(function (state) {
      console.log("CHANGE STATE: " + state);

      switch (state) {
        case "RINGING":
          console.log("Phone is ringing");
          break;
        case "OFFHOOK":
          console.log("Phone is off-hook");
          break;

        case "IDLE":
          console.log("Phone is idle");
          if (currentState == "OFFHOOK") {
            stopRecord();

          }
          break;
      }
      currentState = state;
    });

  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad CallDiallerPage');

  }


  selectContact(number) {
    this.phoneNumber = number;
    this.llamar();
  }

  llamar() {


    phoneNumber = this.phoneNumber;
    this.callNumber.callNumber(String(phoneNumber), false)
      .then(res => this.startRecord())
      .catch(err => console.log('Error launching dialer', err));

  }

  startRecord() {
    console.log(this.platform.is('android'));
    if (this.platform.is('ios')) {
      fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + fileName;
      audio = this.media.create(filePath);
    } else if (this.platform.is('android')) {
      fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + fileName;
      audio = this.media.create(filePath);
    }

    try {
      console.log('grabando');
      //audio.setRate(8000);
      //audio.setVolume(1.0);
      audio.startRecord();
      recording = true;

    }
    catch (e) {
      console.log('Could not start recording.');
    }

  }


  /*presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'La llamada ha finalizado',
      message: 'Desea enviarla de una vez al servidor?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No, la enviaré después');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }*/


  gotoHome() {

    this.navCtrl.push(HomePage);
  }

  /*stopRecord() {
    try {
      console.log('stoping ...');
      audio.stopRecord();
      let duration = audio.getDuration();

      let data = {
        filename: this.fileName,
        filepath: this.filePath,
        file: audio,
        phonenumber: this.phoneNumber,
        duration: duration,
        pathshort: this.file.externalDataDirectory,
        user: this.user.email
      };
      console.log(data);
      audioList.push(data);

      localStorage.setItem("calllist", JSON.stringify(audioList));
      this.zone.run(() => {
        recording = false;
      });
      this.getAudioList();
    }
    catch (e) {
      console.log('Error stoping.');
    }
  };*/

  getAudioList() {

    if (localStorage.getItem("calllist")) {
      this.zone.run(() => {
        audioList = JSON.parse(localStorage.getItem("calllist"));
      });
      console.log(audioList);
    }

  }

  ionViewWillEnter() {
    this.getAudioList();
  }

  ionViewDidEnter() {
    console.log('entroo');
  }

  ionViewWillLeave() {
    console.log('lo dejo');
    //  this.stopRecord();
  }

  ionViewDidLeave() {
    console.log('lo dejo');
    // this.stopRecord();
  }

  /**
   * Funcion encargada de cargar la lista de contactos del celular, en mi caso filtrare y mostrare solo
   * los objetos que tienen valor en los campos dislplayName, photos, phoneNumbers. Con estos cargare
   * la lista a mostrar.
   */
  cargarListaContactos() {
    this.contacts.find(["*"])
      .then(res => {
        console.log({funcion: 'CargarListaContactos', res: res})
        let datosMostar: any[] = [];
        res.map((item) => {
          if (item.displayName != null && item.photos != null && item.phoneNumbers != null) {
            datosMostar.push({
              displayName: item.displayName,
              photos: [{value: this.avatar}],
              phoneNumbers: item.phoneNumbers
            })
          }
        })
        console.log({funcion: 'CargarListaContactos', datosMostar: datosMostar})
        this.zone.run(() => {
          this.listaContactos = datosMostar;
        });

      }, error => {
        console.log({error: error})
      })
  }

}
