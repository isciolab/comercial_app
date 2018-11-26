import {Component, forwardRef, Inject, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExperienciaPage} from "../experiencia/experiencia";
import {HomePage} from "../home/home";
/**
 * Generated class for the GeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general',
  templateUrl: 'general.html',
})
export class GeneralPage {
  @Input() parent;
  experience = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              @Inject(forwardRef(() => ExperienciaPage)) private _parent:ExperienciaPage) {
    this.experience = _parent.experience;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralPage');
  }

  gotoHome(){
    this.navCtrl.push(HomePage);
  }

}
