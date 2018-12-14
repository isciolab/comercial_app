import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import {Auth} from '../../providers/auth/auth';
import {LoginPage} from '../login/login';
import * as firebase from "firebase";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
export interface userProfile {
    key?: string;
    email: string;
  
}

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
 //database = firebase.database();
  public signupForm: any;
  public loadingController;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  private userProfiles :any;

  constructor(public nav: NavController, public authData: Auth, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, public afDB: AngularFireDatabase) {
    this.nav = nav;
    this.authData = authData;

    this.userProfiles=afDB.list('userProfiles');

    this.signupForm = formBuilder.group({
      displayName: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  addUser(u) {
        return this.userProfiles.push(u);
    }
  signupUser(event){
    event.preventDefault();
   
    this.submitAttempt = true;
     if (!this.signupForm.valid){
        console.log(this.signupForm.value);
        this.loadingController.dismiss();
      } else {
         this.loadingController = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
    this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then((newUser: any) => {
        console.log(newUser);

        this.addUser({
          email: newUser.user.email,
          name: newUser.user.displayName
        });

        
        this.loadingController.dismiss();
        let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'User Registered',
        buttons: ['Dismiss']
        });
        alert.present();
        this.nav.push(LoginPage);
    })
    .catch((error: any) => {
          if (error) {
            console.log("Error:" + error.code);
            this.loadingController.dismiss();
          }
        });
    }
  }

  goToLogin(){
    this.nav.push(LoginPage);
  }
}