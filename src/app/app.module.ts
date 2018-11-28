import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
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
    AngularFireAuthModule

  ],
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ForgotPage,
    RegisterPage,
    ExperiencesPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ForgotPage,
    RegisterPage,
    ExperiencesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    Auth,
    NativeStorage,
    RestProvider
  ]
})
export class AppModule { }
