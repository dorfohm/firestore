import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


    isLoggedIn$ = new Observable<boolean>();
    isLoggedOut$ = new Observable<boolean>();
    pictureUrl$ = new Observable<string>();

    constructor(private afAuth: AngularFireAuth){

    }

    ngOnInit(){
      this.afAuth.authState.subscribe(user => console.log(user));
      this.isLoggedIn$ = this.afAuth.authState.pipe(map(user=> !!user));
      this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
      this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL: null));
    }

    logout() {
      this.afAuth.auth.signOut();
    }

}
