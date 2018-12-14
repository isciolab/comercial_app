import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import {AlertController, IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { RegisterPage } from '../pages/register/register';
import {ExperiencesPage} from "../pages/experiences/experiences";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import {NativeStorage} from "@ionic-native/native-storage";
import {ExperienciaPage} from "../pages/experiencia/experiencia";
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import {CallNumber} from "@ionic-native/call-number";
import {CallsPage} from "../pages/calls/calls";

import {Graphic2Page} from "../pages/graphic2/graphic2";
import {BackgroundMode} from "@ionic-native/background-mode";
import {PhoneCallTrap} from 'io.gvox.plugin.phonecalltrap/www/PhoneCallTrap';
import {Contacts} from "@ionic-native/contacts";
import {Network} from "@ionic-native/network";


import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import {GraficosentimientoPage} from '../pages/graficosentimiento/graficosentimiento';

// add your info here
export const firebaseConfig = {
  apiKey: "AIzaSyCkjeGo8ovErLNrFEmxm4ph_fNpVPE8nf4",
  authDomain: "comercial-demo.firebaseapp.com",
  databaseURL: "https://comercial-demo.firebaseio.com",
  projectId: "comercial-demo",
  storageBucket: "comercial-demo.appspot.com",
  messagingSenderId: "84164771322"

};


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule

  ],
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ForgotPage,
    RegisterPage,
    ExperiencesPage,
    CallsPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ForgotPage,
    RegisterPage,
    ExperiencesPage,
    CallsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    Auth,
    File,
    NativeStorage,
    RestProvider,
    CallNumber,
    BackgroundMode,
    Contacts,
    Network,
    AlertController
  ]
})
export class AppModule { }
