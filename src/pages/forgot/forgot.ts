import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Auth} from '../../providers/auth/auth';
import {LoginPage} from '../login/login';

/*
  Generated class for the ForgotPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
  public resetPasswordForm: any;
  public loadingController;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;

 
  
  constructor(public nav: NavController, public authData: Auth, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.nav = nav;
    this.authData = authData;


    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

   elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
    }

  resetPassword(event){
  event.preventDefault();
 event.preventDefault();
  this.submitAttempt = true;
  if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } 
  else {

  this.loadingController = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });

  console.log(this.resetPasswordForm.value.email);

  this.authData.resetPassword(this.resetPasswordForm.value.email);
    this.loadingController.dismiss(); 
    let alert = this.alertCtrl.create({
    title: 'Success',
    subTitle: 'Password reset link sent',
    buttons: ['Dismiss']
    });
    alert.present();
    this.nav.push(LoginPage);
    }
  }
  
  goToLogin(){
    this.nav.push(LoginPage);
  }
}
