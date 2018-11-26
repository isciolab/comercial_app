import {Component} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {Auth} from '../../providers/auth/auth';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //private rootPage: any = StartPage;
  constructor(public nav: NavController, public authData: Auth,
              public menuCtrl: MenuController) {
    this.authData = authData;
    menuCtrl.enable(true);


  }

  llamar(){

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
