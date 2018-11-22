import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class Auth {

  flag:boolean = false;
  
  constructor(public fireAuth: AngularFireAuth) {
  }
  
  loginUser(email: string, password: string): any {
    console.log("Login User");
  return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): any {
  return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  
}

  resetPassword(email: string): any {
  return this.fireAuth.auth.sendPasswordResetEmail(email);
    }

  logoutUser(): any {
  return this.fireAuth.auth.signOut();
}

}