import { Injectable, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import { database } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { UserData } from './userdata';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User;

  constructor(public afs: AngularFirestore, public  afAuth:  AngularFireAuth, public  router:  Router, public ngZone: NgZone) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.saveStorage(user);
        //console.log(user)
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        //this.router.navigate(['path']);
      });
      console.log('Logueado')
    } catch (error) {
      Swal.fire({
        title: '¡Ha ocurrido un error!',
        text: error.message,
        icon: 'error',
      });
    }
  }

  // Sign up with email/password
  async SignUp(username: string, email: string, password: string, idType: string, id: number, companyName: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      result.user.updateProfile({
        displayName: username
      })
      /* Call the sendEmailVerification() function when new user sign up and returns promise */
      //this.SendVerificationMail();
      const Toast = Swal.mixin({
        toast: true,
        position: 'center-start',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Registrado exitosamente. Verificar correo.'
      });
      this.SetUserData(result.user, companyName, idType, id);
      this.ngZone.run(() => {
        //this.router.navigate(['path']);
      });
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      Swal.fire({
        title: '¡Proceso realizado!',
        text: 'El correo electrónico de restauración de contraseña ha sido enviado. Por favor, revisar tu bandeja.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) //&& user.emailVerified !== false) ? true : false;
  }

  async insertEmail() {
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'text',
      inputPlaceholder: 'Enter your email address'
    });
    if (email) {
      this.ForgotPassword(email);
    }
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    this.afAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          // this.router.navigate(['path']);
        });
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth 
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User, company: string, idType: string, id: number) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`empresas/${user.uid}`);
    const userData = {
      empresa: company,
      tipo_id: idType,
      id: id
    };
    return userRef.set(userData, {
      merge: true
    });
    this.saveStorage(user);
  }

  saveStorage(user: User){
    this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    console.log("Out");
    this.ngZone.run(() => {
      this.router.navigate(['login']);
    });
  }

}
