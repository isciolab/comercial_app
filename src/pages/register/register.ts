import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import {Auth} from '../../providers/auth/auth';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public signupForm: any;
  public loadingController;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;


  constructor(public nav: NavController, public authData: Auth, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.nav = nav;
    this.authData = authData;


    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
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
    this.loadingController.dismiss();
    let alert = this.alertCtrl.create({
    title: 'Success',
    subTitle: 'User Registered',
    buttons: ['Dismiss']
    });
    alert.present();
    this.nav.push(LoginPage);
  }
  )
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