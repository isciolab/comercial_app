import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//Pages
import { LoginPage } from '../pages/login/login';
import {HomePage} from "../pages/home/home";
import {ExperienciaPage} from "../pages/experiencia/experiencia";
import {ExperiencesPage} from "../pages/experiences/experiences";
import {CallsPage} from "../pages/calls/calls";

import {Graphic2Page} from "../pages/graphic2/graphic2";
import {GraficosentimientoPage} from '../pages/graficosentimiento/graficosentimiento';
@Component({
  template: `<ion-menu [content]="content" persistent="true">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>

  <!-- Disable swipe-to-go-back because its poor UX to combine STGB with side menus -->
  <ion-nav [root]="rootPage" #content swipeBackEnabled="true"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user:any;
  rootPage : any =  LoginPage;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.user =localStorage.getItem("userEmail");


      console.log(this.user);

      if(this.user =='director@isciolab.com'){
            // used for an example of ngFor and navigation
            this.pages = [
              
              
              { title: 'Evolucion del sentimiento', component: GraficosentimientoPage },
              { title: 'Duracion de la llamada', component: Graphic2Page },

            ];
      }else{

            this.pages = [
              { title: 'Home', component: HomePage },
              { title: 'Llamadas', component: CallsPage },
              { title: 'Experiencias de llamada', component: ExperiencesPage },
            

            ];
          }
          });
        }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
