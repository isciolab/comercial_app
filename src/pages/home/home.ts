import {Component} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {Auth} from '../../providers/auth/auth';
import {LoginPage} from '../login/login';
import {CallNumber} from '@ionic-native/call-number';
import * as firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //private rootPage: any = StartPage;

  user: any = [];

  constructor(public nav: NavController, public authData: Auth,
              public menuCtrl: MenuController) {
    this.authData = authData;


    menuCtrl.enable(true);
    this.user = firebase.auth().currentUser;
    console.log(this.user);

  }


  logOut() {
    this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
